import { OutlineCTA, PrimaryCTA } from './CTAs';

const columns = [
  {
    title: 'Produit',
    links: [
      { label: 'Fonctionnalités', href: '#product' },
      { label: 'Traduction en direct', href: '#live-translation' },
      { label: 'Compte-rendu automatique', href: '#recap' },
      { label: 'Enregistrement', href: '#recording' },
      { label: 'Intégrations', href: '#integrations' },
    ],
  },
  {
    title: 'Entreprise',
    links: [
      { label: 'Sécurité', href: '#security' },
      { label: 'Conformité', href: '#compliance' },
      { label: 'Tarifs', href: '#pricing' },
      { label: 'Contact', href: '#contact' },
      { label: 'Carrières', href: '#careers' },
    ],
  },
  {
    title: 'Ressources',
    links: [
      { label: 'Documentation', href: '#docs' },
      { label: "Centre d'aide", href: '#help' },
      { label: 'Statut', href: '#status' },
      { label: 'Blog', href: '#blog' },
      { label: 'Guides', href: '#guides' },
    ],
  },
  {
    title: 'Légal',
    links: [
      { label: 'Conditions', href: '#terms' },
      { label: 'Confidentialité', href: '#privacy' },
      { label: 'Cookies', href: '#cookies' },
      { label: 'DPA', href: '#dpa' },
      { label: 'Mentions légales', href: '#mentions' },
    ],
  },
];

const badges = ['TLS', 'Privacy', 'Enterprise'];

const social = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
        <path d="M5.2 9H2.4v12h2.8V9Zm.3-3.9a1.7 1.7 0 0 0-1.7-1.7C2.7 3.4 2 4.2 2 5a1.7 1.7 0 0 0 1.8 1.7c1 0 1.7-.8 1.7-1.7ZM22 21V14c0-3.6-1.9-5.4-4.4-5.4a3.9 3.9 0 0 0-3.5 1.9h-.1V9h-2.7v12h2.8v-6.4c0-1.7.7-2.9 2.1-2.9 1.2 0 2 .9 2 2.9V21H22Z" />
      </svg>
    ),
  },
  {
    name: 'X',
    href: 'https://www.twitter.com',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
        <path d="M18.8 4h3.1l-6.8 7.8L22 20h-6.2l-3.7-4.8L7.9 20H4.7l7.3-8.4L2 4h6.4l3.3 4.3L15.2 4h3.6l-6.2 7Z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
        <path d="M21.6 7.2s-.2-1.6-.8-2.3c-.7-.8-1.5-.8-1.8-.8C16 4 12 4 12 4h-.1s-4 0-7 .1c-.3 0-1.1 0-1.8.8-.6.7-.8 2.3-.8 2.3S2 9.1 2 11v2c0 1.9.3 3.8.3 3.8s.2 1.6.8 2.3c.7.8 1.7.8 2.1.9 1.5.1 6.8.1 6.8.1s4 0 7-.1c.3 0 1.1 0 1.8-.8.6-.7.8-2.3.8-2.3s.3-1.9.3-3.8v-2c0-1.9-.3-3.8-.3-3.8ZM9.8 14.9v-6l5.2 3-5.2 3Z" />
      </svg>
    ),
  },
];

type FooterProps = {
  onDemoClick?: () => void;
};

export function Footer({ onDemoClick }: FooterProps) {
  return (
    <footer className="border-t border-slate-200 bg-gradient-to-b from-white via-white to-slate-50">
      <div className="mx-auto max-w-[1200px] space-y-12 px-6 py-20 lg:space-y-14">
        <div className="relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/75 p-8 shadow-[0_24px_70px_-40px_rgba(15,23,42,0.38)] backdrop-blur-xl">
          <div
            className="absolute inset-0 -z-10 bg-gradient-to-r from-white via-white to-white"
            aria-hidden
          />
          <div
            className="absolute inset-[-40%] -z-20 opacity-90 blur-3xl"
            aria-hidden
            style={{ background: 'radial-gradient(circle at 20% 20%, rgba(99,102,241,0.18), transparent 40%), radial-gradient(circle at 80% 0%, rgba(6,182,212,0.18), transparent 42%)' }}
          />
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-indigo-500">Multilingue & sécurité</p>
              <h3 className="text-2xl font-semibold leading-tight text-slate-900 lg:text-[26px]">
                Prêt à lancer vos réunions multilingues ?
              </h3>
              <p className="text-sm text-slate-600">Réservez une démo ou démarrez en quelques secondes.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
              <PrimaryCTA
                href={onDemoClick ? undefined : '/register'}
                onClick={onDemoClick}
                className="h-11 w-full px-5 text-[15px] sm:w-auto"
              >
                Réserver une démo
              </PrimaryCTA>
              <OutlineCTA href="/dashboard" className="h-11 w-full px-5 text-[15px] sm:w-auto">
                Lancer une réunion
              </OutlineCTA>
            </div>
          </div>
        </div>

        <div className="space-y-8 lg:space-y-12">
          <div className="space-y-5 lg:hidden">
            <div className="flex items-center gap-3 text-slate-900">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 via-violet-600 to-sky-500 text-lg font-black text-white shadow-lg shadow-indigo-200/70">
                N
              </div>
              <span className="text-xl font-semibold">NeoxMeet</span>
            </div>
            <p className="max-w-md text-sm text-slate-600">
              Réunions sécurisées avec traduction en direct et recap intelligent.
            </p>
            <div className="flex flex-wrap gap-2 text-[12px] font-semibold text-slate-700">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center rounded-full border border-slate-200/80 bg-white/90 px-3 py-1 shadow-sm shadow-indigo-100/50"
                >
                  {badge}
                </span>
              ))}
            </div>
            <p className="text-[13px] font-medium text-slate-600">
              Chiffrement, contrôle d’accès, et journaux d’audit (Enterprise).
            </p>
          </div>

          <div className="hidden gap-12 lg:grid lg:grid-cols-[1.7fr_repeat(4,_1fr)] lg:items-start">
            <div className="space-y-5 pr-6">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 via-violet-600 to-sky-500 text-lg font-black text-white shadow-lg shadow-indigo-200/70">
                  N
                </div>
                <span className="text-xl font-semibold">NeoxMeet</span>
              </div>
              <p className="max-w-md text-sm text-slate-600">
                Réunions sécurisées avec traduction en direct et recap intelligent.
              </p>
              <div className="flex flex-wrap gap-2 text-[12px] font-semibold text-slate-700">
                {badges.map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center rounded-full border border-slate-200/80 bg-white/90 px-3 py-1 shadow-sm shadow-indigo-100/50"
                  >
                    {badge}
                  </span>
                ))}
              </div>
              <p className="text-[13px] font-medium text-slate-600">
                Chiffrement, contrôle d’accès, et journaux d’audit (Enterprise).
              </p>
            </div>
            {columns.map((column) => (
              <div key={column.title} className="space-y-4">
                <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-slate-500 whitespace-nowrap">
                  {column.title}
                </p>
                <ul className="space-y-3 text-sm">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        className="inline-block text-slate-700 transition hover:text-slate-900 hover:underline hover:underline-offset-4"
                        href={link.href}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="divide-y divide-slate-200 rounded-2xl border border-slate-100 bg-white/85 lg:hidden">
            {columns.map((column) => (
              <details key={column.title} className="group">
                <summary className="flex cursor-pointer items-center justify-between px-4 py-4 text-[15px] font-semibold text-slate-800 transition group-open:bg-slate-50">
                  <span className="whitespace-nowrap">{column.title}</span>
                  <span className="text-slate-400">+</span>
                </summary>
                <div className="space-y-2 px-4 pb-4 text-sm text-slate-700">
                  {column.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="block rounded-lg px-2 py-2 transition hover:bg-slate-100/80 hover:text-slate-900"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-200 pt-6 text-[13px] text-slate-500 lg:flex lg:items-center lg:justify-between">
          <p className="font-medium text-slate-600">© 2025 NeoxMeet. Tous droits réservés.</p>
          <div className="mt-3 flex items-center gap-4 lg:mt-0">
            <div className="flex items-center gap-3 text-slate-500">
              {social.slice(0, 2).map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/70 text-slate-600 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 hover:shadow-md hover:shadow-indigo-100"
                  aria-label={item.name}
                >
                  {item.icon}
                </a>
              ))}
            </div>
            <span className="rounded-full border border-slate-200 px-3 py-1 text-[13px] font-semibold text-slate-700">Langue : FR | EN</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
