type CursorProps = {
  /**
   * Render variant. "block" uses a styled div; "glyph" uses the █ character.
   * Defaults to "block" because it stays a consistent size across fonts.
   */
  variant?: "block" | "glyph";
  className?: string;
};

export function Cursor({ variant = "block", className = "" }: CursorProps) {
  if (variant === "glyph") {
    return (
      <span aria-hidden className={`cursor-glyph ${className}`}>
        █
      </span>
    );
  }

  return <span aria-hidden className={`cursor-block ${className}`} />;
}
