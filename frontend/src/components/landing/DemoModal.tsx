'use client';

import type { FormEvent, MouseEvent } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '../../lib/utils';
import { PrimaryCTA, OutlineCTA } from './CTAs';

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

const priorities = ['Traduction en direct', 'Recap & actions', 'Sécurité & conformité'];

const quickSlots = [
  'Aujourd’hui 15 h',
  'Aujourd’hui 16 h',
  'Demain 10 h',
  'Demain 11 h',
  'Jeu 14 h',
  'Ven 09 h',
];

const additionalSlots = ['Ven 14 h', 'Lun 09 h', 'Lun 15 h', 'Mar 11 h'];

export function DemoModal({ open, onClose }: DemoModalProps) {
  const [form, setForm] = useState<FormState>({
    fullName: '',
    email: '',
    company: '',
    teamSize: '',
    priority: priorities[0],
    message: '',
    slot: quickSlots[0],
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
      slot: quickSlots[0],
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
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
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
        className="relative max-h-[90vh] w-full max-w-[640px] overflow-hidden rounded-[26px] border border-slate-200/70 bg-white/95 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.6)] backdrop-blur-xl transition dark:border-white/10 dark:bg-slate-900/85"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="absolute inset-x-10 top-0 -z-10 h-36 rounded-full bg-gradient-to-r from-indigo-200 via-white to-cyan-200 blur-3xl opacity-70" aria-hidden />
        <button
          type="button"
          onClick={handleClose}
          aria-label="Fermer la fenêtre de réservation"
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/70 bg-white/80 text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
        >
          ✕
        </button>

        <div className="grid max-h-[90vh] grid-cols-1 gap-0 overflow-y-auto md:grid-cols-[1.1fr_0.9fr]">
          <div className="relative space-y-6 p-6 md:p-8">
            <div className="space-y-2" id="demo-modal-description">
              <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-indigo-500">DÉMO NEoxMEET</p>
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
                <div className="space-y-4">
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
                  <div className="grid gap-4 sm:grid-cols-2">
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
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">Votre priorité</label>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-1">
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                          {priorities.map((priority) => (
                            <button
                              key={priority}
                              type="button"
                              onClick={() => handleChange('priority', priority)}
                              className={cn(
                                'rounded-xl border px-3 py-2 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 dark:text-slate-100',
                                form.priority === priority
                                  ? 'border-indigo-200 bg-gradient-to-r from-indigo-50 via-sky-50 to-cyan-50 text-indigo-700 shadow-sm shadow-indigo-100 dark:border-indigo-500/30 dark:from-indigo-500/10 dark:via-sky-500/10 dark:to-cyan-500/10 dark:text-indigo-200'
                                  : 'border-slate-200/80 bg-white/80 text-slate-700 hover:border-indigo-200 hover:bg-indigo-50/60 dark:border-white/10 dark:bg-white/5 dark:hover:border-indigo-400/40 dark:hover:bg-indigo-500/5',
                              )}
                            >
                              {priority}
                            </button>
                          ))}
                        </div>
                      </div>
                      {errors.priority && <p className="text-xs font-semibold text-rose-500">{errors.priority}</p>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-800 dark:text-slate-200" htmlFor="message">
                      Contexte (optionnel)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Langues, type de réunions, contraintes…"
                      maxLength={240}
                      rows={2}
                      value={form.message}
                      onChange={(event) => handleChange('message', event.target.value)}
                      className={cn(
                        'w-full rounded-xl border border-slate-200/80 bg-white/90 px-3 py-2 text-sm text-slate-900 shadow-inner shadow-slate-100 transition focus:border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-100',
                        'dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-400 dark:focus:border-indigo-500/50 dark:focus:ring-indigo-500/20',
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-3 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 shadow-inner shadow-slate-200/50 dark:border-white/10 dark:bg-white/5 dark:shadow-none">
                  <div className="flex items-center justify-between gap-3">
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Choisir un créneau</p>
                      <p className="text-xs text-slate-500 dark:text-slate-300">Fuseau : Africa/Kinshasa</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowMoreSlots((prev) => !prev)}
                      className="text-xs font-semibold text-indigo-600 underline underline-offset-4 transition hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 dark:text-indigo-300 dark:hover:text-indigo-200"
                    >
                      {showMoreSlots ? 'Réduire les options' : 'Afficher plus de créneaux'}
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {allSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => handleChange('slot', slot)}
                        className={cn(
                          'rounded-xl border px-3 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 dark:text-slate-100',
                          form.slot === slot
                            ? 'border-indigo-200 bg-gradient-to-r from-indigo-50 via-sky-50 to-cyan-50 text-indigo-700 shadow-sm shadow-indigo-100 dark:border-indigo-500/40 dark:from-indigo-500/10 dark:via-sky-500/10 dark:to-cyan-500/10 dark:text-indigo-200'
                            : 'border-slate-200/80 bg-white/90 text-slate-800 hover:border-indigo-200 hover:bg-indigo-50/70 dark:border-white/10 dark:bg-white/5 dark:hover:border-indigo-400/40 dark:hover:bg-indigo-500/5',
                        )}
                      >
                        {slot}
                      </button>
                    ))}
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
                    <OutlineCTA type="button" className="h-12 px-4 text-sm" onClick={() => handleChange('priority', 'Sécurité & conformité')}>
                      Parler à un expert
                    </OutlineCTA>
                    <a
                      href="/dashboard"
                      className="text-sm font-semibold text-slate-700 underline decoration-slate-300 underline-offset-4 transition hover:text-indigo-700 dark:text-slate-200 dark:hover:text-indigo-200"
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

          <div className="relative space-y-4 border-t border-slate-200/80 bg-slate-50/70 p-6 shadow-inner shadow-slate-200/50 dark:border-white/5 dark:bg-slate-900/40 md:border-l md:border-t-0 md:p-8">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.08),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(34,211,238,0.08),transparent_40%)]" aria-hidden />
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-300">Ce que vous obtenez</p>
              <div className="grid gap-3">
                {[{
                  title: 'Traduction en direct',
                  description: 'Sous-titres et traduction par participant, en temps réel.',
                  icon: '🌐',
                }, {
                  title: 'Recap intelligent',
                  description: 'Résumé, décisions et actions assignées automatiquement.',
                  icon: '⚡',
                }, {
                  title: 'Sécurité entreprise',
                  description: 'Contrôle d’accès, audit logs, options SSO.',
                  icon: '🛡️',
                }].map((item) => (
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
        </div>
      </div>
    </div>
  );
}
