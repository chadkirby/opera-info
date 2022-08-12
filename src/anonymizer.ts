import re from "@ckirby/block-re";

import type { TargetOpera } from "../typings.js";
import { getTitles } from "./opera-getters.js";

export async function anonymize(hint: string, opera: TargetOpera) {
  let anonymized = hint;
  const titles = await getTitles(opera);
  if (titles) anonymized = anonymizeTitle(titles, anonymized);
  if (opera.otherOperaTitles.length) {
    anonymized = anonymizeTitle(
      opera.otherOperaTitles,
      anonymized,
      "another opera"
    );
  }
  anonymized = anonymizeComposer(opera.composer, anonymized);
  return anonymized;
}

export function anonymizeComposer(composer: string, target: string): string {
  const names = composer.split(/\s+/);
  const last = names.pop();
  const optional = names.map((n) => `(?:${n}\\s+)?`).join("");
  const composerPattern = new RegExp(`\\b${optional}(?:${last})\\b`, "g");
  target = target.replace(/\bthe\s+composer\b/g, "THE_COMPOSER");
  target = target.replace(composerPattern, "the composer");
  target = target.replace(/(?<=\bthe composer)'s?(?!\w)/, "'s");
  target = target.replace(/(?<!the first )\b(?:composed )?by the composer/, "");
  target = target.replace(/\bthe composer the composer\b/g, "the composer");
  target = target.replace(
    /the ([A-Z]\w+) composer the composer(?!')/g,
    (_, adjective) =>
      /^[aeiou]/i.test(adjective)
        ? `an ${adjective} composer`
        : `a ${adjective} composer`
  );
  target = target.replace(
    /(?<!(?:the|an?) )\b([A-Z]\w+) composer the composer(?!')/g,
    (_, adjective) =>
      /^[aeiou]/i.test(adjective)
        ? `an ${adjective} composer`
        : `a ${adjective} composer`
  );

  target = target.replace(/\sby the composer\b/g, "");
  target = capitalize(target, "the composer");
  return target.replace(/\bTHE_COMPOSER\b/g, "the composer");
}

export function anonymizeTitle(
  titles: string[],
  target: string,
  replacement = "this opera"
): string {
  const patterns = titles.map((title) => {
    const [first, ...rest] = title.split(/,\s+/);
    return re`/(?:\b${first}(?: ${rest.join(", ")})?\b)/`.source;
  });
  const composerPattern = RegExp(patterns.join("|"), "g");
  target = target.replace(composerPattern, replacement);
  target = target.replace(re`/(?<=\b${replacement})'s?(?!\w)/`, "'s");
  target = target.replace(re`/(?:an?|the)\sopera\s(?=${replacement})/`, "");
  target = capitalize(target, replacement);
  return target;
}

export function capitalize(source: string, target: string): string {
  const [first, ...rest] = target.split("");
  return source.replace(
    new RegExp(`(?<=\\.\\s+|^)${first}(?=${rest.join("")})`, "g"),
    first.toUpperCase()
  );
}
