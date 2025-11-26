export default function Home() {
  const highlights = [
    {
      title: 'Ultrafast media',
      description: 'LiveKit-first architecture keeps latency under 100ms for crystal-clear collaboration.',
    },
    {
      title: 'AI copilots',
      description: 'Real-time transcription, live translation, and intelligent recaps at the edge.',
    },
    {
      title: 'Adaptive spaces',
      description: 'Dynamic rooms with smart layouts, spatial audio, and holographic-inspired lighting.',
    },
  ];

  const features = [
    {
      label: 'Quantum-grade clarity',
      detail: 'Spatial audio, HDR video, and noise elimination tuned for hybrid teams.',
    },
    {
      label: 'Secure by design',
      detail: 'Ephemeral tokens, zero-trust defaults, and compliance-ready observability.',
    },
    {
      label: 'One-link onboarding',
      detail: 'Instant join links, personalized welcome states, and no-download attendance.',
    },
    {
      label: 'Automations',
      detail: 'Trigger workflows from transcripts, reactions, or stage changes with webhooks.',
    },
  ];

  const steps = [
    {
      title: 'Spin up a room',
      copy: 'Launch a new space with LiveKit in seconds—no complex settings required.',
    },
    {
      title: 'Invite your squad',
      copy: 'Share a neon join link and let the AI concierge greet attendees automatically.',
    },
    {
      title: 'Capture everything',
      copy: 'Get transcripts, translations, highlights, and tasks without leaving the flow.',
    },
  ];

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-32 h-96 w-96 rounded-full bg-indigo-500/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.15),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(236,72,153,0.15),transparent_35%),radial-gradient(circle_at_50%_80%,rgba(59,130,246,0.12),transparent_38%)]" />
      </div>

      <section className="relative grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/50 bg-indigo-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-100">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_theme(colors.emerald.400)]" />
            Next-gen presence
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Futuristic meetings built on a LiveKit engine
            </h1>
            <p className="max-w-2xl text-lg text-slate-200">
              NeoxMeet rewires collaboration with luminous UI, spatial audio, and AI copilots that keep every room alive.
              Inspired by the neon precision of next-gen video experiences like Nexa Meet.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <a
              className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 via-blue-500 to-fuchsia-500 px-5 py-3 font-semibold text-white shadow-[0_15px_60px_rgba(99,102,241,0.35)] transition hover:shadow-[0_20px_70px_rgba(236,72,153,0.35)]"
              href="/register"
            >
              Start free
              <span className="text-base transition group-hover:translate-x-0.5">→</span>
            </a>
            <a
              className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-5 py-3 font-semibold text-slate-100 transition hover:border-indigo-400 hover:text-white"
              href="/login"
            >
              Launch console
            </a>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">No downloads · Secure by default</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-4 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur"
              >
                <h3 className="text-sm font-semibold text-indigo-200">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-3xl border border-indigo-500/40 bg-gradient-to-br from-indigo-500/15 via-slate-900/70 to-fuchsia-500/10 blur-xl" />
          <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur">
            <div className="flex items-center justify-between border-b border-slate-800/80 px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_12px_theme(colors.emerald.400)]" />
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Live room</p>
                  <p className="text-sm font-semibold text-indigo-100">Neox Orbit · HQ</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <span className="flex h-8 items-center rounded-full border border-slate-700 px-3">Spatial</span>
                <span className="flex h-8 items-center rounded-full border border-slate-700 px-3">AI Copilot</span>
              </div>
            </div>

            <div className="space-y-4 px-6 py-6">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl border border-slate-800/80 bg-slate-900/70 p-4 shadow-inner">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Latency</p>
                  <p className="text-2xl font-semibold text-emerald-300">&lt; 100 ms</p>
                  <p className="text-xs text-slate-400">LiveKit optimized</p>
                </div>
                <div className="rounded-xl border border-slate-800/80 bg-slate-900/70 p-4 shadow-inner">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">AI stream</p>
                  <p className="text-2xl font-semibold text-indigo-200">Real-time</p>
                  <p className="text-xs text-slate-400">Transcribe · Translate · Summarize</p>
                </div>
              </div>

              <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-slate-900/80 via-indigo-600/20 to-fuchsia-500/20 p-4 text-sm shadow-[0_10px_50px_rgba(99,102,241,0.25)]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-indigo-100">Signal quality</p>
                    <p className="text-lg font-semibold text-white">Quantum-grade</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-emerald-200">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_theme(colors.emerald.400)]" />
                    Synced
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
                  <div className="rounded-lg bg-slate-900/70 px-3 py-2 text-slate-300">Auto layout</div>
                  <div className="rounded-lg bg-slate-900/70 px-3 py-2 text-slate-300">Reactions</div>
                  <div className="rounded-lg bg-slate-900/70 px-3 py-2 text-slate-300">Spatial audio</div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-800/80 bg-slate-900/70 p-4 text-xs text-slate-300">
                <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Live transcript</p>
                <p className="mt-2 text-sm text-indigo-100">“Aligning with the Nova product team. AI copilot is capturing key actions and pushing them to your workspace.”</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mt-16 space-y-10 rounded-3xl border border-slate-800/80 bg-slate-950/60 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur lg:p-10">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div className="max-w-xl space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-indigo-200">Powered by LiveKit</p>
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">Build luminous meeting journeys</h2>
            <p className="text-slate-300">
              From realtime video to AI-enhanced summaries, NeoxMeet channels the futuristic flow of platforms like Nexa Meet while
              keeping your brand and security front and center.
            </p>
          </div>
          <a
            className="inline-flex items-center gap-2 rounded-full border border-indigo-500/60 bg-indigo-500/10 px-5 py-3 text-sm font-semibold text-indigo-100 transition hover:border-fuchsia-400 hover:text-white"
            href="/dashboard"
          >
            Open live dashboard
            <span className="text-base">↗</span>
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.label}
              className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-4 shadow-[0_15px_45px_rgba(0,0,0,0.35)] transition hover:border-indigo-400/60 hover:-translate-y-1"
            >
              <p className="text-sm font-semibold text-white">{feature.label}</p>
              <p className="mt-2 text-sm text-slate-300">{feature.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative mt-16 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-indigo-200">Launch in three steps</p>
          <h3 className="text-3xl font-semibold text-white sm:text-4xl">From invite to insight in minutes</h3>
          <p className="text-slate-300">
            Bring your team into a neon-lit command center. Every interaction is captured, translated, and summarized without breaking flow.
          </p>

          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="flex gap-4 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/60 to-fuchsia-500/60 text-lg font-semibold text-white">
                  {index + 1}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{step.title}</p>
                  <p className="text-sm text-slate-300">{step.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-indigo-500/40 bg-gradient-to-br from-slate-900/70 via-indigo-700/20 to-fuchsia-600/20 p-6 shadow-[0_20px_80px_rgba(99,102,241,0.25)] backdrop-blur">
          <div className="flex items-center justify-between text-xs text-indigo-100">
            <span className="rounded-full border border-indigo-400/60 bg-indigo-500/20 px-3 py-1">Live</span>
            <span className="rounded-full border border-slate-700 px-3 py-1 text-slate-200">Auto-record</span>
          </div>
          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-slate-800/70 bg-slate-950/60 p-4 text-sm text-slate-200">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500">AI Copilot</p>
              <p className="mt-2 text-indigo-100">Live translation enabled · Highlights streaming · Tasks syncing</p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="rounded-xl border border-slate-800/70 bg-slate-900/70 p-3 text-center text-slate-200">
                <p className="text-lg font-semibold text-white">4K</p>
                <p className="text-[11px] text-slate-400">Video ready</p>
              </div>
              <div className="rounded-xl border border-slate-800/70 bg-slate-900/70 p-3 text-center text-slate-200">
                <p className="text-lg font-semibold text-white">12</p>
                <p className="text-[11px] text-slate-400">Active nodes</p>
              </div>
              <div className="rounded-xl border border-slate-800/70 bg-slate-900/70 p-3 text-center text-slate-200">
                <p className="text-lg font-semibold text-white">∞</p>
                <p className="text-[11px] text-slate-400">Room capacity</p>
              </div>
            </div>
            <div className="rounded-2xl border border-indigo-500/40 bg-indigo-500/10 p-4 text-sm text-indigo-100 shadow-[0_15px_60px_rgba(99,102,241,0.3)]">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.25em] text-indigo-200">Neox Pulse</p>
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_theme(colors.emerald.400)]" />
              </div>
              <p className="mt-3 text-white">“This feels like the future of meetings.”</p>
              <p className="text-xs text-indigo-100/70">Adaptive, luminous, and ready for teams that move fast.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
