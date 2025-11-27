'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/utils';
import { HeaderCTA, OutlineCTA } from './CTAs';

const resources = [
  { title: "Centre d'aide", description: 'Support et guides en continu', href: '#help' },
  { title: 'Documentation', description: 'API, SDK et onboarding', href: '#docs' },
  { title: 'Statut', description: 'Disponibilité en temps réel', href: '#status' },
  { title: 'Blog', description: 'Actualités produit et équipe', href: '#blog' },
  { title: 'Guides', description: 'Playbooks et bonnes pratiques', href: '#guides' },
];

const links = [
  { label: 'Produit', href: '#product' },
  { label: 'Sécurité', href: '#security' },
  { label: 'Tarifs', href: '#pricing' },
  { label: 'Ressources', href: '#resources', dropdown: resources },
  { label: 'Contact', href: '#contact' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
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
    if (!resourcesOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setResourcesOpen(false);
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [resourcesOpen]);

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

  return (
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

        <nav className="relative hidden items-center gap-4 text-[14px] font-medium text-slate-700 lg:flex">
          {links.map((link) => (
            <div
              key={link.label}
              className="relative flex items-center"
              onMouseEnter={() => link.dropdown && setResourcesOpen(true)}
              onMouseLeave={() => link.dropdown && setResourcesOpen(false)}
            >
              {link.dropdown ? (
                <>
                  <button
                    onClick={() => setResourcesOpen((open) => !open)}
                    onFocus={() => setResourcesOpen(true)}
                    className={cn(
                      'relative inline-flex items-center gap-1 rounded-full px-3 py-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200',
                      resourcesOpen
                        ? 'text-slate-900 underline decoration-indigo-200 underline-offset-[10px]'
                        : 'hover:text-slate-900 hover:underline hover:underline-offset-[10px]',
                    )}
                    aria-expanded={resourcesOpen}
                  >
                    {link.label}
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" className="text-slate-500">
                      <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {resourcesOpen && (
                    <div
                      className="absolute left-1/2 top-[120%] w-[300px] -translate-x-1/2 rounded-2xl border border-slate-200/80 bg-white/95 p-2 shadow-[0_28px_80px_-48px_rgba(15,23,42,0.55)] backdrop-blur-xl"
                      role="menu"
                    >
                      <div className="flex flex-col divide-y divide-slate-100/80">
                        {resources.map((item) => (
                          <a
                            key={item.title}
                            href={item.href}
                            className="group flex min-h-[44px] flex-col rounded-xl px-3 py-3 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200"
                            role="menuitem"
                          >
                            <span className="flex items-center justify-between text-sm font-semibold text-slate-900">
                              {item.title}
                              <span className="text-slate-300 transition group-hover:text-indigo-400">→</span>
                            </span>
                            <span className="text-[12px] text-slate-500">{item.description}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <a
                  href={link.href}
                  className="group relative rounded-full px-3 py-2 transition hover:bg-white/70 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200"
                >
                  <span className="absolute inset-x-3 bottom-1 h-[1px] scale-x-0 bg-slate-300 transition group-hover:scale-x-100" aria-hidden />
                  {link.label}
                </a>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-3 py-1 text-[11px] font-semibold text-slate-700 shadow-sm shadow-indigo-100/50 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
            Disponibilité 99,9 %
          </div>
          <a
            className="rounded-full px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200"
            href="/login"
          >
            Connexion
          </a>
          <a
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-indigo-600 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50/80 hover:shadow-md hover:shadow-indigo-100/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200"
            href="/register"
          >
            S’inscrire
          </a>
          <OutlineCTA href="/dashboard" className="h-10 px-5 text-sm">
            Lancer une réunion
          </OutlineCTA>
          <HeaderCTA
            href="/register"
            className="h-10 items-center gap-2 bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 text-white shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-400/30"
          >
            Réserver une démo
          </HeaderCTA>
        </div>

        <button
          className="rounded-full border border-slate-200 bg-white/80 p-2 text-slate-900 shadow-sm backdrop-blur lg:hidden"
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
              <button onClick={() => setMenuOpen(false)} aria-label="Fermer le menu" className="rounded-full border border-slate-200 bg-white/80 p-2 shadow-sm">
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
              <a
                href="/register"
                className="flex h-11 w-full items-center justify-center rounded-full border border-slate-200 bg-white/70 text-[15px] font-semibold text-indigo-700 transition hover:border-indigo-200 hover:bg-indigo-50"
              >
                S’inscrire
              </a>
              <a className="block text-center text-[15px] font-semibold text-slate-700 underline decoration-slate-300" href="/login">
                Connexion
              </a>
              <OutlineCTA href="/dashboard" className="w-full justify-center text-[15px]">
                Lancer une réunion
              </OutlineCTA>
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
  );
}
