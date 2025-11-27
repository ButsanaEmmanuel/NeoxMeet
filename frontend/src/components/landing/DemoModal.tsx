'use client';

import type { FormEvent, MouseEvent } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '../../lib/utils';
import { OutlineCTA, PrimaryCTA } from './CTAs';

type DemoModalProps = {
  open: boolean;
  onClose: () => void;
};

type FormState = {
  fullName: string;
  email: string;
  company: string;
  teamSize: string;
  priority: string;
  message: string;
  slot: string;
};

type FormErrors = Partial<Record<keyof FormState, string>> & { global?: string };

const priorities = ['Traduction', 'Recap', 'Sécurité'];

type Slot = {
  day: string;
  time: string;
};

const quickSlots: Slot[] = [
  { day: 'Auj.', time: '15 h' },
  { day: 'Auj.', time: '16 h' },
  { day: 'Dem.', time: '10 h' },
  { day: 'Dem.', time: '11 h' },
  { day: 'Jeu', time: '14 h' },
  { day: 'Ven', time: '09 h' },
];

const additionalSlots: Slot[] = [
  { day: 'Ven', time: '14 h' },
  { day: 'Lun', time: '09 h' },
  { day: 'Lun', time: '15 h' },
  { day: 'Mar', time: '11 h' },
];

const formatSlotValue = (slot: Slot) => `${slot.day} ${slot.time}`;

export function DemoModal({ open, onClose }: DemoModalProps) {
  const [form, setForm] = useState<FormState>({
    fullName: '',
    email: '',
    company: '',
    teamSize: '',
    priority: priorities[0],
    message: '',
    slot: formatSlotValue(quickSlots[0]),
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showMoreSlots, setShowMoreSlots] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  const allSlots = useMemo(() => (showMoreSlots ? [...quickSlots, ...additionalSlots] : quickSlots), [showMoreSlots]);

  const handleClose = useCallback(() => {
    setLoading(false);
    setSuccess(false);
    setErrors({});
    setShowMoreSlots(false);
    setForm({
      fullName: '',
      email: '',
      company: '',
      teamSize: '',
      priority: priorities[0],
      message: '',
      slot: formatSlotValue(quickSlots[0]),
    });
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    previousFocus.current = document.activeElement as HTMLElement;
    const firstFocusable = modalRef.current?.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    firstFocusable?.focus();
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
      if (event.key === 'Tab') {
        const focusables = modalRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey) {
          if (document.activeElement === first) {
            event.preventDefault();
            last.focus();
          }
        } else if (document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previousFocus.current?.focus();
      document.body.style.overflow = '';
    };
  }, [handleClose, open]);

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === overlayRef.current) {
      handleClose();
    }
  };

  const validate = () => {
    const nextErrors: FormErrors = {};
    if (!form.fullName.trim()) nextErrors.fullName = 'Champ requis';
    if (!form.email.trim()) {
      nextErrors.email = 'Email requis';
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      nextErrors.email = 'Email invalide';
    }
    if (!form.company.trim()) nextErrors.company = 'Champ requis';
    if (!form.teamSize) nextErrors.teamSize = 'Choisissez une option';
    if (!form.priority) nextErrors.priority = 'Sélectionnez une priorité';
    if (!form.slot) nextErrors.slot = 'Choisissez un créneau';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setErrors({});
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 900);
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined, global: undefined }));
  };

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm"
      onClick={handleOverlayClick}
      role="presentation"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-modal-title"
        aria-describedby="demo-modal-description"
        className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-[28px] border border-slate-200/70 bg-white/95 shadow-[0_36px_90px_-38px_rgba(15,23,42,0.65)] backdrop-blur-xl transition dark:border-white/10 dark:bg-slate-900/85"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="absolute inset-x-10 top-0 -z-10 h-36 rounded-full bg-gradient-to-r from-indigo-200 via-white to-cyan-200 blur-3xl opacity-70" aria-hidden />
        <div className="flex items-start justify-between gap-4 border-b border-slate-200/80 px-6 py-5 md:px-8">
          <div className="space-y-2" id="demo-modal-description">
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-indigo-500">DÉMO NEOXMEET</p>
            <div className="space-y-2">
              <h2 id="demo-modal-title" className="text-2xl font-semibold leading-tight text-slate-900 dark:text-white">
                Réserver une démo en 15 minutes
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Voyez la traduction en direct, les recaps automatiques et les contrôles de sécurité.
              </p>
            </div>
            <p className="text-[13px] font-semibold text-slate-700 dark:text-slate-200">
              Réponse rapide • Sessions chiffrées • Usage entreprise
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Fermer la fenêtre de réservation"
            className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/80 bg-white/90 text-slate-500 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="grid h-full grid-cols-1 md:grid-cols-[1.1fr_0.9fr] md:gap-2">
            <div className="order-2 space-y-6 px-6 pb-8 pt-6 md:order-1 md:px-8 md:pt-7">
              {success ? (
                <div className="space-y-5 rounded-2xl border border-emerald-200/70 bg-emerald-50/80 p-6 text-slate-900 shadow-sm shadow-emerald-100 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-slate-50">
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-300">Demande envoyée ✅</p>
                    <h3 className="text-xl font-semibold">Nous vous recontactons pour confirmer le créneau.</h3>
                    <p className="text-sm text-slate-700 dark:text-slate-200">
                      Vous recevrez un email de confirmation avec le lien et les paramètres de sécurité.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <PrimaryCTA
                      className="h-11 px-5 text-sm disabled:cursor-not-allowed disabled:opacity-60"
                      href="/dashboard"
                    >
                      Ajouter au calendrier
                    </PrimaryCTA>
                    <OutlineCTA
                      className="h-11 px-5 text-sm"
                      href="/"
                    >
                      Retour au site
                    </OutlineCTA>
                  </div>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-800 dark:text-slate-200" htmlFor="fullName">
                        Nom complet
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        placeholder="Ex : Aline Mukendi"
                        value={form.fullName}
                        onChange={(event) => handleChange('fullName', event.target.value)}
                        className={cn(
                          'h-11 w-full rounded-xl border border-slate-200/80 bg-white/90 px-3 text-sm text-slate-900 shadow-inner shadow-slate-100 transition focus:border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-100',
                          'dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-400 dark:focus:border-indigo-500/50 dark:focus:ring-indigo-500/20',
                        )}
                      />
                      {errors.fullName && <p className="text-xs font-semibold text-rose-500">{errors.fullName}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-800 dark:text-slate-200" htmlFor="email">
                        Email professionnel
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="aline@entreprise.com"
                        value={form.email}
                        onChange={(event) => handleChange('email', event.target.value)}
                        className={cn(
                          'h-11 w-full rounded-xl border border-slate-200/80 bg-white/90 px-3 text-sm text-slate-900 shadow-inner shadow-slate-100 transition focus:border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-100',
                          'dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-400 dark:focus:border-indigo-500/50 dark:focus:ring-indigo-500/20',
                        )}
                      />
                      {errors.email && <p className="text-xs font-semibold text-rose-500">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-800 dark:text-slate-200" htmlFor="company">
                        Entreprise
                      </label>
                      <input
                        id="company"
                        name="company"
                        placeholder="Ex : Polygon Solutions"
                        value={form.company}
                        onChange={(event) => handleChange('company', event.target.value)}
                        className={cn(
                          'h-11 w-full rounded-xl border border-slate-200/80 bg-white/90 px-3 text-sm text-slate-900 shadow-inner shadow-slate-100 transition focus:border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-100',
                          'dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-400 dark:focus:border-indigo-500/50 dark:focus:ring-indigo-500/20',
                        )}
                      />
                      {errors.company && <p className="text-xs font-semibold text-rose-500">{errors.company}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-800 dark:text-slate-200" htmlFor="teamSize">
                        Taille de votre équipe
                      </label>
                      <select
                        id="teamSize"
                        name="teamSize"
                        value={form.teamSize}
                        onChange={(event) => handleChange('teamSize', event.target.value)}
                        className={cn(
                          'h-11 w-full rounded-xl border border-slate-200/80 bg-white/90 px-3 text-sm text-slate-900 shadow-inner shadow-slate-100 transition focus:border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-100',
                          'dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-indigo-500/50 dark:focus:ring-indigo-500/20',
                        )}
                      >
                        <option value="" disabled>
                          Sélectionnez
                        </option>
                        <option value="1–10">1–10</option>
                        <option value="11–50">11–50</option>
                        <option value="51–200">51–200</option>
                        <option value="201–1000">201–1000</option>
                        <option value="1000+">1000+</option>
                      </select>
                      {errors.teamSize && <p className="text-xs font-semibold text-rose-500">{errors.teamSize}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">Votre priorité</label>
                    <div className="grid grid-cols-3 gap-2">
                      {priorities.map((priority) => {
                        const isActive = form.priority === priority;
                        return (
                          <button
                            key={priority}
                            type="button"
                            onClick={() => handleChange('priority', priority)}
                            className={cn(
                              'flex h-12 min-w-0 items-center justify-center rounded-xl border px-3 text-sm font-semibold leading-none transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 dark:text-slate-100 whitespace-nowrap',
                              isActive
                                ? 'border-indigo-200 bg-gradient-to-r from-indigo-50 via-sky-50 to-cyan-50 text-indigo-700 shadow-sm shadow-indigo-100 dark:border-indigo-500/30 dark:from-indigo-500/10 dark:via-sky-500/10 dark:to-cyan-500/10 dark:text-indigo-200'
                                : 'border-slate-200/80 bg-white/80 text-slate-700 hover:border-indigo-200 hover:bg-indigo-50/60 dark:border-white/10 dark:bg-white/5 dark:hover:border-indigo-400/40 dark:hover:bg-indigo-500/5',
                            )}
                            aria-pressed={isActive}
                          >
                            {priority}
                          </button>
                        );
                      })}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      Nous adaptons la démo à votre priorité (traduction, recap ou sécurité).
                    </p>
                    {errors.priority && <p className="text-xs font-semibold text-rose-500">{errors.priority}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-800 dark:text-slate-200" htmlFor="message">
                      Contexte ou besoin
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      placeholder="Ex : traduire une réunion produit hebdomadaire, 20 participants."
                      value={form.message}
                      onChange={(event) => handleChange('message', event.target.value)}
                      className={cn(
                        'w-full rounded-xl border border-slate-200/80 bg-white/90 px-3 py-3 text-sm text-slate-900 shadow-inner shadow-slate-100 transition focus:border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-100',
                        'dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-400 dark:focus:border-indigo-500/50 dark:focus:ring-indigo-500/20',
                      )}
                    />
                    {errors.message && <p className="text-xs font-semibold text-rose-500">{errors.message}</p>}
                  </div>

                  <div className="space-y-3 rounded-2xl border border-slate-200/80 bg-white/85 p-4 shadow-inner shadow-indigo-100/60 dark:border-white/10 dark:bg-white/5">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">Choisir un créneau</p>
                        <p className="text-xs text-slate-600 dark:text-slate-300">Confirmation rapide, heure locale.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowMoreSlots((prev) => !prev)}
                        className="text-xs font-semibold text-indigo-600 underline decoration-indigo-200 underline-offset-4 transition hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 dark:text-indigo-200"
                      >
                        {showMoreSlots ? 'Voir moins' : 'Voir plus'}
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {allSlots.map((slot) => {
                        const value = formatSlotValue(slot);
                        const isActive = form.slot === value;
                        return (
                          <button
                            key={value}
                            type="button"
                            onClick={() => handleChange('slot', value)}
                            className={cn(
                              'group relative flex h-[86px] flex-col items-center justify-center gap-1 overflow-hidden rounded-xl border text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200',
                              isActive
                                ? 'border-indigo-200 bg-gradient-to-r from-indigo-50 via-sky-50 to-cyan-50 text-indigo-700 shadow-sm shadow-indigo-100 dark:border-indigo-500/40 dark:from-indigo-500/10 dark:via-sky-500/10 dark:to-cyan-500/10 dark:text-indigo-200'
                                : 'border-slate-200/80 bg-white/90 text-slate-800 hover:border-indigo-200 hover:bg-indigo-50/70 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:border-indigo-400/40 dark:hover:bg-indigo-500/5',
                            )}
                            aria-pressed={isActive}
                          >
                            <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-300">
                              {slot.day}
                            </span>
                            <span className="whitespace-nowrap text-base font-semibold text-slate-900 dark:text-white">{slot.time}</span>
                          </button>
                        );
                      })}
                    </div>
                    {errors.slot && <p className="text-xs font-semibold text-rose-500">{errors.slot}</p>}
                  </div>

                  {errors.global && (
                    <p className="text-sm font-semibold text-rose-500">Une erreur est survenue. Réessayez.</p>
                  )}

                  <div className="space-y-3 rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm shadow-indigo-100/50 dark:border-white/10 dark:bg-white/5">
                    <div className="flex flex-wrap items-center gap-3">
                      <PrimaryCTA
                        type="submit"
                        className="h-12 px-5 text-sm disabled:cursor-not-allowed disabled:opacity-60"
                        disabled={loading}
                      >
                        {loading ? (
                          <span className="inline-flex items-center gap-2">
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden />
                            Envoi…
                          </span>
                        ) : (
                          'Confirmer la démo'
                        )}
                      </PrimaryCTA>
                      <OutlineCTA type="button" className="h-12 px-4 text-sm" onClick={() => handleChange('priority', 'Sécurité')}>
                        Parler à un expert
                      </OutlineCTA>
                      <a
                        href="/dashboard"
                        className="text-sm font-medium text-slate-600 underline decoration-slate-300 underline-offset-4 transition hover:text-indigo-700 dark:text-slate-200 dark:hover:text-indigo-200"
                      >
                        Je veux juste essayer maintenant
                      </a>
                    </div>
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-200">Aucune carte requise • Réponse en 24 h</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-300">
                      En envoyant, vous acceptez les Conditions et la Confidentialité.
                    </p>
                  </div>
                </form>
              )}
            </div>

            <aside className="order-1 border-b border-slate-200/80 bg-slate-50/70 px-6 py-6 shadow-inner shadow-slate-200/50 dark:border-white/5 dark:bg-slate-900/40 md:order-2 md:border-b-0 md:border-l md:px-8 md:py-8">
              <div className="md:sticky md:top-4 md:space-y-5">
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-300">Ce que vous obtenez</p>
                  <div className="grid gap-3">
                    {[
                      {
                        title: 'Traduction',
                        description: 'Sous-titres et traduction en direct pour chaque participant.',
                        icon: '🌐',
                      },
                      {
                        title: 'Recap',
                        description: 'Résumé, décisions et actions distribuées automatiquement.',
                        icon: '⚡',
                      },
                      {
                        title: 'Sécurité',
                        description: 'Contrôle d’accès, audit logs, conformité & options SSO.',
                        icon: '🛡️',
                      },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="flex items-start gap-3 rounded-2xl border border-white/60 bg-white/90 p-4 text-sm shadow-sm shadow-indigo-100/40 backdrop-blur dark:border-white/5 dark:bg-white/5 dark:shadow-none"
                      >
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/15 via-sky-500/15 to-cyan-400/15 text-lg">
                          {item.icon}
                        </span>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">{item.title}</p>
                          <p className="text-slate-600 dark:text-slate-200">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 rounded-2xl border border-indigo-200/70 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-5 text-sm text-slate-900 shadow-sm shadow-indigo-100 backdrop-blur dark:border-indigo-500/30 dark:from-indigo-500/10 dark:via-white/5 dark:to-cyan-500/10 dark:text-slate-100">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-500">Pendant la démo, on configure</p>
                  <ul className="space-y-2 text-slate-700 dark:text-slate-200">
                    <li className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-indigo-400" />Langues & scénario d’usage</li>
                    <li className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-cyan-400" />Permissions & accès</li>
                    <li className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-400" />Export & partage</li>
                    <li className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-sky-400" />Intégrations (calendrier, etc.)</li>
                  </ul>
                  <div className="rounded-xl border border-indigo-100/80 bg-white/80 px-4 py-3 text-xs font-semibold text-slate-700 shadow-inner shadow-indigo-100/40 dark:border-white/5 dark:bg-white/5 dark:text-slate-200">
                    Sessions chiffrées, SLA premium et onboarding sans friction.
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
