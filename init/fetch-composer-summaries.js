import fetch from "node-fetch";
import { promisify } from "util";
import getStdin from "get-stdin";
import { anonymizeComposer } from "./src/helpers.js";
import { JSDOM } from "jsdom";

const wait = promisify(setTimeout);

const summaryUrl = "https://en.wikipedia.org/api/rest_v1/page/summary";

const composers = new Map();
const doc = new JSDOM(`<html />`);

async function getSummaries() {
  let inputJson = await getStdin();
  let entries = JSON.parse(inputJson);
  for (const opera of entries) {
    if (!opera.composerHref) continue;
    try {
      if (!composers.has(opera.composerHref)) {
        console.error(`fetching ${opera.composer}`);
        const composer = await fetch(
          `${summaryUrl}/${opera.composerHref.split("/").pop()}`
        );
        let json = await composer.text();
        let data = JSON.parse(json);
        const div = doc.window.document.createElement("div");
        div.innerHTML = data.extract_html;
        for (const b of div.querySelectorAll("b")) {
          b.textContent = "the composer";
        }
        data.extract = anonymizeComposer(data.title, div.textContent);
        composers.set(opera.composerHref, data);
        await wait(1000);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  console.log(JSON.stringify([...composers.values()], null, 2));
}

getSummaries();
