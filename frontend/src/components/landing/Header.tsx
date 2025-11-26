'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/utils';

const links = [
  { label: 'Product', href: '#product' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Security', href: '#security' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Resources', href: '#resources' },
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
        'sticky top-0 z-50 transition-all',
        scrolled ? 'bg-[rgba(5,7,15,0.9)] backdrop-blur-lg border-b border-white/10' : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-white focus-visible:outline-none">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 text-lg font-black text-slate-950">
            N
          </div>
          <span className="text-lg tracking-tight">NeoxMeet</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-white/80 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition hover:text-white focus-visible:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a className="text-sm text-white/70 transition hover:text-white" href="/login">
            Log in
          </a>
          <a
            className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/90 transition hover:-translate-y-0.5 hover:text-white"
            href="/dashboard"
          >
            Start a meeting
          </a>
          <a
            className="rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-5 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 transition hover:shadow-violet-500/30"
            href="/register"
          >
            Book a demo
          </a>
        </div>

        <button
          className="rounded-full border border-white/20 p-2 text-white lg:hidden"
          onClick={() => setMenuOpen(true)}
          aria-label="Open navigation"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 6h14M3 10h14M3 14h14" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/80" onClick={() => setMenuOpen(false)}>
          <div
            ref={menuRef}
            className="absolute inset-y-0 right-0 flex w-80 max-w-full flex-col gap-6 border-l border-white/10 bg-[#070a14] px-6 py-8 text-white"
            role="dialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">Navigate</span>
              <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="rounded-full border border-white/20 p-2">
                ✕
              </button>
            </div>
            <div className="flex flex-col gap-4 text-base">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-2 py-2 text-white/80 transition hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="mt-auto flex flex-col gap-3 text-sm">
              <a className="rounded-full border border-white/20 px-4 py-2 text-center" href="/login">
                Log in
              </a>
              <a className="rounded-full border border-white/20 px-4 py-2 text-center" href="/dashboard">
                Start a meeting
              </a>
              <a className="rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-4 py-2 text-center font-semibold text-slate-950" href="/register">
                Book a demo
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
