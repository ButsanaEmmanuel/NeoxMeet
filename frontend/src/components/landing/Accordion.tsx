'use client';

import { useState } from 'react';
import { cn } from '../../lib/utils';
import { GlassCard } from './GlassCard';

export interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const open = openIndex === index;
        return (
          <GlassCard key={item.question} className="p-0">
            <button
              className="flex w-full items-center justify-between px-6 py-4 text-left text-lg font-semibold text-white"
              onClick={() => setOpenIndex(open ? null : index)}
              aria-expanded={open}
              aria-controls={`faq-panel-${index}`}
            >
              {item.question}
              <span className="text-2xl text-white/60" aria-hidden="true">
                {open ? '−' : '+'}
              </span>
            </button>
            <div
              id={`faq-panel-${index}`}
              className={cn('px-6 pb-6 text-base text-white/70', open ? 'block' : 'hidden')}
            >
              {item.answer}
            </div>
          </GlassCard>
        );
      })}
    </div>
  );
}
