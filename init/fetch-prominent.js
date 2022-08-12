// @ts-check
import { promises as fs } from "fs";
import { getListOfOperas } from "./fetch-list.js";
import { loadHtml } from "./load-html.js";
import { wikiFetch } from "./wiki-fetch.js";

export async function getListOfProminentOperas(outputFile) {
  const listAll = await getListOfOperas();

  const html = await wikiFetch(
    "https://en.wikipedia.org/wiki/List_of_prominent_operas"
  );
  const $ = loadHtml(html);
  const content = $.document.getElementById("bodyContent");
  if (!content) return;

  const list = [];
  for (const li of Array.from(
    content.querySelectorAll(".mw-parser-output ul li")
  )) {
    // <li>
    //   1833
    //   <i><a href="/wiki/Beatrice_di_Tenda" title="Beatrice di Tenda">Beatrice di Tenda</a></i>
    //   (<a href="/wiki/Vincenzo_Bellini" title="Vincenzo Bellini">Vincenzo Bellini</a>).
    //    Bellini's tragedy is notable for its extensive use of the chorus.
    //    <sup id="cite_ref-FOOTNOTE''Viking''199370_63-0" class="reference">
    //      <a href="#cite_note-FOOTNOTE''Viking''199370-63">[63]</a>
    //    </sup>
    // </li>
    try {
      // remove footnotes
      while (li.querySelector("sup.reference")) {
        li.querySelector("sup.reference")?.remove();
      }

      // 1924 Erwartung (Arnold Schoenberg). An intense atonal monodrama.
      const match = li.textContent?.match(
        /^(?<year>\d{4})\s+(?<title>.+?)\s+\((?<composer>.+?)\)\.\s+(?<factoid>.+)$/
      );

      const [titleAnchor, composerAnchor] = Array.from(
        li.querySelectorAll("a")
      );
      if (!(titleAnchor && match)) continue;

      const { year, title, composer, factoid } = match.groups || {};

      const allItem = listAll?.find(
        (item) => item.titleHref === titleAnchor.href
      );

      const entry = {
        year: Number(year),
        title: title.trim(),
        titleHref: titleAnchor.href,
        composer: composer,
        composerHref:
          composerAnchor?.textContent === composer
            ? composerAnchor?.href
            : undefined,
        factoid: factoid.trim(),
        ...allItem,
      };

      list.push(entry);
    } catch (error) {
      console.error(`couldn't parse list entry: ${li.textContent}`);
    }
  }

  if (outputFile) {
    await fs.writeFile(outputFile, JSON.stringify(list, null, 2));
  }
  return list;
}

const outputFile = process.argv[2];

getListOfProminentOperas(outputFile);
