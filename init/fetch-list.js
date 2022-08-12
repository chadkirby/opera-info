// @ts-check

import { loadHtml } from './load-html.js';
import { wikiFetch } from './wiki-fetch.js';

export async function getListOfOperas() {
  const html = await wikiFetch(
    'https://en.wikipedia.org/wiki/List_of_operas_by_title'
  );
  const $ = loadHtml(html);
  const content = $.document.getElementById('bodyContent');
  if (!content) return;

  let list = [];
  for (const li of content.querySelectorAll('.mw-parser-output .div-col li')) {
    // <li>
    //   <i><a href="/wiki/L%27abandon_d%27Ariane" title="L'abandon d'Ariane">L'abandon d'Ariane</a></i>,
    //   <a href="/wiki/Darius_Milhaud" title="Darius Milhaud">Darius Milhaud</a>,
    //   <a href="/wiki/1928_in_music#Opera" title="1928 in music">1928</a></li>

    // summaryXHR
    // https://en.wikipedia.org/api/rest_v1/page/summary/L'abandon_d'Ariane
    try {
      const [titleA, composerA, dateA] = [...li.querySelectorAll('a')];
      list.push({
        title: titleA.textContent,
        titleHref: titleA.href,
        composer: composerA.textContent,
        composerHref: composerA.href,
        year: Number(dateA.textContent),
      });
    } catch (error) {
      //
    }
  }

  return list;
}

getListOfOperas().then((list) =>
  process.stdout.write(JSON.stringify(list, null, 2))
);
