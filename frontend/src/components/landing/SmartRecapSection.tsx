"use client";

import { useState } from 'react';

const benefits = [
  {
    title: 'Résumé clair en 10 secondes',
    description: 'Un résumé court, compréhensible, prêt à envoyer à l’équipe.',
  },
  {
    title: 'Décisions capturées automatiquement',
    description: 'Les décisions clés ressortent, sans relire toute la transcription.',
  },
  {
    title: 'Actions assignées',
    description: 'Chaque action peut être attribuée à une personne, avec échéance.',
  },
  {
    title: 'Export & partage en un clic',
    description: 'PDF/Doc, lien partageable, et archivage pour audit.',
  },
];

const decisions = [
  'Signer le devis vendredi à 15 h.',
  'Lancer le déploiement pilote lundi.',
];

const actions = [
  { assignee: 'Nadia', text: 'envoyer le devis', badge: 'Aujourd’hui' },
  { assignee: 'Marc', text: 'préparer le planning pilote', badge: 'Lundi' },
  { assignee: 'Équipe', text: 'valider le compte‑rendu', badge: '24 h' },
];

export function SmartRecapSection() {
  const [selectedActions, setSelectedActions] = useState<number[]>([]);

  const toggleAction = (index: number) => {
    setSelectedActions((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section
      id="smart-recap"
      className="relative px-6 py-[72px] lg:py-24"
      aria-labelledby="smart-recap-title"
    >
      <div className="pointer-events-none absolute inset-x-0 top-10 hidden justify-end lg:flex">
        <div className="h-[420px] w-[420px] translate-x-16 rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.22),rgba(14,165,233,0.08),transparent_65%)] blur-3xl" />
      </div>

      <div className="mx-auto max-w-[1200px] rounded-[28px] border border-transparent bg-white/90 shadow-[0_30px_80px_-48px_rgba(51,65,85,0.3)] backdrop-blur dark:border-white/10 dark:bg-[#04070F]">
        <div className="grid grid-cols-1 gap-8 px-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5 lg:pt-12">
            <div className="space-y-4">
              <span className="inline-flex h-8 items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-[14px] text-[12px] font-semibold uppercase tracking-[0.06em] text-slate-800 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-slate-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                RECAP INTELLIGENT
              </span>
              <h2
                id="smart-recap-title"
                className="max-w-[520px] text-[42px] font-extrabold leading-[50px] text-slate-900 dark:text-slate-100"
              >
                Un compte‑rendu propre. Décisions et actions prêtes à exécuter.
              </h2>
              <p className="max-w-[520px] text-[18px] leading-[28px] text-slate-600 dark:text-slate-300">
                Après chaque réunion, NeoxMeet génère un recap structuré, assignable et exportable.
              </p>
            </div>

            <div className="mt-10 space-y-[14px]">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="flex items-start gap-3">
                  <span className="mt-[2px] flex h-8 w-8 items-center justify-center rounded-full border border-slate-200/80 bg-white/80 text-slate-700 shadow-sm shadow-indigo-100 backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-slate-200">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M5 12h14M12 5v14" strokeLinecap="round" />
                    </svg>
                  </span>
                  <div className="space-y-1.5">
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{benefit.title}</p>
                    <p className="text-[13px] text-slate-600 dark:text-slate-300">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-4 text-[13px] text-slate-500 dark:text-slate-300">
              Décisions + actions détectées • Format standardisé • Partage instantané
            </p>

            <div className="mt-6 hidden space-y-1 lg:block">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/10 dark:text-slate-100 dark:hover:border-indigo-300/30 dark:hover:bg-white/5 dark:focus-visible:ring-indigo-300/40 dark:focus-visible:ring-offset-[#04070F]"
              >
                Voir un recap réel en 20 s →
              </button>
              <p className="text-[13px] text-slate-500 dark:text-slate-300">Aucune carte requise • Démo en 24 h</p>
            </div>
          </div>

          <div className="lg:col-span-7 lg:pt-12">
            <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white/85 p-[22px] shadow-[0_24px_70px_-38px_rgba(51,65,85,0.4)] backdrop-blur dark:border-white/10 dark:bg-[rgba(12,15,24,0.7)] dark:shadow-black/30">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-slate-600 dark:text-slate-300">
                      APRÈS RÉUNION
                    </p>
                    <p className="text-[18px] font-semibold text-slate-900 dark:text-slate-50">Compte‑rendu automatique</p>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[13px] font-semibold text-emerald-700 shadow-sm dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />● Prêt
                  </span>
                </div>

                <div className="grid gap-3 rounded-2xl border border-slate-200/80 bg-white/70 p-3 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 lg:grid-cols-3">
                  <div className="rounded-[14px] border border-slate-200/70 bg-white/80 p-3 text-sm shadow-sm dark:border-white/10 dark:bg-white/5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-300">Réunion</p>
                    <p className="mt-1 text-[14px] font-semibold text-slate-900 dark:text-slate-100">Équipe Produit</p>
                  </div>
                  <div className="rounded-[14px] border border-slate-200/70 bg-white/80 p-3 text-sm shadow-sm dark:border-white/10 dark:bg-white/5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-300">Durée</p>
                    <p className="mt-1 text-[14px] font-semibold text-slate-900 dark:text-slate-100">30 min</p>
                  </div>
                  <div className="rounded-[14px] border border-slate-200/70 bg-white/80 p-3 text-sm shadow-sm dark:border-white/10 dark:bg-white/5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-300">Participants</p>
                    <p className="mt-1 text-[14px] font-semibold text-slate-900 dark:text-slate-100">12</p>
                  </div>
                </div>

                <div className="space-y-3 rounded-[18px] border border-slate-200/70 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 shadow-sm dark:bg-indigo-500/10 dark:text-indigo-200">
                      <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <path d="M4 5h9l3 3v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M7 10h6" strokeLinecap="round" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Résumé</p>
                      <p className="mt-1 text-[14px] leading-[22px] text-slate-700 dark:text-slate-200">
                        Démo validée. Budget confirmé. Signature prévue vendredi à 15 h.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 rounded-[18px] border border-slate-200/70 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-50 text-sky-600 shadow-sm dark:bg-sky-500/10 dark:text-sky-200">
                      <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <path d="M4 6h12M4 10h12M4 14h8" strokeLinecap="round" />
                      </svg>
                    </span>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Décisions</p>
                  </div>
                  <div className="space-y-2 text-[14px] text-slate-700 dark:text-slate-200">
                    {decisions.map((decision) => (
                      <div key={decision} className="flex items-start gap-3">
                        <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-slate-700 dark:bg-slate-200" aria-hidden />
                        <p className="leading-[22px]">{decision}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 rounded-[18px] border border-slate-200/70 bg-white/85 p-4 shadow-[0_12px_50px_-30px_rgba(51,65,85,0.55)] backdrop-blur dark:border-white/10 dark:bg-[rgba(22,27,40,0.85)]">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 shadow-sm dark:bg-emerald-500/10 dark:text-emerald-200">
                      <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <path d="M4 5h12l-2 10H6L4 5Z" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M7 9h6" strokeLinecap="round" />
                      </svg>
                    </span>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Actions</p>
                  </div>
                  <div className="space-y-2">
                    {actions.map((action, index) => {
                      const isSelected = selectedActions.includes(index);
                      return (
                        <button
                          key={action.text}
                          type="button"
                          onClick={() => toggleAction(index)}
                          className={`group flex w-full items-center gap-3 rounded-[14px] border border-slate-200/70 bg-white/90 px-3 py-2.5 text-left text-[14px] shadow-sm transition dark:border-white/10 dark:bg-white/5 ${
                            isSelected ?
                              'border-indigo-200 bg-indigo-50/80 shadow-[0_16px_40px_-28px_rgba(79,70,229,0.55)] dark:border-indigo-300/30 dark:bg-indigo-500/10' :
                              'hover:-translate-y-[2px] hover:border-indigo-100 hover:bg-white'
                          }`}
                        >
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/90 text-[13px] font-semibold text-white shadow-sm shadow-indigo-200/60 dark:bg-white/80 dark:text-slate-900">
                            @{action.assignee[0]}
                          </span>
                          <span className="flex-1 text-slate-800 dark:text-slate-100">
                            @{action.assignee} — {action.text}
                          </span>
                          <span className="rounded-full border border-slate-200/70 bg-slate-50 px-3 py-1 text-[12px] font-semibold text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-slate-200">
                            {action.badge}
                          </span>
                          {isSelected && (
                            <span className="text-indigo-600 transition-opacity duration-150 dark:text-indigo-200">
                              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                                <path d="m5 10 3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-end gap-3">
                  <div className="hidden flex-wrap justify-end gap-3 lg:flex">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/15 dark:text-slate-100 dark:hover:border-indigo-300/40 dark:hover:bg-white/10 dark:focus-visible:ring-indigo-300/40 dark:focus-visible:ring-offset-[#04070F]"
                    >
                      Copier le lien
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/15 dark:text-slate-100 dark:hover:border-indigo-300/40 dark:hover:bg-white/10 dark:focus-visible:ring-indigo-300/40 dark:focus-visible:ring-offset-[#04070F]"
                    >
                      Exporter PDF
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/15 dark:text-slate-100 dark:hover:border-indigo-300/40 dark:hover:bg-white/10 dark:focus-visible:ring-indigo-300/40 dark:focus-visible:ring-offset-[#04070F]"
                    >
                      Exporter Doc
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 via-sky-600 to-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:shadow-indigo-900/60 dark:focus-visible:ring-indigo-300/40 dark:focus-visible:ring-offset-[#04070F]"
                    >
                      Partager
                    </button>
                  </div>
                  <div className="grid w-full grid-cols-2 gap-3 lg:hidden">
                    <div className="col-span-2 grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/15 dark:text-slate-100 dark:hover:border-indigo-300/40 dark:hover:bg-white/10 dark:focus-visible:ring-indigo-300/40 dark:focus-visible:ring-offset-[#04070F]"
                      >
                        Copier le lien
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 via-sky-600 to-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:shadow-indigo-900/60 dark:focus-visible:ring-indigo-300/40 dark:focus-visible:ring-offset-[#04070F]"
                      >
                        Partager
                      </button>
                    </div>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/15 dark:text-slate-100 dark:hover:border-indigo-300/40 dark:hover:bg-white/10 dark:focus-visible:ring-indigo-300/40 dark:focus-visible:ring-offset-[#04070F]"
                    >
                      Exporter PDF
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/15 dark:text-slate-100 dark:hover:border-indigo-300/40 dark:hover:bg-white/10 dark:focus-visible:ring-indigo-300/40 dark:focus-visible:ring-offset-[#04070F]"
                    >
                      Exporter Doc
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:hidden">
            <div className="mt-6 space-y-1">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/10 dark:text-slate-100 dark:hover:border-indigo-300/30 dark:hover:bg-white/5 dark:focus-visible:ring-indigo-300/40 dark:focus-visible:ring-offset-[#04070F]"
              >
                Voir un recap réel en 20 s →
              </button>
              <p className="text-[13px] text-slate-500 dark:text-slate-300">Aucune carte requise • Démo en 24 h</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
