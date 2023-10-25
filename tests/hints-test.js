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
    { category: "role", hint: "This opera features a tenor role Eco (Echo)." },
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

  assert.deepEqual(await makeRecordingHints(target), [
    "Carlo Sabajno conducted a 1907 recording of this opera that featured Antonio Paoli, Giuseppina Huguet, Francesco Cigada, Gaetano Pini-Corsi, and Ernesto Badini.",
    "Carlo Sabajno conducted a 1917 recording of this opera that featured Luigi Bolis, Annita Conti, and Giuseppe Montanelli.",
    "Lorenzo Molajoli conducted a 1930 recording of this opera that featured Francesco Merli, Rosetta Pampanini, and Carlo Galeffi.",
    "Franco Ghione conducted a 1934 recording of this opera that featured Beniamino Gigli, Iva Pacetti, and Mario Basiola.",
    "Giuseppe Antonicelli conducted a 1948 recording of this opera that featured Ramón Vinay, Florence Quartararo, Leonard Warren, Joseph Laderoute, and Hugh Thompson.",
    "Fausto Cleva conducted a 1951 recording of this opera that featured Richard Tucker, Lucine Amara, and Giuseppe Valdengo.",
    "Alfredo Simonetto conducted a 1951 recording of this opera that featured Carlo Bergonzi, Carla Gavazzi, and Carlo Tagliabue.",
    "Alberto Erede conducted a 1952 recording of this opera that featured Mario del Monaco, Clara Petrella, and Afro Poli.",
    "Renato Cellini conducted a 1953 recording of this opera that featured Jussi Björling, Victoria de los Ángeles, and Leonard Warren.",
    "Renato Cellini conducted a 1953 recording of this opera that featured Jussi Björling, Victoria de los Ángeles, and Leonard Warren.",
    "Lovro von Matačić conducted a 1954 recording of this opera that featured Franco Corelli, Lucine Amara, and Tito Gobbi.",
    "Tullio Serafin conducted a 1954 recording of this opera that featured Giuseppe di Stefano, Maria Callas, and Rolando Panerai.",
    "Nino Sanzogno conducted a 1956 recording of this opera that featured Giuseppe di Stefano, Clara Petrella, and Aldo Protti.",
    "Herbert von Karajan conducted a 1965 recording of this opera that featured Carlo Bergonzi, Joan Carlyle, and Giuseppe Taddei.",
    "Nello Santi conducted a 1971 recording of this opera that featured Plácido Domingo, Montserrat Caballé, and Sherrill Milnes.",
    "Ádám Fischer conducted a 1984 recording of this opera that featured Plácido Domingo, Ileana Cotrubas, and Matteo Manuguerra.",
    "Alexander Rahbari conducted a 1992 recording of this opera that featured Nicola Martinucci, Miriam Gauci, and Eduard Tumagian.",
    "Riccardo Muti conducted a 1993 recording of this opera that featured Luciano Pavarotti, Daniela Dessi, Juan Pons, and Paolo Coni.",
    "Riccardo Chailly conducted a 1999 recording of this opera that featured José Cura, Barbara Frittoli, and Carlos Álvarez.",
  ]);

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
      hint: '<span class="anonymized">The composer</span> is a German composer, pianist and accompanist, known especially for his literary operas.',
    },
    {
      category: "recording",
      hint: "Gerd Albrecht conducted a 1978 recording of this opera that featured Dietrich Fischer-Dieskau, Karl Helm, Hans Wilbrink, Georg Paskuda, Richard Holm, Hans Günter Nöcker, David Knutson, Werner Götz, Helga Dernesch, Colette Lorand, Júlia Várady, Rolf Boysen, Markus Gortizki, and Gerhard Auer.",
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
    {
      category: "recording",
      hint: "Sebastian Weigle conducted a 2008 recording of this opera that featured Wolfgang Koch, Magnus Baldvinsson, Dietrich Volle, Michael McCown, Hans-Jürgen Lazar, Johannes Martin Kränzle, Martin Wölfel, Frank van Aken, Jeanne-Michèle Charbonnet, Caroline Whisnant, and Britta Stallmeister.",
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
      category: "recording",
      hint: "Willi Boskovsky conducted a 1986 recording of this opera that featured Dietrich Fischer-Dieskau, Klaus Hirte, Josef Protschka, Walter Berry, Brigitte Lindner, Ilse Gramatzki, Martin Finke, Hanna Schwarz, Júlia Várady, and Ralf Lukas.",
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

test("can handle Oberon_(Weber)", async (assert) => {
  const operas = new Operas();
  let target = await operas.getTargetOpera("/wiki/Oberon_(Weber)");
  assert.deepEqual((await makeHints(target)).slice(0, 2), [
    {
      category: "factoid",
      hint: '<span class="anonymized">The composer</span>\'s last opera before his early death.',
    },
    {
      category: "composer",
      hint: 'Carl Maria Friedrich Ernst von <span class="anonymized">the composer</span> was a German composer, conductor, virtuoso pianist, guitarist, and critic who was one of the first significant composers of the Romantic era.',
    },
  ]);
});
