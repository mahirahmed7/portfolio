import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { Divider } from "@/components/terminal/Divider";
import { Prompt } from "@/components/terminal/Prompt";
import { Shell } from "@/components/terminal/Shell";
import { mdxComponents } from "@/components/terminal/mdx-components";
import { getAllProjectSlugs, getProject } from "@/lib/projects";

type RouteParams = { slug: string };

// Pre-render every project at build time. New MDX files require a redeploy.
export async function generateStaticParams(): Promise<RouteParams[]> {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};

  return {
    title: project.frontmatter.title,
    description: project.frontmatter.summary,
    openGraph: {
      title: project.frontmatter.title,
      description: project.frontmatter.summary,
      type: "article",
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const { frontmatter, source } = project;

  return (
    <Shell>
      <Prompt cwd="~/work" command={`cat ${slug}.md`} />

      <header className="mt-6">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">
          {frontmatter.title}
        </h1>

        <p className="mt-2 text-ink-muted">{frontmatter.summary}</p>

        {(frontmatter.role || frontmatter.year) && (
          <p className="mt-3 text-sm text-ink-dim">
            {[frontmatter.role, frontmatter.year].filter(Boolean).join(" · ")}
          </p>
        )}

        {frontmatter.links && frontmatter.links.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm">
            {frontmatter.links.map((link) => {
              const isExternal = /^https?:\/\//.test(link.href);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="text-accent underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </header>

      <Divider />

      <article>
        <MDXRemote source={source} components={mdxComponents} />
      </article>

      <Divider />

      <p className="text-ink-muted text-sm">
        <a href="/" className="text-accent underline-offset-4 hover:underline">
          ← back
        </a>
      </p>
    </Shell>
  );
}
