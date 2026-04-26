import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,md,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Tasteful terminal palette: warm off-white ink on charcoal.
        bg: {
          DEFAULT: "#0d0f0e",
          soft: "#15181a",
        },
        ink: {
          DEFAULT: "#e6e1d3",
          muted: "#9aa0a6",
          dim: "#6b7280",
        },
        accent: {
          // Used sparingly for prompt host + links. Muted amber, not neon.
          DEFAULT: "#c9a26b",
        },
      },
      fontFamily: {
        mono: [
          "var(--font-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      typography: ({ theme }: { theme: (path: string) => string }) => ({
        terminal: {
          css: {
            "--tw-prose-body": theme("colors.ink.DEFAULT"),
            "--tw-prose-headings": theme("colors.ink.DEFAULT"),
            "--tw-prose-lead": theme("colors.ink.DEFAULT"),
            "--tw-prose-links": theme("colors.accent.DEFAULT"),
            "--tw-prose-bold": theme("colors.ink.DEFAULT"),
            "--tw-prose-counters": theme("colors.ink.muted"),
            "--tw-prose-bullets": theme("colors.ink.muted"),
            "--tw-prose-hr": theme("colors.ink.dim"),
            "--tw-prose-quotes": theme("colors.ink.muted"),
            "--tw-prose-quote-borders": theme("colors.ink.dim"),
            "--tw-prose-captions": theme("colors.ink.muted"),
            "--tw-prose-code": theme("colors.accent.DEFAULT"),
            "--tw-prose-pre-code": theme("colors.ink.DEFAULT"),
            "--tw-prose-pre-bg": theme("colors.bg.soft"),
            "--tw-prose-th-borders": theme("colors.ink.dim"),
            "--tw-prose-td-borders": theme("colors.ink.dim"),
          },
        },
      }),
    },
  },
  plugins: [],
};

export default config;
