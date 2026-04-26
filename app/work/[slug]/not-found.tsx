import { Cursor } from "@/components/terminal/Cursor";
import { Prompt } from "@/components/terminal/Prompt";
import { Shell } from "@/components/terminal/Shell";

export default function ProjectNotFound() {
  return (
    <Shell>
      <Prompt cwd="~/work" command="cat $SLUG.md" />
      <p className="mt-2 text-ink">cat: no such file or directory</p>

      <p className="mt-6">
        <a href="/" className="text-accent underline-offset-4 hover:underline">
          ← back
        </a>
        <Cursor className="ml-2" />
      </p>
    </Shell>
  );
}
