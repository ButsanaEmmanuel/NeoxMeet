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
    if (resendTimer <= 0) return;
    const interval = setInterval(() => setResendTimer((time) => Math.max(0, time - 1)), 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  useEffect(() => {
    setStatus('idle');
    setUsePassword(false);
    setError(null);
    setResendTimer(0);
  }, [mode]);

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
    if (mode === 'signup') return loading ? 'Envoi du lien…' : 'Créer mon compte';
    return loading ? 'Envoi du lien…' : 'Recevoir un lien de connexion';
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
          'relative w-full max-w-[480px] overflow-hidden rounded-[26px] border border-slate-200/70 bg-white/80 p-7 shadow-[0_26px_90px_-40px_rgba(15,23,42,0.55)] backdrop-blur-xl',
          'transition-all duration-200',
          visible ? 'scale-100 opacity-100' : 'scale-[0.98] opacity-0',
          'dark:border-white/10 dark:bg-slate-900/85 dark:text-slate-100',
        )}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="absolute right-4 top-4 rounded-full border border-slate-200/80 bg-white/70 p-2 text-slate-500 shadow-sm transition hover:-translate-y-0.5 hover:text-slate-800 hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 dark:border-white/10 dark:bg-white/10 dark:text-slate-200"
          onClick={onClose}
          aria-label="Fermer"
          type="button"
        >
          ✕
        </button>

        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-indigo-600 dark:text-indigo-300">ACCÈS SÉCURISÉ</p>
            <div className="space-y-1">
              <h2 id="auth-modal-title" className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
                {mode === 'login' ? 'Se connecter' : 'Créer votre compte'}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {mode === 'login'
                  ? 'Accès rapide à vos réunions et recaps.'
                  : 'Démarrez en quelques secondes. Aucune carte requise.'}
              </p>
            </div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-300">
              Sessions chiffrées • Protection anti-abuse • Connexion rapide
            </p>
          </div>

          <div className="space-y-3">
            {oauthProviders.map(({ label, icon: Icon }) => (
              <button
                key={label}
                type="button"
                className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white/90 text-[15px] font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50/70 hover:shadow-lg hover:shadow-indigo-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 dark:border-white/10 dark:bg-slate-800/70 dark:text-slate-100 dark:hover:border-indigo-400/40 dark:hover:bg-slate-800"
              >
                <Icon />
                <span>{label}</span>
              </button>
            ))}
            <div className="relative flex items-center justify-center py-2 text-sm text-slate-500 dark:text-slate-300">
              <span className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-white/15" aria-hidden />
              <span className="relative rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm dark:bg-slate-900/80 dark:text-slate-200">
                ou
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {status === 'success' ? (
              <div className="space-y-4 rounded-2xl border border-emerald-100 bg-emerald-50/80 p-5 text-sm text-emerald-900 shadow-inner shadow-emerald-100/70 dark:border-emerald-400/20 dark:bg-emerald-500/10 dark:text-emerald-100">
                <div className="space-y-1">
                  <p className="text-lg font-semibold text-emerald-800 dark:text-emerald-100">Lien envoyé</p>
                  <p className="text-sm text-emerald-700 dark:text-emerald-100/90">Ouvrez votre email pour vous connecter.</p>
                </div>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendTimer > 0}
                  className={cn(
                    'inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-400/30 transition',
                    resendTimer > 0 ? 'cursor-not-allowed opacity-60' : 'hover:-translate-y-0.5 hover:shadow-xl',
                  )}
                >
                  {resendTimer > 0 ? `Renvoyer le lien (${resendTimer}s)` : 'Renvoyer le lien'}
                </button>
                <p className="text-xs font-medium text-emerald-700 dark:text-emerald-100/80">Vérifiez vos spams.</p>
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
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white/70 px-3 text-[15px] text-slate-900 shadow-inner shadow-indigo-100/40 transition focus:border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:border-white/10 dark:bg-slate-800/70 dark:text-slate-50"
                    required
                  />
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
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white/70 px-3 text-[15px] text-slate-900 shadow-inner shadow-indigo-100/40 transition focus:border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:border-white/10 dark:bg-slate-800/70 dark:text-slate-50"
                    />
                  </div>
                )}

                {error && <p className="text-sm font-semibold text-rose-600 dark:text-rose-300">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className={cn(
                    'flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 px-4 text-[15px] font-semibold text-white shadow-lg shadow-indigo-400/30 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200',
                    loading ? 'cursor-progress opacity-90' : 'hover:-translate-y-0.5 hover:shadow-xl',
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
                        className="font-semibold text-indigo-600 transition hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 dark:text-indigo-300"
                        onClick={() => setUsePassword(true)}
                      >
                        Utiliser un mot de passe
                      </button>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          className="font-semibold text-indigo-600 transition hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 dark:text-indigo-300"
                          onClick={() => setUsePassword(false)}
                        >
                          Revenir au lien sécurisé
                        </button>
                        <button
                          type="button"
                          className="font-semibold text-indigo-600 transition hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 dark:text-indigo-300"
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

          <div className="space-y-3 rounded-2xl border border-slate-200/70 bg-white/70 p-4 text-xs text-slate-500 shadow-inner shadow-slate-100/60 dark:border-white/10 dark:bg-slate-800/60 dark:text-slate-200">
            <p className="text-center font-medium">En continuant, vous acceptez les Conditions et la Confidentialité.</p>
            <div className="text-center text-sm font-semibold text-slate-700 dark:text-slate-100">
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
