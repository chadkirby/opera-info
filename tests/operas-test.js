import test from "tape-promise/tape.js";
import { Operas } from "../dist/node.js";

test("operas exists", async (assert) => {
  const operas = new Operas();
  assert.ok(operas instanceof Operas);
  assert.equal(operas.length, 325);
});

test("can get basic opera", async (assert) => {
  const operas = new Operas();
  assert.deepEqual(await operas.getBasicOpera(0), {
    year: 1607,
    title: "L'Orfeo",
    titleHref: "/wiki/L%27Orfeo",
    composer: "Monteverdi",
    composerHref: "/wiki/Claudio_Monteverdi",
    factoid: "Widely regarded as the first operatic masterwork.",
    titles: ["L'Orfeo"],
    language: "Italian",
  });
});

test("can get target opera", async (assert) => {
  const operas = new Operas();
  assert.deepEqual(await operas.getTargetOpera(0), {
    year: 1607,
    title: "L'Orfeo",
    titleHref: "/wiki/L%27Orfeo",
    composer: "Claudio Monteverdi",
    composerHref: "/wiki/Claudio_Monteverdi",
    factoid: "Widely regarded as the first operatic masterwork.",
    titles: ["L'Orfeo"],
    language: "Italian",
    thumbnailUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Bernardo_Strozzi_-_Claudio_Monteverdi_%28c.1630%29.jpg/256px-Bernardo_Strozzi_-_Claudio_Monteverdi_%28c.1630%29.jpg",
    composerSummary: {
      type: "standard",
      title: "Claudio Monteverdi",
      displaytitle: "Claudio Monteverdi",
      namespace: { id: 0, text: "" },
      wikibase_item: "Q53068",
      titles: {
        canonical: "Claudio_Monteverdi",
        normalized: "Claudio Monteverdi",
        display: "Claudio Monteverdi",
      },
      pageid: 6226,
      thumbnail: {
        source:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Bernardo_Strozzi_-_Claudio_Monteverdi_%28c.1630%29.jpg/256px-Bernardo_Strozzi_-_Claudio_Monteverdi_%28c.1630%29.jpg",
        width: 256,
        height: 320,
      },
      originalimage: {
        source:
          "https://upload.wikimedia.org/wikipedia/commons/0/02/Bernardo_Strozzi_-_Claudio_Monteverdi_%28c.1630%29.jpg",
        width: 1648,
        height: 2060,
      },
      lang: "en",
      dir: "ltr",
      revision: "1096273492",
      tid: "3290e380-119c-11ed-846f-3d1000a3e7bd",
      timestamp: "2022-07-03T11:58:29Z",
      description: "Italian composer (1567–1643)",
      description_source: "local",
      content_urls: {
        desktop: {
          page: "https://en.wikipedia.org/wiki/Claudio_Monteverdi",
          revisions:
            "https://en.wikipedia.org/wiki/Claudio_Monteverdi?action=history",
          edit: "https://en.wikipedia.org/wiki/Claudio_Monteverdi?action=edit",
          talk: "https://en.wikipedia.org/wiki/Talk:Claudio_Monteverdi",
        },
        mobile: {
          page: "https://en.m.wikipedia.org/wiki/Claudio_Monteverdi",
          revisions:
            "https://en.m.wikipedia.org/wiki/Special:History/Claudio_Monteverdi",
          edit: "https://en.m.wikipedia.org/wiki/Claudio_Monteverdi?action=edit",
          talk: "https://en.m.wikipedia.org/wiki/Talk:Claudio_Monteverdi",
        },
      },
      extract:
        "Claudio Giovanni Antonio Monteverdi was an Italian composer, string player, choirmaster, and priest. A composer of both secular and sacred music, and a pioneer in the development of opera, he is considered a crucial transitional figure between the Renaissance and Baroque periods of music history.",
      extract_html:
        "<p><b>Claudio Giovanni Antonio Monteverdi</b> was an Italian composer, string player, choirmaster, and priest. A composer of both secular and sacred music, and a pioneer in the development of opera, he is considered a crucial transitional figure between the Renaissance and Baroque periods of music history.</p>",
    },
    infobox: {
      titles: ["L'Orfeo"],
      Librettist: "Alessandro Striggio",
      Language: "Italian",
      "Based on": "Greek legend of Orpheus",
      Premiere: "1607 Carnival season\nMantua",
    },
    operaSummary: {
      type: "standard",
      title: "L'Orfeo",
      displaytitle: "<i>L'Orfeo</i>",
      namespace: { id: 0, text: "" },
      wikibase_item: "Q724008",
      titles: {
        canonical: "L'Orfeo",
        normalized: "L'Orfeo",
        display: "<i>L'Orfeo</i>",
      },
      pageid: 486195,
      thumbnail: {
        source:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Cesare_Gennari_Orfeo.jpg/241px-Cesare_Gennari_Orfeo.jpg",
        width: 241,
        height: 320,
      },
      originalimage: {
        source:
          "https://upload.wikimedia.org/wikipedia/commons/8/8d/Cesare_Gennari_Orfeo.jpg",
        width: 362,
        height: 480,
      },
      lang: "en",
      dir: "ltr",
      revision: "1095626737",
      tid: "d17daae0-15f8-11ed-8a7c-13d36db1ba6e",
      timestamp: "2022-06-29T12:25:36Z",
      description: "Opera by Claudio Monteverdi",
      description_source: "local",
      content_urls: {
        desktop: {
          page: "https://en.wikipedia.org/wiki/L'Orfeo",
          revisions: "https://en.wikipedia.org/wiki/L'Orfeo?action=history",
          edit: "https://en.wikipedia.org/wiki/L'Orfeo?action=edit",
          talk: "https://en.wikipedia.org/wiki/Talk:L'Orfeo",
        },
        mobile: {
          page: "https://en.m.wikipedia.org/wiki/L'Orfeo",
          revisions: "https://en.m.wikipedia.org/wiki/Special:History/L'Orfeo",
          edit: "https://en.m.wikipedia.org/wiki/L'Orfeo?action=edit",
          talk: "https://en.m.wikipedia.org/wiki/Talk:L'Orfeo",
        },
      },
      extract:
        "L'Orfeo, sometimes called La favola d'Orfeo [la ˈfaːvola dorˈfɛːo], is a late Renaissance/early Baroque favola in musica, or opera, by Claudio Monteverdi, with a libretto by Alessandro Striggio. It is based on the Greek legend of Orpheus, and tells the story of his descent to Hades and his fruitless attempt to bring his dead bride Eurydice back to the living world. It was written in 1607 for a court performance during the annual Carnival at Mantua. While Jacopo Peri's Dafne is generally recognised as the first work in the opera genre, and the earliest surviving opera is Peri's Euridice, L'Orfeo is the earliest that is still regularly performed.",
      extract_html:
        "<p><i><b>L'Orfeo</b></i>, sometimes called <i><b>La favola d'Orfeo</b></i> <small></small><span class=\"IPA\">[la ˈfaːvola dorˈfɛːo]</span>, is a late Renaissance/early Baroque <i>favola in musica</i>, or opera, by Claudio Monteverdi, with a libretto by Alessandro Striggio. It is based on the Greek legend of Orpheus, and tells the story of his descent to Hades and his fruitless attempt to bring his dead bride Eurydice back to the living world. It was written in 1607 for a court performance during the annual Carnival at Mantua. While Jacopo Peri's <i>Dafne</i> is generally recognised as the first work in the opera genre, and the earliest surviving opera is Peri's <i>Euridice</i>, <i>L'Orfeo</i> is the earliest that is still regularly performed.</p>",
    },
    recordings: [],
    roles: [
      {
        role: "La Musica (Music)",
        voiceType: "mezzo-soprano castrato (en travesti)",
      },
      { role: "Orfeo (Orpheus)", voiceType: "tenor or high baritone" },
      {
        role: "Euridice (Eurydice)",
        voiceType: "mezzo-soprano castrato (en travesti)",
      },
      {
        role: "La messaggera (The Messenger)",
        voiceType: "mezzo-soprano castrato (en travesti)",
      },
      {
        role: "La Speranza (Hope)",
        voiceType: "mezzo-soprano castrato (en travesti)",
      },
      { role: "Caronte (Charon)", voiceType: "bass" },
      {
        role: "Proserpina (Proserpine)",
        voiceType: "mezzo-soprano castrato (en travesti)",
      },
      { role: "Plutone (Pluto)", voiceType: "bass" },
      { role: "Apollo", voiceType: "tenor" },
      {
        role: "Ninfa (Nymph)",
        voiceType: "mezzo-soprano castrato (en travesti)",
      },
      { role: "Eco (Echo)", voiceType: "tenor" },
      {
        role: "Ninfe e pastori (Nymphs and shepherds)",
        voiceType:
          "mezzo-soprano castratos (en travesti), alto castratos (en travesti), tenors, basses",
      },
      {
        role: "Spiriti infernali (Infernal spirits)",
        voiceType: "tenors, basses",
      },
    ],
    otherOperaTitles: [
      "L'Orfeo",
      "Il ritorno d'Ulisse in patria",
      "L'incoronazione di Poppea",
    ],
    hints: [
      "Widely regarded as the first operatic masterwork.",
      "The composer was an Italian composer, string player, choirmaster, and priest.",
      "This opera, sometimes called this opera, is a late Renaissance/early Baroque favola in musica, or opera, , with a libretto by Alessandro Striggio.",
      "This opera features a tenors, basses role Spiriti infernali (Infernal spirits).",
      "A composer of both secular and sacred music, and a pioneer in the development of opera, he is considered a crucial transitional figure between the Renaissance and Baroque periods of music history.",
      "It is based on the Greek legend of Orpheus, and tells the story of his descent to Hades and his fruitless attempt to bring his dead bride Eurydice back to the living world.",
      "This opera features a tenor role Eco (Echo).",
      "It was written in 1607 for a court performance during the annual Carnival at Mantua.",
      "This opera features a mezzo-soprano castrato (en travesti) role Ninfa (Nymph).",
      "While Jacopo Peri's Dafne is generally recognised as the first work in the opera genre, and the earliest surviving opera is Peri's Euridice, this opera is the earliest that is still regularly performed.",
      "This opera features a tenor role Apollo.",
      "This opera features a bass role Plutone (Pluto).",
      "This opera features a mezzo-soprano castrato (en travesti) role Proserpina (Proserpine).",
      "This opera features a bass role Caronte (Charon).",
      "This opera features a mezzo-soprano castrato (en travesti) role La Speranza (Hope).",
      "This opera features a mezzo-soprano castrato (en travesti) role La messaggera (The Messenger).",
      "This opera features a mezzo-soprano castrato (en travesti) role Euridice (Eurydice).",
      "This opera features a tenor or high baritone role Orfeo (Orpheus).",
      "This opera features a mezzo-soprano castrato (en travesti) role La Musica (Music).",
    ],
  });
});
