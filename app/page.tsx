import { Shell } from "@/components/terminal/Shell";
import {
  TypedSession,
  type SessionLine,
} from "@/components/terminal/TypedSession";
import { site } from "@/lib/site";

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
];

export default function Home() {
  return (
    <Shell>
      <TypedSession lines={lines} />
    </Shell>
  );
}
