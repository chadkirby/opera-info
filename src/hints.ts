import sbd from "sbd";
import { listString } from "@ckirby/mr-lister";
import type { TargetOpera, Hint } from "./types.js";
import {
  anonymize,
  anonymizeComposer,
  makeTitlePattern,
} from "./anonymizer.js";

export type HintlessTarget = Omit<TargetOpera, "hints">;

export async function makeHints(opera: HintlessTarget): Promise<Hint[]> {
  const composerHints = await makeComposerHints(opera);
  const recordingHints = await makeRecordingHints(opera);
  const rolesHints = await makeRolesHints(opera);
  const extractHints = await makeExtractHints(opera);
  const hints: Hint[] = [
    { category: "factoid", hint: await anonymize(opera.factoid, opera) },
  ];
  while (
    composerHints.length +
      recordingHints.length +
      rolesHints.length +
      extractHints.length >
    0
  ) {
    if (composerHints.length)
      hints.push({ category: "composer", hint: composerHints.shift()! });
    if (recordingHints.length)
      hints.push({ category: "recording", hint: recordingHints.shift()! });
    if (extractHints.length)
      hints.push({ category: "factoid", hint: extractHints.shift()! });
    if (rolesHints.length)
      hints.push({ category: "role", hint: rolesHints.pop()! });
  }
  return hints
    .filter((h) => h.hint && !/Cav\/Pag/.test(h.hint))
    .map((h) => ({ ...h, hint: h.hint.replace(/([,.;])\s+\1/g, "$1") }));
}

export function makeRecordingHints(opera: HintlessTarget): string[] {
  return opera.recordings.map(
    ({ year, cast, conductor }) =>
      `${anonymizeComposer(
        opera.composer,
        conductor
      )} conducted a ${year} recording of this opera that featured ${listString(
        cast.slice()
      )}.`
  );
}

export function makeRolesHints(opera: HintlessTarget): string[] {
  return opera.roles
    .filter((r) => r.voiceType && r.voiceType.split(/\s+/).length < 7)
    .filter((r) => !`${r.role} ${r.voiceType}`.includes(opera.title))
    .map(
      ({ role, voiceType }) =>
        `This opera features a ${
          /,/.test(voiceType) ? `"${voiceType}"` : voiceType
        } role ${role.split(/(?:,\s*)?\n/)[0]}.`
    );
}

export async function makeComposerHints(
  opera: HintlessTarget
): Promise<string[]> {
  const div = document.createElement("div");
  div.innerHTML = opera.composerSummary.extract_html;
  for (const b of Array.from(div.querySelectorAll("b"))) {
    b.textContent = "the composer";
  }
  const titlePattern = makeTitlePattern(opera.titles);
  const titleAmongCaps = new RegExp(
    `[A-Z]\\w+ ${titlePattern.source}|${titlePattern.source} [A-Z]\\w+`
  );

  const sentences = sbd
    .sentences(getText(div), {
      newline_boundaries: true,
    })
    .filter((s) => !titleAmongCaps.test(s));

  const hints = await Promise.all(sentences.map((s) => anonymize(s, opera)));
  return hints
    .map((s) => s.replace(/^the\b/, "The"))
    .map((s) => s.replace(/^He\b/, "The composer"))
    .map((s) => s.replace(/^His\b/, "The composer's"));
}

export async function makeExtractHints(
  opera: HintlessTarget
): Promise<string[]> {
  const div = document.createElement("div");
  div.innerHTML = opera.operaSummary.extract_html;

  for (const b of Array.from(div.querySelectorAll("b"))) {
    b.textContent = "this opera";
  }

  const titlePattern = makeTitlePattern(opera.titles);
  const titleAmongCaps = new RegExp(
    `[A-Z]\\w+ ${titlePattern.source}|${titlePattern.source} [A-Z]\\w+`
  );
  const sentences = sbd
    .sentences(getText(div), {
      newline_boundaries: true,
    })
    .filter((s) => !titleAmongCaps.test(s));

  const hints = await Promise.all(sentences.map((s) => anonymize(s, opera)));

  return hints
    .map((s) => s.replace(/^this\b/, "This"))
    .map((s) => s.replace(/, sometimes called this opera,/g, ""));
}

function getText(el: Element): string {
  let val = "";
  if (el?.childNodes) {
    for (const node of Array.from(el.childNodes)) {
      if (isText(node)) {
        val += node.textContent?.replace(/\s+/g, " ");
      } else if (isEl(node)) {
        if (node.nodeName.toLowerCase() === "br") {
          val += "\n";
        } else if (node.matches("sup.reference,.IPA")) {
          // skip footnote references & pronunciations
        } else {
          val += getText(node);
        }
      }
    }
  }
  return val.trim().replace(/\s+(?=[,;.?!])/g, "");
}

function isText(node: Node): node is Text {
  return node.nodeType === node.ownerDocument?.TEXT_NODE;
}

function isEl(node: Node): node is Element {
  return node.nodeType === node.ownerDocument?.ELEMENT_NODE;
}

export function capitalize(source: string, target: string) {
  const [first, ...rest] = target.split("");
  return source.replace(
    RegExp(`(?<=\\.\\s+|^)${first}(?=${rest.join("")})`, "g"),
    first.toUpperCase()
  );
}
