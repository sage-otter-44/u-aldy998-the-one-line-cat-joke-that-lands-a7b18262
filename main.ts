// The One-Line Cat Joke That Lands — program/v1
// Writes a single cat joke (one line, under 200 chars) to /output/entry.txt.
// Judge brief: setup + a turn that lands, surprise/misdirection, fresh angle,
// no padding, retellable to a friend the same day.

import { mkdirSync, writeFileSync } from "node:fs";

// The joke is built from beats so the setup and the turn stay separate:
// beat 1 sets the scene (cat + keyboard + job interview),
// beat 2 is the turn (the gibberish gets praised as honesty).
const BEATS = [
  "My cat walked across my keyboard during a job interview and typed 'asdkfj'",
  "the interviewer said it was the most honest answer he'd heard all day.",
] as const;

const MAX_CHARS = 200;
const SEPARATOR = " — ";

// Collapse any accidental double spaces and strip a trailing newline so the
// file holds exactly one line of joke and nothing else.
function normalize(text: string): string {
  return text.replace(/\s+/g, " ").replace(/\n+$/, "").trim();
}

const joke = normalize(BEATS.join(SEPARATOR));

function validate(text: string): void {
  if (text.length < 1 || text.length > MAX_CHARS) {
    throw new Error(`gate: length ${text.length} outside 1-${MAX_CHARS}`);
  }
  if (text.includes("\n") || text.trim().length === 0) {
    throw new Error("gate: must be a single non-blank line");
  }
  if (!/cat/i.test(text)) {
    throw new Error("gate: joke must be about a cat");
  }
}

validate(joke);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", joke, "utf8");
console.log(`wrote ${joke.length} chars: ${joke}`);
