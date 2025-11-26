'use client';

import { LiveKitRoom, VideoConference, useRoomContext } from '@livekit/components-react';
import { RoomEvent } from 'livekit-client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../../lib/api';
import { getAccessToken, getDisplayName } from '../../../lib/auth';

function CaptionsOverlay() {
  const room = useRoomContext();
  const [captions, setCaptions] = useState<string[]>([]);

  useEffect(() => {
    if (!room) return;
    const handler = (payload: Uint8Array) => {
      try {
        const parsed = JSON.parse(new TextDecoder().decode(payload));
        if (parsed.type === 'caption' && parsed.segments) {
          const text = parsed.segments.map((s: any) => s.text).join(' ');
          setCaptions((prev) => [...prev.slice(-4), text]);
        }
        if (parsed.type === 'transcriber-status' && parsed.status) {
          setCaptions((prev) => [...prev.slice(-4), `Bot: ${parsed.status}`]);
        }
      } catch (error) {
        // ignore parse errors
      }
    };

    room.on(RoomEvent.DataReceived, handler);
    return () => {
      room.off(RoomEvent.DataReceived, handler);
    };
  }, [room]);

  if (!captions.length) return null;

  return (
    <div className="pointer-events-none fixed bottom-4 left-1/2 z-20 w-full max-w-2xl -translate-x-1/2 space-y-1 rounded bg-black/70 p-3 text-center text-sm">
      {captions.map((line, idx) => (
        <div key={idx}>{line}</div>
      ))}
    </div>
  );
}

export default function RoomPage({ params }: { params: { code: string } }) {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [serverUrl, setServerUrl] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!getAccessToken()) {
      router.push('/login');
      return;
    }
    const loadToken = async () => {
      try {
        const displayName = getDisplayName() || 'Participant';
        const res = await api.post('/livekit/token', {
          roomCode: params.code,
          displayName,
          role: 'participant',
        });
        setToken(res.data.token);
        setServerUrl(res.data.livekitUrl);
      } catch (err: any) {
        setError(err?.response?.data?.message || 'Unable to join room');
      }
    };
    loadToken();
  }, [params.code, router]);

  if (error) {
    return <p className="text-red-400">{error}</p>;
  }

  if (!token) {
    return <p>Loading room...</p>;
  }

  return (
    <LiveKitRoom serverUrl={serverUrl} token={token} connect video audio className="h-[80vh] rounded border border-slate-800 bg-slate-900">
      <VideoConference />
      <CaptionsOverlay />
    </LiveKitRoom>
  );
}
