import { GlassCard } from './GlassCard';

export function WhiteLabelSection() {
  return (
    <section className="py-16" id="solutions">
      <div className="mx-auto max-w-6xl space-y-8 px-6 text-white">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.4em] text-white/50">White-label &amp; branding</p>
            <h2 className="text-3xl font-semibold sm:text-4xl">Your logo, your domain, your experience.</h2>
            <p className="text-lg text-white/70">
              Customize every touchpoint—join links, live UI, recap emails, and admin portal—without another vendor in the way.
            </p>
            <ul className="space-y-2 text-base text-white/75">
              <li>• Custom domains + certificates</li>
              <li>• Theme designer with light/dark presets</li>
              <li>• Per-organization email + recap templates</li>
              <li>• Embeddable widgets with your brand colors</li>
            </ul>
          </div>
          <GlassCard className="space-y-4">
            <div className="rounded-2xl border border-white/15 bg-black/30 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Branding settings</p>
              <div className="mt-4 space-y-3 text-sm text-white/80">
                <div className="flex items-center justify-between">
                  <span>Primary color</span>
                  <span className="h-8 w-8 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span>Accent</span>
                  <span className="h-8 w-20 rounded-full bg-white/20" />
                </div>
                <div>
                  <p className="text-xs text-white/50">Email template preview</p>
                  <div className="mt-2 rounded-xl border border-white/10 bg-white/5 p-3 text-xs leading-relaxed text-white/70">
                    <p className="font-semibold text-white">Weekly Sync Recap</p>
                    <p>Summary, decisions, action items, attachments.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-black/30 p-4 text-sm text-white/70">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Custom domains</p>
              <p className="mt-2">meet.yourorg.africa ✓</p>
              <p>rooms.partner.gov ✓</p>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
