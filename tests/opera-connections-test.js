// @ts-check
import test from "tape-promise/tape.js";
import { OperaConnections } from "../dist/node.js";
import { DateTime } from "luxon";

test("opera-connections exists", async (assert) => {
  const operas = await OperaConnections.create();
  assert.ok(operas instanceof OperaConnections);
  assert.equal(operas.length, 321);
});

test("get tags", async (assert) => {
  const operas = await OperaConnections.create();
  assert.equal(operas.operas[0].title, "L'Orfeo");
  assert.deepEqual(operas.getTags(1), [
    { type: "language", value: "Italian" },
    { type: "century", value: "1600" },
    { type: "decade", value: "1640" },
    { type: "audio-conductor", value: "Nikolaus Harnoncourt" },
    { type: "audio-conductor", value: "Raymond Leppard" },
    { type: "audio-conductor", value: "Roger Norrington" },
    { type: "audio-conductor", value: "Jeffrey Tate" },
    { type: "audio-conductor", value: "Alan Curtis" },
    { type: "audio-conductor", value: "René Jacobs" },
    { type: "audio-conductor", value: "William Christie" },
    { type: "audio-conductor", value: "John Eliot Gardiner" },
    { type: "audio-singer", value: "Philippe Huttenlocher" },
    { type: "audio-singer", value: "Trudeliese Schmidt" },
    { type: "audio-singer", value: "Guillemette Laurens" },
    { type: "audio-singer", value: "Bernarda Fink" },
    { type: "audio-singer", value: "Gloria Banditelli" },
    { type: "audio-singer", value: "Kobie van Rensburg" },
    { type: "audio-singer", value: "Furio Zanasi" },
    { type: "audio-singer", value: "Gerald English" },
    { type: "audio-singer", value: "Benjamin Luxon" },
    { type: "audio-singer", value: "Janet Baker" },
    { type: "audio-singer", value: "Ian Caley" },
    { type: "audio-singer", value: "Anne Howells" },
    { type: "audio-singer", value: "Richard Lewis" },
    { type: "audio-singer", value: "Werner Hollweg" },
    { type: "audio-singer", value: "Francisco Araiza" },
    { type: "audio-singer", value: "Sarah Walker" },
    { type: "audio-singer", value: "Frederica von Stade" },
    { type: "audio-singer", value: "Ann Murray" },
    { type: "audio-singer", value: "Thomas Allen" },
    { type: "audio-singer", value: "Kathleen Kuhlmann" },
    { type: "audio-singer", value: "Delores Ziegler" },
    { type: "audio-singer", value: "Robert Tear" },
    { type: "audio-singer", value: "Christoph Prégardien" },
    { type: "audio-singer", value: "Martyn Hill" },
    { type: "audio-singer", value: "Jean-Paul Fouchécourt" },
    { type: "video-singer", value: "Jonas Kaufmann" },
  ]);

  assert.deepEqual(operas.getTags(10), [
    { type: "composer", value: "/wiki/George_Frideric_Handel" },
    { type: "language", value: "Italian" },
    { type: "century", value: "1700" },
    { type: "decade", value: "1720" },
    { type: "audio-conductor", value: "Alan Curtis" },
    { type: "audio-conductor", value: "René Jacobs" },
    { type: "audio-conductor", value: "Charles Mackerras" },
    { type: "audio-conductor", value: "Richard Bonynge" },
    { type: "audio-conductor", value: "Marc Minkowski" },
    { type: "audio-singer", value: "Anne Sofie von Otter" },
    { type: "audio-singer", value: "Jennifer Larmore" },
    { type: "audio-singer", value: "Bernarda Fink" },
    { type: "audio-singer", value: "Furio Zanasi" },
    { type: "audio-singer", value: "Janet Baker" },
    { type: "audio-singer", value: "Sarah Walker" },
    { type: "audio-singer", value: "Della Jones" },
    { type: "audio-singer", value: "James Bowman" },
    { type: "audio-singer", value: "Derek Lee Ragin" },
    { type: "audio-singer", value: "Bejun Mehta" },
    { type: "audio-singer", value: "Huguette Tourangeau" },
    { type: "audio-singer", value: "Joan Sutherland" },
    { type: "audio-singer", value: "Lucia Popp" },
    { type: "audio-singer", value: "Tom Krause" },
    { type: "audio-singer", value: "John Tomlinson" },
    { type: "audio-singer", value: "Magdalena Kožená" },
    { type: "audio-singer", value: "Marie-Nicole Lemieux" },
    { type: "audio-singer", value: "Karina Gauvin" },
  ]);
});

test("evalMap", async (assert) => {
  const operas = await OperaConnections.create();
  assert.deepEqual(
    [...operas.evalMap(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15)],
    [
      [
        "language:Italian",
        {
          indices: [0, 1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 15],
          length: 12,
          category: "Operas in Italian",
          titles: [
            "L'Orfeo",
            "Il ritorno d'Ulisse in patria",
            "L'incoronazione di Poppea",
            "Ormindo",
            "Giasone",
            "La Calisto",
            "Agrippina",
            "Rinaldo",
            "Giulio Cesare",
            "Tamerlano",
            "Rodelinda",
            "Orlando",
          ],
        },
      ],
      [
        "century:1600",
        {
          indices: [0, 1, 2, 3, 4, 5, 6, 7],
          length: 8,
          category: "Operas from the 1600s",
          titles: [
            "L'Orfeo",
            "Il ritorno d'Ulisse in patria",
            "L'incoronazione di Poppea",
            "Ormindo",
            "Giasone",
            "La Calisto",
            "Dido and Aeneas",
            "The Fairy-Queen",
          ],
        },
      ],
      [
        "century:1700",
        {
          indices: [8, 9, 10, 11, 12, 13, 14, 15],
          length: 8,
          category: "Operas from the 1700s",
          titles: [
            "Agrippina",
            "Rinaldo",
            "Giulio Cesare",
            "Tamerlano",
            "Rodelinda",
            "The Beggar's Opera",
            "Acis and Galatea",
            "Orlando",
          ],
        },
      ],
      [
        "audio-conductor:René Jacobs",
        {
          indices: [1, 2, 5, 6, 8, 10, 15],
          length: 7,
          category: "Recorded by René Jacobs (conductor)",
          titles: [
            "Il ritorno d'Ulisse in patria",
            "L'incoronazione di Poppea",
            "La Calisto",
            "Dido and Aeneas",
            "Agrippina",
            "Giulio Cesare",
            "Orlando",
          ],
        },
      ],
      [
        "audio-conductor:John Eliot Gardiner",
        {
          indices: [1, 2, 6, 7, 8, 11, 14],
          length: 7,
          category: "Recorded by John Eliot Gardiner (conductor)",
          titles: [
            "Il ritorno d'Ulisse in patria",
            "L'incoronazione di Poppea",
            "Dido and Aeneas",
            "The Fairy-Queen",
            "Agrippina",
            "Tamerlano",
            "Acis and Galatea",
          ],
        },
      ],
      [
        "composer:/wiki/George_Frideric_Handel",
        {
          indices: [8, 9, 10, 11, 12, 14, 15],
          length: 7,
          category: "Composed by /wiki/George_Frideric_Handel",
          titles: [
            "Agrippina",
            "Rinaldo",
            "Giulio Cesare",
            "Tamerlano",
            "Rodelinda",
            "Acis and Galatea",
            "Orlando",
          ],
        },
      ],
      [
        "audio-singer:Janet Baker",
        {
          indices: [1, 2, 5, 6, 10, 12],
          length: 6,
          category: "Recorded by Janet Baker (singer)",
          titles: [
            "Il ritorno d'Ulisse in patria",
            "L'incoronazione di Poppea",
            "La Calisto",
            "Dido and Aeneas",
            "Giulio Cesare",
            "Rodelinda",
          ],
        },
      ],
      [
        "audio-conductor:Raymond Leppard",
        {
          indices: [1, 2, 3, 5, 6],
          length: 5,
          category: "Recorded by Raymond Leppard (conductor)",
          titles: [
            "Il ritorno d'Ulisse in patria",
            "L'incoronazione di Poppea",
            "Ormindo",
            "La Calisto",
            "Dido and Aeneas",
          ],
        },
      ],
      [
        "audio-conductor:William Christie",
        {
          indices: [1, 6, 7, 14, 15],
          length: 5,
          category: "Recorded by William Christie (conductor)",
          titles: [
            "Il ritorno d'Ulisse in patria",
            "Dido and Aeneas",
            "The Fairy-Queen",
            "Acis and Galatea",
            "Orlando",
          ],
        },
      ],
      [
        "audio-singer:Guillemette Laurens",
        {
          indices: [0, 1, 2, 6],
          length: 4,
          category: "Recorded by Guillemette Laurens (singer)",
          titles: [
            "L'Orfeo",
            "Il ritorno d'Ulisse in patria",
            "L'incoronazione di Poppea",
            "Dido and Aeneas",
          ],
        },
      ],
      [
        "audio-singer:Anne Sofie von Otter",
        {
          indices: [0, 2, 6, 10],
          length: 4,
          category: "Recorded by Anne Sofie von Otter (singer)",
          titles: [
            "L'Orfeo",
            "L'incoronazione di Poppea",
            "Dido and Aeneas",
            "Giulio Cesare",
          ],
        },
      ],
      [
        "audio-singer:John Mark Ainsley",
        {
          indices: [0, 6, 11, 14],
          length: 4,
          category: "Recorded by John Mark Ainsley (singer)",
          titles: [
            "L'Orfeo",
            "Dido and Aeneas",
            "Tamerlano",
            "Acis and Galatea",
          ],
        },
      ],
      [
        "decade:1640",
        {
          indices: [1, 2, 3, 4],
          length: 4,
          category: "Operas from the 1640s",
          titles: [
            "Il ritorno d'Ulisse in patria",
            "L'incoronazione di Poppea",
            "Ormindo",
            "Giasone",
          ],
        },
      ],
      [
        "audio-conductor:Nikolaus Harnoncourt",
        {
          indices: [1, 2, 6, 7],
          length: 4,
          category: "Recorded by Nikolaus Harnoncourt (conductor)",
          titles: [
            "Il ritorno d'Ulisse in patria",
            "L'incoronazione di Poppea",
            "Dido and Aeneas",
            "The Fairy-Queen",
          ],
        },
      ],
      [
        "audio-conductor:Alan Curtis",
        {
          indices: [1, 2, 10, 12],
          length: 4,
          category: "Recorded by Alan Curtis (conductor)",
          titles: [
            "Il ritorno d'Ulisse in patria",
            "L'incoronazione di Poppea",
            "Giulio Cesare",
            "Rodelinda",
          ],
        },
      ],
      [
        "audio-singer:Della Jones",
        {
          indices: [2, 6, 8, 10],
          length: 4,
          category: "Recorded by Della Jones (singer)",
          titles: [
            "L'incoronazione di Poppea",
            "Dido and Aeneas",
            "Agrippina",
            "Giulio Cesare",
          ],
        },
      ],
      [
        "audio-singer:James Bowman",
        {
          indices: [2, 5, 10, 15],
          length: 4,
          category: "Recorded by James Bowman (singer)",
          titles: [
            "L'incoronazione di Poppea",
            "La Calisto",
            "Giulio Cesare",
            "Orlando",
          ],
        },
      ],
      [
        "language:English",
        {
          indices: [6, 7, 13, 14],
          length: 4,
          category: "Operas in English",
          titles: [
            "Dido and Aeneas",
            "The Fairy-Queen",
            "The Beggar's Opera",
            "Acis and Galatea",
          ],
        },
      ],
      [
        "audio-conductor:Christopher Hogwood",
        {
          indices: [6, 8, 14, 15],
          length: 4,
          category: "Recorded by Christopher Hogwood (conductor)",
          titles: [
            "Dido and Aeneas",
            "Agrippina",
            "Acis and Galatea",
            "Orlando",
          ],
        },
      ],
      [
        "decade:1720",
        {
          indices: [10, 11, 12, 13],
          length: 4,
          category: "Operas from the 1720s",
          titles: [
            "Giulio Cesare",
            "Tamerlano",
            "Rodelinda",
            "The Beggar's Opera",
          ],
        },
      ],
      [
        "audio-singer:Trudeliese Schmidt",
        {
          indices: [0, 1, 6],
          length: 3,
          category: "Recorded by Trudeliese Schmidt (singer)",
          titles: [
            "L'Orfeo",
            "Il ritorno d'Ulisse in patria",
            "Dido and Aeneas",
          ],
        },
      ],
      [
        "audio-singer:Emma Kirkby",
        {
          indices: [0, 6, 15],
          length: 3,
          category: "Recorded by Emma Kirkby (singer)",
          titles: ["L'Orfeo", "Dido and Aeneas", "Orlando"],
        },
      ],
      [
        "audio-singer:Carolyn Watkinson",
        {
          indices: [0, 2, 6],
          length: 3,
          category: "Recorded by Carolyn Watkinson (singer)",
          titles: ["L'Orfeo", "L'incoronazione di Poppea", "Dido and Aeneas"],
        },
      ],
      [
        "audio-singer:Jennifer Larmore",
        {
          indices: [0, 2, 10],
          length: 3,
          category: "Recorded by Jennifer Larmore (singer)",
          titles: ["L'Orfeo", "L'incoronazione di Poppea", "Giulio Cesare"],
        },
      ],
      [
        "audio-singer:Bernarda Fink",
        {
          indices: [0, 1, 10],
          length: 3,
          category: "Recorded by Bernarda Fink (singer)",
          titles: ["L'Orfeo", "Il ritorno d'Ulisse in patria", "Giulio Cesare"],
        },
      ],
      [
        "audio-singer:Gloria Banditelli",
        {
          indices: [0, 1, 2],
          length: 3,
          category: "Recorded by Gloria Banditelli (singer)",
          titles: [
            "L'Orfeo",
            "Il ritorno d'Ulisse in patria",
            "L'incoronazione di Poppea",
          ],
        },
      ],
      [
        "audio-singer:Véronique Gens",
        {
          indices: [0, 6, 8],
          length: 3,
          category: "Recorded by Véronique Gens (singer)",
          titles: ["L'Orfeo", "Dido and Aeneas", "Agrippina"],
        },
      ],
      [
        "audio-singer:Furio Zanasi",
        {
          indices: [0, 1, 10],
          length: 3,
          category: "Recorded by Furio Zanasi (singer)",
          titles: ["L'Orfeo", "Il ritorno d'Ulisse in patria", "Giulio Cesare"],
        },
      ],
      [
        "audio-singer:Michael Chance",
        {
          indices: [2, 8, 11],
          length: 3,
          category: "Recorded by Michael Chance (singer)",
          titles: ["L'incoronazione di Poppea", "Agrippina", "Tamerlano"],
        },
      ],
      [
        "audio-singer:Patricia Bardon",
        {
          indices: [6, 8, 15],
          length: 3,
          category: "Recorded by Patricia Bardon (singer)",
          titles: ["Dido and Aeneas", "Agrippina", "Orlando"],
        },
      ],
      [
        "audio-singer:Derek Lee Ragin",
        {
          indices: [8, 10, 11],
          length: 3,
          category: "Recorded by Derek Lee Ragin (singer)",
          titles: ["Agrippina", "Giulio Cesare", "Tamerlano"],
        },
      ],
      [
        "audio-singer:Bejun Mehta",
        {
          indices: [8, 10, 15],
          length: 3,
          category: "Recorded by Bejun Mehta (singer)",
          titles: ["Agrippina", "Giulio Cesare", "Orlando"],
        },
      ],
      [
        "audio-singer:Joan Sutherland",
        {
          indices: [10, 12, 14],
          length: 3,
          category: "Recorded by Joan Sutherland (singer)",
          titles: ["Giulio Cesare", "Rodelinda", "Acis and Galatea"],
        },
      ],
      [
        "audio-singer:Karina Gauvin",
        {
          indices: [10, 11, 15],
          length: 3,
          category: "Recorded by Karina Gauvin (singer)",
          titles: ["Giulio Cesare", "Tamerlano", "Orlando"],
        },
      ],
    ]
  );
});

test("findPuzzle", async (assert) => {
  const operas = await OperaConnections.create();

  const { indices, tagToIndexMap } = operas.findPuzzle(
    DateTime.local(2023, 9, 18)
  );
  assert.equal(indices.length, 16, "16 indices");
  assert.equal(
    [...tagToIndexMap].filter(([, val]) => val.length === 4).length,
    4,
    "4 tags with 4 operas"
  );
  console.log(tagToIndexMap);
});

test("findPuzzle can find puzzles for every day", async (assert) => {
  const operas = await OperaConnections.create();

  const start = DateTime.local(2023, 9, 18);
  for (let i = 1; i <= 1000; i++) {
    const { tagToIndexMap } = operas.findPuzzle(start.plus({ days: i }));
    const fourTags = [...tagToIndexMap].filter(([, val]) => val.length === 3);
    assert.equal(fourTags.length, 3, fourTags.map(([tag]) => tag).join(", "));
  }
});
