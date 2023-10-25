// @ts-check
import fs from "fs";
import path from "path";

import { loadHtml } from "./load-html.js";
import { mkdir } from "./mkdir.js";
import { wikiFetch } from "./wiki-fetch.js";

import OpenAI from "openai";

const { OpenAIKey } = JSON.parse(fs.readFileSync(".secret.json", "utf8"));
const openai = new OpenAI({
  apiKey: OpenAIKey,
});

const wikiUrl = "https://en.wikipedia.org";
const operasJsonFile = process.argv[2];
const wikiDir = path.dirname(operasJsonFile);
const operas = JSON.parse(fs.readFileSync(operasJsonFile, "utf8"));
const $ = loadHtml("<html><body></body></html>");

for (const opera of operas) {
  const href = `${wikiUrl}${opera.titleHref}`;
  const infoboxFile = path.join(
    wikiDir,
    decodeURIComponent(opera.titleHref),
    "infobox.json"
  );
  if (!fs.existsSync(infoboxFile)) {
    console.log(`fetching ${opera.title} infobox`);
    try {
      let infobox = await getInfobox(href);
      if (infobox) {
        await mkdir(path.dirname(infoboxFile));
        await fs.promises.writeFile(
          infoboxFile,
          JSON.stringify(infobox, null, 2)
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  const rolesFile = path.join(
    wikiDir,
    decodeURIComponent(opera.titleHref),
    "roles.json"
  );
  if (!fs.existsSync(rolesFile)) {
    console.log(`fetching ${opera.title} roles`);
    try {
      let roles = await getRoles(href);
      if (roles) {
        await mkdir(path.dirname(rolesFile));
        await fs.promises.writeFile(rolesFile, JSON.stringify(roles, null, 2));
      }
    } catch (error) {
      console.log(error);
    }
  }

  const recordingsFile = path.join(
    wikiDir,
    decodeURIComponent(opera.titleHref),
    "recordings.json"
  );
  const recordingsExist = fs.existsSync(recordingsFile);
  if (!recordingsExist || recordingsExist) {
    console.log(`fetching ${opera.title} recordings`);
    try {
      let recordings = await getRecordings(href);
      if (recordings?.items.length) {
        await mkdir(path.dirname(recordingsFile));
        await fs.promises.writeFile(
          recordingsFile,
          JSON.stringify(recordings, null, 2)
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
}

/**
 *
 *
 * @param {Element | null} headlineSpan
 * @param {(el: Element) => boolean} [predicate]
 * @return {Element | null}
 */
function findNext(headlineSpan, predicate = isTable) {
  if (headlineSpan) {
    let $h2 = $(headlineSpan).closest("h2");
    for (const el of $h2.nextUntil("h2")) {
      if (predicate(el)) {
        return el;
      }
    }
  }
  return null;
}

/**
 * @param {Element | null} el
 *  @return {el is HTMLTableElement}
 */
function isTable(el) {
  return el ? el.matches("table.wikitable") : false;
}

/**
 * @param {Element | null} el
 * @return {el is HTMLUListElement}
 */
function isUnorderedList(el) {
  return el ? el.matches("ul") : false;
}

/**
 *
 *
 * @param {string} href
 * @return {Promise<object | null>}
 */
async function getInfobox(href) {
  const html = await wikiFetch(href);
  const $ = loadHtml(html);
  const doc = $.document;
  const infobox = doc.querySelector("table.infobox");
  if (!infobox) return null;

  let out = {
    html: infobox.outerHTML,
    titles: getText(infobox.querySelector("th")).split(/\n/),
  };
  for (const td of infobox.querySelectorAll(
    "th.infobox-label + td.infobox-data"
  )) {
    let label = td.previousElementSibling?.textContent;
    if (!label) continue;
    for (const span of td.querySelectorAll('[style="display:none"]')) {
      span.remove();
    }
    // <a href="/wiki/Old_Style_and_New_Style_dates" title="Old Style and New Style dates">N.S.</a>
    for (const a of td.querySelectorAll(
      'a[href="/wiki/Old_Style_and_New_Style_dates"]'
    )) {
      a.remove();
    }

    out[label] = getText(td);
  }
  return out;
}

/**
 *
 *
 * @param {string} href
 * @return {Promise<object | null>}
 */
async function getRoles(href) {
  const html = await wikiFetch(href);
  const $ = loadHtml(html);
  const doc = $.document;
  const rolesHeadlineSpan = doc.getElementById("Roles");
  const table = findNext(rolesHeadlineSpan, isTable);
  if (!table?.matches("table")) return null;
  let items = [];
  let roleIdx = -1;
  let voiceTypeIdx = -1;
  for (const th of table.querySelectorAll("tr:first-child th")) {
    if (!th.textContent) continue;
    if (roleIdx < 0 && /\bRoles?\b/i.test(getText(th))) {
      roleIdx = Array.from(th.closest("tr")?.children || []).indexOf(th);
    } else if (voiceTypeIdx < 0 && /\bVoice(?: types?)?\b/i.test(getText(th))) {
      voiceTypeIdx = Array.from(th.closest("tr")?.children || []).indexOf(th);
      break;
    }
  }
  if (
    roleIdx >= 0 &&
    voiceTypeIdx < 0 &&
    table.querySelector("th")?.hasAttribute("rowspan")
  ) {
    for (const th of table.querySelectorAll("tr:nth-child(2) th")) {
      if (!th.textContent) continue;
      if (voiceTypeIdx < 0 && /\bVoice type\b/i.test(getText(th))) {
        voiceTypeIdx =
          Array.from(th.closest("tr")?.children || []).indexOf(th) + 1;
        break;
      }
    }
  }
  if (roleIdx < 0 || voiceTypeIdx < 0) {
    console.error("missing role or voice type column");
    return null;
  }

  // delete the 3d & 4th columns from each row
  for (const tr of table.querySelectorAll("tr:not(:first-child)")) {
    items.push({
      role: getText(tr.children[roleIdx]),
      voiceType: getText(tr.children[voiceTypeIdx]),
    });
    while (tr.children.length > voiceTypeIdx + 1) {
      tr.children[voiceTypeIdx + 1].remove();
    }
  }
  return {
    html: table.outerHTML,
    items,
  };
}

async function getRecordings(href) {
  const wikiHtml = await wikiFetch(href);
  const $ = loadHtml(wikiHtml);
  const doc = $.document;

  const headlineSpans = [
    ...doc.querySelectorAll(
      'span[id="Recordings"], span[id$="_recordings"], span[id="Video"], span[id="Audio"]'
    ),
  ];

  if (!headlineSpans.length && !href.endsWith("_discography")) {
    const discography = await getRecordings(`${href}_discography`);
    return discography;
  }

  /** @type {Array<{type: 'audio' | 'video', el: Element}>} */
  const recordingTables = [];
  for (const headlineSpan of headlineSpans) {
    if (headlineSpan) {
      const type = headlineSpan.id.includes("Video") ? "video" : "audio";
      const table = findNext(headlineSpan, isTable);
      if (table) {
        recordingTables.push({ el: table, type });
      } else {
        const list = findNext(headlineSpan, isUnorderedList);
        if (list) {
          recordingTables.push({ el: list, type });
        }
      }
    }
  }

  /**
   * @type {Array<{year: number, type: 'audio' | 'video', cast: Array<string>, conductor: string}>}
   */
  const items = [];
  let html = "";
  for (const { el, type } of recordingTables) {
    if (!el) continue;
    html += el.outerHTML;

    if (el.matches("table")) {
      const table = el;
      // delete the 3d & 4th columns from each row
      for (const tr of table.querySelectorAll("tr:not(:first-child)")) {
        items.push({
          type,
          year: Number(tr.children[0].textContent?.trim().slice(0, 4)),
          cast: getText(tr.children[1])
            .split(/[ ,.]*\n/)
            .map((s) => s.trim()),
          conductor: getText(tr.children[2])
            .split(/[ ,]*\n/)[0]
            .trim(),
        });
        tr.children[2]?.remove();
      }
    } else if (el.matches("ul")) {
      const list = el;
      for (const li of list.querySelectorAll("li")) {
        const item = { type, year: 0, cast: [], conductor: "" };
        // Die Dreigroschenoper, 1955, on Vanguard 8057, with Anny Felbermayer, Hedy Fassler [de], Jenny Miller, Rosette Anday, Helge Rosvaenge, Alfred Jerger, Kurt Preger [de] and Liane Augustin. Vienna State Opera Orchestra conducted by F. Charles Adler.
        // 1940: Lily Pons (Lakmé), Armand Tokatyan (Gérald), Ezio Pinza (Nilakantha), Ira Petina (Mallika), New York Metropolitan Opera Chorus and Orchestra, Wilfrid Pelletier (conductor) (The Golden Age; live)

        const recordingDesc = getText(li);
        const completion = await openai.chat.completions.create({
          messages: [
            { role: "user", content: promptDescribeRecording(recordingDesc) },
          ],
          model: "gpt-3.5-turbo",
        });

        const json = (completion.choices[0].message.content || "")
          // ensure we only have one JSON object
          .replace(/(?<=})[\s\S]+/, "")
          // ensure it starts and ends with braces
          .replace(/^\s*(?!{)(?=\S)/, "{")
          .replace(/(?<!})(?<=\S)\s*$/, "}")
          // ensure it has double quotes around keys
          .replace(/"?\b(year|conductor|cast)"?(?=:)/g, '"$1"')

          // remove trailing commas
          .replace(/,(?=\s*[}\]])/g, "");
        try {
          const data = JSON.parse(json);
          item.year = data.year;
          item.conductor = data.conductor;
          item.cast = data.cast;
        } catch (error) {
          console.error(error);
        }
        if (item.year && item.conductor) items.push(item);
      }
    }
  }
  return {
    html,
    items,
  };
}

/**
 * @param {string} recordingDesc
 * @return {string}
 */
function promptDescribeRecording(recordingDesc) {
  return `
Please extract structured data from the following recording description. Your reply must be in JSON format, with as many of the following fields as the description provides:
- year: the year the recording was made
- conductor: the name of the conductor
- cast: an array of the names of the cast members

For example, the following recording description:
> Die Dreigroschenoper, 1955, on Vanguard 8057, with Anny Felbermayer, Hedy Fassler [de], Jenny Miller, Rosette Anday, Helge Rosvaenge, Alfred Jerger, Kurt Preger [de] and Liane Augustin. Vienna State Opera Orchestra conducted by F. Charles Adler.
should be converted to the following JSON:
\`\`\`json
{
  "year": 1955,
  "conductor": "F. Charles Adler",
  "cast": [
    "Anny Felbermayer",
    "Hedy Fassler",
    "Jenny Miller",
    "Rosette Anday",
    "Helge Rosvaenge",
    "Alfred Jerger",
    "Kurt Preger",
    "Liane Augustin"
  ]
}

For example, the following recording description:
> 1940: Lily Pons (Lakmé), Armand Tokatyan (Gérald), Ezio Pinza (Nilakantha), Ira Petina (Mallika), New York Metropolitan Opera Chorus and Orchestra, Wilfrid Pelletier (conductor) (The Golden Age; live)
should be converted to the following JSON:
\`\`\`json
{
  "year": 1940,
  "conductor": "Wilfrid Pelletier",
  "cast": [
    "Lily Pons",
    "Armand Tokatyan",
    "Ezio Pinza",
    "Ira Petina"
  ]
}

For example, the following recording description:
> Principal singers: Alessandra Ruffini, Bruno Pratico, Maria Angeles Peters, Gabriella Morigi, Giuseppe Morino
should be converted to the following JSON:
\`\`\`json
{
  "cast": [
    "Alessandra Ruffini",
    "Bruno Pratico",
    "Maria Angeles Peters",
    "Gabriella Morigi",
    "Giuseppe Morino"
  ]
}

> ${recordingDesc}
\`\`\`json
{

`;
}

function getText(el) {
  let val = "";
  if (el?.childNodes) {
    for (const node of el.childNodes) {
      if (node.nodeType === el.ownerDocument.TEXT_NODE) {
        val += node.textContent.replace(/\s+/g, " ");
      } else if (node.nodeType === el.ownerDocument.ELEMENT_NODE) {
        if (node.nodeName.toLowerCase() === "br") {
          val += "\n";
        } else if (node.matches("sup.reference")) {
          // skip footnote references
        } else {
          val += getText(node);
        }
      }
    }
  }
  // remove language-link tags
  return val.trim().replace(/\[[a-z]{2}\]/g, "");
}
