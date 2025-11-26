import { Footer } from '../components/landing/Footer';
import { Header } from '../components/landing/Header';

const highlights = [
  {
    title: 'Traduction instantanée',
    description: 'Sous-titres et notes IA prêts en direct.',
  },
  {
    title: 'Uptime 99,9%',
    description: 'Flux stables partout où vos équipes se connectent.',
  },
  {
    title: 'Sécurité native',
    description: 'Chiffrement, SSO et rôles en un clic.',
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
    <div className="bg-white text-slate-900">
      <div className="relative overflow-hidden">
        <Header />

        <main className="mx-auto max-w-5xl space-y-16 px-6 pb-20 pt-10 lg:pt-16">
          <section className="grid items-center gap-10 rounded-[28px] bg-white px-6 py-10 shadow-xl shadow-indigo-100 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-6">
              <p className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
                Réunions sans effort
              </p>
              <div className="space-y-3">
                <h1 className="text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">Simple, rapide, prêt à traduire.</h1>
                <p className="max-w-xl text-lg text-slate-600">Lancez une réunion, invitez, et laissez l’IA prendre les notes.</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-sky-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5"
                  href="/register"
                >
                  Essayer maintenant
                  <ArrowIcon />
                </a>
                <a
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-indigo-200"
                  href="/dashboard"
                >
                  Voir en action
                </a>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-indigo-100 bg-indigo-50/70 p-4 text-sm text-indigo-900">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700">Disponibilité</p>
                  <p className="text-2xl font-semibold">99,9%</p>
                  <p className="text-indigo-800">Flux stables et support 24/7.</p>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-900">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Expérience</p>
                  <p className="text-2xl font-semibold">Ultra simple</p>
                  <p className="text-slate-700">Invitations, enregistrement, notes IA.</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 -z-10 rounded-[32px] bg-gradient-to-br from-indigo-50 via-white to-sky-50" />
              <div className="relative overflow-hidden rounded-[26px] border border-slate-100 bg-white p-6 shadow-lg shadow-indigo-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Réunion</p>
                    <p className="text-lg font-semibold text-slate-900">Equipe Produit</p>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
                    En direct
                  </span>
                </div>

                <div className="mt-6 space-y-3 text-sm text-slate-700">
                  <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">AI</div>
                    <div>
                      <p className="font-semibold text-slate-900">Notes automatiques</p>
                      <p>Décisions et actions listées en temps réel.</p>
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Participants</p>
                      <p className="text-2xl font-semibold text-slate-900">12</p>
                      <p className="text-slate-600">Rejoins en un clic.</p>
                    </div>
                    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Durée</p>
                      <p className="text-2xl font-semibold text-slate-900">30 min</p>
                      <p className="text-slate-600">Synchronisée au calendrier.</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-indigo-100 bg-indigo-50/80 p-4">
                    <div>
                      <p className="text-sm font-semibold text-indigo-900">Inviter</p>
                      <p className="text-xs text-indigo-800">Lien direct sécurisé.</p>
                    </div>
                    <button className="rounded-full bg-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-200 transition hover:-translate-y-0.5">
                      Envoyer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[24px] bg-white p-6 shadow-xl shadow-indigo-100">
            <div className="grid gap-6 lg:grid-cols-[1fr_1fr_1fr]">
              {highlights.map((highlight) => (
                <div key={highlight.title} className="space-y-2 rounded-2xl border border-slate-100 bg-slate-50 p-5 shadow-sm">
                  <p className="text-sm font-semibold text-slate-900">{highlight.title}</p>
                  <p className="text-sm text-slate-600">{highlight.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[24px] bg-white p-6 shadow-xl shadow-indigo-100">
            <div className="grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 text-center shadow-sm">
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
