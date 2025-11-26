import { Footer } from '../components/landing/Footer';
import { Header } from '../components/landing/Header';
import { OutlineCTA, PrimaryCTA, TrustStrip } from '../components/landing/CTAs';
import { HowItWorksSection } from '../components/landing/HowItWorks';

const highlights = [
  {
    label: 'Realtime',
    title: 'Traduction instantanée',
    description: 'Sous-titres et notes IA prêts en direct.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path
          d="M5 4h10l4 4v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4Zm10 0v4h4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M9 13h6M9 9h3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Security',
    title: 'Disponibilité 99,9 %',
    description: 'Flux stables partout où vos équipes se connectent.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 20c4.5-1.8 7.5-5 7.5-10V6l-7.5-3L4.5 6v4c0 5 3 8.2 7.5 10Z" strokeLinejoin="round" />
        <path d="M9.5 12.3 11 14l3.5-4.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Reliability',
    title: 'Sécurité native',
    description: 'Chiffrement, SSO et rôles en un clic.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path
          d="M12 3c-1.5 1.5-3.6 2.5-6 2.5V12c0 3.8 2.6 7.3 6 8.5 3.4-1.2 6-4.7 6-8.5V5.5c-2.4 0-4.5-1-6-2.5Z"
          strokeLinejoin="round"
        />
        <path d="M10 12.5 11.5 14 14 10.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const stats = [
  { label: 'Réunions organisées', value: '17k+' },
  { label: 'Participants', value: '99k+' },
  { label: 'Clients', value: '560' },
];

function ArrowIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M4 10h10m0 0-4-4m4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-slate-50 text-slate-900">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute right-[-10%] top-[-20%] h-[520px] w-[520px] rounded-full bg-gradient-to-br from-indigo-200 via-sky-200 to-cyan-200 blur-3xl opacity-70" />
          <div className="absolute right-24 top-20 h-72 w-72 rounded-full bg-gradient-to-br from-cyan-200/70 via-white to-indigo-100 blur-[90px]" />
          <div className="absolute left-[-8%] top-20 h-60 w-60 rounded-full bg-gradient-to-br from-indigo-100 via-white to-sky-100 blur-[120px]" />
        </div>

        <Header />

        <main className="relative mx-auto max-w-6xl space-y-16 px-6 pb-20 pt-10 lg:pt-16">
          <section className="relative grid items-center gap-12 rounded-[32px] bg-white/80 px-6 py-12 shadow-[0_30px_80px_-40px_rgba(79,70,229,0.35)] backdrop-blur-xl lg:grid-cols-[1.05fr_0.95fr]">
            <div className="pointer-events-none absolute inset-y-0 right-12 hidden w-1/2 rounded-full bg-gradient-to-br from-indigo-100 via-sky-50 to-cyan-100 blur-3xl lg:block" />
            <div className="absolute right-16 top-10 hidden h-12 w-12 rounded-2xl border border-white/50 bg-white/50 shadow-lg shadow-sky-100/80 backdrop-blur-sm lg:block animate-float-soft" />
            <div className="absolute right-32 bottom-16 hidden h-10 w-10 rounded-xl border border-white/60 bg-white/60 shadow-md shadow-indigo-100/80 backdrop-blur-sm lg:block animate-float-soft" style={{ animationDelay: '0.5s' }} />
            <div className="absolute right-20 bottom-36 hidden h-6 w-14 rounded-full border border-white/60 bg-sky-50/70 shadow-sm shadow-cyan-100/60 backdrop-blur-sm lg:block animate-float-soft" style={{ animationDelay: '1s' }} />

            <div className="relative space-y-7">
              <p className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/80 px-4 py-2 text-[13px] font-semibold text-slate-700 shadow-sm shadow-sky-100/70 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
                Réunions sécurisées • IA temps réel • Teams globales
              </p>
              <div className="space-y-3">
                <h1 className="text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl">
                  Simple, rapide, prêt à{' '}
                  <span className="bg-gradient-to-r from-indigo-600 via-sky-500 to-cyan-400 bg-clip-text text-transparent">traduire</span>.
                </h1>
                <p className="max-w-2xl text-lg text-slate-600">
                  Sous-titres instantanés, traduction en direct et compte-rendu automatique — sans plugin.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <PrimaryCTA href="/register">
                  Réserver une démo
                  <ArrowIcon />
                </PrimaryCTA>
                <OutlineCTA href="/dashboard" className="gap-2 text-sm">
                  Lancer une réunion
                </OutlineCTA>
              </div>
            <a
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800 transition hover:text-indigo-700"
              href="/demo"
            >
              Voir une démo 20 s
              <ArrowIcon />
            </a>
              <p className="text-[13px] font-medium text-slate-500">Aucune carte requise • Démo en 24 h</p>
              <TrustStrip />
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="relative overflow-hidden rounded-2xl border border-indigo-100/80 bg-gradient-to-br from-indigo-50 via-white to-sky-50 p-5 text-sm text-indigo-900 shadow-sm shadow-indigo-100">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.18),transparent_45%)]" aria-hidden />
                  <div className="relative space-y-1">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-600">Fiabilité</p>
                    <p className="text-2xl font-semibold">SLA premium</p>
                    <p className="text-indigo-800">99,9 % garanti • Support 24/7</p>
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white/80 p-5 text-sm text-slate-900 shadow-sm shadow-indigo-100 backdrop-blur">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(6,182,212,0.16),transparent_45%)]" aria-hidden />
                  <div className="relative space-y-1">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Expérience</p>
                    <p className="text-2xl font-semibold">Ultra simple</p>
                    <p className="text-slate-700">Invitations, enregistrement, notes IA.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-x-8 top-6 -z-10 h-72 rounded-full bg-gradient-to-r from-indigo-200 via-white to-cyan-200 blur-3xl opacity-80" aria-hidden />
              <div className="absolute -left-10 top-10 hidden h-24 w-24 rounded-full bg-gradient-to-br from-indigo-400/40 via-sky-300/30 to-cyan-200/30 blur-2xl lg:block animate-pulse-halo" aria-hidden />
              <div className="absolute -right-6 -top-6 hidden h-28 w-28 rounded-full bg-gradient-to-br from-cyan-200/40 via-white to-indigo-300/30 blur-2xl lg:block animate-pulse-halo" aria-hidden />

              <div className="relative overflow-hidden rounded-[28px] border border-white/70 bg-gradient-to-br from-white/90 via-white to-slate-50/90 p-6 shadow-[0_30px_80px_-48px_rgba(51,65,85,0.4)] backdrop-blur-xl">
                <div className="absolute inset-px rounded-[24px] border border-white/60 bg-gradient-to-b from-white/70 via-white/40 to-white/10" aria-hidden />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Réunion</p>
                      <p className="text-lg font-semibold text-slate-900">Equipe Produit</p>
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-50 to-cyan-50 px-3 py-1 text-xs font-semibold text-indigo-700 shadow-sm">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
                      En direct
                    </span>
                  </div>

                  <div className="mt-6 space-y-4 text-sm text-slate-700">
                    <div className="relative overflow-hidden rounded-2xl border border-slate-100/80 bg-slate-50/70 p-4 shadow-sm backdrop-blur">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(59,130,246,0.12),transparent_55%)]" aria-hidden />
                        <div className="relative flex items-start gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-sky-100 text-xs font-semibold text-indigo-700 shadow-sm">AI</div>
                          <div>
                            <p className="font-semibold text-slate-900">Notes automatiques</p>
                            <p>Décisions et actions listées en temps réel.</p>
                          </div>
                          <span className="ml-auto rounded-full border border-cyan-200/70 bg-cyan-50 px-3 py-1 text-[11px] font-semibold text-cyan-700 shadow-sm">
                            Traduction en direct • Transcription
                          </span>
                        </div>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="overflow-hidden rounded-2xl border border-slate-100/70 bg-white/80 p-4 shadow-sm backdrop-blur">
                        <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Participants</p>
                        <div className="mt-1 flex items-center justify-between">
                          <p className="text-2xl font-semibold text-slate-900">12</p>
                          <span className="rounded-full bg-gradient-to-r from-indigo-500/10 via-sky-400/10 to-cyan-300/10 px-3 py-1 text-[11px] font-semibold text-indigo-700">+3 invités</span>
                        </div>
                        <p className="text-slate-600">Rejoins en un clic.</p>
                      </div>
                        <div className="overflow-hidden rounded-2xl border border-slate-100/70 bg-white/80 p-4 shadow-sm backdrop-blur">
                          <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Durée</p>
                          <div className="mt-1 flex items-center justify-between">
                            <p className="text-2xl font-semibold text-slate-900">30 min</p>
                            <span className="rounded-full bg-gradient-to-r from-emerald-500/10 via-sky-400/10 to-cyan-300/10 px-3 py-1 text-[11px] font-semibold text-emerald-700">Sync calendrier</span>
                          </div>
                          <p className="text-slate-600">Synchronisée au calendrier.</p>
                        </div>
                      </div>
                      <div className="overflow-hidden rounded-2xl border border-indigo-100/80 bg-gradient-to-r from-indigo-50 via-sky-50 to-cyan-50 p-4 shadow-sm">
                        <div className="flex flex-wrap items-center gap-2">
                            <div className="flex items-center gap-2 rounded-full bg-slate-900 px-3 py-2 text-[11px] font-semibold text-cyan-300 shadow-sm">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden />
                              Traduction en direct
                            </div>
                          <span className="rounded-full border border-slate-200/70 bg-white/80 px-3 py-2 text-[11px] font-semibold text-slate-800 shadow-sm">
                            Transcription
                          </span>
                          <button
                            className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/70 px-3 py-2 text-[11px] font-semibold text-slate-700 shadow-[0_12px_36px_-22px_rgba(15,23,42,0.4)] transition hover:-translate-y-0.5 hover:border-indigo-100 hover:bg-white/90 hover:shadow-[0_20px_40px_-24px_rgba(79,70,229,0.3)] focus:outline-none focus:ring-2 focus:ring-indigo-100"
                            type="button"
                          >
                            Basculer
                          </button>
                        </div>
                        <p className="mt-3 text-[12px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                          Sous-titres + traduction
                        </p>
                        <div className="mt-2 space-y-2 text-xs text-slate-700">
                          <div className="flex items-center gap-2">
                            <span className="h-1.5 w-10 rounded-full bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-300 shadow-sm" aria-hidden />
                            <p className="animate-caption-line">Décision : signature vendredi</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="h-1.5 w-8 rounded-full bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-400 shadow-sm" aria-hidden />
                            <p className="animate-caption-line" style={{ animationDelay: '2s' }}>
                              Action : @Nadia envoie le devis
                            </p>
                          </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white/80 p-4 shadow-sm backdrop-blur">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Inviter</p>
                        <p className="text-xs text-slate-600">Lien direct sécurisé.</p>
                      </div>
                      <button className="button-shine rounded-full bg-gradient-to-r from-indigo-600 via-sky-600 to-cyan-500 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-200 transition hover:-translate-y-0.5">
                        Envoyer
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-10 top-10 hidden w-36 rounded-2xl border border-white/60 bg-white/70 p-4 shadow-xl shadow-indigo-100 backdrop-blur lg:block">
                <div className="relative flex items-center gap-3">
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 via-white to-cyan-100 shadow-inner shadow-sky-100">
                    <div className="absolute inset-1 rounded-full bg-gradient-to-br from-indigo-500/20 via-sky-400/20 to-cyan-300/20 blur-sm" aria-hidden />
                    <div className="relative h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 via-sky-400 to-cyan-300 shadow-lg shadow-indigo-200/60" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Noyau IA</p>
                    <p className="text-sm font-semibold text-slate-900">Voix, texte, actions.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[24px] bg-white/85 p-6 shadow-[0_30px_80px_-48px_rgba(51,65,85,0.35)] backdrop-blur-lg">
            <div className="grid gap-6 lg:grid-cols-[1fr_1fr_1fr]">
              {highlights.map((highlight) => (
                <div
                  key={highlight.title}
                  className="relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white/80 p-5 shadow-[0_20px_60px_-48px_rgba(51,65,85,0.4)] backdrop-blur"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-50/70 via-white/30 to-cyan-50/70 opacity-80" aria-hidden />
                  <div className="absolute right-4 top-4 h-10 w-10 rounded-full bg-gradient-to-br from-indigo-200/80 via-white to-cyan-200/60 blur-xl" aria-hidden />
                  <div className="relative space-y-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-600">{highlight.label}</p>
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-100/80 bg-white/80 text-indigo-600 shadow-sm shadow-indigo-100">
                        {highlight.icon}
                      </span>
                      <p className="text-base font-semibold text-slate-900">{highlight.title}</p>
                    </div>
                    <p className="text-sm text-slate-600">{highlight.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <HowItWorksSection />

          <section className="rounded-[24px] bg-white/85 p-6 shadow-[0_30px_80px_-48px_rgba(51,65,85,0.35)] backdrop-blur-lg">
            <div className="grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-slate-200/70 bg-white/80 px-5 py-4 text-center shadow-sm shadow-indigo-100 backdrop-blur"
                >
                  <p className="text-2xl font-semibold text-slate-900">{stat.value}</p>
                  <p className="text-sm text-slate-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}
