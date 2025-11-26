import { GlassCard } from './GlassCard';

const features = [
  {
    title: 'Live transcription',
    description: 'Speaker detection, timestamps, and searchable transcripts delivered mid-meeting.',
    sample: ['10:04 Amina — Confirm device readiness plan', '10:05 David — Need bilingual onboarding deck', '10:07 Sofia — Flagged bandwidth risk in rural sites'],
  },
  {
    title: 'Live translation',
    description: 'Low-latency captions with glossary alignment and custom terminology.',
    sample: ['EN → FR', '“Example transcript snippet captured and rendered instantly…”', '“Extrait de transcription traduit en direct…”'],
  },
  {
    title: 'Post-meeting recap',
    description: 'Summaries with decisions, risks, and next steps routed to your systems.',
    sample: ['Decisions: rollout on 15 June', 'Risks: bandwidth + device mix', 'Next steps: final brief to execs'],
  },
];

export function AILayer() {
  return (
    <section id="product" className="py-16">
      <div className="mx-auto max-w-6xl space-y-8 px-6 text-white">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">AI layer</p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Transcribe, translate, recap — without extra tools.</h2>
          <p className="max-w-3xl text-lg text-white/70">
            Every interaction is captured in real time, so hybrid teams understand each other instantly and leave with clear outcomes.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {features.map((feature) => (
            <GlassCard key={feature.title} className="space-y-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-white/50">{feature.title}</p>
                <p className="mt-2 text-lg text-white/90">{feature.description}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-white/80">
                {feature.sample.map((line, idx) => (
                  <p key={idx} className="rounded-xl bg-white/5 px-3 py-2">
                    {line}
                  </p>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
