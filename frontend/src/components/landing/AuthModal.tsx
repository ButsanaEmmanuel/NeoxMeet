'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../lib/utils';

export type AuthMode = 'login' | 'signup';

const oauthProviders = [
  { label: 'Continuer avec Google', icon: GoogleIcon },
  { label: 'Continuer avec Apple', icon: AppleIcon },
  { label: 'Continuer avec LinkedIn', icon: LinkedinIcon },
];

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M12 10.2v3.6h5.1c-.2 1-.8 2.4-2.1 3.3l3.3 2.5c1.9-1.8 3-4.5 3-7.6 0-.7-.1-1.4-.2-2H12Z"
      />
      <path fill="#34A853" d="M6.6 14.3 5.6 15l-2.6 2C4.6 20.3 8 22 12 22c2.7 0 5-.9 6.7-2.4l-3.3-2.5c-.9.6-2.2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.3Z" />
      <path fill="#4A90E2" d="M21 6.5 17.7 9c.8.5 1.5 1.4 1.8 2.3.2.4.2.9.2 1.4 0 .5-.1 1-.2 1.5-.4 1.5-1.3 2.8-2.6 3.6l3.3 2.5c1.9-1.8 3-4.5 3-7.6 0-1.1-.2-2.2-.5-3.2Z" />
      <path fill="#FBBC05" d="M12 4.2c1.5 0 2.8.5 3.8 1.5l2.8-2.8C16.9 1.2 14.7.2 12 .2 8 0 4.6 1.7 3 4.9l3.7 2.9C7.2 6 9.4 4.2 12 4.2Z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="currentColor"
        d="M16.7 2c0 1-.5 2-1.2 2.7-.8.7-1.8 1.1-2.9 1-1.7-.1-3.3-.9-4.3-2.2 1-.7 2.2-1.1 3.5-1.1 1.7 0 3 .7 3.8 1.4 0-.2 1.1-1.8 1.1-1.8ZM21 17.6c-.5 1.2-.8 1.7-1.4 2.6-.9 1.3-2.1 2.9-3.6 2.9-1.4 0-1.8-.9-3.4-.9-1.6 0-2 .9-3.4.9-1.5 0-2.7-1.4-3.6-2.8-1.3-2-2.4-5.7-1-8.3.7-1.4 2-2.4 3.4-2.4 1.4 0 2.3.9 3.5.9 1.2 0 2-.9 3.5-.9 1.3 0 2.6.7 3.3 1.9-2.9 1.6-2.4 5.8.6 6.2.4 0 .9-.1 1.5-.3Z"
      />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="currentColor"
        d="M5.4 4.8c0 .8-.6 1.4-1.4 1.4C3.2 6.2 2.6 5.6 2.6 4.8c0-.7.6-1.3 1.4-1.3.8 0 1.4.6 1.4 1.3ZM2.8 8.5h3.7v12.4H2.8zm6.1 0h3.5v1.7h.1c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.2 2.3 4.2 5.2v7.2h-3.7v-6.4c0-1.5 0-3.5-2.1-3.5-2.1 0-2.5 1.6-2.5 3.4v6.6H8.9Z"
      />
    </svg>
  );
}

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4Z" />
    </svg>
  );
}

interface AuthModalProps {
  isOpen: boolean;
  mode: AuthMode;
  onClose: () => void;
  onModeChange: (mode: AuthMode) => void;
}

export function AuthModal({ isOpen, mode, onClose, onModeChange }: AuthModalProps) {
  const [render, setRender] = useState(isOpen);
  const [visible, setVisible] = useState(isOpen);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usePassword, setUsePassword] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  const handleModeChange = (nextMode: AuthMode) => {
    setStatus('idle');
    setUsePassword(false);
    setError(null);
    setResendTimer(0);
    onModeChange(nextMode);
  };

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (isOpen) {
      setRender(true);
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
      const timeout = setTimeout(() => setRender(false), 180);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!render) return;
    previousFocus.current = document.activeElement as HTMLElement;
    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
    );
    focusable?.[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
      if (event.key === 'Tab' && focusable && focusable.length > 0) {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
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

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
      previousFocus.current?.focus();
    };
  }, [render, onClose]);

  useEffect(() => {
    setStatus('idle');
    setUsePassword(false);
    setError(null);
    setResendTimer(0);
  }, [mode]);

  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => {
      setResendTimer((timer) => (timer > 0 ? timer - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  useEffect(() => {
    if (!render) {
      setEmail('');
      setPassword('');
      setUsePassword(false);
      setStatus('idle');
      setError(null);
      setResendTimer(0);
    }
  }, [render]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const validateEmail = (value: string) => /\S+@\S+\.\S+/.test(value);

  const loading = status === 'loading';

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!validateEmail(email)) {
      setError('Entrez une adresse email valide.');
      return;
    }
    if (email.includes('wait')) {
      setError('Patientez quelques instants avant de réessayer.');
      return;
    }
    if (email.includes('expire')) {
      setError('Lien expiré. Demandez un nouveau lien.');
      return;
    }

    setStatus('loading');

    setTimeout(() => {
      if (usePassword) {
        setStatus('idle');
      } else {
        setStatus('success');
        setResendTimer(30);
      }
    }, 900);
  };

  const handleResend = () => {
    setResendTimer(30);
  };

  const primaryLabel = (() => {
    if (usePassword) return loading ? 'Connexion…' : 'Se connecter';
    if (mode === 'signup') return loading ? 'Envoi…' : 'Créer mon compte';
    return loading ? 'Envoi…' : 'Recevoir un lien de connexion';
  })();

  if (!render) return null;

  return createPortal(
    <div
      className={cn(
        'fixed inset-0 z-[120] flex items-center justify-center px-4 py-10',
        visible ? 'opacity-100' : 'opacity-0',
        'transition-opacity duration-150',
      )}
      aria-hidden={!visible}
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-150"
        onClick={onClose}
        aria-hidden
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        className={cn(
          'relative w-full max-w-[520px] overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/85 p-8 shadow-[0_26px_90px_-40px_rgba(15,23,42,0.55)] backdrop-blur-xl',
          'transition-all duration-200 max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-200/80 dark:scrollbar-thumb-white/15',
          visible ? 'scale-100 opacity-100' : 'scale-[0.98] opacity-0',
          'dark:border-white/12 dark:bg-slate-900/80 dark:text-slate-100',
        )}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="space-y-8">
          <div className="flex items-start justify-between gap-6">
            <div className="space-y-3 pr-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-indigo-500 dark:text-indigo-300">ACCÈS SÉCURISÉ</p>
              <div className="space-y-2">
                <h2 id="auth-modal-title" className="text-3xl font-semibold text-slate-900 dark:text-white">
                  {mode === 'login' ? 'Se connecter' : 'Créer votre compte'}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {mode === 'login'
                    ? 'Accédez à vos réunions en un clin d’œil.'
                    : 'Démarrez en quelques secondes. Aucune carte requise.'}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-[13px] font-medium text-slate-500 dark:text-slate-300">
                <span>Sessions chiffrées</span>
                <span className="text-slate-300 dark:text-white/40">•</span>
                <span>Anti-abuse</span>
                <span className="text-slate-300 dark:text-white/40">•</span>
                <span>Connexion rapide</span>
              </div>
            </div>
            <button
              className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100/80 hover:text-slate-800 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-slate-200 dark:hover:bg-white/10 dark:focus-visible:ring-offset-slate-900"
              onClick={onClose}
              aria-label="Fermer"
              type="button"
            >
              <span aria-hidden>✕</span>
            </button>
          </div>

          <div className="space-y-3">
            {oauthProviders.map(({ label, icon: Icon }) => (
              <button
                key={label}
                type="button"
                className="group relative flex h-12 w-full items-center justify-center overflow-hidden rounded-2xl border border-slate-200/85 bg-white/95 text-[15px] font-semibold text-slate-800 shadow-sm shadow-slate-200/70 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 focus-visible:ring-offset-1 focus-visible:ring-offset-white hover:-translate-y-[2px] hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100 active:translate-y-[1px] dark:border-white/12 dark:bg-slate-900/60 dark:text-slate-100 dark:shadow-none dark:hover:border-indigo-400/40 dark:hover:bg-slate-900"
              >
                <span className="flex h-full w-11 shrink-0 items-center justify-center border-r border-transparent text-slate-500 transition group-hover:text-slate-700 dark:text-slate-200">
                  <Icon />
                </span>
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center px-12 text-center leading-none">
                  {label}
                </span>
              </button>
            ))}
            <div className="flex items-center gap-3 py-2 text-sm font-semibold text-slate-500 dark:text-slate-300">
              <span className="h-px flex-1 bg-slate-200 dark:bg-white/15" aria-hidden />
              <span className="px-2 text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-200">ou</span>
              <span className="h-px flex-1 bg-slate-200 dark:bg-white/15" aria-hidden />
            </div>
          </div>

          <div className="space-y-4">
            {status === 'success' ? (
              <div className="space-y-5 rounded-2xl border border-emerald-200/70 bg-emerald-50/70 p-6 text-sm text-emerald-900 shadow-[0_18px_60px_-32px_rgba(16,185,129,0.65)] dark:border-emerald-400/25 dark:bg-emerald-500/10 dark:text-emerald-100">
                <div className="space-y-2 text-center">
                  <p className="text-2xl font-semibold text-emerald-800 dark:text-emerald-100">Lien envoyé ✅</p>
                  <p className="text-base text-emerald-700 dark:text-emerald-100/85">Ouvrez votre email pour confirmer votre compte.</p>
                </div>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendTimer > 0}
                  className={cn(
                    'inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 px-4 py-3 text-[15px] font-semibold text-white shadow-lg shadow-indigo-400/30 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-50 dark:focus-visible:ring-offset-emerald-900/40',
                    resendTimer > 0
                      ? 'cursor-not-allowed opacity-70'
                      : 'hover:-translate-y-[2px] hover:shadow-xl hover:shadow-indigo-300/40 active:translate-y-[1px]',
                  )}
                >
                  {resendTimer > 0 ? `Renvoyer le lien (${resendTimer}s)` : 'Renvoyer le lien'}
                </button>
                <p className="text-xs font-medium text-emerald-700 dark:text-emerald-100/80 text-center">Vérifiez vos spams.</p>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-800 dark:text-slate-100" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="nom@entreprise.com"
                    className="h-12 w-full rounded-xl border border-slate-200/90 bg-white/90 px-4 text-[15px] text-slate-900 shadow-inner shadow-indigo-100/30 transition focus:border-indigo-300 focus:outline-none focus:ring-4 focus:ring-indigo-100 dark:border-white/12 dark:bg-slate-900/60 dark:text-slate-50 dark:focus:border-indigo-400"
                    required
                  />
                  <p className="text-[12px] font-medium text-slate-500 dark:text-slate-300">Vous recevrez un lien sécurisé pour confirmer.</p>
                </div>

                {usePassword && (
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-800 dark:text-slate-100" htmlFor="password">
                      Mot de passe
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="h-12 w-full rounded-xl border border-slate-200/90 bg-white/90 px-4 text-[15px] text-slate-900 shadow-inner shadow-indigo-100/30 transition focus:border-indigo-300 focus:outline-none focus:ring-4 focus:ring-indigo-100 dark:border-white/12 dark:bg-slate-900/60 dark:text-slate-50 dark:focus:border-indigo-400"
                    />
                  </div>
                )}

                {error && <p className="text-sm font-semibold text-rose-600 dark:text-rose-300">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className={cn(
                    'flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 px-4 text-[15px] font-semibold text-white shadow-lg shadow-indigo-400/30 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900',
                    loading
                      ? 'cursor-progress opacity-90'
                      : 'hover:-translate-y-[2px] hover:shadow-xl hover:shadow-indigo-300/50 active:translate-y-[1px] active:shadow-md',
                  )}
                >
                  {loading && <Spinner />}
                  {primaryLabel}
                </button>

                {!usePassword && (
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
                    {mode === 'login' ? 'Lien valable 10 minutes. Usage unique.' : 'Vous recevrez un lien sécurisé pour confirmer.'}
                  </p>
                )}

                {mode === 'login' && (
                  <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
                    {!usePassword ? (
                      <button
                        type="button"
                        className="font-semibold text-slate-600 underline-offset-4 transition hover:text-indigo-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 dark:text-slate-200"
                        onClick={() => setUsePassword(true)}
                      >
                        Utiliser un mot de passe
                      </button>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          className="font-semibold text-slate-600 underline-offset-4 transition hover:text-indigo-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 dark:text-slate-200"
                          onClick={() => setUsePassword(false)}
                        >
                          Revenir au lien sécurisé
                        </button>
                        <button
                          type="button"
                          className="font-semibold text-slate-600 underline-offset-4 transition hover:text-indigo-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 dark:text-slate-200"
                        >
                          Mot de passe oublié ?
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </form>
            )}
          </div>

          <div className="space-y-3 text-center text-[13px] text-slate-500 dark:text-slate-200">
            <p className="font-medium">
              En continuant, vous acceptez les{' '}
              <a className="text-indigo-600 underline-offset-4 transition hover:text-indigo-700 hover:underline dark:text-indigo-300" href="#">
                Conditions
              </a>{' '}
              et la{' '}
              <a className="text-indigo-600 underline-offset-4 transition hover:text-indigo-700 hover:underline dark:text-indigo-300" href="#">
                Confidentialité
              </a>
              .
            </p>
            <div className="text-sm font-semibold text-slate-700 dark:text-slate-100">
              {mode === 'login' ? 'Pas de compte ?' : 'Déjà un compte ?'}{' '}
              <button
                type="button"
                className="text-indigo-600 underline decoration-indigo-200 decoration-2 underline-offset-4 transition hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 dark:text-indigo-300"
                onClick={() => handleModeChange(mode === 'login' ? 'signup' : 'login')}
              >
                {mode === 'login' ? 'S’inscrire' : 'Se connecter'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
