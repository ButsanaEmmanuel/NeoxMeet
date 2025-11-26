import type { JSX, ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export function GlassCard({ children, className, as: Component = 'div' }: GlassCardProps) {
  return (
    <Component
      className={cn('rounded-[22px] border border-white/10 bg-[rgba(14,18,31,0.85)] p-6 shadow-[0_25px_70px_rgba(3,5,11,0.55)] backdrop-blur-lg', className)}
    >
      {children}
    </Component>
  );
}
