import JSZip from "jszip";
import wikiB64 from "./wiki.b64.js";

import type {
  OperaData,
  InfoBox,
  ComposerSummary,
  RoleData,
  RecordingData,
  OperaSummary,
} from "./types.js";

const wikiZip = await new JSZip().loadAsync(wikiB64, { base64: true });
export const operaList = await readJson<OperaData[]>("operas.json");
export const languages = await readJson<Record<string, string[]>>(
  "languages.json"
);

export async function getTitles(opera: OperaData): Promise<string[]> {
  const infobox = await getInfoBox(opera);
  const { "Other title": otherTitle, Translation } = infobox || {};
  return [
    ...new Set([
      opera.title,
      ...(infobox?.titles || []),
      ...(otherTitle ? [otherTitle] : []),
      ...(Translation ? [Translation] : []),
    ]),
  ];
}

export async function getInfoBox(opera: OperaData): Promise<InfoBox | null> {
  const data = await readJson<InfoBox>(
    `${decodeURIComponent(opera.titleHref)}/infobox.json`
  );
  if (!data) return null;
  // @ts-expect-error ignore html entry
  delete data.html;
  return data;
}

export async function getLanguage(opera: OperaData): Promise<string> {
  if (!languages) throw new Error("languages.json not found");
  for (const [lang, operaHrefs] of Object.entries(languages)) {
    if (operaHrefs.includes(decodeURIComponent(opera.titleHref))) return lang;
  }
  const infobox = await getInfoBox(opera);
  return infobox?.Language || "Unknown";
}

export async function getComposerSummary(
  opera: OperaData
): Promise<ComposerSummary | null> {
  if (!opera.composerHref) return null;
  return readJson(`${decodeURIComponent(opera.composerHref)}/summary.json`);
}

export async function getRecordings(
  opera: OperaData
): Promise<RecordingData | null> {
  return readJson(`${decodeURIComponent(opera.titleHref)}/recordings.json`);
}

export async function getRoles(opera: OperaData): Promise<RoleData | null> {
  return readJson(`${decodeURIComponent(opera.titleHref)}/roles.json`);
}

export async function getSummary(
  opera: OperaData
): Promise<OperaSummary | null> {
  return readJson(`${decodeURIComponent(opera.titleHref)}/summary.json`);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function readJson<T>(path: string): Promise<T | null> {
  const file = wikiZip.file(path.replace(/^\//, ""));
  if (!file) return null;
  const json = await file.async("string");
  return JSON.parse(json);
}
