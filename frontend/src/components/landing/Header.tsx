'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/utils';
import { HeaderCTA, OutlineCTA } from './CTAs';

const links = [
  { label: 'Produit', href: '#product' },
  { label: 'Sécurité', href: '#security' },
  { label: 'Tarifs', href: '#pricing' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition-all',
        scrolled ? 'bg-white/95 shadow-sm backdrop-blur-lg' : 'bg-white/80 backdrop-blur',
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-slate-900 focus-visible:outline-none">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-sky-500 text-lg font-black text-white shadow-lg shadow-indigo-200/60">
            N
          </div>
          <span className="text-lg tracking-tight">NeoxMeet</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-slate-600 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-medium transition hover:text-slate-900 focus-visible:text-slate-900"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="rounded-full border border-slate-200/70 bg-white/80 px-3 py-1 text-[11px] font-semibold text-sky-700 shadow-sm backdrop-blur">
            Disponibilité 99,9%
          </div>
          <a className="text-sm font-medium text-slate-600 transition hover:text-slate-900" href="/login">
            Connexion
          </a>
          <OutlineCTA href="/dashboard" className="text-sm">
            Lancer une réunion
          </OutlineCTA>
          <HeaderCTA href="/register">Réserver une démo</HeaderCTA>
        </div>

        <button
          className="rounded-full border border-slate-200 p-2 text-slate-900 lg:hidden"
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
            className="absolute inset-y-0 right-0 flex w-80 max-w-full flex-col gap-6 border-l border-slate-200 bg-white px-6 py-8 text-slate-900 shadow-2xl"
            role="dialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">Menu</span>
              <button onClick={() => setMenuOpen(false)} aria-label="Fermer le menu" className="rounded-full border border-slate-200 p-2">
                ✕
              </button>
            </div>
            <div className="flex flex-col gap-4 text-base">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-2 py-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="mt-auto flex flex-col gap-3 text-sm">
              <div className="rounded-full border border-slate-200/70 bg-white/80 px-3 py-2 text-center text-[12px] font-semibold text-sky-700">
                Disponibilité 99,9%
              </div>
              <a className="rounded-full border border-slate-200 px-4 py-2 text-center" href="/login">
                Connexion
              </a>
              <OutlineCTA href="/dashboard" className="w-full justify-center">
                Lancer une réunion
              </OutlineCTA>
              <HeaderCTA href="/register" className="h-auto py-2 text-center">
                Réserver une démo
              </HeaderCTA>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
