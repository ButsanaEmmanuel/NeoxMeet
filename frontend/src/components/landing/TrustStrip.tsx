const logos = ['Enabel', 'KivuLabs', 'AtlasInfra', 'OrbitTel', 'FuturaBank', 'LionHealth'];

export function TrustStrip() {
  return (
    <section className="py-12" aria-label="Trusted customers">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6">
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-white/70">
          <div className="text-white/80">Trusted by global teams where clarity and security matter.</div>
          <div className="flex flex-wrap gap-3 text-xs">
            {['98% uptime SLA', '120+ languages', '2.4 hrs saved / week'].map((metric) => (
              <span key={metric} className="rounded-full border border-white/15 px-3 py-1 text-white/70">
                {metric}
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 text-center text-white/50 sm:grid-cols-3 lg:grid-cols-6">
          {logos.map((logo) => (
            <div key={logo} className="rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-sm uppercase tracking-[0.2em]">
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
