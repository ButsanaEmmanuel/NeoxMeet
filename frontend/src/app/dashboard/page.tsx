'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../lib/api';
import { clearAuth, getAccessToken, getDisplayName, saveDisplayName } from '../../lib/auth';

interface Room {
  id: string;
  code: string;
  title: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [title, setTitle] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [name, setName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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
      } catch (err: any) {
        setError(err?.response?.data?.message || 'Failed to load');
      }
    };
    load();
  }, [router]);

  const handleCreate = async () => {
    setError(null);
    try {
      const res = await api.post('/rooms', { title });
      setRooms((prev) => [res.data, ...prev]);
      setTitle('');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Unable to create room');
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      // ignore
    }
    clearAuth();
    router.push('/login');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-slate-300">Welcome back {name ?? getDisplayName() ?? ''}</p>
        </div>
        <button className="text-sm text-red-300" onClick={logout}>
          Logout
        </button>
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded border border-slate-800 bg-slate-900 p-4 space-y-2">
          <h2 className="font-semibold">Create room</h2>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Team sync"
            className="w-full rounded border border-slate-700 bg-slate-800 p-2"
          />
          <button className="rounded bg-indigo-500 px-4 py-2 font-semibold" onClick={handleCreate} disabled={!title}>
            Create
          </button>
        </div>
        <div className="rounded border border-slate-800 bg-slate-900 p-4 space-y-2">
          <h2 className="font-semibold">Join by code</h2>
          <input
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
            placeholder="room code"
            className="w-full rounded border border-slate-700 bg-slate-800 p-2"
          />
          <button className="rounded bg-emerald-500 px-4 py-2 font-semibold" onClick={() => router.push(`/room/${joinCode}`)} disabled={!joinCode}>
            Join
          </button>
        </div>
      </div>
      <div className="rounded border border-slate-800 bg-slate-900 p-4">
        <h2 className="mb-3 font-semibold">My rooms</h2>
        <div className="space-y-2">
          {rooms.map((room) => (
            <div key={room.id} className="flex items-center justify-between rounded border border-slate-800 bg-slate-800 px-3 py-2">
              <div>
                <div className="font-semibold">{room.title}</div>
                <div className="text-xs text-slate-400">Code: {room.code}</div>
              </div>
              <div className="space-x-2">
                <button className="rounded bg-indigo-500 px-3 py-1 text-sm" onClick={() => router.push(`/room/${room.code}`)}>
                  Open
                </button>
              </div>
            </div>
          ))}
          {rooms.length === 0 && <p className="text-sm text-slate-400">No rooms yet.</p>}
        </div>
      </div>
    </div>
  );
}
