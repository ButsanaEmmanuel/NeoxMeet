'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/utils';
import { AuthModal, type AuthMode } from './AuthModal';
import { HeaderCTA } from './CTAs';

type HeaderProps = {
  onDemoClick?: () => void;
};

const links = [
  { label: 'Produit', href: '#product' },
  { label: 'Sécurité', href: '#security' },
  { label: 'Tarifs', href: '#pricing' },
];

export function Header({ onDemoClick }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const menuRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    previousFocus.current = document.activeElement as HTMLElement;
    const focusable = menuRef.current?.querySelectorAll<HTMLElement>('a, button');
    focusable?.[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
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

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previousFocus.current?.focus();
    };
  }, [menuOpen]);

  const openAuthModal = (mode: AuthMode) => {
    setAuthMode(mode);
    setAuthOpen(true);
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 border-b border-slate-200/70 transition-all backdrop-blur-lg',
          scrolled ? 'bg-white/92 shadow-[0_10px_30px_-22px_rgba(15,23,42,0.45)]' : 'bg-white/75',
        )}
      >
        <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-6">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-full px-2 py-1 font-semibold text-slate-900 transition hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-sky-500 text-lg font-black text-white shadow-lg shadow-indigo-200/60">
              N
            </div>
            <span className="text-lg tracking-tight">NeoxMeet</span>
          </Link>

          <nav className="relative hidden items-center gap-2 text-[14px] font-medium text-slate-700 lg:flex">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group relative inline-flex items-center whitespace-nowrap rounded-full px-4 py-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200"
              >
                <span className="absolute inset-x-4 bottom-1 h-[2px] scale-x-0 rounded-full bg-indigo-300 transition group-hover:scale-x-100" aria-hidden />
                <span className="transition group-hover:text-slate-900">{link.label}</span>
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 whitespace-nowrap lg:flex">
            <div className="inline-flex shrink-0 items-center gap-2 rounded-full border border-slate-200/80 bg-white/85 px-3 py-1 text-[11px] font-semibold text-slate-700 shadow-sm shadow-indigo-100/50 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
              Disponibilité 99,9 %
            </div>
            <button
              className="rounded-full px-3 py-2 text-[14px] font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200"
              onClick={() => openAuthModal('login')}
              type="button"
            >
              Connexion
            </button>
            <button
              className="rounded-full border border-slate-200 px-4 py-2 text-[14px] font-semibold text-indigo-600 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50/80 hover:shadow-md hover:shadow-indigo-100/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200"
              onClick={() => openAuthModal('signup')}
              type="button"
            >
              S’inscrire
            </button>
            <HeaderCTA
              href="/register"
              className="h-11 shrink-0 items-center gap-2 bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 px-5 text-[14px] text-white shadow-md shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-400/30"
            >
              Réserver une démo
            </HeaderCTA>
          </div>

          <button
            className="rounded-full border border-slate-200 bg-white/80 p-2 text-slate-900 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 lg:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 6h14M3 10h14M3 14h14" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="fixed inset-0 z-50 bg-black/40" onClick={() => setMenuOpen(false)}>
            <div
              ref={menuRef}
              className="absolute inset-y-0 right-0 flex w-[360px] max-w-full flex-col gap-8 border-l border-slate-200 bg-white/90 px-6 py-8 text-slate-900 shadow-2xl backdrop-blur"
              role="dialog"
              aria-modal="true"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">Menu</span>
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Fermer le menu"
                  className="rounded-full border border-slate-200 bg-white/80 p-2 shadow-sm transition hover:-translate-y-0.5 hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4 text-sm">
                <HeaderCTA
                  href="/register"
                  className="flex w-full justify-center gap-2 bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 text-white shadow-md shadow-indigo-400/20"
                >
                  Réserver une démo
                </HeaderCTA>
                <button
                  onClick={() => openAuthModal('signup')}
                  className="flex h-11 w-full items-center justify-center rounded-full border border-slate-200 bg-white/70 text-[15px] font-semibold text-indigo-700 transition hover:border-indigo-200 hover:bg-indigo-50"
                  type="button"
                >
                  S’inscrire
                </button>
                <button
                  className="block text-center text-[15px] font-semibold text-slate-700 underline decoration-slate-300"
                  onClick={() => openAuthModal('login')}
                  type="button"
                >
                  Connexion
                </button>
              </div>

              <div className="space-y-6 text-base">
                <div className="flex flex-col gap-3">
                  {links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex min-h-[48px] items-center justify-between rounded-2xl px-3 py-3 text-slate-700 transition hover:bg-slate-100/80 hover:text-slate-900"
                    >
                      <span>{link.label}</span>
                      <span className="text-slate-300">→</span>
                    </a>
                  ))}
                </div>
                <div className="space-y-3 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 text-sm text-slate-700 shadow-sm">
                  <div className="flex items-center gap-2 font-semibold text-slate-800">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
                    Disponibilité 99,9 %
                  </div>
                  <p className="text-[13px] leading-relaxed text-slate-600">
                    Chiffrement • Rôles &amp; SSO • Journal d’audit
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      <AuthModal isOpen={authOpen} mode={authMode} onClose={() => setAuthOpen(false)} onModeChange={setAuthMode} />
    </>
  );
}
