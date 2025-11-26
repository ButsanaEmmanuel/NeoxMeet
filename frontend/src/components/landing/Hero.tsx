import { GlassCard } from './GlassCard';

const participants = [
  { name: 'Amara Y.', role: 'Product', speaking: true },
  { name: 'Léon G.', role: 'Field Ops', speaking: false },
  { name: 'Sofia R.', role: 'Research', speaking: false },
  { name: 'Kenji P.', role: 'Strategy', speaking: false },
];

const transcriptLines = [
  '10:04 Amina · “Onboard new stores, glossary validé.”',
  '10:05 Léon · “@Nadia envoie le devis avant vendredi.”',
  '10:06 Sofia · “Risques : connexion rurale, prévoir backup.”',
];

const summaryPoints = [
  'Sous-titres bilingues + traduction auto dès l’entrée de réunion.',
  'Plan de lancement validé pour équipes Afrique + US.',
  'Compte-rendu prêt à partager dans l’espace exec.',
];

const actionItems = ['@Nadia envoie le devis Enterprise.', 'Antoine prépare la FAQ bilingue.'];

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-12" aria-labelledby="hero-title">
      <div className="aurora" aria-hidden="true" />
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-white/70">
            Réunions sécurisées • IA temps réel • Teams globales
          </p>
          <div className="space-y-4">
            <div className="max-w-2xl space-y-2">
              <span className="inline-flex rounded-full bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100/80">
                IA Meeting Layer
              </span>
              <h1
                id="hero-title"
                className="max-w-2xl text-4xl font-semibold leading-tight tracking-[-0.02em] text-white sm:text-5xl lg:text-[56px]"
              >
                Simple, rapide, prêt à traduire.
              </h1>
            </div>
            <p className="max-w-2xl text-xl leading-8 text-white/75">
              Sous-titres + traduction en direct + compte-rendu automatique. Partagez le lien, NeoxMeet s’occupe du reste.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              className="button-shine flex h-12 items-center rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-500 px-7 text-base font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 transition hover:-translate-y-0.5 hover:shadow-violet-500/30"
              href="/register"
            >
              Démarrer gratuitement
            </a>
            <a
              className="flex h-12 items-center rounded-full border border-white/25 px-6 text-base font-semibold text-white/90 transition hover:-translate-y-0.5 hover:border-white/40 hover:text-white"
              href="/dashboard"
            >
              Essayer dans le navigateur
            </a>
            <a
              className="group inline-flex h-12 items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-white"
              href="#demo"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/90 transition group-hover:border-white/40 group-hover:bg-white/10">
                ▶
              </span>
              Voir une démo 20s
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-sm text-white/60">
            <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em]">
              {['Live Translate', 'Transcript en direct'].map((chip) => (
                <span
                  key={chip}
                  className="animate-float-soft rounded-full border border-white/15 px-3 py-1 text-[0.65rem] text-white/80 shadow-[0_10px_30px_rgba(8,12,24,0.35)] transition hover:-translate-y-1 hover:border-white/30"
                >
                  {chip}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-white/55">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/70">99,9% uptime</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/70">SOC2 en cours</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
            <span className="text-white/70">Déjà utilisé par</span>
            <div className="flex items-center gap-3 opacity-80">
              {['Orbital', 'Innova', 'Talendix', 'Boreal'].map((logo) => (
                <span
                  key={logo}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold tracking-wide text-white/80"
                >
                  {logo}
                </span>
              ))}
            </div>
            <span className="text-white/50">Chiffrement • Rôles & permissions • Journal d’audit (Enterprise)</span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-cyan-500/20 via-transparent to-violet-600/20 blur-3xl" aria-hidden="true" />
          <div className="ai-orb" aria-hidden="true" />
          <GlassCard className="relative grid gap-6 bg-white/[0.04] lg:grid-cols-[1fr_0.65fr]">
            <div className="space-y-4 rounded-[20px] bg-white/5 p-5">
              <div className="flex flex-wrap gap-2 text-[0.75rem] text-white/80">
                <span className="chip-soft">Live Translate</span>
                <span className="chip-soft">Transcript</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {participants.map((person) => (
                  <div
                    key={person.name}
                    className="rounded-2xl border border-white/10 bg-black/30 p-3 text-sm text-white/80 transition hover:-translate-y-0.5 hover:border-white/20"
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
                  <span>Captions en direct</span>
                  <span className="rounded-full border border-white/15 px-2 py-0.5 text-[0.65rem]">FR → EN</span>
                </div>
                <p className="animate-caption-line text-base text-white/90">
                  “On verrouille le devis d’ici jeudi, puis on partage les slides locales avant la mise en production.”
                </p>
                <p className="mt-2 text-sm text-white/70">Switch en 1 clic pour diffuser en anglais aux équipes US.</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-white/85">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/50">
                  <span>Transcript (live)</span>
                  <span className="rounded-full border border-white/15 px-2 py-0.5 text-[0.65rem] text-white/70">Auto-clean</span>
                </div>
                <div className="mt-3 space-y-2 text-sm">
                  {transcriptLines.map((line) => (
                    <p key={line} className="rounded-xl bg-white/5 px-3 py-2">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/50 p-4 text-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">Résumé instantané</p>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-white/80">
                  {summaryPoints.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/60 p-4 text-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">Action items</p>
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
