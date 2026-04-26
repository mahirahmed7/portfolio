import type { ComponentProps } from "react";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";

/**
 * Long-form MDX styling. Stays monospace, but loosens line-height and adds
 * vertical rhythm so case-study prose is comfortable to read.
 */
export const mdxComponents: NonNullable<MDXRemoteProps["components"]> = {
  h1: (props: ComponentProps<"h1">) => (
    <h1
      className="mt-12 mb-4 text-2xl font-semibold tracking-tight text-ink first:mt-0"
      {...props}
    />
  ),
  h2: (props: ComponentProps<"h2">) => (
    <h2
      className="mt-10 mb-3 text-xl font-semibold tracking-tight text-ink"
      {...props}
    />
  ),
  h3: (props: ComponentProps<"h3">) => (
    <h3
      className="mt-8 mb-2 text-base font-semibold tracking-tight text-ink"
      {...props}
    />
  ),
  p: (props: ComponentProps<"p">) => (
    <p className="my-4 leading-7 text-ink" {...props} />
  ),
  a: (props: ComponentProps<"a">) => {
    const isExternal =
      typeof props.href === "string" && /^https?:\/\//.test(props.href);
    return (
      <a
        className="text-accent underline-offset-4 hover:underline"
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        {...props}
      />
    );
  },
  ul: (props: ComponentProps<"ul">) => (
    <ul className="my-4 list-disc space-y-1 pl-6 marker:text-ink-dim" {...props} />
  ),
  ol: (props: ComponentProps<"ol">) => (
    <ol className="my-4 list-decimal space-y-1 pl-6 marker:text-ink-dim" {...props} />
  ),
  li: (props: ComponentProps<"li">) => (
    <li className="leading-7 text-ink" {...props} />
  ),
  blockquote: (props: ComponentProps<"blockquote">) => (
    <blockquote
      className="my-6 border-l-2 border-ink-dim pl-4 text-ink-muted italic"
      {...props}
    />
  ),
  hr: (props: ComponentProps<"hr">) => (
    <hr className="my-10 border-0 border-t border-dashed border-ink-dim" {...props} />
  ),
  code: (props: ComponentProps<"code">) => (
    <code
      className="rounded bg-bg-soft px-1.5 py-0.5 text-[0.92em] text-accent"
      {...props}
    />
  ),
  pre: (props: ComponentProps<"pre">) => (
    <pre
      className="my-6 overflow-x-auto rounded border border-ink-dim/40 bg-bg-soft p-4 text-sm leading-6 text-ink"
      {...props}
    />
  ),
  strong: (props: ComponentProps<"strong">) => (
    <strong className="font-semibold text-ink" {...props} />
  ),
  em: (props: ComponentProps<"em">) => (
    <em className="text-ink" {...props} />
  ),
};
