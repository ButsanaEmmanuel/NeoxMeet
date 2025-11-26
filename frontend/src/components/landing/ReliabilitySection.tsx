import { GlassCard } from './GlassCard';

const stats = [
  { label: 'Regions live', value: '12', detail: 'Africa, EU, US, APAC' },
  { label: 'QoS monitors', value: '24/7', detail: 'Edge to endpoint telemetry' },
  { label: 'Recording resilience', value: '3x', detail: 'Redundant media paths' },
];

export function ReliabilitySection() {
  return (
    <section className="py-16">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <GlassCard className="space-y-4">
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">Reliability &amp; scale</p>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">Global infrastructure that keeps signals alive.</h2>
          <p className="text-lg text-white/70">
            Observability, proactive rerouting, and health automation mean AI layers stay responsive even when networks don’t.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-white/70">
                <p className="text-2xl font-semibold text-white">{stat.value}</p>
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">{stat.label}</p>
                <p className="mt-1">{stat.detail}</p>
              </div>
            ))}
          </div>
        </GlassCard>
        <GlassCard className="space-y-4">
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">Status snapshot</p>
          <div className="space-y-3 text-sm text-white/80">
            {['Kinshasa core', 'Frankfurt edge', 'Johannesburg media', 'São Paulo relay'].map((region) => (
              <div key={region} className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-4 py-3">
                <span>{region}</span>
                <span className="text-emerald-300">Operational</span>
              </div>
            ))}
          </div>
          <button className="w-full rounded-2xl border border-white/20 px-4 py-3 text-sm font-semibold text-white/80 transition hover:text-white">
            View live status →
          </button>
        </GlassCard>
      </div>
    </section>
  );
}
