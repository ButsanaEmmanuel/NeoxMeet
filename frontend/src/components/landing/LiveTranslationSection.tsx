"use client";

import { useState } from 'react';

const points = [
  {
    title: 'Détection automatique de langue',
    text: 'NeoxMeet identifie la langue de chaque intervenant et ajuste la traduction.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 9h14M9 5c0 8 6 8 6 14" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Traduction par participant',
    text: 'Chaque participant choisit sa langue d’affichage, sans impacter les autres.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M5 12h14M12 5v14" strokeLinecap="round" />
        <path d="M8.5 8.5 5 5m10.5 10.5L19 19" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Sous-titres premium',
    text: 'Lisibles, stables, avec un mode discret pour ne pas saturer l’écran.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="4" y="7" width="16" height="10" rx="2" ry="2" />
        <path d="M8 12h3M13 12h3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Transcription + export',
    text: 'Récupérez une transcription horodatée, prête à partager et archiver.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M7 5h7l3 3v11a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
        <path d="M11 12h2M9 16h6" strokeLinecap="round" />
      </svg>
    ),
  },
];

const captionLines = [
  'Je confirme : on valide le budget aujourd’hui.',
  'Décision : signature vendredi à 15 h.',
  'Action : @Nadia envoie le devis après la réunion.',
];

export function LiveTranslationSection() {
  const [direction, setDirection] = useState<'forward' | 'reverse'>('forward');

  const toggleDirection = () => {
    setDirection((prev) => (prev === 'forward' ? 'reverse' : 'forward'));
  };

  return (
    <section
      id="live-translation"
      className="px-6 py-[72px] lg:py-24"
      aria-labelledby="live-translation-title"
    >
      <div className="mx-auto max-w-[1200px] rounded-[28px] border border-transparent bg-white/80 shadow-[0_30px_80px_-48px_rgba(51,65,85,0.25)] backdrop-blur dark:border-white/10 dark:bg-[#04070F]">
        <div className="grid grid-cols-1 gap-8 px-6 lg:grid-cols-12 lg:gap-8">
          <div className="order-1 lg:col-span-5 lg:pt-16">
            <div className="space-y-4">
              <span className="inline-flex h-8 items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-[14px] text-[12px] font-semibold uppercase tracking-[0.06em] text-slate-800 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-slate-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                TRADUCTION EN DIRECT
              </span>
              <h2
                id="live-translation-title"
                className="max-w-[520px] text-[42px] font-extrabold leading-[50px] text-slate-900 dark:text-slate-100"
              >
                Compréhension instantanée, dans la langue de chacun.
              </h2>
              <p className="max-w-[520px] text-[18px] leading-[28px] text-slate-600 dark:text-slate-300">
                Sous-titres synchronisés, traduction en temps réel et transcription complète — sans plugin.
              </p>
            </div>

            <div className="mt-10 space-y-[14px]">
              {points.map((point) => (
                <div key={point.title} className="flex items-start gap-3">
                  <span className="mt-[2px] flex h-8 w-8 items-center justify-center rounded-full border border-slate-200/80 bg-white/80 text-slate-700 shadow-sm shadow-indigo-100 backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-slate-200">
                    {point.icon}
                  </span>
                  <div className="space-y-1.5">
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{point.title}</p>
                    <p className="text-[13px] text-slate-600 dark:text-slate-300">{point.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-4 text-[13px] text-slate-500 dark:text-slate-300">
              Latence perçue minimisée • Captions fluides • Résultats cohérents
            </p>

            <div className="mt-6 space-y-2">
              <div className="hidden lg:block">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/10 dark:text-slate-100 dark:hover:border-indigo-300/30 dark:hover:bg-white/5 dark:focus-visible:ring-indigo-300/40 dark:focus-visible:ring-offset-[#04070F]"
                >
                  Voir un exemple en 20 s →
                </button>
                <p className="text-[13px] text-slate-500 dark:text-slate-300">Aucune carte requise • Démo en 24 h</p>
              </div>
            </div>
          </div>

          <div className="relative order-3 lg:order-2 lg:col-span-7 lg:pt-16">
            <div
              className="pointer-events-none absolute inset-y-[-60px] right-[-40px] hidden w-[620px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.28),transparent_60%)] blur-3xl opacity-70 lg:block"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-y-[-30px] right-6 hidden w-[420px] rounded-full bg-[radial-gradient(circle_at_40%_40%,rgba(34,211,238,0.24),transparent_60%)] blur-[110px] opacity-70 lg:block"
              aria-hidden
            />

            <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white/80 p-[22px] shadow-[0_24px_70px_-38px_rgba(51,65,85,0.4)] backdrop-blur dark:border-white/10 dark:bg-[rgba(12,15,24,0.75)] dark:shadow-black/30">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-slate-600 dark:text-slate-300">EN DIRECT</p>
                    <p className="text-[18px] font-semibold text-slate-900 dark:text-slate-50">Traduction + sous-titres</p>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[13px] font-semibold text-emerald-700 shadow-sm dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />● Actif
                  </span>
                </div>

                <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white/70 px-3 py-3 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 lg:flex-row lg:items-center lg:gap-3">
                  <div className="relative inline-flex items-center">
                    <div className={`flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm transition-all duration-300 dark:border-white/15 dark:bg-[#0C111C] dark:text-slate-100 ${direction === 'forward' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-[6px]'}`}>
                      FR → EN
                    </div>
                    <div className={`absolute inset-0 flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm transition-all duration-300 dark:border-white/15 dark:bg-[#0C111C] dark:text-slate-100 ${direction === 'reverse' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[6px]'}`}>
                      EN → FR
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={toggleDirection}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/15 dark:text-slate-100 dark:hover:border-indigo-300/40 dark:hover:bg-white/10 dark:focus-visible:ring-indigo-300/40 dark:focus-visible:ring-offset-[#04070F]"
                  >
                    Basculer
                    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M4 7h12l-3-3m3 9H4l3 3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/15 dark:text-slate-100 dark:hover:border-indigo-300/40 dark:hover:bg-white/10 dark:focus-visible:ring-indigo-300/40 dark:focus-visible:ring-offset-[#04070F]"
                  >
                    Mode discret
                  </button>
                </div>

                <div className="space-y-3 rounded-[20px] border border-indigo-100/80 bg-gradient-to-b from-indigo-50/70 via-white to-cyan-50/60 p-4 shadow-inner shadow-indigo-100/60 dark:border-white/10 dark:bg-[rgba(11,17,28,0.7)]">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-slate-600 dark:text-slate-300">
                    SOUS-TITRES (TEMPS RÉEL)
                  </p>
                  <div className="space-y-2 text-[14px] text-slate-900 dark:text-slate-100">
                    {captionLines.map((line) => (
                      <div key={line} className="flex items-start gap-3">
                        <span className="mt-1 h-1.5 w-7 rounded-full bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-400" aria-hidden />
                        <p className="leading-[22px]">{line}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[18px] border border-slate-200/70 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
                  <div className="relative overflow-hidden">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-slate-600 dark:text-slate-300">
                      {direction === 'forward' ? 'TRADUCTION AFFICHÉE (EN)' : 'TRADUCTION AFFICHÉE (FR)'}
                    </p>
                    <div className="relative min-h-[52px]">
                      <p
                        className={`absolute inset-0 mt-2 text-[14px] leading-[22px] text-slate-900 transition-all duration-300 dark:text-slate-100 ${direction === 'forward' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[6px]'}`}
                      >
                        Budget validated today. Signature on Friday at 3 p.m. Action: Nadia sends the quote after the meeting.
                      </p>
                      <p
                        className={`absolute inset-0 mt-2 text-[14px] leading-[22px] text-slate-900 transition-all duration-300 dark:text-slate-100 ${direction === 'reverse' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-[6px]'}`}
                      >
                        Budget validé aujourd’hui. Signature vendredi à 15 h. Action : Nadia envoie le devis après la réunion.
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-[12px] text-slate-500 dark:text-slate-300">
                  Qualité : élevée • Détection : automatique • Synchronisation : stable
                </p>

                <div className="flex items-center justify-end gap-3">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/15 dark:text-slate-100 dark:hover:border-indigo-300/40 dark:hover:bg-white/10 dark:focus-visible:ring-indigo-300/40 dark:focus-visible:ring-offset-[#04070F]"
                  >
                    Télécharger
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 via-sky-600 to-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:shadow-indigo-900/60 dark:focus-visible:ring-indigo-300/40 dark:focus-visible:ring-offset-[#04070F]"
                  >
                    Partager
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="order-4 lg:order-3 lg:col-span-5 lg:pt-0">
            <div className="lg:hidden">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/10 dark:text-slate-100 dark:hover:border-indigo-300/30 dark:hover:bg-white/5 dark:focus-visible:ring-indigo-300/40 dark:focus-visible:ring-offset-[#04070F]"
              >
                Voir un exemple en 20 s →
              </button>
              <p className="text-[13px] text-slate-500 dark:text-slate-300">Aucune carte requise • Démo en 24 h</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

