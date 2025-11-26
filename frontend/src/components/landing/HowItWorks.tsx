"use client";

import { useEffect, useMemo, useRef, useState } from 'react';

const steps = [
  {
    id: 1,
    number: '01',
    title: 'Créez un lien sécurisé',
    description: 'Un clic, un lien. Invitez vos participants — sans installation.',
    tags: ['Lien chiffré', 'Accès invité', 'Mot de passe'],
  },
  {
    id: 2,
    number: '02',
    title: 'Traduction en direct + sous-titres',
    description: 'Chaque participant comprend dans sa langue, en temps réel.',
    tags: ['Traduction en direct', 'Transcription', 'Détection de langue'],
  },
  {
    id: 3,
    number: '03',
    title: 'Recap automatique',
    description: 'Décisions, actions et résumé prêts à partager.',
    tags: ['Actions assignées', 'Résumé', 'Export PDF/Doc'],
  },
];

type TransitionState = 'idle' | 'fading-out' | 'fading-in' | 'settling';

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [displayedStep, setDisplayedStep] = useState<number>(1);
  const [transitionState, setTransitionState] = useState<TransitionState>('idle');
  const [showToast, setShowToast] = useState(false);
  const [toastTimer, setToastTimer] = useState<NodeJS.Timeout | null>(null);
  const transitionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const enterTimerRef = useRef<NodeJS.Timeout | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => () => toastTimer && clearTimeout(toastTimer), [toastTimer]);

  const filledHeight = useMemo(() => {
    const index = steps.findIndex((step) => step.id === activeStep);
    if (index <= 0) return '0%';
    const segments = steps.length - 1;
    return `${(index / segments) * 100}%`;
  }, [activeStep]);

  const handleCopy = () => {
    if (toastTimer) clearTimeout(toastTimer);
    void navigator.clipboard?.writeText('https://neoxmeet.com/r/equipe-produit');
    const timer = setTimeout(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2200);
    }, 900);
    setToastTimer(timer);
  };

  const handleStepChange = (stepId: number) => {
    if (stepId === activeStep) return;

    setActiveStep(stepId);
    setTransitionState('fading-out');

    if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    if (enterTimerRef.current) clearTimeout(enterTimerRef.current);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    transitionTimerRef.current = setTimeout(() => {
      setDisplayedStep(stepId);
      setTransitionState('fading-in');

      rafRef.current = requestAnimationFrame(() => setTransitionState('settling'));
      enterTimerRef.current = setTimeout(() => setTransitionState('idle'), 200);
    }, 120);
  };

  useEffect(
    () => () => {
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
      if (enterTimerRef.current) clearTimeout(enterTimerRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  const isActive = (stepId: number) => activeStep === stepId;

  const previewStateClass = transitionState === 'fading-out'
    ? 'opacity-0'
    : transitionState === 'fading-in'
      ? 'opacity-0 translate-y-[6px]'
      : 'opacity-100 translate-y-0';

  return (
    <section
      id="how-it-works"
      className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[28px] bg-white px-6 py-[72px] shadow-[0_30px_80px_-48px_rgba(51,65,85,0.25)] transition dark:bg-[#070A12] lg:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
        style={{
          background:
            'radial-gradient(600px 420px at 70% 35%, rgba(99,102,241,0.12), transparent 60%), radial-gradient(520px 380px at 35% 70%, rgba(34,211,238,0.10), transparent 60%), #ffffff',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 -z-20 hidden dark:block"
        aria-hidden
        style={{
          background:
            'radial-gradient(600px 420px at 70% 35%, rgba(99,102,241,0.22), transparent 60%), radial-gradient(520px 380px at 35% 70%, rgba(34,211,238,0.16), transparent 60%), #070A12',
        }}
      />

      <div className="grid gap-[18px] lg:grid-cols-12 lg:gap-8">
        <div className="space-y-4 lg:col-span-12">
          <span className="inline-flex h-8 items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-[14px] text-xs font-semibold uppercase tracking-[0.06em] text-slate-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-slate-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
            Comment ça marche
          </span>
          <h2 className="max-w-[520px] text-[44px] font-extrabold leading-[52px] text-slate-900 dark:text-slate-100">
            Démarrez en 30 secondes. NeoxMeet s’occupe du reste.
          </h2>
          <p className="max-w-[520px] text-lg leading-[28px] text-slate-600 dark:text-slate-300">
            Partagez un lien, traduisez en direct, récupérez un recap propre et actionnable.
          </p>
        </div>

        <div className="order-2 lg:order-1 lg:col-span-5 space-y-5">
          <div className="relative overflow-hidden rounded-[24px] border border-slate-200 bg-white/70 p-[18px] shadow-lg shadow-slate-200/40 backdrop-blur dark:border-white/10 dark:bg-[rgba(15,23,42,0.45)] dark:shadow-black/20">
            <div className="pointer-events-none absolute left-6 top-[18px] bottom-[18px] w-px" aria-hidden>
              <div className="h-full w-px bg-slate-200" />
              <div
                className="absolute left-0 top-0 w-px rounded-full bg-gradient-to-b from-indigo-500 via-violet-500 to-cyan-400"
                style={{ height: filledHeight }}
              />
            </div>
            <div className="space-y-2" role="tablist" aria-label="Étapes de Comment ça marche">
              {steps.map((step) => {
                const active = isActive(step.id);
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => handleStepChange(step.id)}
                    aria-selected={active}
                    role="tab"
                    className={`group relative flex w-full items-start gap-4 rounded-2xl border px-4 py-4 text-left transition hover:-translate-y-0.5 hover:border-slate-200 hover:bg-slate-50 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:hover:border-indigo-300/20 dark:hover:bg-white/5 dark:focus-visible:ring-indigo-300/40 dark:focus-visible:ring-offset-transparent ${
                      active
                        ? 'bg-gradient-to-r from-indigo-50 via-violet-50 to-cyan-50 border-indigo-200 shadow-sm dark:from-indigo-950/50 dark:via-violet-950/50 dark:to-cyan-950/50 dark:border-indigo-300/40'
                        : 'border-transparent'
                    }`}
                  >
                    <span
                      className={`mt-0.5 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition ${
                        active
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'bg-slate-900/5 text-slate-700 shadow-sm dark:bg-white/10 dark:text-slate-200'
                      }`}
                    >
                      {step.number}
                    </span>
                    <div className="space-y-2">
                      <p className={`text-base font-semibold ${active ? 'text-slate-900 dark:text-slate-100' : 'text-slate-800 dark:text-slate-100'}`}>
                      {step.title}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{step.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {step.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-[12px] font-medium text-slate-700 shadow-sm transition dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    </div>
                    <span
                      className={`absolute left-0 top-0 h-full w-[2px] rounded-full ${
                        active
                          ? 'bg-gradient-to-b from-indigo-500 via-violet-500 to-cyan-400'
                          : 'bg-transparent'
                      }`}
                      aria-hidden
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="order-3 lg:order-2 lg:col-span-7">
          <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white/75 p-[22px] shadow-2xl shadow-slate-200/50 backdrop-blur-xl dark:border-white/10 dark:bg-[rgba(15,23,42,0.45)] dark:shadow-black/30">
            <div
              className={`relative space-y-4 transition ease-out ${previewStateClass}`}
              style={{ transitionDuration: transitionState === 'fading-out' ? '120ms' : '200ms' }}
            >
              {displayedStep === 1 && <PreviewInvitation onCopy={handleCopy} showToast={showToast} />}
              {displayedStep === 2 && <PreviewLiveTranslation />}
              {displayedStep === 3 && <PreviewRecap />}
            </div>
          </div>
        </div>

        <div className="order-4 lg:order-3 lg:col-span-5 lg:col-start-1">
          <div className="space-y-1 text-left">
            <a
              className="inline-flex items-center gap-2 text-[14px] font-semibold text-indigo-700 transition hover:text-indigo-600 dark:text-indigo-200 dark:hover:text-indigo-100"
              href="/demo"
            >
              Voir une démo 20 s →
            </a>
            <p className="text-[13px] font-medium text-slate-500 dark:text-slate-400">Aucune carte requise • Démo en 24 h</p>
          </div>
        </div>
      </div>
    </section>
  );
}

type PreviewInvitationProps = {
  onCopy: () => void;
  showToast: boolean;
};

function PreviewInvitation({ onCopy, showToast }: PreviewInvitationProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-300">INVITATION</p>
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">Lien de réunion</p>
        </div>
      </div>
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
        <div className="flex items-center gap-3">
          <code className="flex-1 truncate rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-mono text-slate-800 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-100">
            neoxmeet.com/r/equipe-produit
          </code>
          <button
            type="button"
            onClick={onCopy}
            className="rounded-full border border-indigo-200 bg-gradient-to-r from-indigo-600 via-sky-600 to-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:border-indigo-400/40 dark:shadow-indigo-900/40"
          >
            Copier
          </button>
        </div>
        <p className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-300">Lien sécurisé • Expiration configurable</p>

        {showToast && (
          <div className="absolute bottom-3 right-3 rounded-full border border-emerald-200 bg-white/90 px-4 py-2 text-sm font-semibold text-emerald-600 shadow-lg shadow-emerald-100 backdrop-blur dark:border-emerald-300/30 dark:bg-emerald-500/10 dark:text-emerald-200">
            Lien copié ✅
          </div>
        )}
      </div>
    </div>
  );
}

function PreviewLiveTranslation() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-300">EN DIRECT</p>
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">Sous-titres + traduction</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center rounded-full border border-indigo-100 bg-indigo-600/10 px-3 py-1 text-[13px] font-semibold text-indigo-700 shadow-sm dark:border-indigo-300/30 dark:bg-indigo-500/20 dark:text-indigo-100">
          Traduction en direct
        </span>
        <span className="inline-flex items-center rounded-full border border-slate-200 px-3 py-1 text-[13px] font-semibold text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
          Transcription
        </span>
        <button
          type="button"
          className="ml-auto inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1.5 text-[13px] font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-100 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-indigo-300/30 dark:hover:text-indigo-100"
        >
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="m7 4 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Basculer
        </button>
      </div>
      <div className="space-y-3 rounded-2xl border border-sky-100 bg-sky-50/80 p-4 shadow-sm dark:border-indigo-300/20 dark:bg-indigo-950/40">
        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-200">FR → EN (temps réel)</p>
        <div className="space-y-2 text-sm font-medium text-slate-800 dark:text-slate-100">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-7 rounded-full bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-400" aria-hidden />
            <p>Décision : signature vendredi 15 h.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-7 rounded-full bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-400" aria-hidden />
            <p>Action : @Nadia envoie le devis.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PreviewRecap() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-300">APRÈS RÉUNION</p>
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">Recap automatique</p>
        </div>
      </div>
      <div className="space-y-3 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
        <div className="rounded-xl border border-slate-200/70 bg-slate-50/80 p-3 shadow-sm dark:border-white/10 dark:bg-white/5">
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Résumé</p>
          <p className="text-sm text-slate-600 dark:text-slate-300">Démo validée. Prochain point vendredi 15 h.</p>
        </div>
        <div className="rounded-xl border border-slate-200/70 bg-slate-50/80 p-3 shadow-sm dark:border-white/10 dark:bg-white/5">
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Décisions</p>
          <p className="text-sm text-slate-600 dark:text-slate-300">Signer le devis vendredi 15 h.</p>
        </div>
        <div className="rounded-xl border border-slate-200/70 bg-slate-50/80 p-3 shadow-sm dark:border-white/10 dark:bg-white/5">
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Actions</p>
          <p className="text-sm text-slate-600 dark:text-slate-300">Nadia — envoyer le devis (aujourd’hui).</p>
        </div>
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-100 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-indigo-300/30 dark:hover:text-indigo-100"
          >
            Exporter
          </button>
          <button
            type="button"
            className="rounded-full bg-gradient-to-r from-indigo-600 via-sky-600 to-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:shadow-indigo-900/40"
          >
            Partager
          </button>
        </div>
      </div>
    </div>
  );
}
