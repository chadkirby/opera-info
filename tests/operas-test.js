import test from "tape-promise/tape.js";
import { Operas } from "../dist/node.js";

test("operas exists", async (assert) => {
  const operas = new Operas();
  assert.ok(operas instanceof Operas);
  assert.equal(operas.length, 321);
});

test("every opera has a composerHref", async (assert) => {
  const operas = new Operas();
  const missingComposerHrefs = operas.filter((opera) => !opera.composerHref);
  assert.deepEqual(
    missingComposerHrefs.map((x) => x.titleHref),
    []
  );
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
    recordings: [
      {
        type: "audio",
        year: 1939,
        cast: [
          "Enrico de Franceschi",
          "Ginevra Vivante (Euridice and La musica)",
          "Elena Nicolai",
          "Vittoria Palombini",
        ],
        conductor: "Orchestra of La Scala Milan",
      },
      {
        type: "audio",
        year: 1949,
        cast: [
          "Max Meili",
          "Elfriede Trötschel",
          "Eva Fleischer",
          "Gerda Lammers (Messenger and Proserpina)",
        ],
        conductor: "Orchester des Berliner Rundfunks",
      },
      {
        type: "audio",
        year: 1954,
        cast: ["Gino Sinimberghi", "Uta Graf", "Patricia Brinton (La musica)"],
        conductor: "Wiener Singakedemie and Vienna Symphony Orchestra",
      },
      {
        type: "audio",
        year: 1955,
        cast: [
          "Helmut Krebs",
          "Hanni Mack-Cosack",
          "Margot Guilleaume (La musica and Proserpina)",
          "Jeanne Deroubaix",
        ],
        conductor: "Orchester der Sommerlichen Musiktage Hitzacker, Hamburg",
      },
      {
        type: "audio",
        year: 1960,
        cast: [
          "Gérard Souzay",
          "Judith Raskin",
          "Doris Yarick",
          "Regina Sarfaty",
          "Evelyn Sachs",
        ],
        conductor: "New York City Opera",
      },
      {
        type: "audio",
        year: 1968,
        cast: [
          "Eric Tappy",
          "Magali Schwartz",
          "Wally Staempfli",
          "Laura Sarti",
          "Juliette Bise",
        ],
        conductor: "Ensemble Vocal et Instrumental de Lausanne",
      },
      {
        type: "audio",
        year: 1969,
        cast: [
          "Lajos Kozma",
          "Rotraud Hansmann (Euridice and La musica)",
          "Cathy Berberian",
          "Eiko Katanosaka",
        ],
        conductor: "Concentus Musicus Wien",
      },
      {
        type: "audio",
        year: 1973,
        cast: [
          "Nigel Rogers",
          "Emilia Petrescu (Euridice and La musica)",
          "Anna Reynolds (Messenger and Proserpina)",
        ],
        conductor: "Instralmentalsolisten Camerata Accademica Hamburg",
      },
      {
        type: "audio",
        year: 1978,
        cast: [
          "Philippe Huttenlocher",
          "Dietlinde Turban",
          "Trudeliese Schmidt",
          "Glenys Linos (Messenger and Proserpina)",
        ],
        conductor: "Monteverdi Ensemble der Zürcher Oper",
      },
      {
        type: "audio",
        year: 1980,
        cast: [
          "Joachim Seipp",
          "Melinda Liebermann",
          "Rosemarie Bühler",
          "Heide Blanca-Roeser",
          "Rochelle Travis",
        ],
        conductor: "Bad Hersfeld Festival 1980",
      },
      {
        type: "audio",
        year: 1983,
        cast: [
          "Nigel Rogers",
          "Patrizia Kwella",
          "Emma Kirkby",
          "Guillemette Laurens",
          "Jennifer Smith",
        ],
        conductor: "London Baroque Ensemble",
      },
      {
        type: "audio",
        year: 1985,
        cast: [
          "Gino Quilico",
          "Audrey Michael",
          "Colette Alliot-Lugaz",
          "Carolyn Watkinson",
          "Danièle Borst",
        ],
        conductor: "Opéra National de Lyon",
      },
      {
        type: "audio",
        year: 1986,
        cast: [
          "Anthony Rolfe-Johnson",
          "Julianne Baird",
          "Lynne Dawson",
          "Anne Sofie von Otter",
          "Diana Montague",
        ],
        conductor: "English Baroque Soloists, Monteverdi Choir",
      },
      {
        type: "audio",
        year: 1991,
        cast: [
          "John Mark Ainsley",
          "Julia Gooding",
          "Catherine Bott (La musica, Messenger, Proserpina)",
        ],
        conductor: "New London Consort",
      },
      {
        type: "audio",
        year: 1993,
        cast: [
          "Jeffrey Thomas",
          "Dana Hanchard (Euridice and La musica)",
          "Jennifer Lane",
          "Jessica Tanzillo",
        ],
        conductor: "Art of the Early Keyboard",
      },
      {
        type: "audio",
        year: 1995,
        cast: [
          "Laurence Dale",
          "Efrat Ben-Nun (Euridice and La musica)",
          "Jennifer Larmore",
          "Bernarda Fink",
        ],
        conductor: "Concerto Vocale",
      },
      {
        type: "audio",
        year: 1996,
        cast: [
          "Alessandro Carmignani",
          "Marinella Pannicchi (Euridice and La musica)",
          "Rosita Frisani (Messenger and Proserpina)",
        ],
        conductor: "Capella Musicale di San Petronio di Bologna",
      },
      {
        type: "audio",
        year: 1996,
        cast: [
          "Victor Torres",
          "Adriana Fernández",
          "María Cristina Kiehr",
          "Gloria Banditelli",
          "Roberta Invernizzi",
        ],
        conductor: "Ensemble Elyma",
      },
      {
        type: "audio",
        year: 2000,
        cast: [
          "Gareth Morell",
          "Sandra Simon (Euridice and La musica)",
          "Meredith Hall (Messenger and Proserpina)",
        ],
        conductor: "Apollo's Fire",
      },
      {
        type: "audio",
        year: 2003,
        cast: [
          "Ian Bostridge",
          "Patrizia Ciofi",
          "Natalie Dessay",
          "Alice Coote",
          "Véronique Gens",
        ],
        conductor: "Le Concert d'Astrée",
      },
      {
        type: "audio",
        year: 2004,
        cast: [
          "Kobie van Rensburg",
          "Cyrille Gerstenhaber",
          "Estelle Kaïque (Messenger)",
          "Delphine Gillot (Proserpina)",
        ],
        conductor: "La Grande Ecurie et la Chambre du Roy",
      },
      {
        type: "audio",
        year: 2006,
        cast: [
          "William Matteuzzi",
          "Sylva Pozzer (Euridice and La musica)",
          "Sara Mingardo (Messenger and Proserpina)",
        ],
        conductor: "Ensemble Instrumental",
      },
      {
        type: "audio",
        year: 2006,
        cast: [
          "Mirko Guadagnini",
          "Emanuela Galli (Euridice and La musica)",
          "Marina De Liso",
          "Christina Calzolari",
        ],
        conductor: "La Venexiana",
      },
      {
        type: "audio",
        year: 2006,
        cast: [
          "Frank Kelley",
          "Roberta Anderson",
          "Laurie Monahan (La musica and Messenger)",
          "Sharon Baker",
        ],
        conductor: "Aston Magna",
      },
      {
        type: "audio",
        year: 2007,
        cast: [
          "Furio Zanasi",
          "Anna Simboli (Eurydice and Prosperina)",
          "Monica Piccinini",
          "Sara Mingardo",
        ],
        conductor: "Concerto Italiano",
      },
      {
        type: "audio",
        year: 2013,
        cast: [
          "Charles Daniels",
          "Faye Newton",
          "David Hurley",
          "Emily Van Evera (Messenger and Proserpina)",
        ],
        conductor: "Taverner Consort and Players, Andrew Parrott",
      },
      {
        type: "video",
        year: 1978,
        cast: [
          "Philippe Huttenlocher",
          "Dietlinde Turban",
          "Trudeliese Schmidt",
          "Glenys Linos (Messenger and Proserpina)",
        ],
        conductor: "Monteverdi Ensemble der Zürcher Oper",
      },
      {
        type: "video",
        year: 1997,
        cast: [
          "John Mark Ainsley",
          "Juanita Lascarro",
          "David Cordier",
          "Brigitte Balleys",
          "Bernarda Fink",
        ],
        conductor: "Concerto Palatino, Tragicomedia",
      },
      {
        type: "video",
        year: 1998,
        cast: [
          "Simon Keenlyside",
          "Juanita Lascarro (Euridice and La musica)",
          "Graciela Oddone",
          "Martina Dike",
        ],
        conductor: "Concerto Vocale, Collegium Vocale Gent",
      },
      {
        type: "video",
        year: 2002,
        cast: [
          "Furio Zanasi",
          "Arianna Savall",
          "Montserrat Figueras",
          "Sara Mingardo",
          "Adriana Fernández",
        ],
        conductor: "Le Concert des Nations",
      },
      {
        type: "video",
        year: 2004,
        cast: [
          "Kobie van Rensburg",
          "Cyrille Gerstenhaber",
          "Estelle Kaïque (Messenger)",
          "Delphine Gillot (Proserpina)",
        ],
        conductor: "La Grande Ecurie et la Chambre du Roy",
      },
      {
        type: "video",
        year: 2008,
        cast: [
          "Dietrich Henschel",
          "Maria Grazia Schiavo (Euridice, La musica and Prosperina)",
          "Sonia Prina",
        ],
        conductor: "Les Arts Florissants - Les Sacqueboutiers",
      },
    ],
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
        hint: '<span class="anonymized">The composer</span> was an Italian composer, string player, choirmaster, and priest.',
      },
      {
        category: "recording",
        hint: "Orchestra of La Scala Milan conducted a 1939 recording of this opera that featured Enrico de Franceschi, Ginevra Vivante (Euridice and La musica), Elena Nicolai, and Vittoria Palombini.",
      },
      {
        category: "factoid",
        hint: '<span class="anonymized">This opera</span>, sometimes called <span class="anonymized">this opera</span>, is a late Renaissance/early Baroque favola in musica, or opera with a libretto by Alessandro Striggio.',
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
        category: "recording",
        hint: "Orchester des Berliner Rundfunks conducted a 1949 recording of this opera that featured Max Meili, Elfriede Trötschel, Eva Fleischer, and Gerda Lammers (Messenger and Proserpina).",
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
        category: "recording",
        hint: "Wiener Singakedemie and Vienna Symphony Orchestra conducted a 1954 recording of this opera that featured Gino Sinimberghi, Uta Graf, and Patricia Brinton (La musica).",
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
        category: "recording",
        hint: "Orchester der Sommerlichen Musiktage Hitzacker, Hamburg conducted a 1955 recording of this opera that featured Helmut Krebs, Hanni Mack-Cosack, Margot Guilleaume (La musica and Proserpina), and Jeanne Deroubaix.",
      },
      {
        category: "factoid",
        hint: "While Jacopo Peri's Dafne is generally recognised as the first work in the opera genre, and the earliest surviving opera is Peri's Euridice, <span class=\"anonymized\">this opera</span> is the earliest that is still regularly performed.",
      },
      { category: "role", hint: "This opera features a tenor role Apollo." },
      {
        category: "recording",
        hint: "New York City Opera conducted a 1960 recording of this opera that featured Gérard Souzay, Judith Raskin, Doris Yarick, Regina Sarfaty, and Evelyn Sachs.",
      },
      {
        category: "role",
        hint: "This opera features a bass role Plutone (Pluto).",
      },
      {
        category: "recording",
        hint: "Ensemble Vocal et Instrumental de Lausanne conducted a 1968 recording of this opera that featured Eric Tappy, Magali Schwartz, Wally Staempfli, Laura Sarti, and Juliette Bise.",
      },
      {
        category: "role",
        hint: "This opera features a mezzo-soprano castrato (en travesti) role Proserpina (Proserpine).",
      },
      {
        category: "recording",
        hint: "Concentus Musicus Wien conducted a 1969 recording of this opera that featured Lajos Kozma, Rotraud Hansmann (Euridice and La musica), Cathy Berberian, and Eiko Katanosaka.",
      },
      {
        category: "role",
        hint: "This opera features a bass role Caronte (Charon).",
      },
      {
        category: "recording",
        hint: "Instralmentalsolisten Camerata Accademica Hamburg conducted a 1973 recording of this opera that featured Nigel Rogers, Emilia Petrescu (Euridice and La musica), and Anna Reynolds (Messenger and Proserpina).",
      },
      {
        category: "role",
        hint: "This opera features a mezzo-soprano castrato (en travesti) role La Speranza (Hope).",
      },
      {
        category: "recording",
        hint: '<span class="anonymized">The composer</span> Ensemble der Zürcher Oper conducted a 1978 recording of this opera that featured Philippe Huttenlocher, Dietlinde Turban, Trudeliese Schmidt, and Glenys Linos (Messenger and Proserpina).',
      },
      {
        category: "role",
        hint: "This opera features a mezzo-soprano castrato (en travesti) role La messaggera (The Messenger).",
      },
      {
        category: "recording",
        hint: "Bad Hersfeld Festival 1980 conducted a 1980 recording of this opera that featured Joachim Seipp, Melinda Liebermann, Rosemarie Bühler, Heide Blanca-Roeser, and Rochelle Travis.",
      },
      {
        category: "role",
        hint: "This opera features a mezzo-soprano castrato (en travesti) role Euridice (Eurydice).",
      },
      {
        category: "recording",
        hint: "London Baroque Ensemble conducted a 1983 recording of this opera that featured Nigel Rogers, Patrizia Kwella, Emma Kirkby, Guillemette Laurens, and Jennifer Smith.",
      },
      {
        category: "role",
        hint: "This opera features a tenor or high baritone role Orfeo (Orpheus).",
      },
      {
        category: "recording",
        hint: "Opéra National de Lyon conducted a 1985 recording of this opera that featured Gino Quilico, Audrey Michael, Colette Alliot-Lugaz, Carolyn Watkinson, and Danièle Borst.",
      },
      {
        category: "role",
        hint: "This opera features a mezzo-soprano castrato (en travesti) role La Musica (Music).",
      },
      {
        category: "recording",
        hint: 'English Baroque Soloists, <span class="anonymized">the composer</span> Choir conducted a 1986 recording of this opera that featured Anthony Rolfe-Johnson, Julianne Baird, Lynne Dawson, Anne Sofie von Otter, and Diana Montague.',
      },
      {
        category: "recording",
        hint: "New London Consort conducted a 1991 recording of this opera that featured John Mark Ainsley; Julia Gooding; and Catherine Bott (La musica, Messenger, Proserpina).",
      },
      {
        category: "recording",
        hint: "Art of the Early Keyboard conducted a 1993 recording of this opera that featured Jeffrey Thomas, Dana Hanchard (Euridice and La musica), Jennifer Lane, and Jessica Tanzillo.",
      },
      {
        category: "recording",
        hint: "Concerto Vocale conducted a 1995 recording of this opera that featured Laurence Dale, Efrat Ben-Nun (Euridice and La musica), Jennifer Larmore, and Bernarda Fink.",
      },
      {
        category: "recording",
        hint: "Capella Musicale di San Petronio di Bologna conducted a 1996 recording of this opera that featured Alessandro Carmignani, Marinella Pannicchi (Euridice and La musica), and Rosita Frisani (Messenger and Proserpina).",
      },
      {
        category: "recording",
        hint: "Ensemble Elyma conducted a 1996 recording of this opera that featured Victor Torres, Adriana Fernández, María Cristina Kiehr, Gloria Banditelli, and Roberta Invernizzi.",
      },
      {
        category: "recording",
        hint: "Apollo's Fire conducted a 2000 recording of this opera that featured Gareth Morell, Sandra Simon (Euridice and La musica), and Meredith Hall (Messenger and Proserpina).",
      },
      {
        category: "recording",
        hint: "Le Concert d'Astrée conducted a 2003 recording of this opera that featured Ian Bostridge, Patrizia Ciofi, Natalie Dessay, Alice Coote, and Véronique Gens.",
      },
      {
        category: "recording",
        hint: "La Grande Ecurie et la Chambre du Roy conducted a 2004 recording of this opera that featured Kobie van Rensburg, Cyrille Gerstenhaber, Estelle Kaïque (Messenger), and Delphine Gillot (Proserpina).",
      },
      {
        category: "recording",
        hint: "Ensemble Instrumental conducted a 2006 recording of this opera that featured William Matteuzzi, Sylva Pozzer (Euridice and La musica), and Sara Mingardo (Messenger and Proserpina).",
      },
      {
        category: "recording",
        hint: "La Venexiana conducted a 2006 recording of this opera that featured Mirko Guadagnini, Emanuela Galli (Euridice and La musica), Marina De Liso, and Christina Calzolari.",
      },
      {
        category: "recording",
        hint: "Aston Magna conducted a 2006 recording of this opera that featured Frank Kelley, Roberta Anderson, Laurie Monahan (La musica and Messenger), and Sharon Baker.",
      },
      {
        category: "recording",
        hint: "Concerto Italiano conducted a 2007 recording of this opera that featured Furio Zanasi, Anna Simboli (Eurydice and Prosperina), Monica Piccinini, and Sara Mingardo.",
      },
      {
        category: "recording",
        hint: "Taverner Consort and Players, Andrew Parrott conducted a 2013 recording of this opera that featured Charles Daniels, Faye Newton, David Hurley, and Emily Van Evera (Messenger and Proserpina).",
      },
      {
        category: "recording",
        hint: '<span class="anonymized">The composer</span> Ensemble der Zürcher Oper conducted a 1978 recording of this opera that featured Philippe Huttenlocher, Dietlinde Turban, Trudeliese Schmidt, and Glenys Linos (Messenger and Proserpina).',
      },
      {
        category: "recording",
        hint: "Concerto Palatino, Tragicomedia conducted a 1997 recording of this opera that featured John Mark Ainsley, Juanita Lascarro, David Cordier, Brigitte Balleys, and Bernarda Fink.",
      },
      {
        category: "recording",
        hint: "Concerto Vocale, Collegium Vocale Gent conducted a 1998 recording of this opera that featured Simon Keenlyside, Juanita Lascarro (Euridice and La musica), Graciela Oddone, and Martina Dike.",
      },
      {
        category: "recording",
        hint: "Le Concert des Nations conducted a 2002 recording of this opera that featured Furio Zanasi, Arianna Savall, Montserrat Figueras, Sara Mingardo, and Adriana Fernández.",
      },
      {
        category: "recording",
        hint: "La Grande Ecurie et la Chambre du Roy conducted a 2004 recording of this opera that featured Kobie van Rensburg, Cyrille Gerstenhaber, Estelle Kaïque (Messenger), and Delphine Gillot (Proserpina).",
      },
      {
        category: "recording",
        hint: "Les Arts Florissants - Les Sacqueboutiers conducted a 2008 recording of this opera that featured Dietrich Henschel; Maria Grazia Schiavo (Euridice, La musica and Prosperina); and Sonia Prina.",
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

test("can ignore operas", async (assert) => {
  const operas = new Operas((o) => o.year > 1980);
  assert.deepEqual(
    operas.map((o) => ({ title: o.title, composer: o.composer, year: o.year })),
    [
      {
        title: "Saint François d'Assise",
        composer: "Olivier Messiaen",
        year: 1983,
      },
      { title: "Un re in ascolto", composer: "Luciano Berio", year: 1984 },
      { title: "Akhnaten", composer: "Philip Glass", year: 1984 },
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

test("Gluck operas are in the correct language", async (assert) => {
  const operas = new Operas(
    (o) => o.composerHref === "/wiki/Christoph_Willibald_Gluck"
  );
  assert.deepEqual(
    (await Promise.all(operas.map((o) => operas.ensureBasicData(o)))).map(
      (o) => ({
        title: o.title,
        composer: o.composer,
        year: o.year,
        language: o.language,
      })
    ),
    [
      {
        title: "Orfeo ed Euridice",
        composer: "Gluck",
        year: 1762,
        language: "Italian",
      },
      { title: "Alceste", composer: "Gluck", year: 1767, language: "French" },
      {
        title: "Iphigénie en Aulide",
        composer: "Gluck",
        year: 1774,
        language: "French",
      },
      { title: "Armide", composer: "Gluck", year: 1777, language: "French" },
      {
        title: "Iphigénie en Tauride",
        composer: "Gluck",
        year: 1779,
        language: "French",
      },
    ]
  );
});

test("Hugh_the_Drover has the correct date", async (assert) => {
  const operas = new Operas((o) => o.titleHref.includes("Hugh_the_Drover"));
  assert.deepEqual(
    (await Promise.all(operas.map((o) => operas.ensureBasicData(o)))).map(
      (o) => ({
        title: o.title,
        composer: o.composer,
        year: o.year,
        language: o.language,
      })
    ),
    [
      {
        title: "Hugh the Drover",
        composer: "Vaughan Williams",
        year: 1924,
        language: "English",
      },
    ]
  );
});

test("Damnation of Faust has the correct date", async (assert) => {
  const operas = new Operas((o) =>
    o.titleHref.includes("La_damnation_de_Faust")
  );
  assert.deepEqual(
    (await Promise.all(operas.map((o) => operas.ensureBasicData(o)))).map(
      (o) => ({
        title: o.title,
        composer: o.composer,
        year: o.year,
        language: o.language,
      })
    ),
    [
      {
        title: "La damnation de Faust",
        composer: "Berlioz",
        year: 1845,
        language: "French",
      },
    ]
  );
});

test("can get every opera as a target", async (assert) => {
  const operas = new Operas();
  for (let index = 0; index < operas.length; index++) {
    const opera = await operas.getTargetOpera(index);
    assert.ok(opera.title, `Opera ${index} has a title: ${opera.title}`);
  }
});
