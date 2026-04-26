"use client";

import { useEffect, useMemo, useState } from "react";
import { Cursor } from "./Cursor";

/**
 * Session line variants. Kept as plain data so this client component can
 * receive them from a server component without serialization issues.
 */
export type SessionLine =
  | { type: "prompt"; command: string }
  | { type: "text"; lines: string[] }
  | {
      type: "links";
      entries: { label: string; href: string; display: string }[];
    };

type TypedSessionProps = {
  lines: SessionLine[];
  /** Prompt prefix shown before each command. */
  prompt?: { user: string; host: string; cwd: string };
  /** ms per typed character. Lower = faster. */
  charDelayMs?: number;
  /** ms held after a prompt finishes typing before its output appears. */
  outputDelayMs?: number;
  /** ms held after each completed line group before moving on. */
  groupDelayMs?: number;
};

const DEFAULT_PROMPT = { user: "mahir", host: "portfolio", cwd: "~" } as const;

export function TypedSession({
  lines,
  prompt = DEFAULT_PROMPT,
  charDelayMs = 18,
  outputDelayMs = 140,
  groupDelayMs = 220,
}: TypedSessionProps) {
  // The animated step list. Each step describes a single visible state
  // we should hold for `delay` ms before moving to the next one. Computed
  // once so the timing is deterministic and easy to reason about.
  const steps = useMemo(
    () => buildSteps(lines, charDelayMs, outputDelayMs, groupDelayMs),
    [lines, charDelayMs, outputDelayMs, groupDelayMs],
  );

  const [phase, setPhase] = useState<"static" | "animating" | "done">("static");
  const [stepIdx, setStepIdx] = useState(0);

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      // Skip animation entirely — keep the static SSR render.
      return;
    }

    setPhase("animating");
    setStepIdx(0);
  }, []);

  useEffect(() => {
    if (phase !== "animating") return;
    if (stepIdx >= steps.length) {
      setPhase("done");
      return;
    }
    const t = setTimeout(() => setStepIdx((i) => i + 1), steps[stepIdx].delay);
    return () => clearTimeout(t);
  }, [phase, stepIdx, steps]);

  // The server-rendered (and reduced-motion) static render shows everything.
  if (phase === "static") {
    return (
      <div className="space-y-6">
        {lines.map((line, i) => (
          <LineGroup
            key={i}
            line={line}
            promptInfo={prompt}
            commandTyped={
              line.type === "prompt" ? line.command.length : undefined
            }
            outputVisible
          />
        ))}
        <FreshPrompt promptInfo={prompt} />
      </div>
    );
  }

  // Animated render: derive what to show from the current step.
  const visible = computeVisible(lines, steps, stepIdx);

  return (
    <div className="space-y-6">
      {lines.map((line, i) => {
        const state = visible[i];
        if (!state) return null;
        return (
          <LineGroup
            key={i}
            line={line}
            promptInfo={prompt}
            commandTyped={state.commandTyped}
            outputVisible={state.outputVisible}
            cursorOnCommand={state.cursorOnCommand}
          />
        );
      })}
      {phase === "done" && <FreshPrompt promptInfo={prompt} />}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step planning                                                       */
/* ------------------------------------------------------------------ */

type Step = {
  /** Index of the line this step belongs to. */
  lineIdx: number;
  /** How many chars of the prompt command are typed (only for prompt lines). */
  commandTyped?: number;
  /** Whether the output for this line is visible. */
  outputVisible: boolean;
  /** ms to wait before advancing past this step. */
  delay: number;
};

function buildSteps(
  lines: SessionLine[],
  charDelay: number,
  outputDelay: number,
  groupDelay: number,
): Step[] {
  const steps: Step[] = [];

  lines.forEach((line, lineIdx) => {
    if (line.type === "prompt") {
      // Type each character of the command.
      for (let i = 1; i <= line.command.length; i++) {
        steps.push({
          lineIdx,
          commandTyped: i,
          outputVisible: false,
          delay: charDelay,
        });
      }
      // Hold the completed prompt briefly before its output appears.
      // (For trailing prompts with no output, this acts as a small breath.)
      steps.push({
        lineIdx,
        commandTyped: line.command.length,
        outputVisible: false,
        delay: outputDelay,
      });
    } else {
      // Reveal the output for the previous prompt.
      steps.push({
        lineIdx,
        outputVisible: true,
        delay: groupDelay,
      });
    }
  });

  return steps;
}

type VisibleState = {
  commandTyped?: number;
  outputVisible: boolean;
  cursorOnCommand?: boolean;
};

/**
 * Given the planned steps and the current index, compute the visibility
 * state for every line. We replay all steps up to (and including) the
 * current one so each line accumulates its final state.
 */
function computeVisible(
  lines: SessionLine[],
  steps: Step[],
  stepIdx: number,
): Record<number, VisibleState> {
  const visible: Record<number, VisibleState> = {};

  // Initialise prompt lines as "starting to type" so they reserve their row.
  lines.forEach((line, i) => {
    if (line.type === "prompt") {
      visible[i] = { commandTyped: 0, outputVisible: false };
    }
  });

  for (let i = 0; i <= stepIdx && i < steps.length; i++) {
    const step = steps[i];
    const existing = visible[step.lineIdx] ?? { outputVisible: false };
    visible[step.lineIdx] = {
      ...existing,
      commandTyped: step.commandTyped ?? existing.commandTyped,
      outputVisible: step.outputVisible || existing.outputVisible,
    };
  }

  // Place the live cursor on the most recent prompt line that's still typing.
  const activeStep = steps[Math.min(stepIdx, steps.length - 1)];
  if (activeStep) {
    const line = lines[activeStep.lineIdx];
    if (line?.type === "prompt") {
      visible[activeStep.lineIdx] = {
        ...visible[activeStep.lineIdx],
        cursorOnCommand: true,
      };
    }
  }

  return visible;
}

/* ------------------------------------------------------------------ */
/* Renderers                                                           */
/* ------------------------------------------------------------------ */

type PromptInfo = { user: string; host: string; cwd: string };

function LineGroup({
  line,
  promptInfo,
  commandTyped,
  outputVisible,
  cursorOnCommand,
}: {
  line: SessionLine;
  promptInfo: PromptInfo;
  commandTyped?: number;
  outputVisible: boolean;
  cursorOnCommand?: boolean;
}) {
  if (line.type === "prompt") {
    const shown = line.command.slice(0, commandTyped ?? line.command.length);
    return (
      <p className="leading-relaxed">
        <PromptPrefix info={promptInfo} />
        <span className="text-ink">{shown}</span>
        {cursorOnCommand && <Cursor className="ml-0.5" />}
      </p>
    );
  }

  if (!outputVisible) return null;

  if (line.type === "text") {
    return (
      <div className="space-y-1 text-ink">
        {line.lines.map((l, i) => (
          <p key={i} className="leading-relaxed">
            {l}
          </p>
        ))}
      </div>
    );
  }

  return (
    <ul className="space-y-1 text-ink">
      {line.entries.map((entry) => (
        <li key={entry.label} className="leading-relaxed">
          <span className="inline-block w-24 text-ink-muted">
            {entry.label}
          </span>
          <a
            href={entry.href}
            target={entry.href.startsWith("http") ? "_blank" : undefined}
            rel={
              entry.href.startsWith("http") ? "noopener noreferrer" : undefined
            }
            className="text-accent hover:underline underline-offset-4"
          >
            {entry.display}
          </a>
        </li>
      ))}
    </ul>
  );
}

function PromptPrefix({ info }: { info: PromptInfo }) {
  return (
    <>
      <span className="text-accent">
        {info.user}@{info.host}
      </span>
      <span className="text-ink-muted">:</span>
      <span className="text-ink">{info.cwd}</span>
      <span className="text-ink-muted">$ </span>
    </>
  );
}

function FreshPrompt({ promptInfo }: { promptInfo: PromptInfo }) {
  return (
    <p className="leading-relaxed">
      <PromptPrefix info={promptInfo} />
      <Cursor />
    </p>
  );
}
