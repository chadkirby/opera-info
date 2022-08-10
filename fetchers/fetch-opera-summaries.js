// @ts-check
import fs from "fs";
import path from "path";
import { wikiFetch } from "./wiki-fetch.js";

const summaryUrl = "https://en.wikipedia.org/api/rest_v1/page/summary";

/**
 *
 *
 * @param {string} href
 * @return {Promise<object | null>}
 */
async function getSummary(href) {
  console.error(`fetching ${decodeURIComponent(href)}`);
  const json = await wikiFetch(`${summaryUrl}/${href.split("/").pop()}`);
  return json ? JSON.parse(json) : null;
}

const operasJsonFile = process.argv[2];
const wikiDir = path.dirname(operasJsonFile);
const operas = JSON.parse(fs.readFileSync(operasJsonFile, "utf8"));
for (const opera of operas) {
  const operaSummaryFile = path.join(
    wikiDir,
    decodeURIComponent(opera.titleHref),
    "summary.json"
  );
  if (!fs.existsSync(operaSummaryFile)) {
    let summary = await getSummary(opera.titleHref);
    if (summary) {
      await fs.promises.mkdir(path.dirname(operaSummaryFile), {
        recursive: true,
      });
      await fs.promises.writeFile(
        operaSummaryFile,
        JSON.stringify(summary, null, 2)
      );
    }
  }

  const composerSummaryFile = path.join(
    wikiDir,
    decodeURIComponent(opera.composerHref),
    "summary.json"
  );
  if (opera.composerHref && !fs.existsSync(composerSummaryFile)) {
    let summary = await getSummary(opera.composerHref);
    if (summary) {
      await fs.promises.mkdir(path.dirname(composerSummaryFile), {
        recursive: true,
      });
      await fs.promises.writeFile(
        composerSummaryFile,
        JSON.stringify(summary, null, 2)
      );
    }
  }
}
