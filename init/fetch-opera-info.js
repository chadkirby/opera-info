// @ts-check
import fs from "fs";
import path from "path";
import { loadHtml } from "./load-html.js";
import { mkdir } from "./mkdir.js";
import { wikiFetch } from "./wiki-fetch.js";

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
  if (!fs.existsSync(recordingsFile)) {
    console.log(`fetching ${opera.title} recordings`);
    try {
      let recordings = await getRecordings(href);
      if (recordings) {
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
 * @param {HTMLSpanElement | null} headlineSpan
 * @return {Element | null}
 */
function findTable(headlineSpan) {
  if (headlineSpan) {
    let $h2 = $(headlineSpan).closest("h2");
    for (const el of $h2.nextUntil("h2")) {
      if (el.matches("table.wikitable")) {
        return el;
      }
    }
  }
  return null;
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
  const table = findTable(doc.getElementById("Roles"));
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
  const html = await wikiFetch(href);
  const $ = loadHtml(html);
  const doc = $.document;
  const table = findTable(doc.getElementById("Recordings"));

  if (!table?.matches("table")) return null;
  let items = [];
  // delete the 3d & 4th columns from each row
  for (const tr of table.querySelectorAll("tr:not(:first-child)")) {
    items.push({
      year: Number(tr.children[0].textContent?.trim().slice(0, 4)),
      cast: getText(tr.children[1]).split(/,?\n/),
      conductor: getText(tr.children[2]).split(/,?\n/)[0],
    });
    tr.children[2]?.remove();
  }
  return {
    html: table.outerHTML,
    items,
  };
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
  return val.trim();
}
