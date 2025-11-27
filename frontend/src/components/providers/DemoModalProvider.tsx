'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { DemoModal } from '../landing/DemoModal';

type DemoModalContextValue = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

const DemoModalContext = createContext<DemoModalContextValue | null>(null);

export function DemoModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ open, close, isOpen }), [close, isOpen, open]);

  return (
    <DemoModalContext.Provider value={value}>
      {children}
      <DemoModal open={isOpen} onClose={close} />
    </DemoModalContext.Provider>
  );
}

export function useDemoModal() {
  const context = useContext(DemoModalContext);
  if (!context) {
    throw new Error('useDemoModal must be used within a DemoModalProvider');
  }
  return context;
}
