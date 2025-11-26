'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../lib/api';
import { clearAuth, getAccessToken, getDisplayName, saveDisplayName } from '../../lib/auth';

interface Room {
  id: string;
  code: string;
  title: string;
}

const languagesDetected = ['English', 'Français', 'Lingála'];
const transcriptLines = [
  { time: '10:04', speaker: 'Amina K.', text: 'We need to finalize the rollout plan for the new onboarding…' },
  { time: '10:04', speaker: 'David M.', text: 'Key risk is device compatibility and bandwidth constraints…' },
  { time: '10:05', speaker: 'Amina K.', text: 'Let us align on the pilot market before procurement…' },
];
const translationLines = [
  'Nous devons finaliser le plan de déploiement pour le nouvel onboarding…',
  'Le principal risque concerne la compatibilité des appareils et la bande passante…',
  'Alignons-nous sur le marché pilote avant l’approvisionnement…',
];
const fallbackRecent = [
  { title: 'Client Review — Enabel', meta: 'Yesterday', action: 'Rejoin' },
  { title: 'Security Training — FARDC', meta: 'Yesterday', action: 'Open notes' },
  { title: 'Design Sprint — Mobile', meta: '2 days ago', action: 'Rejoin' },
];

export default function DashboardPage() {
  const router = useRouter();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [joinCode, setJoinCode] = useState('');
  const [name, setName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [aiDefault, setAiDefault] = useState(true);
  const [joinMenuOpen, setJoinMenuOpen] = useState(false);
  const [creatingMeeting, setCreatingMeeting] = useState(false);
  const joinInputRef = useRef<HTMLInputElement>(null);

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
        setError(fallbackMessage || 'Failed to load your workspace');
      }
    };
    load();
  }, [router]);

  const displayName = name ?? getDisplayName() ?? 'Ready User';

  const upcomingMeeting = useMemo(
    () => ({
      title: rooms[0]?.title ?? 'Weekly Sync — Product & Ops',
      schedule: 'Today • 10:00–11:00 (Kinshasa)',
      roomCode: rooms[0]?.code ?? '',
      participants: 9,
    }),
    [rooms],
  );

  const handleQuickMeeting = async () => {
    setError(null);
    setCreatingMeeting(true);
    try {
      const title = `Instant Sync ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      const res = await api.post('/rooms', { title });
      setRooms((prev) => [res.data, ...prev]);
      router.push(`/room/${res.data.code}`);
    } catch (err: unknown) {
      const message =
        typeof err === 'object' && err && 'response' in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
          : err instanceof Error
            ? err.message
            : null;
      setError(message || 'Unable to launch quick meeting');
    } finally {
      setCreatingMeeting(false);
    }
  };

  const handleJoinWithCode = () => {
    if (!joinCode) return;
    router.push(`/room/${joinCode}`);
  };

  const handleJoinNow = () => {
    if (upcomingMeeting.roomCode) {
      router.push(`/room/${upcomingMeeting.roomCode}`);
      return;
    }
    setError('Assign a room to “Next meeting” to enable direct join.');
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

  const recentRooms = rooms.length
    ? rooms.slice(0, 3).map((room) => ({
        title: room.title,
        meta: 'Recently visited',
        action: 'Rejoin',
        code: room.code,
      }))
    : fallbackRecent;

  return (
    <div className="relative -mx-6 -mt-10 min-h-screen px-6 pb-12 pt-10 text-white">
      <div className="absolute inset-0 -z-10 bg-[#04060d]" />
      <div
        className="absolute inset-0 -z-10 opacity-80"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 0), linear-gradient(120deg, rgba(12,29,63,0.6), transparent 55%)',
          backgroundSize: '70px 70px, 100% 100%',
        }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-500/15 via-transparent to-violet-600/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl space-y-8">
        <header className="sticky top-4 z-20 rounded-3xl border border-white/10 bg-black/40 px-6 py-4 shadow-2xl shadow-black/40 backdrop-blur-xl">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-600 text-lg font-semibold text-white">
                NM
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3rem] text-white/50">NeoxMeet</p>
                <p className="text-sm text-white/70">Workspace: Horizon Ops</p>
                <p className="text-xs text-white/40">Welcome back {displayName}</p>
              </div>
            </div>
            <div className="flex-1 min-w-[220px]">
              <div className="relative">
                <input
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-white placeholder:text-white/40 focus:border-cyan-400 focus:outline-none"
                  placeholder="Search meetings, transcripts, people..."
                />
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/40">⌘K</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-white/80">
              <div className="flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-emerald-200">
                <span className="text-lg">●</span>
                <div className="leading-tight">
                  <p className="text-[0.65rem] uppercase tracking-[0.3rem] text-emerald-300">AI Live</p>
                  <p className="text-[0.7rem] text-white/80">Translating</p>
                </div>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/5 px-3 py-2 text-xs">
                <p className="text-[0.6rem] uppercase tracking-[0.3rem] text-white/50">Language</p>
                <div className="flex items-center gap-1 text-sm">
                  EN <span className="text-white/40">→</span> FR
                  <span className="rounded-full border border-white/20 px-2 text-[0.6rem] text-white/70">Auto</span>
                </div>
              </div>
              <button className="rounded-full border border-white/15 bg-white/5 px-4 py-2 hover:border-white/40">🔔</button>
              <div className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-3 py-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-cyan-500 to-violet-600" />
                <div>
                  <p className="text-xs text-white/60">Status</p>
                  <p className="text-sm font-semibold text-white">Ready</p>
                </div>
                <button className="text-xs text-white/60" onClick={logout}>
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </header>

        {error && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-12">
          <section className="space-y-6 lg:col-span-8">
            <div className="relative rounded-3xl bg-gradient-to-r from-cyan-500/40 via-indigo-500/40 to-fuchsia-500/40 p-[1.5px] shadow-[0_10px_60px_rgba(15,176,255,0.3)]">
              <div className="rounded-3xl border border-white/10 bg-[#090f1d]/95 px-6 py-6 backdrop-blur-2xl">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3rem] text-white/40">Next meeting</p>
                    <h2 className="mt-1 text-2xl font-semibold text-white">{upcomingMeeting.title}</h2>
                    <p className="mt-1 text-sm text-white/70">{upcomingMeeting.schedule}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {['AK', 'DM', 'SR', 'JL', 'MC', 'TZ'].map((initials, idx) => (
                      <div
                        key={initials}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/15 text-xs font-semibold text-white"
                        style={{ transform: `translateX(-${idx * 6}px)` }}
                      >
                        {initials}
                      </div>
                    ))}
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xs text-white/80">
                      +3
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80 sm:grid-cols-3">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-white/50">Captions</p>
                    <p className="mt-1 font-semibold text-cyan-200">ON</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-white/50">Translation</p>
                    <p className="mt-1 font-semibold text-violet-200">ON · Auto</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-white/50">Transcript</p>
                    <p className="mt-1 font-semibold text-emerald-200">Recording to “Workspace Memory”</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-white/70">
                  {languagesDetected.map((lang) => (
                    <span key={lang} className="rounded-full border border-white/20 px-3 py-1">
                      {lang}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    className="rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/40 transition hover:scale-[1.01]"
                    onClick={handleJoinNow}
                  >
                    Join now
                  </button>
                  <button className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/80 hover:border-white/40">Details</button>
                  <button className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/80 hover:border-white/40">Test audio</button>
                  <div className="relative">
                    <button
                      className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm text-white/80 hover:border-white/40"
                      onClick={() => setJoinMenuOpen((prev) => !prev)}
                    >
                      Join options ▼
                    </button>
                    {joinMenuOpen && (
                      <div className="absolute right-0 mt-2 min-w-[180px] rounded-2xl border border-white/15 bg-[#0f172a]/95 p-2 text-sm shadow-2xl backdrop-blur-xl">
                        {['Join muted', 'Join with camera off', 'Studio mode'].map((option) => (
                          <button
                            key={option}
                            className="block w-full rounded-xl px-3 py-2 text-left text-white/80 hover:bg-white/10"
                            onClick={() => {
                              setJoinMenuOpen(false);
                              handleJoinNow();
                            }}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3rem] text-white/40">Live intelligence</p>
                  <h3 className="text-xl font-semibold text-white">Live Translation + Transcript</h3>
                </div>
                <span className="rounded-full border border-cyan-500/50 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-100">AI ON</span>
              </div>
              <div className="mt-5 grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-[#0c1426]/80 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white">Transcript (Live)</p>
                      <p className="text-xs text-white/50">Listening… • Speaker: Amina K. • Confidence: High</p>
                    </div>
                    <button className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/70">Mark highlight</button>
                  </div>
                  <div className="mt-4 space-y-3">
                    {transcriptLines.map((line) => (
                      <div key={line.time} className="rounded-2xl border border-white/5 bg-white/5 px-3 py-2 text-sm text-white/90">
                        <span className="text-white/50">{line.time} · </span>
                        <span className="font-semibold text-white/80">{line.speaker}: </span>
                        {line.text}
                      </div>
                    ))}
                  </div>
                  <button className="mt-4 text-sm text-cyan-200 hover:text-cyan-100">Open full transcript →</button>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#0c1426]/80 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white">Translation</p>
                      <p className="text-xs text-white/50">Auto → Français</p>
                    </div>
                    <div className="flex gap-2 text-xs">
                      <button className="rounded-full border border-white/20 px-3 py-1 text-white/70">Show bilingual</button>
                      <button className="rounded-full border border-white/20 px-3 py-1 text-white/70">Simplify language</button>
                    </div>
                  </div>
                  <div className="mt-4 space-y-3">
                    {translationLines.map((line, idx) => (
                      <div key={idx} className="rounded-2xl border border-white/5 bg-gradient-to-r from-cyan-500/10 to-violet-500/5 px-3 py-2 text-sm text-white/90">
                        {line}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/70">
                    <span className="rounded-full border border-white/20 px-3 py-1">Glossary: ENABLED</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <aside className="space-y-6 lg:col-span-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
              <h3 className="text-xl font-semibold text-white">Quick Start</h3>
              <p className="text-sm text-white/60">Launch AI-powered meetings in one click.</p>
              <div className="mt-4 space-y-4">
                <button
                  className="flex w-full items-start gap-3 rounded-2xl border border-white/15 bg-white/5 px-4 py-4 text-left text-white/80 transition hover:-translate-y-0.5 hover:border-cyan-400/60 disabled:opacity-50"
                  onClick={handleQuickMeeting}
                  disabled={creatingMeeting}
                >
                  <div className="rounded-2xl bg-gradient-to-br from-cyan-500/40 to-violet-500/40 p-3 text-2xl">⚡️</div>
                  <div>
                    <p className="text-base font-semibold text-white">New meeting</p>
                    <p className="text-sm text-white/60">{creatingMeeting ? 'Launching secure space…' : 'Instant link + AI captions ready'}</p>
                  </div>
                </button>
                <button
                  className="flex w-full items-start gap-3 rounded-2xl border border-white/15 bg-white/5 px-4 py-4 text-left text-white/80 transition hover:-translate-y-0.5 hover:border-cyan-400/60"
                  onClick={() => joinInputRef.current?.focus()}
                >
                  <div className="rounded-2xl bg-gradient-to-br from-emerald-500/30 to-cyan-500/30 p-3 text-2xl">🔗</div>
                  <div>
                    <p className="text-base font-semibold text-white">Join with code</p>
                    <p className="text-sm text-white/60">Paste a link or 9-digit code</p>
                  </div>
                </button>
                <button
                  className="flex w-full items-start gap-3 rounded-2xl border border-white/15 bg-white/5 px-4 py-4 text-left text-white/80 transition hover:-translate-y-0.5 hover:border-cyan-400/60"
                  onClick={() => setError('Calendar sync coming soon — ask admin to enable Scheduling.')}
                >
                  <div className="rounded-2xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 p-3 text-2xl">🗓️</div>
                  <div>
                    <p className="text-base font-semibold text-white">Schedule</p>
                    <p className="text-sm text-white/60">Add agenda + auto-summary</p>
                  </div>
                </button>
              </div>
              <div className="mt-4 rounded-2xl border border-white/10 bg-[#0c1221]/60 p-4 text-sm text-white/70">
                <div className="flex items-center justify-between">
                  <span>Default AI for new meetings</span>
                  <button
                    className={`flex h-6 w-11 items-center rounded-full border border-white/20 px-1 transition ${aiDefault ? 'bg-gradient-to-r from-cyan-400 to-violet-500' : 'bg-white/10'}`}
                    onClick={() => setAiDefault((prev) => !prev)}
                  >
                    <span className={`h-4 w-4 rounded-full bg-white shadow ${aiDefault ? 'translate-x-5' : ''}`} />
                  </button>
                </div>
                <p className="mt-2 text-xs text-white/60">Captions, translation & transcript start automatically.</p>
              </div>
              <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                <label className="text-xs uppercase tracking-[0.3rem] text-white/40">Join code</label>
                <div className="mt-2 flex gap-2">
                  <input
                    ref={joinInputRef}
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 rounded-2xl border border-white/10 bg-transparent px-4 py-2 text-sm text-white placeholder:text-white/40 focus:border-cyan-400 focus:outline-none"
                  />
                  <button
                    className="rounded-2xl border border-cyan-400/50 px-4 py-2 text-sm text-cyan-100 hover:bg-cyan-500/10 disabled:opacity-40"
                    onClick={handleJoinWithCode}
                    disabled={!joinCode}
                  >
                    Join
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3rem] text-white/40">Recent rooms</p>
                  <h3 className="text-xl font-semibold text-white">One click rejoin</h3>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                {recentRooms.map((room) => (
                  <div key={room.title} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <div>
                      <p className="font-semibold text-white">{room.title}</p>
                      <p className="text-xs text-white/60">{room.meta}</p>
                      <div className="mt-2 flex flex-wrap gap-2 text-[0.65rem] text-white/70">
                        <span className="rounded-full border border-white/20 px-2 py-0.5">Transcript saved</span>
                        <span className="rounded-full border border-white/20 px-2 py-0.5">Summary ready</span>
                        <span className="rounded-full border border-white/20 px-2 py-0.5">2 languages</span>
                      </div>
                    </div>
                    <button
                      className="rounded-2xl border border-white/15 px-3 py-2 text-xs text-white/80 hover:border-cyan-400/60"
                      onClick={() => (room as any).code ? router.push(`/room/${(room as any).code}`) : null}
                    >
                      {room.action}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3rem] text-white/40">What NeoxMeet does</p>
              <h3 className="text-2xl font-semibold text-white">Meet once. Understand everyone. Leave with outcomes.</h3>
              <p className="mt-2 max-w-3xl text-sm text-white/70">
                NeoxMeet combines secure video meetings with instant AI translation, live captions, and auto transcripts—then generates minutes,
                decisions, and action items you can share.
              </p>
            </div>
            <div className="flex gap-3">
              <button className="rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-500 px-5 py-3 text-sm font-semibold">Start a meeting</button>
              <button className="rounded-2xl border border-white/20 px-5 py-3 text-sm text-white/80">View a live demo</button>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Instant AI Translation', text: 'Real-time multilingual captions for every participant.' },
              { title: 'Live Transcript (Searchable)', text: 'Every meeting becomes searchable knowledge.' },
              { title: 'Auto Summary + Action Items', text: 'Decisions, owners, deadlines—generated in one click.' },
              { title: 'Enterprise Privacy Controls', text: 'Host policies, redaction, and export rights—built in.' },
            ].map((feature) => (
              <div key={feature.title} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
                <p className="text-base font-semibold text-white">{feature.title}</p>
                <p className="mt-2 text-white/60">{feature.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
          <div className="grid gap-4 text-center sm:grid-cols-3">
            {[
              { label: '+38% faster alignment', detail: 'from fewer repeats' },
              { label: '2.4 hrs/week saved', detail: 'auto minutes + follow-ups' },
              { label: '120+ languages supported', detail: 'auto-detect + glossary' },
            ].map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-white/10 bg-black/30 px-4 py-6">
                <p className="text-2xl font-semibold text-white">{metric.label}</p>
                <p className="text-sm text-white/60">{metric.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50">
          <div className="flex flex-wrap gap-4">
            {['Security', 'Status', 'Docs', 'API', 'Privacy', 'Terms'].map((link) => (
              <span key={link} className="cursor-pointer hover:text-white/80">
                {link}
              </span>
            ))}
          </div>
          <p>© NeoxMeet — AI Meetings with Instant Translation &amp; Transcripts</p>
        </footer>
      </div>
    </div>
  );
}
