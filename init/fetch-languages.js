// @ts-check
import { promises as fs } from 'fs';
import { loadHtml } from './load-html.js';
import { wikiFetch } from './wiki-fetch.js';

function getNextPageUrl(document) {
  const nextPage = document.querySelector(
    'a[href*="language_operas&pagefrom"][href^="/w/"]'
  );
  return nextPage ? `https://en.wikipedia.org${nextPage.href}` : null;
}

function getOperaHrefs(document) {
  const operaHrefs = Array.from(
    document.querySelectorAll(
      '.mw-content-ltr li a[href^="/wiki"]:not([title^=Category])'
    )
  ).map((a) => decodeURIComponent(a.href));
  return operaHrefs;
}

export async function getOperasByLanguage(languagePage) {
  const operaHrefs = [];
  while (languagePage) {
    const html = await wikiFetch(languagePage);
    const $ = loadHtml(html);
    operaHrefs.push(...getOperaHrefs($.document));
    languagePage = getNextPageUrl($.document);
  }
  return operaHrefs;
}

const languagePages = [
  'https://en.wikipedia.org/wiki/Category:Czech-language_operas',
  'https://en.wikipedia.org/wiki/Category:English-language_operettas',
  'https://en.wikipedia.org/wiki/Category:English-language_operas',
  'https://en.wikipedia.org/wiki/Category:French-language_operas',
  'https://en.wikipedia.org/wiki/Category:French-language_operettas',
  'https://en.wikipedia.org/wiki/Category:German-language_operettas',
  'https://en.wikipedia.org/wiki/Category:German-language_operas',
  'https://en.wikipedia.org/wiki/Category:Italian-language_operas',
  'https://en.wikipedia.org/wiki/Category:Latin-language_operas',
  'https://en.wikipedia.org/wiki/Category:Russian-language_operas',
  'https://en.wikipedia.org/wiki/Category:Spanish-language_operas',
];

const operasByLanguage = {
  English: [
    "/wiki/The_Beggar's_Opera",
    '/wiki/Sāvitri_(opera)',
    "/wiki/The_Rake's_Progress",
    '/wiki/Punch_and_Judy_(opera)',
    '/wiki/The_Prodigal_Son_(Britten)',
    '/wiki/The_Lighthouse_(opera)',
  ],
  French: [
    '/wiki/Platée',
    '/wiki/Iphigénie_en_Aulide',
    '/wiki/Iphigénie_en_Tauride',
    '/wiki/Le_prophète',
    '/wiki/Orphée_aux_Enfers',
    '/wiki/La_belle_Hélène',
    '/wiki/La_Périchole',
    '/wiki/Andrea_Chénier',
  ],
  German: ['/wiki/Der_Zigeunerbaron', '/wiki/Die_lustige_Witwe'],
  Hungarian: ['/wiki/Bátori_Mária', '/wiki/Hunyadi_László_(opera)'],
  Italian: ["/wiki/L'incoronazione_di_Poppea"],
  Various: ['/wiki/Akhnaten_(opera)'],
};

for (const page of languagePages) {
  let match = page.match(/Category:(\w+)-language/);
  if (!match) continue;
  let language = match[1];
  if (!operasByLanguage[language]) operasByLanguage[language] = [];
  operasByLanguage[language].push(...(await getOperasByLanguage(page)));
}

const outputFile = process.argv[2];
await fs.writeFile(outputFile, JSON.stringify(operasByLanguage, null, 2));
