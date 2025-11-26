'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/utils';

const links = [
  { label: 'Produit', href: '#product' },
  { label: 'Fiabilité', href: '#reliability' },
  { label: 'Sécurité', href: '#security' },
  { label: 'Tarifs', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
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
          <a className="text-sm font-medium text-slate-600 transition hover:text-slate-900" href="/login">
            Connexion
          </a>
          <a
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:text-indigo-700"
            href="/dashboard"
          >
            Lancer une réunion
          </a>
          <a
            className="rounded-full bg-gradient-to-r from-indigo-600 to-sky-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-300/50 transition hover:shadow-indigo-300"
            href="/register"
          >
            Réserver une démo
          </a>
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
              <a className="rounded-full border border-slate-200 px-4 py-2 text-center" href="/login">
                Connexion
              </a>
              <a className="rounded-full border border-slate-200 px-4 py-2 text-center" href="/dashboard">
                Lancer une réunion
              </a>
              <a className="rounded-full bg-gradient-to-r from-indigo-600 to-sky-500 px-4 py-2 text-center font-semibold text-white" href="/register">
                Réserver une démo
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
