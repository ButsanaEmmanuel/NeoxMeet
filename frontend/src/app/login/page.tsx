'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import api from '../../lib/api';
import { saveDisplayName, saveTokens } from '../../lib/auth';
import { makeZodResolver } from '../../lib/zodResolver';

const passwordSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email' }),
  password: z.string().min(1, { message: 'Enter your password' }),
});

const magicSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email' }),
});

type PasswordForm = z.infer<typeof passwordSchema>;
type MagicForm = z.infer<typeof magicSchema>;

const extractErrorMessage = (err: unknown) => {
  if (typeof err === 'object' && err !== null && 'response' in err) {
    const response = (err as { response?: { data?: { message?: string } } }).response;
    if (response?.data?.message) return response.data.message;
  }
  return null;
};

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'magic' | 'password'>('magic');
  const [error, setError] = useState<string | null>(null);
  const [linkMessage, setLinkMessage] = useState<string | null>(null);
  const [rateLimitMessage, setRateLimitMessage] = useState<string | null>(null);
  const [isCooldown, setIsCooldown] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const emailFocusRef = useRef<HTMLInputElement | null>(null);

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { isSubmitting: isPasswordSubmitting, errors: passwordErrors },
  } = useForm<PasswordForm>({ resolver: makeZodResolver(passwordSchema) });

  const {
    register: registerMagic,
    handleSubmit: handleMagicSubmit,
    setFocus,
    formState: { isSubmitting: isMagicSubmitting, errors: magicErrors },
  } = useForm<MagicForm>({ resolver: makeZodResolver(magicSchema) });

  const { ref: magicEmailRef, ...magicEmailField } = registerMagic('email');

  useEffect(() => {
    if (mode === 'magic' && emailFocusRef.current) {
      setFocus('email');
      emailFocusRef.current.focus();
    }
  }, [mode, setFocus]);

  const onPasswordSubmit = async (data: PasswordForm) => {
    setError(null);
    try {
      const response = await api.post('/auth/login', data);
      saveTokens(response.data.accessToken, response.data.refreshToken);
      const me = await api.get('/auth/me');
      if (me.data?.name) {
        saveDisplayName(me.data.name);
      }
      router.push('/dashboard');
    } catch (err) {
      setError(extractErrorMessage(err) || 'Login failed');
    }
  };

  const onMagicSubmit = async (data: MagicForm) => {
    if (isCooldown) {
      setRateLimitMessage('Please wait a moment before trying again.');
      return;
    }

    setLinkMessage(null);
    setRateLimitMessage(null);
    // Simulated secure link dispatch. Replace with backend call when available.
    await new Promise((resolve) => setTimeout(resolve, 900));
    setLinkMessage(`Secure link sent to ${data.email}. One-time link, expires in 10 minutes.`);
    setIsCooldown(true);
    setTimeout(() => {
      setIsCooldown(false);
      setRateLimitMessage(null);
    }, 5000);
  };

  const socialProviders = [
    { name: 'Google', accent: 'bg-white text-slate-900 border-slate-200', icon: 'G' },
    { name: 'Apple', accent: 'bg-white text-slate-900 border-slate-200', icon: '' },
    { name: 'LinkedIn', accent: 'bg-white text-slate-900 border-slate-200', icon: 'in' },
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-3 text-lg font-semibold text-slate-900">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-indigo-600 shadow-sm">
            <span className="text-base">NM</span>
          </div>
          <div className="leading-tight">
            <div className="text-sm text-slate-500">NeoxMeet</div>
            <div className="text-base text-slate-900">Secure access</div>
          </div>
        </Link>
        <div className="flex items-center gap-4 text-sm text-slate-600">
          <Link href="/" className="underline-offset-4 transition hover:text-indigo-600 hover:underline">
            Back to site
          </Link>
          <button
            type="button"
            onClick={() => setHelpOpen(true)}
            className="rounded-md border border-slate-200 bg-white px-3 py-1 transition hover:border-indigo-200 hover:text-indigo-700"
          >
            Help
          </button>
        </div>
      </header>

      <section className="px-6 pb-16">
        <div className="mx-auto flex max-w-5xl flex-col gap-8">
          <div className="mx-auto flex max-w-4xl items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs text-slate-600 shadow-sm">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">⚡</span>
            <p className="flex-1 text-center sm:text-left">SSO-ready • Encrypted sessions • No password stored with social login</p>
          </div>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
            <div className="w-full lg:max-w-lg">
              <div className="rounded-2xl border border-slate-200 bg-white shadow-lg">
                <div className="space-y-6 p-8">
                <div className="space-y-1">
                  <h1 className="text-3xl font-semibold text-slate-900">Sign in</h1>
                  <p className="text-sm text-slate-600">Fast, secure access to NeoxMeet.</p>
                </div>

                <div className="space-y-3">
                  {socialProviders.map((provider) => (
                    <button
                      key={provider.name}
                      type="button"
                      className={`flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm font-semibold shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${provider.accent}`}
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-base font-bold text-slate-900 ring-1 ring-slate-100">
                        {provider.icon}
                      </span>
                      <span className="flex-1 text-center">Continue with {provider.name}</span>
                      <span className="text-xs text-slate-500">Enterprise SSO</span>
                    </button>
                  ))}
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-3 rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-800 shadow-sm transition hover:border-indigo-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-base font-bold text-indigo-700 ring-1 ring-slate-100">
                      ↗
                    </span>
                    <span className="flex-1 text-center">Use work SSO</span>
                    <span className="text-xs text-indigo-600">SAML / OIDC</span>
                  </button>
                </div>

                <p className="text-xs text-slate-500">We never share your calendar or contacts without permission.</p>

                <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  <div className="h-px flex-1 bg-slate-200" />
                  <span>or sign in with email</span>
                  <div className="h-px flex-1 bg-slate-200" />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setMode('magic');
                    setTimeout(() => emailFocusRef.current?.focus(), 50);
                  }}
                  className="text-left text-sm font-medium text-indigo-700 underline underline-offset-4 transition hover:text-indigo-500"
                >
                  Signing in for a company? Use your work email →
                </button>

                {mode === 'magic' ? (
                  <form onSubmit={handleMagicSubmit(onMagicSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Email address</label>
                      <input
                        type="email"
                        {...magicEmailField}
                        ref={(el) => {
                          magicEmailRef(el);
                          emailFocusRef.current = el;
                        }}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 transition focus-visible:border-indigo-300 focus-visible:ring-2 focus-visible:ring-indigo-200"
                        placeholder="you@company.com"
                      />
                      {magicErrors.email && <p className="text-xs text-red-500">{magicErrors.email.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <button
                        type="submit"
                        disabled={isMagicSubmitting || isCooldown}
                        className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {isMagicSubmitting ? 'Sending secure link…' : 'Send secure link'}
                      </button>
                      <p className="text-xs text-slate-500">One-time link, expires in 10 minutes. No password required.</p>
                      {linkMessage && <p className="text-xs font-medium text-emerald-600">{linkMessage}</p>}
                      {rateLimitMessage && <p className="text-xs text-amber-600">{rateLimitMessage}</p>}
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => setMode('password')}
                        className="text-sm font-semibold text-indigo-700 underline underline-offset-4 transition hover:text-indigo-500"
                      >
                        Use password instead
                      </button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Email</label>
                      <input
                        type="email"
                        {...registerPassword('email')}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 transition focus-visible:border-indigo-300 focus-visible:ring-2 focus-visible:ring-indigo-200"
                        placeholder="you@company.com"
                      />
                      {passwordErrors.email && <p className="text-xs text-red-500">{passwordErrors.email.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Password</label>
                      <input
                        type="password"
                        {...registerPassword('password')}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 transition focus-visible:border-indigo-300 focus-visible:ring-2 focus-visible:ring-indigo-200"
                        placeholder="••••••••"
                      />
                      {passwordErrors.password && <p className="text-xs text-red-500">{passwordErrors.password.message}</p>}
                    </div>
                    {error && <p className="text-sm text-red-500">{error}</p>}
                    <div className="space-y-2">
                      <button
                        type="submit"
                        disabled={isPasswordSubmitting}
                        className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-70"
                      >
                        {isPasswordSubmitting ? 'Signing in…' : 'Sign in'}
                      </button>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-indigo-700">
                        <Link href="#" className="underline underline-offset-4 hover:text-indigo-500">
                          Forgot password?
                        </Link>
                        <button
                          type="button"
                          onClick={() => setMode('magic')}
                          className="underline underline-offset-4 hover:text-indigo-500"
                        >
                          Use email link instead
                        </button>
                      </div>
                    </div>
                  </form>
                )}

                <div className="flex flex-col gap-3 border-t border-slate-200 pt-4 text-xs text-slate-500">
                  <p>New device? We may ask for a verification code.</p>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold text-slate-700">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" /> Encrypted in transit (TLS)
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold text-slate-700">
                      <span className="h-2 w-2 rounded-full bg-indigo-500" /> Session protection
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold text-slate-700">
                      <span className="h-2 w-2 rounded-full bg-cyan-500" /> Privacy-first
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">By continuing, you agree to Terms and Privacy.</p>
                </div>
              </div>
            </div>
          </div>

          <aside className="w-full lg:max-w-md">
            <div className="sticky top-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
              <div className="space-y-6">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-slate-900">
                  <div className="mb-3 flex items-center justify-between text-xs text-slate-600">
                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1">Live session</span>
                    <span className="text-emerald-600">Protected</span>
                  </div>
                  <div className="space-y-2 text-sm text-slate-800">
                    <div className="flex items-center justify-between rounded-lg bg-white px-3 py-2 ring-1 ring-slate-200">
                      <span>Rotating refresh</span>
                      <span className="text-emerald-600">On</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-white px-3 py-2 ring-1 ring-slate-200">
                      <span>Suspicious login</span>
                      <span className="text-amber-600">Monitoring</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-white px-3 py-2 ring-1 ring-slate-200">
                      <span>Audit trail</span>
                      <span className="text-indigo-700">Enterprise</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 text-slate-700">
                  <h3 className="text-lg font-semibold text-slate-900">Security-first, zero friction</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-emerald-600" />
                      <span>Protected sessions (rotating refresh tokens)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-amber-500" />
                      <span>Suspicious login detection</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-indigo-600" />
                      <span>Audit-ready access logs (Enterprise)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-cyan-600" />
                      <span>Enable 2-step verification after sign-in</span>
                    </li>
                  </ul>
                  <p className="text-xs text-slate-500">Secure cookies, PKCE-ready OAuth, and device trust built in.</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {helpOpen && (
        <div className="fixed inset-0 z-20 flex items-start justify-center bg-slate-900/30 px-4 py-10 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl shadow-indigo-200">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-900">Need help?</p>
                <p className="text-xs text-slate-600">We respond within minutes during business hours.</p>
              </div>
              <button
                type="button"
                className="rounded-full border border-slate-200 px-2 py-1 text-xs text-slate-500 hover:border-indigo-200 hover:text-indigo-700"
                onClick={() => setHelpOpen(false)}
              >
                Close
              </button>
            </div>
            <div className="mt-4 space-y-3 text-sm text-slate-700">
              <p>• Having trouble with SSO? Try your work email and we’ll route you.</p>
              <p>• For password resets, choose “Use email link instead”.</p>
              <p>• Security questions? security@neoxmeet.com</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
