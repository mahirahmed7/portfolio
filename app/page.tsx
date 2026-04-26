import { Cursor } from "@/components/terminal/Cursor";
import { Prompt } from "@/components/terminal/Prompt";
import { Shell } from "@/components/terminal/Shell";

export default function Home() {
  return (
    <Shell>
      <Prompt command="echo theme-ready" />
      <p className="mt-1 text-ink">
        theme-ready
        <Cursor className="ml-2" />
      </p>
    </Shell>
  );
}
