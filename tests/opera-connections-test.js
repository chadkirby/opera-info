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
    { type: "audio-conductor", value: "Nikolaus Harnoncourt" },
    { type: "audio-conductor", value: "John Eliot Gardiner" },
    { type: "audio-singer", value: "Robert Tear" },
    { type: "audio-conductor", value: "René Jacobs" },
    { type: "audio-singer", value: "Francisco Araiza" },
    { type: "century", value: "1600" },
    { type: "audio-singer", value: "Janet Baker" },
    { type: "audio-singer", value: "Ann Murray" },
    { type: "audio-singer", value: "Thomas Allen" },
    { type: "audio-conductor", value: "William Christie" },
    { type: "audio-singer", value: "Richard Lewis" },
    { type: "audio-singer", value: "Frederica von Stade" },
    { type: "audio-singer", value: "Sarah Walker" },
    { type: "audio-conductor", value: "Raymond Leppard" },
    { type: "audio-singer", value: "Bernarda Fink" },
    { type: "audio-singer", value: "Benjamin Luxon" },
    { type: "audio-singer", value: "Jean-Paul Fouchécourt" },
    { type: "audio-conductor", value: "Roger Norrington" },
    { type: "audio-conductor", value: "Alan Curtis" },
    { type: "audio-singer", value: "Trudeliese Schmidt" },
    { type: "audio-singer", value: "Gloria Banditelli" },
    { type: "audio-singer", value: "Werner Hollweg" },
    { type: "audio-conductor", value: "Jeffrey Tate" },
    { type: "audio-singer", value: "Philippe Huttenlocher" },
    { type: "audio-singer", value: "Guillemette Laurens" },
    { type: "audio-singer", value: "Delores Ziegler" },
    { type: "audio-singer", value: "Martyn Hill" },
    { type: "decade", value: "1640" },
    { type: "audio-singer", value: "Kobie van Rensburg" },
    { type: "audio-singer", value: "Gerald English" },
    { type: "audio-singer", value: "Ian Caley" },
    { type: "audio-singer", value: "Anne Howells" },
    { type: "audio-singer", value: "Christoph Prégardien" },
    { type: "video-singer", value: "Jonas Kaufmann" },
  ]);

  assert.deepEqual(operas.getTags(10), [
    { type: "language", value: "Italian" },
    { type: "century", value: "1700" },
    { type: "audio-singer", value: "Joan Sutherland" },
    { type: "audio-conductor", value: "Richard Bonynge" },
    { type: "audio-singer", value: "Lucia Popp" },
    { type: "audio-singer", value: "John Tomlinson" },
    { type: "audio-singer", value: "Anne Sofie von Otter" },
    { type: "audio-conductor", value: "René Jacobs" },
    { type: "audio-conductor", value: "Charles Mackerras" },
    { type: "audio-singer", value: "Janet Baker" },
    { type: "audio-singer", value: "Della Jones" },
    { type: "composer", value: "/wiki/George_Frideric_Handel" },
    { type: "audio-conductor", value: "Marc Minkowski" },
    { type: "audio-singer", value: "Jennifer Larmore" },
    { type: "audio-singer", value: "Tom Krause" },
    { type: "audio-singer", value: "Sarah Walker" },
    { type: "audio-singer", value: "Huguette Tourangeau" },
    { type: "audio-singer", value: "Bernarda Fink" },
    { type: "audio-conductor", value: "Alan Curtis" },
    { type: "audio-singer", value: "Karina Gauvin" },
    { type: "audio-singer", value: "James Bowman" },
    { type: "audio-singer", value: "Marie-Nicole Lemieux" },
    { type: "decade", value: "1720" },
    { type: "audio-singer", value: "Derek Lee Ragin" },
    { type: "audio-singer", value: "Bejun Mehta" },
    { type: "audio-singer", value: "Magdalena Kožená" },
  ]);
});

test("evalMap", async (assert) => {
  const operas = await OperaConnections.create();
  assert.deepEqual(
    [...operas.evalMap(0, 1, 2, 3, 4, 5, 6, 7)],
    [
      {
        indices: [0, 1, 2, 3, 4, 5, 6, 7],
        tags: ["century:::1600"],
        titleHrefs: [
          "/wiki/L%27Orfeo",
          "/wiki/Il_ritorno_d%27Ulisse_in_patria",
          "/wiki/L%27incoronazione_di_Poppea",
          "/wiki/Ormindo",
          "/wiki/Giasone",
          "/wiki/La_Calisto",
          "/wiki/Dido_and_Aeneas",
          "/wiki/The_Fairy-Queen",
        ],
      },
      {
        indices: [0, 1, 2, 3, 4, 5],
        tags: ["language:::Italian"],
        titleHrefs: [
          "/wiki/L%27Orfeo",
          "/wiki/Il_ritorno_d%27Ulisse_in_patria",
          "/wiki/L%27incoronazione_di_Poppea",
          "/wiki/Ormindo",
          "/wiki/Giasone",
          "/wiki/La_Calisto",
        ],
      },
      {
        indices: [1, 2, 3, 5, 6],
        tags: ["audio-conductor:::Raymond Leppard"],
        titleHrefs: [
          "/wiki/Il_ritorno_d%27Ulisse_in_patria",
          "/wiki/L%27incoronazione_di_Poppea",
          "/wiki/Ormindo",
          "/wiki/La_Calisto",
          "/wiki/Dido_and_Aeneas",
        ],
      },
      {
        indices: [0, 1, 2, 6],
        tags: ["audio-singer:::Guillemette Laurens"],
        titleHrefs: [
          "/wiki/L%27Orfeo",
          "/wiki/Il_ritorno_d%27Ulisse_in_patria",
          "/wiki/L%27incoronazione_di_Poppea",
          "/wiki/Dido_and_Aeneas",
        ],
      },
      {
        indices: [1, 2, 6, 7],
        tags: [
          "audio-conductor:::Nikolaus Harnoncourt",
          "audio-conductor:::John Eliot Gardiner",
        ],
        titleHrefs: [
          "/wiki/Il_ritorno_d%27Ulisse_in_patria",
          "/wiki/L%27incoronazione_di_Poppea",
          "/wiki/Dido_and_Aeneas",
          "/wiki/The_Fairy-Queen",
        ],
      },
      {
        indices: [1, 2, 5, 6],
        tags: ["audio-conductor:::René Jacobs", "audio-singer:::Janet Baker"],
        titleHrefs: [
          "/wiki/Il_ritorno_d%27Ulisse_in_patria",
          "/wiki/L%27incoronazione_di_Poppea",
          "/wiki/La_Calisto",
          "/wiki/Dido_and_Aeneas",
        ],
      },
      {
        indices: [1, 2, 3, 4],
        tags: ["decade:::1640"],
        titleHrefs: [
          "/wiki/Il_ritorno_d%27Ulisse_in_patria",
          "/wiki/L%27incoronazione_di_Poppea",
          "/wiki/Ormindo",
          "/wiki/Giasone",
        ],
      },
    ]
  );
});

test("findPuzzle", async (assert) => {
  const operas = await OperaConnections.create();

  const puzzle = operas.findPuzzle(DateTime.local(2023, 9, 18));
  assert.equal(puzzle.indices.length, 16, "16 indices");
  assert.deepEqual(
    puzzle.quantiles,
    [
      { score: 1, breakpoint: 0 },
      { score: 2, breakpoint: 10 },
      { score: 3, breakpoint: 10 },
      { score: 4, breakpoint: 27 },
      { score: 5, breakpoint: 42 },
      { score: 6, breakpoint: 52 },
      { score: 7, breakpoint: 71 },
      { score: 8, breakpoint: 78 },
      { score: 9, breakpoint: 87 },
      { score: 10, breakpoint: 117 },
    ],
    "quantiles"
  );
});

test("findPuzzle can find puzzles for every day", async (assert) => {
  const operas = await OperaConnections.create();

  const start = DateTime.local(2023, 9, 18);
  for (let i = 1; i <= 1000; i++) {
    const puzzle = operas.findPuzzle(start.plus({ days: i }));
    if (puzzle.tagList.length < 4) {
      debugger;
      operas.findPuzzle(start.plus({ days: i }));
    }
    assert.ok(puzzle.tagList.length >= 4, `day ${i} has >4 tag groups`);
    // console.log(puzzle.quantiles);
  }
});
