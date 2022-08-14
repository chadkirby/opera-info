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
      {
        category: "factoid",
        hint: "Widely regarded as the first operatic masterwork.",
      },
      {
        category: "composer",
        hint: "The composer was an Italian composer, string player, choirmaster, and priest.",
      },
      {
        category: "factoid",
        hint: "This opera is a late Renaissance/early Baroque favola in musica, or opera, with a libretto by Alessandro Striggio.",
      },
      {
        category: "role",
        hint: 'This opera features a "tenors, basses" role Spiriti infernali (Infernal spirits).',
      },
      {
        category: "composer",
        hint: "A composer of both secular and sacred music, and a pioneer in the development of opera, he is considered a crucial transitional figure between the Renaissance and Baroque periods of music history.",
      },
      {
        category: "factoid",
        hint: "It is based on the Greek legend of Orpheus, and tells the story of his descent to Hades and his fruitless attempt to bring his dead bride Eurydice back to the living world.",
      },
      {
        category: "role",
        hint: "This opera features a tenor role Eco (Echo).",
      },
      {
        category: "factoid",
        hint: "It was written in 1607 for a court performance during the annual Carnival at Mantua.",
      },
      {
        category: "role",
        hint: "This opera features a mezzo-soprano castrato (en travesti) role Ninfa (Nymph).",
      },
      {
        category: "factoid",
        hint: "While Jacopo Peri's Dafne is generally recognised as the first work in the opera genre, and the earliest surviving opera is Peri's Euridice, this opera is the earliest that is still regularly performed.",
      },
      { category: "role", hint: "This opera features a tenor role Apollo." },
      {
        category: "role",
        hint: "This opera features a bass role Plutone (Pluto).",
      },
      {
        category: "role",
        hint: "This opera features a mezzo-soprano castrato (en travesti) role Proserpina (Proserpine).",
      },
      {
        category: "role",
        hint: "This opera features a bass role Caronte (Charon).",
      },
      {
        category: "role",
        hint: "This opera features a mezzo-soprano castrato (en travesti) role La Speranza (Hope).",
      },
      {
        category: "role",
        hint: "This opera features a mezzo-soprano castrato (en travesti) role La messaggera (The Messenger).",
      },
      {
        category: "role",
        hint: "This opera features a mezzo-soprano castrato (en travesti) role Euridice (Eurydice).",
      },
      {
        category: "role",
        hint: "This opera features a tenor or high baritone role Orfeo (Orpheus).",
      },
      {
        category: "role",
        hint: "This opera features a mezzo-soprano castrato (en travesti) role La Musica (Music).",
      },
    ],
  });
});

test("can filter operas", async (assert) => {
  const operas = new Operas();
  assert.deepEqual(
    operas
      .filter((o) => o.year > 1930)
      .map((o) => ({ title: o.title, composer: o.composer, year: o.year })),
    [
      { title: "Destiny", composer: "Leoš Janáček", year: 1934 },
      { title: "Hugh the Drover", composer: "Vaughan Williams", year: 1958 },
      { title: "Moses und Aron", composer: "Schoenberg", year: 1957 },
      { title: "Arabella", composer: "Richard Strauss", year: 1933 },
      {
        title: "Lady Macbeth of the Mtsensk District",
        composer: "Shostakovich",
        year: 1934,
      },
      { title: "Die schweigsame Frau", composer: "Strauss", year: 1935 },
      { title: "Porgy and Bess", composer: "Gershwin", year: 1935 },
      { title: "Lulu", composer: "Berg", year: 1937 },
      { title: "Riders to the Sea", composer: "Vaughan Williams", year: 1937 },
      { title: "Daphne", composer: "Strauss", year: 1938 },
      { title: "Julietta", composer: "Bohuslav Martinů", year: 1938 },
      { title: "Mathis der Maler", composer: "Hindemith", year: 1938 },
      { title: "Paul Bunyan", composer: "Benjamin Britten", year: 1941 },
      { title: "Capriccio", composer: "Richard Strauss", year: 1942 },
      { title: "Der Kaiser von Atlantis", composer: "Ullmann", year: 1975 },
      { title: "Peter Grimes", composer: "Britten", year: 1945 },
      { title: "War and Peace", composer: "Sergei Prokofiev", year: 1945 },
      { title: "Betrothal in a Monastery", composer: "Prokofiev", year: 1946 },
      { title: "The Medium", composer: "Menotti", year: 1946 },
      { title: "The Rape of Lucretia", composer: "Britten", year: 1946 },
      { title: "Albert Herring", composer: "Britten", year: 1947 },
      { title: "Dantons Tod", composer: "Einem", year: 1947 },
      { title: "Les mamelles de Tirésias", composer: "Poulenc", year: 1947 },
      {
        title: "The Telephone, or L'Amour à trois",
        composer: "Menotti",
        year: 1947,
      },
      { title: "Il prigioniero", composer: "Luigi Dallapiccola", year: 1949 },
      { title: "The Consul", composer: "Menotti", year: 1950 },
      {
        title: "Amahl and the Night Visitors",
        composer: "Menotti",
        year: 1951,
      },
      { title: "Billy Budd", composer: "Britten", year: 1951 },
      {
        title: "The Pilgrim's Progress",
        composer: "Ralph Vaughan Williams",
        year: 1951,
      },
      { title: "The Rake's Progress", composer: "Stravinsky", year: 1951 },
      {
        title: "Boulevard Solitude",
        composer: "Hans Werner Henze",
        year: 1952,
      },
      { title: "Gloriana", composer: "Britten", year: 1953 },
      { title: "The Fiery Angel", composer: "Prokofiev", year: 1955 },
      { title: "The Turn of the Screw", composer: "Britten", year: 1954 },
      { title: "Troilus and Cressida", composer: "William Walton", year: 1954 },
      {
        title: "The Midsummer Marriage",
        composer: "Michael Tippett",
        year: 1955,
      },
      { title: "Candide", composer: "Bernstein", year: 1956 },
      { title: "Dialogues des Carmélites", composer: "Poulenc", year: 1957 },
      { title: "Vanessa", composer: "Barber", year: 1958 },
      { title: "La voix humaine", composer: "Poulenc", year: 1959 },
      { title: "A Midsummer Night's Dream", composer: "Britten", year: 1960 },
      { title: "Elegy for Young Lovers", composer: "Henze", year: 1961 },
      { title: "King Priam", composer: "Tippett", year: 1962 },
      { title: "Curlew River", composer: "Britten", year: 1964 },
      { title: "Der junge Lord", composer: "Henze", year: 1965 },
      { title: "Die Soldaten", composer: "Bernd Alois Zimmermann", year: 1965 },
      { title: "Antony and Cleopatra", composer: "Barber", year: 1966 },
      { title: "The Bassarids", composer: "Henze", year: 1966 },
      { title: "The Bear", composer: "Walton", year: 1967 },
      { title: "Punch and Judy", composer: "Harrison Birtwistle", year: 1968 },
      { title: "The Prodigal Son", composer: "Britten", year: 1968 },
      {
        title: "The Devils of Loudun",
        composer: "Krzysztof Penderecki",
        year: 1969,
      },
      { title: "The Knot Garden", composer: "Michael Tippett", year: 1970 },
      { title: "Owen Wingrave", composer: "Britten", year: 1971 },
      { title: "Taverner", composer: "Peter Maxwell Davies", year: 1972 },
      { title: "Death in Venice", composer: "Britten", year: 1973 },
      { title: "Einstein on the Beach", composer: "Glass", year: 1976 },
      { title: "Le Grand Macabre", composer: "Ligeti", year: 1978 },
      { title: "Lear", composer: "Aribert Reimann", year: 1978 },
      { title: "The Lighthouse", composer: "Davies", year: 1980 },
      {
        title: "Saint François d'Assise",
        composer: "Olivier Messiaen",
        year: 1983,
      },
      { title: "Un re in ascolto", composer: "Luciano Berio", year: 1984 },
      { title: "Akhnaten", composer: "Philip Glass", year: 1984 },
      { title: "The Mask of Orpheus", composer: "Birtwistle", year: 1968 },
      {
        title: "A Night at the Chinese Opera",
        composer: "Judith Weir",
        year: 1987,
      },
      { title: "Nixon in China", composer: "John Adams", year: 1987 },
      { title: "Gawain", composer: "Birtwistle", year: 1991 },
      {
        title: "A Streetcar Named Desire",
        composer: "André Previn",
        year: 1995,
      },
    ]
  );
});
