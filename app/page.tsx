import { Shell } from "@/components/terminal/Shell";
import {
  TypedSession,
  type SessionLine,
} from "@/components/terminal/TypedSession";
import { getAllProjects } from "@/lib/projects";
import { site } from "@/lib/site";

export default async function Home() {
  const projects = await getAllProjects();

  const lines: SessionLine[] = [
    { type: "prompt", command: "whoami" },
    {
      type: "text",
      lines: [`${site.name} — ${site.oneLiner}`],
    },
    { type: "prompt", command: "cat about.txt" },
    { type: "text", lines: [...site.about] },
    { type: "prompt", command: "ls links/" },
    { type: "links", entries: [...site.links] },
    { type: "prompt", command: "ls work/" },
    {
      type: "links",
      entries: projects.map((project) => ({
        label: project.slug,
        href: `/work/${project.slug}`,
        display: `${project.frontmatter.title}/`,
      })),
    },
  ];

  return (
    <Shell>
      <TypedSession lines={lines} />
    </Shell>
  );
}
