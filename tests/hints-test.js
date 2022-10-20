import test from "tape-promise/tape.js";
import {
  Operas,
  makeHints,
  makeRolesHints,
  makeRecordingHints,
  makeComposerHints,
  makeExtractHints,
} from "../dist/node.js";

test("can get hints for Orfeo", async (assert) => {
  const operas = new Operas();
  let target = await operas.getTargetOpera("/wiki/L%27Orfeo");
  let hints = await makeHints(target);
  assert.deepEqual(hints, [
    {
      category: "factoid",
      hint: "Widely regarded as the first operatic masterwork.",
    },
    {
      category: "composer",
      hint: `<span class="anonymized">The composer</span> was an Italian composer, string player, choirmaster, and priest.`,
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
      category: "factoid",
      hint: "It is based on the Greek legend of Orpheus, and tells the story of his descent to Hades and his fruitless attempt to bring his dead bride Eurydice back to the living world.",
    },
    { category: "role", hint: "This opera features a tenor role Eco (Echo)." },
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
      hint: "While Jacopo Peri's Dafne is generally recognised as the first work in the opera genre, and the earliest surviving opera is Peri's Euridice, <span class=\"anonymized\">this opera</span> is the earliest that is still regularly performed.",
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
  ]);
});

test("can get hints for Billy Budd", async (assert) => {
  const operas = new Operas();
  let target = await operas.getTargetOpera("/wiki/Billy_Budd_(opera)");
  assert.deepEqual(await makeRolesHints(target), [
    "This opera features a tenor role Captain Vere of HMS Indomitable.",
    "This opera features a bass role John Claggart, Master-at-arms.",
    "This opera features a baritone role Mr. Redburn, First Lieutenant.",
    "This opera features a bass-baritone role Mr. Flint, Sailing Master.",
    "This opera features a baritone or bass role Lieutenant Ratcliffe.",
    "This opera features a tenor role Red Whiskers, an impressed man.",
    "This opera features a baritone role Donald.",
    "This opera features a bass role Dansker, an old seaman.",
    "This opera features a tenor role A Novice.",
    "This opera features a baritone role The Novice's Friend.",
    "This opera features a tenor role Squeak.",
    "This opera features a bass role Bosun.",
    "This opera features a bass role First Mate.",
    "This opera features a bass role Second Mate.",
    "This opera features a tenor role Maintop.",
    "This opera features a tenor or baritone role Arthur Jones, an impressed man.",
    "This opera features a spoken role role Cabin Boy.",
    "This opera features a trebles role Four midshipmen.",
  ]);

  assert.deepEqual(await makeRecordingHints(target), [
    '<span class="anonymized">The composer</span> conducted a 1951 recording of this opera that featured Theodor Uppman, Peter Pears, and Frederick Dalberg.',
    '<span class="anonymized">The composer</span> conducted a 1967 recording of this opera that featured Peter Glossop, Peter Pears, and Michael Langdon.',
    "Kent Nagano conducted a 1997 recording of this opera that featured Thomas Hampson, Anthony Rolfe-Johnson, and Eric Halfvarson.",
    "Richard Hickox conducted a 1999 recording of this opera that featured Simon Keenlyside, Philip Langridge, and John Tomlinson.",
    "Donald Runnicles conducted a 2004 recording of this opera that featured Bo Skovhus, Neil Shicoff, and Eric Halfvarson.",
    "Daniel Harding conducted a 2008 recording of this opera that featured Nathan Gunn, Ian Bostridge, and Gidon Saks.",
    "Mark Elder conducted a 2011 recording of this opera that featured Jacques Imbrailo, John Mark Ainsley, and Philip Ens.",
    "Mark Elder conducted a 2013 recording of this opera that featured Jacques Imbrailo, John Mark Ainsley, and Philip Ens.",
  ]);

  assert.deepEqual(await makeComposerHints(target), [
    `<span class="anonymized">The composer</span> was an English composer, conductor, and pianist.`,
    "The composer was a central figure of 20th-century British music, with a range of works including opera, other vocal music, orchestral and chamber pieces.",
    "The composer's best-known works include <span class=\"anonymized\">another opera</span> (1945), the War Requiem (1962) and the orchestral showpiece The Young Person's Guide to the Orchestra (1945).",
  ]);

  assert.deepEqual(await makeExtractHints(target), [
    '<span class="anonymized">This opera</span>, Op. 50, is an opera to a libretto by the English novelist E. M. Forster and Eric Crozier, based on the short novel <span class="anonymized">this opera</span> by Herman Melville.',
    "Originally in four acts, the opera received its premiere at the Royal Opera House (ROH), London, on 1 December 1951.",
    '<span class="anonymized">The composer</span> later revised the work into a two-act opera, with a prologue and an epilogue.',
    "The revised version received its first performance at the ROH, Covent Garden, London, on 9 January 1964.",
  ]);
});

test("can get hints for Pagliacci", async (assert) => {
  const operas = new Operas();
  let target = await operas.getTargetOpera("/wiki/Pagliacci");
  assert.deepEqual(await makeRolesHints(target), [
    "This opera features a tenor role Canio, head of the troupe.",
    "This opera features a soprano role Nedda, Canio's wife.",
    "This opera features a baritone role Tonio, the fool.",
    "This opera features a tenor role Beppe (Peppe), actor.",
    "This opera features a baritone role Silvio, Nedda's lover.",
  ]);

  assert.deepEqual(await makeRecordingHints(target), []);

  assert.deepEqual(await makeComposerHints(target), [
    `<span class="anonymized">The composer</span> was an Italian opera composer and librettist.`,
    'Although he produced numerous operas and other songs throughout his career it is his opera <span class="anonymized">this opera</span> (1892) that remained his lasting contribution, despite attempts to escape the shadow of his greatest success.',
  ]);

  assert.deepEqual(await makeExtractHints(target), [
    '<span class="anonymized">This opera</span> is an Italian opera in a prologue and two acts, with music and libretto.',
    "The opera tells the tale of Canio, actor and leader of a commedia dell'arte theatrical company, who murders his wife Nedda and her lover Silvio on stage during a performance.",
    '<span class="anonymized">This opera</span> premiered at the Teatro Dal Verme in Milan on 21 May 1892, conducted by Arturo Toscanini, with Adelina Stehle as Nedda, Fiorello Giraud as Canio, Victor Maurel as Tonio, and Mario Ancona as Silvio.',
    "Soon after its Italian premiere, the opera played in London and in New York.",
    '<span class="anonymized">This opera</span> is the composer\'s only opera that is still widely performed.',
  ]);
});

test("can get hints for Rake's Progress", async (assert) => {
  const operas = new Operas();
  let target = await operas.getTargetOpera("/wiki/The_Rake%27s_Progress");
  assert.deepEqual(await makeRolesHints(target), [
    "This opera features a tenor role Tom Rakewell, a Rake.",
    "This opera features a soprano role Anne Trulove, his Betrothed.",
    "This opera features a bass-baritone role Nick Shadow, a Devilish Manservant.",
    "This opera features a mezzo-soprano role Baba the Turk, a Bearded Lady.",
    "This opera features a bass role Father Trulove, Anne's Father.",
    "This opera features a tenor role Sellem, an Auctioneer.",
    "This opera features a contralto role Mother Goose, a Whore.",
    "This opera features a bass role Keeper of the Madhouse.",
  ]);

  assert.deepEqual(await makeRecordingHints(target), [
    '<span class="anonymized">The composer</span> conducted a 1953 recording of this opera that featured Eugene Conley, Hilde Gueden, Mack Harrell, and Blanche Thebom.',
    '<span class="anonymized">The composer</span> conducted a 1964 recording of this opera that featured Alexander Young, Judith Raskin, John Reardon, and Regina Sarfaty.',
    "Riccardo Chailly conducted a 1983 recording of this opera that featured Philip Langridge, Cathryn Pope, Samuel Ramey, and Sarah Walker.",
    "Robert Craft conducted a 1993 recording of this opera that featured Jon Garrison, Jayne West, John Cheek, and Wendy White.",
    "Kent Nagano conducted a 1995 recording of this opera that featured Jerry Hadley, Dawn Upshaw, Samuel Ramey, and Grace Bumbry.",
    "Seiji Ozawa conducted a 1997 recording of this opera that featured Anthony Rolfe-Johnson, Sylvia McNair, Paul Plishka, and Jane Henschel.",
    "John Eliot Gardiner conducted a 1999 recording of this opera that featured Ian Bostridge, Deborah York, Bryn Terfel, and Anne-Sofie von Otter.",
    "James Levine conducted a 2010 recording of this opera that featured Paul Groves, Dawn Upshaw, Samuel Ramey, and Stephanie Blythe.",
  ]);

  assert.deepEqual(await makeComposerHints(target), [
    `<span class="anonymized">The composer</span> was a Russian composer, pianist and conductor, later of French and American citizenship.`,
    "The composer is widely considered one of the most important and influential composers of the 20th century and a pivotal figure in modernist music.",
  ]);

  assert.deepEqual(await makeExtractHints(target), [
    '<span class="anonymized">This opera</span> is an English-language opera from 1951 in three acts and an epilogue.',
    'The libretto, written by W. H. Auden and Chester Kallman, is based loosely on the eight paintings and engravings A Rake\'s Progress (1733–1735) of William Hogarth, which <span class="anonymized">the composer</span> had seen on 2 May 1947, in a Chicago exhibition.',
  ]);
});

test("can get hints for Lear", async (assert) => {
  const operas = new Operas();
  let target = await operas.getTargetOpera("/wiki/Lear_(opera)");
  assert.deepEqual(await makeHints(target), [
    {
      category: "factoid",
      hint: "An Expressionist opera based on Shakespeare's tragedy. The title role was specifically written for the famous baritone Dietrich Fischer-Dieskau.",
    },
    {
      category: "composer",
      hint: `<span class="anonymized">The composer</span> is a German composer, pianist and accompanist, known especially for his literary operas.`,
    },
    {
      category: "factoid",
      hint: '<span class="anonymized">This opera</span> is an opera in two parts with music by a German composer, and a libretto by Claus H. Henneberg, based on Shakespeare\'s tragedy King <span class="anonymized">this opera</span>.',
    },
    {
      category: "role",
      hint: "This opera features a spoken role role Knight.",
    },
    {
      category: "composer",
      hint: "The composer's opera Medea after Grillparzer's play premiered in 2010 at the Vienna State Opera.",
    },
    { category: "role", hint: "This opera features a tenor role Servant." },
    {
      category: "composer",
      hint: "The composer was a professor of contemporary Lied in Hamburg and Berlin.",
    },
    {
      category: "role",
      hint: "This opera features a tenor role Earl of Kent.",
    },
    {
      category: "composer",
      hint: "In 2011, he was awarded the Ernst von Siemens Music Prize for his life's work.",
    },
    {
      category: "role",
      hint: "This opera features a tenor role Edmund, illegitimate son of Gloucester.",
    },
    {
      category: "role",
      hint: "This opera features a tenor/countertenor role Edgar, son of Gloucester.",
    },
    {
      category: "role",
      hint: "This opera features a bass-baritone role Duke of Gloucester.",
    },
    {
      category: "role",
      hint: "This opera features a bass-baritone role King of France.",
    },
    {
      category: "role",
      hint: "This opera features a tenor role Duke of Cornwall.",
    },
    {
      category: "role",
      hint: "This opera features a baritone role Duke of Albany.",
    },
    { category: "role", hint: "This opera features a spoken role role Fool." },
  ]);
});

test("can get hints for Rodelinda", async (assert) => {
  const operas = new Operas();
  let target = await operas.getTargetOpera("/wiki/Rodelinda_(opera)");
  assert.deepEqual(await makeRolesHints(target), [
    "This opera features an alto castrato role Bertarido, usurped King of Lombardy.",
    "This opera features a tenor role Grimoaldo, Duke of Benevento, Bertarido's usurper.",
    "This opera features a contralto role Eduige, Bertarido's sister, betrothed to Grimoaldo.",
    "This opera features an alto castrato role Unulfo, Bertarido's friend and counsellor.",
    "This opera features a bass role Garibaldo, Grimoaldo's counsellor, duke of Turin.",
  ]);
});

test("can get hints for Der_Zigeunerbaron", async (assert) => {
  const operas = new Operas();
  let target = await operas.getTargetOpera("/wiki/Der_Zigeunerbaron");
  assert.deepEqual((await makeHints(target)).slice(0, 3), [
    {
      category: "factoid",
      hint: '<span class="anonymized">The composer</span>\'s operetta was intended to soothe tensions between Austrians and Hungarians in the Habsburg empire.',
    },
    {
      category: "composer",
      hint: '<span class="anonymized">The composer</span>, also known as <span class="anonymized">the composer</span>, the Younger, the Son, was an Austrian composer of light music, particularly dance music and operettas.',
    },
    {
      category: "factoid",
      hint: '<span class="anonymized">This opera</span> is an operetta in three acts which premiered at the Theater an der Wien on 24 October 1885.',
    },
  ]);
});

test("can handle hyphenated composer names", async (assert) => {
  const operas = new Operas();
  let target = await operas.getTargetOpera("/wiki/Castor_et_Pollux");
  assert.deepEqual((await makeHints(target)).slice(0, 2), [
    {
      category: "factoid",
      hint: 'Initially only a moderate success, when it was revived in 1754 <span class="anonymized">this opera</span> was regarded as <span class="anonymized">the composer</span>\'s finest achievement.',
    },
    {
      category: "composer",
      hint: '<span class="anonymized">The composer</span> was a French composer and music theorist.',
    },
  ]);
});
