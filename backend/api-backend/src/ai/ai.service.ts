import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import type { TranslateDto, RecapDto, TtsDto, UploadedAudio } from './ai.dto';
import { OpenAI } from 'openai';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createReadStream } from 'node:fs';
import { ElevenLabsClient } from 'elevenlabs';
import { LivekitService } from '../livekit/livekit.service';
import type { Express } from 'express';

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

@Injectable()
export class AiService {
  private readonly openai: OpenAI | null;
  private readonly elevenLabs: ElevenLabsClient | null;
  private readonly maxDurationSeconds: number;
  private readonly maxFileSizeMb: number;

  constructor(private readonly config: ConfigService, private readonly prisma: PrismaService, private readonly livekit: LivekitService) {
    const openAiKey = this.config.get<string>('OPENAI_API_KEY');
    this.openai = openAiKey ? new OpenAI({ apiKey: openAiKey }) : null;
    const elevenLabsKey = this.config.get<string>('ELEVENLABS_API_KEY');
    this.elevenLabs = elevenLabsKey ? new ElevenLabsClient({ apiKey: elevenLabsKey }) : null;
    this.maxDurationSeconds = Number(this.config.get<number>('AI_MAX_AUDIO_SECONDS', 600));
    this.maxFileSizeMb = Number(this.config.get<number>('AI_MAX_FILE_MB', 25));
  }

  private ensureOpenAI() {
    if (!this.openai) {
      throw new BadRequestException('OPENAI_API_KEY is not configured');
    }
    return this.openai;
  }

  private ensureElevenLabs() {
    if (!this.elevenLabs) {
      throw new BadRequestException('ELEVENLABS_API_KEY is not configured');
    }
    return this.elevenLabs;
  }

  async transcribeAudio(file: UploadedAudio, meetingSessionId?: string) {
    if (!file) {
      throw new BadRequestException('Audio file is required');
    }

    const fileMb = file.size / (1024 * 1024);
    if (fileMb > this.maxFileSizeMb) {
      throw new BadRequestException(`File too large. Max allowed is ${this.maxFileSizeMb} MB`);
    }

    const workspace = await mkdtemp(path.join(tmpdir(), 'neoxmeet-transcribe-'));
    const inputPath = path.join(workspace, file.originalname || 'input');
    await writeFile(inputPath, file.buffer);

    const duration = await this.getDurationSeconds(inputPath);
    if (duration > this.maxDurationSeconds) {
      await rm(workspace, { recursive: true, force: true });
      throw new BadRequestException(`Audio longer than ${this.maxDurationSeconds} seconds`);
    }

    const normalizedPath = path.join(workspace, 'normalized.wav');
    await this.normalizeAudio(inputPath, normalizedPath);

    const openai = this.ensureOpenAI();
    const response = await openai.audio.transcriptions.create({
      file: createReadStream(normalizedPath) as any,
      model: 'gpt-4o-transcribe',
      response_format: 'verbose_json',
    });

    const segments = response.segments?.map((segment: any) => ({
      startMs: Math.round(segment.start * 1000),
      endMs: Math.round(segment.end * 1000),
      text: segment.text,
      speakerIdentity: segment.id?.toString() ?? null,
      lang: response.language || 'auto',
    })) ?? [
      { startMs: 0, endMs: Math.round(duration * 1000), text: response.text || '', speakerIdentity: null, lang: response.language || 'auto' },
    ];

    if (meetingSessionId) {
      for (const segment of segments) {
        await this.prisma.transcriptSegment.create({
          data: {
            meetingSessionId,
            startMs: segment.startMs,
            endMs: segment.endMs,
            text: segment.text,
            speakerIdentity: segment.speakerIdentity,
            lang: segment.lang,
          },
        });
      }
      const session = await this.prisma.meetingSession.findUnique({ where: { id: meetingSessionId }, include: { room: true } });
      if (session) {
        await this.livekit.sendCaption(session.room.code, Buffer.from(JSON.stringify({ type: 'caption', segments })));
      }
    }

    await rm(workspace, { recursive: true, force: true });
    return { segments };
  }

  async translateText(dto: TranslateDto) {
    const openai = this.ensureOpenAI();
    const prompt = `Translate the following text${dto.sourceLang ? ` from ${dto.sourceLang}` : ''} to ${dto.targetLang}. Return only the translated content.`;
    const completion = await openai.responses.create({
      model: 'gpt-4.1-mini',
      input: [
        {
          role: 'user',
          content: `${prompt}\n\n${dto.text}`,
        },
      ],
      max_output_tokens: 500,
    });

    return { translatedText: completion.output_text };
  }

  async generateRecap(dto: RecapDto) {
    const openai = this.ensureOpenAI();
    const meeting = await this.prisma.meetingSession.findUnique({
      where: { id: dto.meetingSessionId },
      include: { transcriptSegments: { orderBy: { startMs: 'asc' } } },
    });

    if (!meeting) {
      throw new BadRequestException('Meeting session not found');
    }

    const transcript = meeting.transcriptSegments
      .map((seg: any) => {
        const minutes = Math.floor(seg.startMs / 60000)
          .toString()
          .padStart(2, '0');
        const seconds = Math.floor((seg.startMs % 60000) / 1000)
          .toString()
          .padStart(2, '0');
        return `${minutes}:${seconds} ${seg.text}`;
      })
      .join('\n');

    const completion = await openai.responses.create({
      model: 'gpt-4.1-mini',
      input: [
        {
          role: 'user',
          content: `Summarize the meeting transcript. Provide cleanedTranscript, summary, decisions (as JSON array), and actionItems (as JSON array). Respond with JSON.`,
        },
        { role: 'user', content: transcript },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'recap',
          schema: {
            type: 'object',
            additionalProperties: false,
            properties: {
              cleanedTranscript: { type: 'string' },
              summary: { type: 'string' },
              decisions: { type: 'array', items: { type: 'string' } },
              actionItems: { type: 'array', items: { type: 'string' } },
            },
            required: ['cleanedTranscript', 'summary', 'decisions', 'actionItems'],
          },
        },
      },
    } as any);

    const parsed = JSON.parse(completion.output_text ?? '{}');

    const artifact = await this.prisma.transcriptArtifact.upsert({
      where: { meetingSessionId: dto.meetingSessionId },
      update: {
        cleanedTranscript: parsed.cleanedTranscript,
        summary: parsed.summary,
        decisions: parsed.decisions,
        actionItems: parsed.actionItems,
      },
      create: {
        meetingSessionId: dto.meetingSessionId,
        cleanedTranscript: parsed.cleanedTranscript,
        summary: parsed.summary,
        decisions: parsed.decisions,
        actionItems: parsed.actionItems,
      },
    });

    return artifact;
  }

  async textToSpeech(dto: TtsDto) {
    const client = this.ensureElevenLabs();
    const audio = await client.textToSpeech.convert(dto.voiceId, {
      text: dto.text,
      output_format: 'mp3_44100_128',
    });

    if (audio instanceof ArrayBuffer) {
      return Buffer.from(audio);
    }

    if (audio instanceof Uint8Array) {
      return Buffer.from(audio);
    }

    if (typeof (audio as any).arrayBuffer === 'function') {
      const arr = await (audio as any).arrayBuffer();
      return Buffer.from(arr);
    }

    throw new InternalServerErrorException('Unable to parse ElevenLabs audio response');
  }

  private async normalizeAudio(input: string, output: string) {
    return new Promise<void>((resolve, reject) => {
      ffmpeg(input)
        .outputOptions(['-ar 16000', '-ac 1', '-c:a pcm_s16le'])
        .on('error', (err: Error) => reject(new InternalServerErrorException(err.message)))
        .on('end', () => resolve())
        .save(output);
    });
  }

  private async getDurationSeconds(filePath: string) {
    return new Promise<number>((resolve, reject) => {
      ffmpeg.ffprobe(filePath, (err: Error | undefined, data: any) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(data.format.duration ?? 0);
      });
    });
  }
}
