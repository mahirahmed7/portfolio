type DividerProps = {
  /** A short label rendered in the middle of the divider, e.g. "links". */
  label?: string;
  className?: string;
};

/**
 * ASCII-style rule. Used sparingly between major sections so it still feels
 * like a terminal, not a banner.
 */
export function Divider({ label, className = "" }: DividerProps) {
  if (!label) {
    return (
      <hr
        aria-hidden
        className={`my-8 border-0 border-t border-dashed border-ink-dim ${className}`}
      />
    );
  }

  return (
    <div
      aria-hidden
      className={`my-8 flex items-center gap-3 text-ink-dim text-xs uppercase tracking-[0.2em] ${className}`}
    >
      <span className="h-px flex-1 bg-ink-dim/60" />
      <span>{label}</span>
      <span className="h-px flex-1 bg-ink-dim/60" />
    </div>
  );
}
