import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type ProjectFrontmatter = {
  title: string;
  summary: string;
  year?: number | string;
  role?: string;
  /** Optional list of links shown beneath the case-study header. */
  links?: { label: string; href: string }[];
};

export type Project = {
  slug: string;
  frontmatter: ProjectFrontmatter;
  /** Raw MDX source (no frontmatter). */
  source: string;
};

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

async function readProjectsDir(): Promise<string[]> {
  try {
    const entries = await fs.readdir(PROJECTS_DIR);
    // Only .mdx counts as a project. Plain .md files are treated as docs.
    return entries.filter((f) => f.endsWith(".mdx"));
  } catch (err: unknown) {
    // Directory may not exist yet — that's fine; just no projects.
    if (
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      (err as { code: string }).code === "ENOENT"
    ) {
      return [];
    }
    throw err;
  }
}

function slugFromFilename(filename: string): string {
  return filename.replace(/\.mdx$/, "");
}

export async function getAllProjectSlugs(): Promise<string[]> {
  const files = await readProjectsDir();
  return files.map(slugFromFilename);
}

export async function getProject(slug: string): Promise<Project | null> {
  const files = await readProjectsDir();
  const match = files.find((f) => slugFromFilename(f) === slug);
  if (!match) return null;

  const raw = await fs.readFile(path.join(PROJECTS_DIR, match), "utf8");
  const { data, content } = matter(raw);

  const frontmatter = data as Partial<ProjectFrontmatter>;
  if (!frontmatter.title || !frontmatter.summary) {
    throw new Error(
      `Project "${slug}" is missing required frontmatter (title, summary).`,
    );
  }

  return {
    slug,
    frontmatter: frontmatter as ProjectFrontmatter,
    source: content,
  };
}

export async function getAllProjects(): Promise<Project[]> {
  const slugs = await getAllProjectSlugs();
  const projects = await Promise.all(slugs.map((s) => getProject(s)));
  return projects.filter((p): p is Project => p !== null);
}
