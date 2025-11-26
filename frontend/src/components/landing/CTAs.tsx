import React from 'react';
import { cn } from '../../lib/utils';

export function TrustStrip() {
  const items = [
    {
      label: 'Chiffrement',
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeLinecap="round" />
          <rect x="5.5" y="11" width="13" height="8.5" rx="2" />
          <path d="M12 14.5v1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      label: 'Rôles & SSO',
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <path
            d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M4.5 19.5c.7-2.3 3.5-3.5 7.5-3.5s6.8 1.2 7.5 3.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      label: 'Journal d’audit (Enterprise)',
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <path d="M8 4h9l2 2v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
          <path d="M14 4v4h4" strokeLinejoin="round" />
          <path d="M9.5 12.5H15" strokeLinecap="round" />
          <path d="M9.5 15.5h3" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <div className="mt-5 flex flex-wrap items-center gap-3 text-[13px] text-slate-700">
      {items.map((item) => (
        <span
          key={item.label}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-3.5 py-2 text-slate-700 shadow-[0_14px_36px_-26px_rgba(15,23,42,0.28)] backdrop-blur transition hover:border-indigo-100 hover:shadow-[0_18px_46px_-28px_rgba(79,70,229,0.32)]"
        >
          <span className="text-slate-500">{item.icon}</span>
          {item.label}
        </span>
      ))}
    </div>
  );
}

type ActionProps = {
  children: React.ReactNode;
  href?: string;
  className?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export function PrimaryCTA({ children, href, className, ...props }: ActionProps) {
  if (href) {
    return (
      <a
        href={href}
        className={cn(
          'relative inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 font-semibold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 shadow-lg shadow-indigo-500/20 transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-indigo-200 overflow-hidden',
          className,
        )}
        {...props}
      >
        <span
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
        >
          <span
            className="absolute -left-1/3 top-0 h-full w-1/3 rotate-12 bg-white/20 blur-md animate-[shine_1.2s_ease-in-out_infinite]"
          />
        </span>
        {children}
        <style jsx>{`
          @keyframes shine {
            0% { transform: translateX(0) rotate(12deg); }
            100% { transform: translateX(320%) rotate(12deg); }
          }
        `}</style>
      </a>
    );
  }

  return (
    <button
      type="button"
      className={cn(
        'relative inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 font-semibold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 shadow-lg shadow-indigo-500/20 transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-indigo-200 overflow-hidden',
        className,
      )}
      {...props}
    >
      <span
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
      >
        <span
          className="absolute -left-1/3 top-0 h-full w-1/3 rotate-12 bg-white/20 blur-md animate-[shine_1.2s_ease-in-out_infinite]"
        />
      </span>

      {children}
      <style jsx>{`
        @keyframes shine {
          0% { transform: translateX(0) rotate(12deg); }
          100% { transform: translateX(320%) rotate(12deg); }
        }
      `}</style>
    </button>
  );
}

export function HeaderCTA({ children, href, className, ...props }: ActionProps) {
  if (href) {
    return (
      <a
        href={href}
        className={cn(
          'h-10 rounded-full px-5 font-semibold border border-slate-200 bg-white text-slate-900 hover:bg-slate-50 transition inline-flex items-center justify-center',
          className,
        )}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={cn(
        'h-10 rounded-full px-5 font-semibold border border-slate-200 bg-white text-slate-900 hover:bg-slate-50 transition inline-flex items-center justify-center',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
