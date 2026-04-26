type PromptProps = {
  /** What's typed after the `$`. */
  command: string;
  /**
   * The user@host:path portion. Defaults to the same prompt used across
   * the site so it reads as a single contiguous session.
   */
  user?: string;
  host?: string;
  cwd?: string;
};

/**
 * Renders a single line styled as `user@host:cwd$ command`.
 * Kept presentational — animation/typing is composed on top by callers.
 */
export function Prompt({
  command,
  user = "mahir",
  host = "portfolio",
  cwd = "~",
}: PromptProps) {
  return (
    <p className="font-mono leading-relaxed">
      <span className="text-accent">
        {user}@{host}
      </span>
      <span className="text-ink-muted">:</span>
      <span className="text-ink">{cwd}</span>
      <span className="text-ink-muted">$ </span>
      <span className="text-ink">{command}</span>
    </p>
  );
}
