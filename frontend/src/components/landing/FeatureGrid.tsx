import type { ReactNode } from 'react';
import { GlassCard } from './GlassCard';

interface Feature {
  title: string;
  description: string;
  badge?: string;
  content?: ReactNode;
}

interface FeatureGridProps {
  features: Feature[];
  columns?: 2 | 3;
}

export function FeatureGrid({ features, columns = 3 }: FeatureGridProps) {
  return (
    <div className={`grid gap-6 sm:grid-cols-2 ${columns === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'}`}>
      {features.map((feature) => (
        <GlassCard key={feature.title} className="h-full space-y-3">
          {feature.badge && (
            <span className="inline-flex rounded-full border border-white/15 px-3 py-1 text-xs uppercase tracking-[0.25em] text-white/60">
              {feature.badge}
            </span>
          )}
          <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
          <p className="text-base text-white/70">{feature.description}</p>
          {feature.content && <div className="text-sm text-white/80">{feature.content}</div>}
        </GlassCard>
      ))}
    </div>
  );
}
