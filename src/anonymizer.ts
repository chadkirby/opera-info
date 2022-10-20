import re from "@ckirby/block-re";

import type { OperaData, TargetOpera } from "./types.js";
import { getTitles } from "./opera-getters.js";

export async function anonymize(
  hint: string,
  opera: Partial<TargetOpera> & OperaData
) {
  let anonymized = hint;
  const titles = await getTitles(opera);
  if (titles) anonymized = anonymizeTitle(titles, anonymized);
  if (opera.otherOperaTitles?.length) {
    anonymized = anonymizeTitle(
      opera.otherOperaTitles,
      anonymized,
      "another opera"
    );
  }
  if (opera.composer) {
    anonymized = anonymizeComposer(opera.composer, anonymized);
  }
  return anonymized;
}

export function makeComposerPattern(composer: string): RegExp {
  const names = composer.split(/\s+/);
  const suffixPat = /(?<suffix>I{2,3}\b|Sr\b\.?|Jr\b\.?)/;
  const match = re`/\b(?<last>[\w-]+)(?:\s+${suffixPat})?\s*$/`.exec(composer);
  const last = match?.groups?.last || names[names.length - 1];
  // allow any number of names in front of the last name
  const optional = /\b(?:[A-Z][a-z]+[-\s]+)*/;
  const suffix = match?.groups?.suffix;
  const composerPattern = suffix
    ? re`/${optional}(?:${last})\b(\s+${suffixPat})?/g`
    : re`/${optional}(?:${last})\b/g`;
  return composerPattern;
}

export function anonymizeComposer(composer: string, target: string): string {
  const composerPattern = makeComposerPattern(composer);
  target = target.replace(/\bthe\s+composer\b/g, "THE_COMPOSER");
  target = target.replace(composerPattern, "ANON_COMPOSER");
  target = target.replace(/(?<=\bANON_COMPOSER)'s?(?!\w)/, "'s");
  target = target.replace(/(?<!the first )\b(?:composed )?by the composer/, "");
  target = target.replace(
    /\b[tT]he composer ANON_COMPOSER\b/g,
    "ANON_COMPOSER"
  );
  target = target.replace(
    /\bANON_COMPOSER,? ANON_COMPOSER\b/g,
    "ANON_COMPOSER"
  );
  target = target.replace(
    /[tT]he ([A-Z]\w+) composer ANON_COMPOSER(?!')/g,
    (_, adjective) =>
      /^[aeiou]/i.test(adjective)
        ? `an ${adjective} composer`
        : `a ${adjective} composer`
  );
  target = target.replace(
    /(?<!(?:[Tt]he|[Aa]n?) )\b([A-Z]\w+) composer ANON_COMPOSER(?!')/g,
    (_, adjective) =>
      /^[aeiou]/i.test(adjective)
        ? `an ${adjective} composer`
        : `a ${adjective} composer`
  );

  target = target.replace(/,?\sby (?:the composer|ANON_COMPOSER)\b,?/g, "");

  target = capitalize(target, "the composer");
  return target
    .replace(/\bANON_COMPOSER\b/g, (_, i) => {
      const precedingString = target.slice(0, i);
      if (/(?:\.\s+|^)$/.test(precedingString)) {
        return `<span class="anonymized">The composer</span>`;
      }
      return '<span class="anonymized">the composer</span>';
    })
    .replace(/\bTHE_COMPOSER\b/g, "the composer");
}

export function makeTitlePattern(titles: string[], flags = "g") {
  const patterns = titles.map((title) => {
    const [first, ...rest] = title.split(/,\s+/);
    return re`/(?:\b${first}(?: ${rest.join(", ")})?\b)/`.source;
  });
  return RegExp(patterns.join("|"), flags);
}

export function anonymizeTitle(
  titles: string[],
  target: string,
  replacement = "this opera"
): string {
  target = target.replace(makeTitlePattern(titles), replacement);
  target = target.replace(re`/(?<=\b${replacement})'s?(?!\w)/`, "'s");
  target = target.replace(re`/(?:an?|the)\sopera\s(?=${replacement})/`, "");
  target = capitalize(target, replacement);
  return target.replace(
    re`/\b${replacement}\b/gi`,
    '<span class="anonymized">$&</span>'
  );
}

export function capitalize(source: string, target: string): string {
  const [first, ...rest] = target.split("");
  return source.replace(
    new RegExp(`(?<=\\.\\s+|^)${first}(?=${rest.join("")})`, "g"),
    first.toUpperCase()
  );
}
