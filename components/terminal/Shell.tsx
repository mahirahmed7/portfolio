import type { ReactNode } from "react";

type ShellProps = {
  children: ReactNode;
};

/**
 * Page-level container. No fake window chrome (red/yellow/green dots) — just
 * a calm, readable column at terminal-y line lengths.
 */
export function Shell({ children }: ShellProps) {
  return (
    <main className="mx-auto max-w-2xl px-5 py-12 sm:px-8 sm:py-20">
      {children}
    </main>
  );
}
