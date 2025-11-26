import { GlassCard } from './GlassCard';

const participants = [
  { name: 'Amara Y.', role: 'Product', speaking: true },
  { name: 'Léon G.', role: 'Field Ops', speaking: false },
  { name: 'Sofia R.', role: 'Research', speaking: false },
  { name: 'Kenji P.', role: 'Strategy', speaking: false },
];

const summaryItems = ['Finalize multilingual onboarding deck', 'Pilot with Kinshasa + Kigali teams', 'Confirm glossary with legal'];

const actionItems = ['Share recap to exec workspace', 'Assign owners to device readiness plan', 'Schedule training follow-up'];

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-12" aria-labelledby="hero-title">
      <div className="aurora" aria-hidden="true" />
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold tracking-[0.3em] text-white/70">
            AI-FIRST. ENTERPRISE-READY.
          </p>
          <div className="space-y-4">
            <h1 id="hero-title" className="text-4xl font-semibold leading-tight tracking-[-0.02em] text-white sm:text-5xl lg:text-[56px]">
              Meetings that translate, transcribe, and summarize — live.
            </h1>
            <p className="text-lg text-white/70">
              NeoxMeet turns every call into instant captions, multilingual understanding, and clean post-meeting decisions &amp; action items.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              className="rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-3 text-base font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 transition hover:-translate-y-0.5 hover:shadow-violet-500/30"
              href="/register"
            >
              Book a demo
            </a>
            <a
              className="rounded-full border border-white/20 px-6 py-3 text-base font-semibold text-white/90 transition hover:-translate-y-0.5 hover:text-white"
              href="/dashboard"
            >
              Start a meeting
            </a>
          </div>
          <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.2em] text-white/60">
            {['Low-latency', 'Browser-first', 'Enterprise controls', 'Data residency-ready'].map((chip) => (
              <span key={chip} className="rounded-full border border-white/15 px-3 py-1 text-[0.65rem] text-white/70">
                {chip}
              </span>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-cyan-500/20 via-transparent to-violet-600/20 blur-3xl" aria-hidden="true" />
          <GlassCard className="relative grid gap-6 bg-white/[0.04] lg:grid-cols-[1fr_0.65fr]">
            <div className="space-y-4 rounded-[20px] bg-white/5 p-5">
              <div className="grid gap-3 sm:grid-cols-2">
                {participants.map((person) => (
                  <div
                    key={person.name}
                    className="rounded-2xl border border-white/10 bg-black/30 p-3 text-sm text-white/80 transition hover:-translate-y-0.5"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-white">{person.name}</p>
                        <p className="text-xs text-white/60">{person.role}</p>
                      </div>
                      <span
                        className={person.speaking ? 'text-emerald-300' : 'text-white/40'}
                        aria-label={person.speaking ? 'Currently speaking' : 'Idle'}
                      >
                        ●
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-white/90">
                <div className="mb-3 flex items-center justify-between text-xs text-white/60">
                  <span>Live captions</span>
                  <span className="rounded-full border border-white/15 px-2 py-0.5 text-[0.65rem]">FR ↔ EN</span>
                </div>
                <p className="animate-caption-line text-base text-white/90">
                  “Nous devons finaliser le plan de déploiement et partager la synthèse avec l’équipe Ops avant vendredi.”
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-white/85">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">Transcript (live)</p>
                <div className="mt-3 space-y-2 text-sm">
                  {['10:04 Amina · Need onboarding rollout plan', '10:05 Léon · Assess device readiness', '10:06 Sofia · Risks: bandwidth'].map((line) => (
                    <p key={line} className="rounded-xl bg-white/5 px-3 py-2">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/50 p-4 text-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">Summary draft</p>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-white/80">
                  {summaryItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/60 p-4 text-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">Action items detected</p>
                <ul className="mt-3 space-y-2">
                  {actionItems.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-white/80">
                      <span className="text-emerald-300">✔</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
