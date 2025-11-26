import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { GlassCard } from './GlassCard';

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  highlight?: boolean;
  children?: ReactNode;
}

export function PricingCard({ title, price, description, features, cta, highlight, children }: PricingCardProps) {
  return (
    <GlassCard
      className={cn(
        'flex h-full flex-col gap-4',
        highlight && 'border-white/30 bg-gradient-to-b from-white/10 to-transparent shadow-[0_30px_120px_rgba(56,189,248,0.25)]',
      )}
    >
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">{title}</p>
        <p className="mt-3 text-3xl font-semibold text-white">{price}</p>
        <p className="text-sm text-white/70">{description}</p>
      </div>
      <div className="space-y-2 text-sm text-white/80">
        {features.map((feature) => (
          <div key={feature} className="flex items-start gap-2">
            <span className="text-emerald-300">✔</span>
            <span>{feature}</span>
          </div>
        ))}
      </div>
      {children}
      <a
        className={cn(
          'mt-auto w-full rounded-2xl px-4 py-3 text-center text-sm font-semibold transition',
          highlight ? 'bg-white text-slate-900' : 'border border-white/20 text-white/80 hover:text-white',
        )}
        href="/register"
      >
        {cta}
      </a>
    </GlassCard>
  );
}
