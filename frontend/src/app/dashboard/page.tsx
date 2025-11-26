'use client';

import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../lib/api';
import { clearAuth, getAccessToken, getDisplayName, saveDisplayName } from '../../lib/auth';

interface Room {
  id: string;
  code: string;
  title: string;
}

interface TranscriptLine {
  time: string;
  text: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [title, setTitle] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [name, setName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [aiDefaultEnabled, setAiDefaultEnabled] = useState(true);
  const [targetLanguage, setTargetLanguage] = useState('Français');
  const displayName = name ?? getDisplayName();

  const liveTranscript: TranscriptLine[] = useMemo(
    () => [
      {
        time: '10:04',
        text: 'We need to finalize the rollout plan for the new onboarding…',
      },
      {
        time: '10:04',
        text: 'Key risk is device compatibility and bandwidth constraints…',
      },
      {
        time: '10:05',
        text: "Next, we should lock the glossary for legal and finance reviewers…",
      },
    ],
    [],
  );

  useEffect(() => {
    if (!getAccessToken()) {
      router.push('/login');
      return;
    }
    const load = async () => {
      try {
        const [roomsRes, meRes] = await Promise.all([api.get('/rooms'), api.get('/auth/me')]);
        setRooms(roomsRes.data);
        if (meRes.data?.name) {
          setName(meRes.data.name);
          saveDisplayName(meRes.data.name);
        }
      } catch (err: unknown) {
        const fallbackMessage = (() => {
          if (typeof err === 'object' && err && 'response' in err) {
            const response = (err as { response?: { data?: { message?: string } } }).response;
            return response?.data?.message;
          }
          if (err instanceof Error) return err.message;
          return undefined;
        })();
        setError(fallbackMessage || 'Failed to load');
      }
    };
    load();
  }, [router]);

  const handleCreate = async (customTitle?: string, options?: { navigate?: boolean }) => {
    const payloadTitle = customTitle ?? title;
    if (!payloadTitle) return;
    setError(null);
    try {
      const res = await api.post('/rooms', { title: payloadTitle });
      setRooms((prev) => [res.data, ...prev]);
      if (!customTitle) {
        setTitle('');
      }
      if (options?.navigate) {
        router.push(`/room/${res.data.code}`);
      }
    } catch (err: unknown) {
      const message =
        typeof err === 'object' && err && 'response' in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
          : err instanceof Error
            ? err.message
            : null;
      setError(message || 'Unable to create room');
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch {
      // ignore
    }
    clearAuth();
    router.push('/login');
  };

  const heroJoinAction = async () => {
    if (rooms[0]) {
      router.push(`/room/${rooms[0].code}`);
      return;
    }
    await handleCreate('Weekly Sync — Product & Ops', { navigate: true });
  };

  const fallbackRooms: Room[] = [
    { id: '1', code: 'ENB-241', title: 'Client Review — Enabel' },
    { id: '2', code: 'FAR-882', title: 'Security Training — FARDC' },
    { id: '3', code: 'MBL-993', title: 'Design Sprint — Mobile' },
  ];

  const roomsToShow = rooms.length ? rooms : fallbackRooms;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#05060c] text-slate-100">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0), linear-gradient(0deg, rgba(255,255,255,0.05) 1px, transparent 0), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 0)',
          backgroundSize: '48px 48px, 120px 120px, 120px 120px',
          opacity: 0.15,
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-violet-500/10 blur-3xl" />

      <header className="sticky top-0 z-20 border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-500 text-lg font-bold text-slate-950 shadow-lg shadow-cyan-500/30">
              N
            </div>
            <div>
              <div className="text-xs uppercase text-cyan-200">NeoxMeet</div>
              <div className="text-sm text-slate-300">Workspace: Core Team</div>
              <div className="text-xs text-slate-500">Welcome back {displayName ?? 'Guest'}</div>
            </div>
          </div>

          <div className="hidden flex-1 items-center justify-center px-8 lg:flex">
            <div className="relative w-full max-w-2xl">
              <input
                className="w-full rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white placeholder:text-slate-400 shadow-inner shadow-cyan-500/10 focus:border-cyan-400 focus:outline-none"
                placeholder="Search meetings, transcripts, people…"
              />
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">⌘K</div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-emerald-200 shadow shadow-emerald-500/30">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
              <span>AI Live</span>
              <span className="text-xs text-emerald-100/80">Translating</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
              <span className="text-slate-200">EN →</span>
              <select
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
                className="bg-transparent text-slate-100 focus:outline-none"
              >
                <option className="bg-slate-900">Français</option>
                <option className="bg-slate-900">Español</option>
                <option className="bg-slate-900">Deutsch</option>
                <option className="bg-slate-900">Lingála</option>
              </select>
              <span className="text-xs text-slate-400">Auto-detect</span>
            </div>
            <button className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-slate-200 hover:border-cyan-400/50 hover:text-white">
              Notifications
            </button>
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-slate-200">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400" />
              <div>
                <div className="text-xs text-slate-400">Status</div>
                <div className="text-sm text-white">Ready</div>
              </div>
            </div>
            <button onClick={logout} className="text-xs text-slate-400 hover:text-rose-300">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 px-6 pb-12 pt-6">
        {error && <p className="text-sm text-rose-300">{error}</p>}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <section className="relative col-span-12 overflow-hidden rounded-3xl border border-cyan-500/40 bg-white/5 backdrop-blur-xl lg:col-span-8">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-violet-600/10" />
            <div className="relative flex flex-col gap-4 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Next meeting</p>
                  <h1 className="text-3xl font-semibold text-white">Weekly Sync — Product &amp; Ops</h1>
                  <p className="text-sm text-slate-300">Today • 10:00–11:00 (Kinshasa)</p>
                </div>
                <div className="rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs text-slate-300">
                  Participants
                  <div className="mt-2 flex -space-x-2">
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <span
                        key={n}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/10 text-[10px]"
                      >
                        A{n}
                      </span>
                    ))}
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-500/20 text-xs text-cyan-100">
                      +3
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-xs text-slate-200">
                <span className="flex items-center gap-2 rounded-full border border-cyan-400/60 bg-cyan-500/10 px-3 py-1 text-cyan-100">
                  Captions: ON
                </span>
                <span className="flex items-center gap-2 rounded-full border border-violet-400/60 bg-violet-500/10 px-3 py-1 text-violet-100">
                  Translation: ON (Auto)
                </span>
                <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">Transcript: Recording to “Workspace Memory”</span>
                <span className="flex flex-wrap items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-slate-200">
                  Languages: <span className="rounded-full bg-white/10 px-2 py-0.5">English</span>
                  <span className="rounded-full bg-white/10 px-2 py-0.5">Français</span>
                  <span className="rounded-full bg-white/10 px-2 py-0.5">Lingála</span>
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={heroJoinAction}
                  className="rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-violet-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/40 transition hover:scale-[1.01]"
                >
                  Join now
                </button>
                <button className="rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 hover:border-cyan-400/50">
                  Details
                </button>
                <button className="rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 hover:border-cyan-400/50">
                  Test audio
                </button>
                <details className="group relative">
                  <summary className="flex cursor-pointer items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 hover:border-cyan-400/50">
                    Join options
                    <span className="text-xs text-slate-400">▼</span>
                  </summary>
                  <div className="absolute left-0 mt-2 w-48 space-y-2 rounded-2xl border border-white/10 bg-slate-900/90 p-3 text-sm shadow-xl backdrop-blur-xl">
                    {['Join muted', 'Join with camera off', 'Studio mode'].map((option) => (
                      <button
                        key={option}
                        className="block w-full rounded-lg px-3 py-2 text-left text-slate-200 hover:bg-white/5"
                        onClick={heroJoinAction}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </details>
              </div>
            </div>
          </section>

          <section className="col-span-12 space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl lg:col-span-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Quick start</p>
                <h2 className="text-xl font-semibold text-white">Launch in seconds</h2>
              </div>
              <span className="rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-100">AI ready</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <QuickTile
                title="New meeting"
                subtitle="Instant link + AI captions ready"
                onClick={() => handleCreate('Instant meeting', { navigate: true })}
              />
              <QuickTile
                title="Join with code"
                subtitle="Paste a link or 9-digit code"
                onClick={() => joinCode && router.push(`/room/${joinCode}`)}
              >
                <input
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value)}
                  placeholder="e.g. ENB-241"
                  className="mt-3 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
                />
              </QuickTile>
              <QuickTile
                title="Schedule"
                subtitle="Add agenda + auto-summary"
                onClick={() => handleCreate(title || 'Scheduled session')}
              >
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Name this session"
                  className="mt-3 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
                />
              </QuickTile>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
              <div>
                <p className="text-sm text-white">Default AI for new meetings: {aiDefaultEnabled ? 'ON' : 'OFF'}</p>
                <p className="text-xs text-slate-400">Captions, translation & transcript start automatically.</p>
              </div>
              <button
                onClick={() => setAiDefaultEnabled((prev) => !prev)}
                className={`relative h-8 w-14 rounded-full border border-white/10 bg-white/10 px-1 transition ${aiDefaultEnabled ? 'shadow-[0_0_16px_rgba(34,211,238,0.6)]' : ''}`}
              >
                <span
                  className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 transition ${aiDefaultEnabled ? 'translate-x-6' : ''}`}
                />
              </button>
            </div>
          </section>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <section className="col-span-12 grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl lg:col-span-8">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Transcript</p>
                    <h3 className="text-xl font-semibold text-white">Live</h3>
                  </div>
                  <div className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-100">Listening…</div>
                </div>
                <p className="mt-2 text-xs text-slate-400">Speaker: Amina K. • Confidence: High</p>
                <div className="mt-4 space-y-3 overflow-hidden rounded-xl border border-white/5 bg-white/5 p-3">
                  {liveTranscript.map((line, index) => (
                    <div
                      key={`${line.time}-${index}`}
                      className="flex items-start gap-3 rounded-lg bg-white/0 p-2 text-sm text-slate-100 transition hover:bg-white/5"
                    >
                      <span className="text-xs text-slate-500">{line.time}</span>
                      <p>{line.text}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between text-sm text-cyan-100">
                  <a className="hover:text-white" href="#">
                    Open full transcript →
                  </a>
                  <button className="rounded-lg border border-cyan-400/60 bg-cyan-500/10 px-3 py-2 text-xs text-cyan-100 hover:border-cyan-300">
                    Mark highlight
                  </button>
                </div>
              </div>

              <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-black/40 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Translation</p>
                    <h3 className="text-xl font-semibold text-white">Instant</h3>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-200">
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Auto →</span>
                    <select
                      value={targetLanguage}
                      onChange={(e) => setTargetLanguage(e.target.value)}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white focus:border-cyan-400 focus:outline-none"
                    >
                      <option className="bg-slate-900">Français</option>
                      <option className="bg-slate-900">Español</option>
                      <option className="bg-slate-900">Deutsch</option>
                      <option className="bg-slate-900">Lingála</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4 space-y-3 rounded-xl border border-white/5 bg-white/5 p-3">
                  {liveTranscript.map((line, index) => (
                    <div key={`translation-${index}`} className="rounded-lg bg-white/0 p-2 text-sm text-slate-100 transition hover:bg-white/5">
                      <p className="text-cyan-50">« Nous devons finaliser le plan de déploiement… »</p>
                      <p className="text-xs text-slate-400">Mirrored from source • shimmer on update</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-200">
                  <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 hover:border-cyan-300 hover:text-white">Show bilingual</button>
                  <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 hover:border-cyan-300 hover:text-white">Simplify language</button>
                  <button className="rounded-lg border border-emerald-400/40 bg-emerald-500/10 px-3 py-2 text-emerald-100 shadow shadow-emerald-400/30">
                    Glossary: ENABLED
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="col-span-12 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl lg:col-span-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Recent rooms</p>
                <h3 className="text-xl font-semibold text-white">Rejoin instantly</h3>
              </div>
              <span className="text-xs text-slate-400">({rooms.length ? 'Live data' : 'Sample'})</span>
            </div>
            <div className="mt-4 space-y-3">
              {roomsToShow.map((room, index) => (
                <div
                  key={room.id}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-slate-100 hover:border-cyan-400/40"
                >
                  <div>
                    <div className="font-semibold text-white">{room.title}</div>
                    <div className="text-xs text-slate-400">{index === 0 ? 'Yesterday' : index === 1 ? 'Yesterday' : '2 days ago'} • Code: {room.code}</div>
                    <div className="mt-1 flex flex-wrap gap-2 text-[11px] text-slate-300">
                      <span className="rounded-full bg-white/10 px-2 py-0.5">Transcript saved</span>
                      <span className="rounded-full bg-white/10 px-2 py-0.5">Summary ready</span>
                      <span className="rounded-full bg-white/10 px-2 py-0.5">2 languages</span>
                    </div>
                  </div>
                  <button
                    className="rounded-full border border-cyan-400/50 bg-cyan-500/10 px-4 py-2 text-xs font-semibold text-cyan-100 hover:bg-cyan-500/20"
                    onClick={() => router.push(`/room/${room.code}`)}
                  >
                    {index === 1 ? 'Open notes' : 'Rejoin'}
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="rounded-3xl border border-white/10 bg-gradient-to-r from-white/5 via-white/0 to-white/5 p-8 backdrop-blur-xl">
          <div className="grid gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">What NeoxMeet does</p>
              <h3 className="mt-2 text-3xl font-semibold text-white">Meet once. Understand everyone. Leave with outcomes.</h3>
              <p className="mt-3 max-w-2xl text-slate-300">
                NeoxMeet combines secure video meetings with instant AI translation, live captions, and auto transcripts—then generates minutes, decisions, and action items you can share.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm">
                <button className="rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-5 py-3 font-semibold text-slate-950 shadow shadow-cyan-500/30">Start a meeting</button>
                <button className="rounded-full border border-white/20 bg-white/5 px-5 py-3 font-semibold text-white hover:border-cyan-400/50">View a live demo</button>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {[
                  {
                    title: 'Instant AI Translation',
                    copy: 'Real-time multilingual captions for every participant.',
                  },
                  {
                    title: 'Live Transcript (Searchable)',
                    copy: 'Every meeting becomes searchable knowledge.',
                  },
                  {
                    title: 'Auto Summary + Action Items',
                    copy: 'Decisions, owners, deadlines—generated in one click.',
                  },
                  {
                    title: 'Enterprise Privacy Controls',
                    copy: 'Host policies, redaction, and export rights—built in.',
                  },
                ].map((feature) => (
                  <div key={feature.title} className="rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-slate-200">
                    <div className="text-base font-semibold text-white">{feature.title}</div>
                    <p className="mt-2 text-slate-300">{feature.copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl sm:grid-cols-3">
          {[
            ['+38% faster alignment', 'from fewer repeats'],
            ['2.4 hrs/week saved', 'auto minutes + follow-ups'],
            ['120+ languages supported', 'auto-detect + glossary'],
          ].map(([metric, detail]) => (
            <div key={metric} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-6 shadow-lg shadow-cyan-500/10">
              <div className="text-3xl font-semibold text-white">{metric}</div>
              <div className="mt-2 text-sm text-slate-300">{detail}</div>
            </div>
          ))}
        </section>

        <footer className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-xs text-slate-400 backdrop-blur-xl">
          <div className="flex flex-wrap gap-4">
            <a href="#" className="hover:text-white">
              Security
            </a>
            <a href="#" className="hover:text-white">
              Status
            </a>
            <a href="#" className="hover:text-white">
              Docs
            </a>
            <a href="#" className="hover:text-white">
              API
            </a>
            <a href="#" className="hover:text-white">
              Privacy
            </a>
            <a href="#" className="hover:text-white">
              Terms
            </a>
          </div>
          <div>© NeoxMeet — AI Meetings with Instant Translation &amp; Transcripts</div>
        </footer>
      </main>
    </div>
  );
}

interface QuickTileProps {
  title: string;
  subtitle: string;
  onClick?: () => void;
  children?: ReactNode;
}

function QuickTile({ title, subtitle, onClick, children }: QuickTileProps) {
  return (
    <button
      onClick={onClick}
      className="group flex h-full flex-col rounded-2xl border border-white/10 bg-black/40 p-4 text-left shadow-lg shadow-cyan-500/10 transition duration-150 hover:-translate-y-1 hover:border-cyan-400/50 hover:shadow-cyan-400/20"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-base font-semibold text-white">{title}</div>
          <p className="text-sm text-slate-300">{subtitle}</p>
        </div>
        <span className="rounded-full border border-cyan-300/50 bg-cyan-500/10 px-2 py-1 text-xs text-cyan-100 opacity-0 transition group-hover:opacity-100">
          AI ON
        </span>
      </div>
      {children}
    </button>
  );
}
