import { Footer } from '../components/landing/Footer';
import { Header } from '../components/landing/Header';

const features = [
  {
    title: 'Interprétation en temps réel',
    description: 'Traductions instantanées et sous-titres multilingues pour des réunions vraiment inclusives.',
    badge: 'IA linguistique',
  },
  {
    title: 'Fiabilité niveau entreprise',
    description: 'Infrastructure cloud distribuée, surveillance 24/7 et reprise automatique pour chaque session.',
    badge: 'SLA 99.9%',
  },
  {
    title: 'Sécurité certifiée',
    description: 'Chiffrement de bout en bout, conformité RGPD et contrôles d’accès granulaires prêts pour l’audit.',
    badge: 'Conformité',
  },
];

const highlights = [
  {
    title: 'Suivi en direct du sentiment',
    description: 'Mesurez l’attention et l’engagement de vos participants avec des indicateurs temps réel.',
  },
  {
    title: 'Recaps exploitables',
    description: 'Notes automatiques, actions détectées et envoi dans vos outils métiers dès la fin de la réunion.',
  },
  {
    title: 'Intégration instantanée',
    description: 'Fonctionne avec vos calendriers et vos workflows existants sans effort côté IT.',
  },
];

const stats = [
  { label: 'Réunions organisées', value: '17k+' },
  { label: 'Disponibilité', value: '99.9%' },
  { label: 'Participants servis', value: '99k+' },
  { label: 'Clients actifs', value: '560' },
];

const testimonials = [
  {
    quote:
      'Nous pouvons enfin réunir nos équipes réparties sur trois continents sans compromis sur la qualité ni la sécurité.',
    author: 'Sarah Mulume',
    role: 'Dir. des Opérations, Trace Energy',
  },
  {
    quote: 'Les notes générées par l’IA nous font gagner plusieurs heures par semaine et évitent les oublis critiques.',
    author: 'Hugo Martin',
    role: 'Head of Product, Luma',
  },
];

const updates = [
  {
    title: 'Table ronde — Clients publics',
    meta: 'Kinshasa • 28 mars',
  },
  {
    title: 'Nouveau connecteur CRM',
    meta: 'Disponible maintenant',
  },
  {
    title: 'Guide de sécurité 2025',
    meta: 'Livre blanc à télécharger',
  },
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
    <div className="bg-slate-50 text-slate-900">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[-10%] top-[-10%] h-80 w-80 rounded-full bg-indigo-100 blur-3xl" />
          <div className="absolute right-[-10%] top-10 h-96 w-96 rounded-full bg-sky-100 blur-3xl" />
          <div className="absolute bottom-[-20%] left-20 h-96 w-96 rounded-full bg-indigo-50 blur-3xl" />
        </div>

        <Header />

        <main className="mx-auto max-w-6xl space-y-24 px-6 pb-24 pt-10 lg:pt-14">
          <section id="product" className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-6">
              <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-indigo-700 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-green-500" aria-hidden />
                Plateforme de réunions cloud-native
              </p>
              <div className="space-y-4">
                <h1 className="text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
                  La collaboration vidéo conçue pour les équipes exigeantes.
                </h1>
                <p className="max-w-xl text-lg text-slate-600">
                  NeoxMeet combine traduction instantanée, sécurité vérifiée et fiabilité globale pour des réunions fluides, où que se trouvent vos équipes.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-sky-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5"
                  href="/register"
                >
                  Commencer gratuitement
                  <ArrowIcon />
                </a>
                <a
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-indigo-200"
                  href="/dashboard"
                >
                  Lancer une réunion
                </a>
                <p className="text-sm text-slate-500">Sans carte bancaire • Essai complet 14 jours</p>
              </div>
              <div className="flex flex-wrap gap-4 rounded-2xl bg-white/70 p-4 shadow-lg shadow-indigo-100">
                {highlights.map((item) => (
                  <div key={item.title} className="flex flex-1 min-w-[220px] items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-indigo-500" aria-hidden />
                    <div>
                      <p className="font-semibold text-slate-900">{item.title}</p>
                      <p className="text-sm text-slate-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-indigo-500/20 via-white to-sky-500/10 blur-3xl" />
              <div className="rounded-[28px] border border-slate-100 bg-white p-6 shadow-2xl shadow-indigo-100">
                <div className="flex items-center justify-between rounded-2xl bg-slate-900 px-4 py-3 text-white">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/60">Réunion en cours</p>
                    <p className="text-lg font-semibold">Equipe Produit — Sprint 14</p>
                  </div>
                  <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white">En direct</span>
                </div>
                <div className="mt-4 space-y-4 rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-center justify-between rounded-xl bg-white p-3 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">FR</div>
                      <div>
                        <p className="font-semibold text-slate-900">Français ↔ Anglais</p>
                        <p className="text-sm text-slate-500">Traduction et sous-titres activés</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">Synchronisé</span>
                  </div>
                  <div className="rounded-xl bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-900">Recap IA</p>
                      <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">Live</span>
                    </div>
                    <ul className="mt-3 space-y-2 text-sm text-slate-600">
                      <li>• Décision : déployer la V2 mobile sur le marché pilote.</li>
                      <li>• Risque : compatibilité réseau terrain à surveiller.</li>
                      <li>• Actions : plan de communication interne avant jeudi.</li>
                    </ul>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-xl bg-white p-3 shadow-sm">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Participants</p>
                      <p className="text-2xl font-semibold text-slate-900">18</p>
                      <p className="text-slate-500">en simultané</p>
                    </div>
                    <div className="rounded-xl bg-white p-3 shadow-sm">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Temps restant</p>
                      <p className="text-2xl font-semibold text-slate-900">32 min</p>
                      <p className="text-slate-500">synchronisé calendrier</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[28px] bg-white/80 p-6 shadow-xl shadow-indigo-100">
            <div className="grid gap-6 lg:grid-cols-4">
              <div className="col-span-2 space-y-3">
                <p className="text-xs uppercase tracking-[0.25em] text-indigo-600">Expérience maîtrisée</p>
                <h2 className="text-2xl font-semibold text-slate-900">Tout ce dont vous avez besoin pour des réunions immersives.</h2>
                <p className="text-slate-600">Des flux haute définition, une latence faible et des contrôles d’administration complets pour vos équipes support et sécurité.</p>
              </div>
              {features.map((feature) => (
                <div key={feature.title} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-lg shadow-indigo-50">
                  <span className="mb-3 inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                    {feature.badge}
                  </span>
                  <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="reliability" className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative order-2 overflow-hidden rounded-[28px] border border-slate-100 bg-gradient-to-br from-indigo-600 to-sky-500 p-6 text-white shadow-2xl shadow-indigo-200 lg:order-1">
              <div className="space-y-4 rounded-2xl bg-white/10 p-5 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.25em] text-white/80">Observabilité live</p>
                <h3 className="text-2xl font-semibold">Statut temps réel par région</h3>
                <div className="space-y-3">
                  {['Europe', 'Afrique', 'Amériques'].map((region) => (
                    <div key={region} className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-3">
                      <span className="font-semibold">{region}</span>
                      <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100/20 px-3 py-1 text-sm font-semibold text-white">
                        <span className="h-2 w-2 rounded-full bg-emerald-300" aria-hidden />
                        Opérationnel
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-white/80">Monitoring 24/7, alertes proactives et plan de reprise certifié.</p>
              </div>
            </div>
            <div className="order-1 space-y-4 lg:order-2">
              <p className="text-xs uppercase tracking-[0.25em] text-indigo-600">Fiabilité</p>
              <h2 className="text-3xl font-semibold text-slate-900">Une plateforme prête pour vos déploiements critiques.</h2>
              <p className="text-lg text-slate-600">Support multi-cloud, résilience régionale et optimisation réseau garantissent des réunions stables, même sur des connexions limitées.</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                  <p className="text-sm font-semibold text-slate-900">Monitoring proactif</p>
                  <p className="text-sm text-slate-600">Alertes intelligentes et autoscaling pendant les pics d’audience.</p>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                  <p className="text-sm font-semibold text-slate-900">Intégration IT facile</p>
                  <p className="text-sm text-slate-600">API ouvertes et webhooks pour vos outils internes et externes.</p>
                </div>
              </div>
            </div>
          </section>

          <section id="security" className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.25em] text-indigo-600">Sécurité</p>
              <h2 className="text-3xl font-semibold text-slate-900">Sécurisé par conception, validé par les entreprises.</h2>
              <p className="text-lg text-slate-600">Chiffrement bout en bout, conformité RGPD et gouvernance des données pour les organisations les plus exigeantes.</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                  <p className="text-sm font-semibold text-slate-900">Contrôles d’accès</p>
                  <p className="text-sm text-slate-600">SSO, MFA et rôles granulaires pour vos équipes.</p>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                  <p className="text-sm font-semibold text-slate-900">Protection des données</p>
                  <p className="text-sm text-slate-600">Données hébergées localement selon vos exigences régionales.</p>
                </div>
              </div>
            </div>
            <div className="rounded-[28px] border border-slate-100 bg-white p-6 shadow-xl shadow-indigo-100">
              <div className="rounded-2xl bg-slate-900 p-5 text-white shadow-lg">
                <p className="text-xs uppercase tracking-[0.25em] text-white/70">Audit</p>
                <h3 className="text-xl font-semibold">Journal des événements</h3>
                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                    <span>Connexion SSO</span>
                    <span className="text-white/70">Succès • 10:04</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                    <span>Export des notes IA</span>
                    <span className="text-white/70">Validé • 10:16</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                    <span>Mise à jour des rôles</span>
                    <span className="text-white/70">En cours • 10:20</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm font-semibold text-slate-900">RGPD & Confidentialité renforcée</div>
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm font-semibold text-slate-900">Auditabilité complète</div>
              </div>
            </div>
          </section>

          <section className="grid gap-10 rounded-[28px] bg-white/80 p-6 shadow-xl shadow-indigo-100 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-1">
              <p className="text-xs uppercase tracking-[0.25em] text-indigo-600">Ils nous font confiance</p>
              <h2 className="text-2xl font-semibold text-slate-900">Témoignages</h2>
              <p className="text-slate-600">Des équipes internationales, des services publics et des scale-ups choisissent NeoxMeet pour leurs échanges sensibles.</p>
            </div>
            <div className="lg:col-span-2 grid gap-4 sm:grid-cols-2">
              {testimonials.map((testimonial) => (
                <blockquote key={testimonial.author} className="flex h-full flex-col justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-lg shadow-indigo-50">
                  <p className="text-slate-700">“{testimonial.quote}”</p>
                  <footer className="mt-4 text-sm font-semibold text-slate-900">
                    {testimonial.author}
                    <span className="block text-xs font-normal text-slate-500">{testimonial.role}</span>
                  </footer>
                </blockquote>
              ))}
            </div>
          </section>

          <section id="pricing" className="grid gap-8 lg:grid-cols-[1fr_1fr_1fr]">
            <div className="lg:col-span-2 space-y-3">
              <p className="text-xs uppercase tracking-[0.25em] text-indigo-600">Investissement maîtrisé</p>
              <h2 className="text-3xl font-semibold text-slate-900">Des plans adaptés à vos équipes locales ou globales.</h2>
              <p className="text-lg text-slate-600">Commencez gratuitement, puis faites évoluer vos capacités vidéo, vos intégrations et vos besoins de sécurité selon vos projets.</p>
              <div className="flex flex-wrap gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-sm">
                    <p className="text-2xl font-semibold text-slate-900">{stat.value}</p>
                    <p className="text-sm text-slate-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[28px] border border-slate-100 bg-white p-6 shadow-xl shadow-indigo-100">
              <p className="text-xs uppercase tracking-[0.25em] text-indigo-600">Plan conseillé</p>
              <h3 className="text-2xl font-semibold text-slate-900">Entreprise</h3>
              <p className="mt-2 text-slate-600">Support prioritaire, conformité renforcée et SLA contractuel.</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>• Environnements dédiés et data residency</li>
                <li>• Connecteurs personnalisés (SSO, ITSM, CRM)</li>
                <li>• Accompagnement déploiement et adoption</li>
              </ul>
              <a
                href="/register"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-sky-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5"
              >
                Parler à un expert
                <ArrowIcon />
              </a>
            </div>
          </section>

          <section id="contact" className="grid gap-8 rounded-[28px] bg-white/90 p-6 shadow-xl shadow-indigo-100 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.25em] text-indigo-600">Actualités</p>
              <h2 className="text-2xl font-semibold text-slate-900">Événements & mises à jour</h2>
              <p className="text-slate-600">Restez informé des nouvelles fonctionnalités, webinaires et guides pour faire progresser vos équipes.</p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {updates.map((update) => (
                  <div key={update.title} className="rounded-xl border border-slate-100 bg-white p-4 text-sm font-semibold text-slate-900 shadow-sm">
                    {update.title}
                    <span className="mt-1 block text-xs font-normal text-slate-500">{update.meta}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[24px] border border-slate-100 bg-gradient-to-br from-indigo-600 to-sky-500 p-6 text-white shadow-2xl shadow-indigo-200">
              <p className="text-xs uppercase tracking-[0.25em] text-white/70">Prêt à commencer ?</p>
              <h3 className="mt-2 text-2xl font-semibold">Planifiez une démonstration personnalisée</h3>
              <p className="mt-2 text-sm text-white/80">Montrez-nous vos cas d’usage : nous configurons un parcours dédié avec vos outils et vos équipes.</p>
              <a
                href="/register"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-indigo-700 shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5"
              >
                Réserver une session
                <ArrowIcon />
              </a>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}
