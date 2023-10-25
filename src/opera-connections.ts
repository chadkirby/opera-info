import seedrandom from "seedrandom";
import { DateTime } from "luxon";
import { quantileSorted } from "simple-statistics";
import { Memoize } from "typescript-memoize";
import type { OperaData } from "./types.js";

import {
  operaList,
  getLanguage,
  getRecordings,
  getInfoBox,
} from "./opera-getters.js";

const PUZZLE_SIZE = 16;
const GROUP_SIZE = 4;

type SelectedGroup = [number, number, number, number];

type HREF = string;

type TagType =
  | "composer"
  | "librettist"
  | "language"
  | "century"
  | "decade"
  | "year"
  | "audio-conductor"
  | "audio-singer"
  | "video-conductor"
  | "video-singer";

export class OperaConnections {
  readonly categoryGroups: Array<Map<string, Set<string>>> = [
    new Map(),
    new Map(),
    new Map(),
    new Map(),
  ];
  readonly operasByHref: Map<string, OperaData> = new Map();
  readonly hrefToIndex: Map<string, number> = new Map();
  constructor(
    readonly operas: OperaData[],
    readonly tagMap: Map<string, Set<string>>
  ) {
    for (const [key, value] of this.tagMap.entries()) {
      if (value.size < 10) {
        this.categoryGroups[0].set(key, value);
      } else if (value.size < 20) {
        this.categoryGroups[1].set(key, value);
      } else if (value.size < 50) {
        this.categoryGroups[2].set(key, value);
      } else {
        this.categoryGroups[3].set(key, value);
      }
    }
    for (const [i, opera] of operas.entries()) {
      this.operasByHref.set(decodeURIComponent(opera.titleHref), opera);
      this.hrefToIndex.set(decodeURIComponent(opera.titleHref), i);
    }
  }

  findPuzzle(
    today = DateTime.fromISO(DateTime.local().toISO() || "", {
      zone: "America/Los_Angeles",
    }).set({ hour: 0, minute: 0, second: 0 })
  ) {
    const rng = seedrandom(today.toLocaleString(DateTime.DATETIME_MED));

    while (true) {
      try {
        const puzzle = this.tryPuzzleIndices(rng);
        const tagList = this.evalMap(...puzzle);
        const scores = Array(1000)
          .fill(0)
          .map(() => {
            const group = this.pickRandomIndices(rng, puzzle);
            return this.scoreGroup(group, puzzle);
          })
          .sort((a, z) => a - z);

        const quantiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => ({
          score: n,
          breakpoint: quantileSorted(scores, n === 10 ? 1 : 1 - 1 / 2 ** n),
        }));

        return { indices: puzzle, tagList, quantiles };
      } catch (e) {
        console.log(e);
      }
    }
    throw new Error("Could not find a puzzle");
  }

  pickRandomIndices(rng: seedrandom.PRNG, puzzle: number[]) {
    const indices = new Set<number>();
    while (indices.size < GROUP_SIZE) {
      indices.add((rng() * puzzle.length) | 0);
    }
    return [...indices];
  }

  findUniqScoreItems(
    groupScores: Array<{
      item: {
        readonly indices: number[];
        readonly tags: string[];
        readonly titleHrefs: string[];
      };
      score: number;
    }>
  ) {
    const groupCounts = new Map<number, number>();
    for (const { item } of groupScores) {
      for (const index of item.indices) {
        groupCounts.set(index, (groupCounts.get(index) || 0) + 1);
      }
    }
    const working = groupScores.slice();
    for (const { item } of working) {
      // sort the indices, least common first
      item.indices.sort(
        (a, z) => (groupCounts.get(a) || 0) - (groupCounts.get(z) || 0)
      );
    }
    const items = [];
    while (items.length < GROUP_SIZE) {
      const candidate = working.shift();
      if (!candidate) break;
      const currentIndices = items.flatMap(({ item }) =>
        item.indices.slice(0, GROUP_SIZE)
      );
      // if the candidate's indices overlap with the current indices, skip it
      if (
        candidate.item.indices
          .slice(0, GROUP_SIZE)
          .some((index) => currentIndices.includes(index))
      ) {
        continue;
      }
      items.push(candidate);
    }
    return items;
  }

  scorePuzzle(
    groups: [SelectedGroup, SelectedGroup, SelectedGroup, SelectedGroup],
    puzzle: number[],
    quantiles: Array<{ score: number; breakpoint: number }>
  ) {
    const scores = groups.map((group) => {
      const groupScore = this.scoreGroup(group, puzzle);
      const qs = quantiles.find(({ breakpoint }) => groupScore <= breakpoint);
      return qs ? qs.score : 10;
    });
    return scores.reduce((a, z) => a + z);
  }

  scoreGroup(selectedIndices: number[], puzzle: number[]) {
    let score = 0;
    const puzzleTagList = this.evalMap(...puzzle);
    const selectedTagList = this.evalMap(...selectedIndices);
    for (const selectedTagItem of selectedTagList) {
      let itemScore = 0;
      for (const tag of selectedTagItem.tags) {
        // the tag score is inversely related to the number of items we
        // know about with that tag
        const tagSize = this.sizeOfTag(tag);
        let tagScore = (1 / tagSize) ** 0.5;
        // the tagScore may be discounted if there are other matching items in the puzzle
        const puzzleTagItem = puzzleTagList.find((item) =>
          item.tags.includes(tag)
        );
        if (puzzleTagItem) {
          tagScore *=
            selectedTagItem.indices.length / puzzleTagItem.indices.length;
        }

        itemScore += tagScore;
      }
      score += itemScore;
    }
    return Math.round(score * 100);
  }

  tryPuzzleIndices(rng: seedrandom.PRNG) {
    const puzzle: number[] = [];
    const hrefs: Set<HREF> = new Set();
    const stopTagsTypes: Set<TagType> = new Set();
    const tagCounts: Map<TagType, number> = new Map();
    let tries = 100;
    while (puzzle.length < PUZZLE_SIZE && tries-- > 0) {
      try {
        const categoryGroup = this.categoryGroups[(puzzle.length / 4) | 0];
        const newHrefs = this.fillFrom(
          rng,
          this.getRandomCategory(rng, categoryGroup),
          hrefs,
          stopTagsTypes
        );
        for (const href of newHrefs) {
          hrefs.add(href);
          puzzle.push(this.hrefToIndex.get(href)!);
        }
        const tagList = this.evalMap(...puzzle);
        for (const tagItem of tagList) {
          if (tagItem.indices.length < GROUP_SIZE) continue;
          const tagTypes = new Set(
            tagItem.tags.map((tag) => tag.split(":::")[0])
          ) as Set<TagType>;
          for (const tagType of tagTypes) {
            if (/singer|conductor/.test(tagType)) {
              tagCounts.set(tagType, (tagCounts.get(tagType) || 0) + 1);
            }
          }
        }
        // we don't want more than GROUP_SIZE items with the same tag
        // type
        for (const [tagType, count] of tagCounts.entries()) {
          if (count >= GROUP_SIZE) {
            stopTagsTypes.add(tagType);
          }
        }
      } catch (e) {
        //
      }
    }
    if (puzzle.length < PUZZLE_SIZE) {
      throw new Error("Could not fill puzzle");
    }

    return puzzle;
  }

  getRandomCategory(rng: seedrandom.PRNG, category: Map<string, Set<string>>) {
    const keys = [...category.keys()];
    return category.get(keys[(rng() * keys.length) | 0])!;
  }

  fillFrom(
    rng: seedrandom.PRNG,
    candidateHrefs: Set<HREF>,
    excludeHrefs: Set<HREF>,
    excludeTagTypes: Set<TagType>
  ): Set<HREF> {
    const keeps: Set<HREF> = new Set();
    const hrefsList = [...candidateHrefs];
    for (const randomIndex of randomFill(rng, candidateHrefs.size)) {
      // pick a random item from the list
      const randomHref = hrefsList[randomIndex];
      if (excludeHrefs.has(randomHref)) continue;
      // if the item has any tags that are in the exclude list, skip it
      const tags = this.getTags(this.hrefToIndex.get(randomHref)!);
      if (tags.some((tag) => excludeTagTypes.has(tag.type))) continue;
      keeps.add(randomHref);
      if (keeps.size === GROUP_SIZE) break;
    }
    if (keeps.size < GROUP_SIZE) {
      throw new Error("Could not find enough items");
    }
    return keeps;
  }

  /** construct a group of indices such that the group does share the
   * given tag, and the group does not share any less-common tag */
  findGroupWithTag(rng: seedrandom.PRNG, tag: string) {
    const { tagMap } = this;
    const tagSet = tagMap.get(tag);
    if (!tagSet) throw new Error("tag not found");
    let tries = 100;
    while (--tries > 0) {
      const indices = randomFill(rng, GROUP_SIZE, tagSet.size);
      const tagToIndexList = this.evalMap(...indices);
      const minTagSize = this.sizeOfTag(tag);
      for (const item of tagToIndexList) {
        if (item.tags.every((tag) => this.sizeOfTag(tag) >= minTagSize)) {
          return tagToIndexList;
        }
      }
    }
    return null;
  }

  @Memoize(true)
  evalMap(...indices: number[]): Array<{
    readonly indices: number[];
    readonly tags: string[];
    readonly titleHrefs: string[];
  }> {
    const tagToIndexMap = new Map<string, number[]>();
    for (const index of indices) {
      const tags = this.getTags(index);
      for (const tag of tags) {
        const key = `${tag.type}:::${tag.value}`;
        if (!tagToIndexMap.has(key)) {
          tagToIndexMap.set(key, []);
        }
        tagToIndexMap.get(key)!.push(index);
      }
    }
    const indicesToTags = new Map<string, string[]>();
    // prune each map so that there are no lists with fewer than N items
    for (const [tag, indices] of tagToIndexMap.entries()) {
      if (indices.length < GROUP_SIZE) {
        tagToIndexMap.delete(tag);
      } else {
        const indexKey = indices.toString();
        if (!indicesToTags.has(indexKey)) {
          indicesToTags.set(indexKey, []);
        }
        indicesToTags.get(indexKey)!.push(tag);
      }
    }

    return [...indicesToTags.entries()]
      .map(([indices, tags]) => ({
        indices: indices.split(",").map((index) => +index),
        tags,
        titleHrefs: indices.split(",").map((index) => {
          return this.operas[Number(index)].titleHref;
        }),
      }))
      .sort((a, b) => b.indices.length - a.indices.length);
  }

  sizeOfTag(tag: string) {
    const tagSet = this.tagMap.get(tag);
    return tagSet ? tagSet.size : 0;
  }

  operasWithoutTags(tags: string[]) {
    return this.operas.filter(
      (_opera, index) => !tags.some((tag) => this.operaHasTag(index, tag))
    );
  }

  /** answer whether the given opera has the given tag */
  @Memoize(true)
  operaHasTag(index: number, tag: string) {
    const entries = this.tagMap.get(tag);
    if (!entries) return false;
    const titleKey = decodeURIComponent(this.operas[index].titleHref);
    return entries.has(titleKey);
  }

  @Memoize(true)
  getTags(index: number) {
    const opera = this.operas[index];
    const titleKey = decodeURIComponent(opera.titleHref);
    const tags: {
      type: TagType;
      value: string;
    }[] = [];
    for (const [tagKey, value] of this.tagMap.entries()) {
      const [type, valueKey] = tagKey.split(":::");
      if (value.has(titleKey)) {
        // @ts-expect-error type is correct
        tags.push({ type, value: valueKey });
      }
    }
    return tags;
  }

  static async create(filterFn: (opera: OperaData) => boolean = () => true) {
    const operas = operaList!.filter(filterFn);
    const byComposer = new Map<string, Set<string>>();
    const byLibrettist = new Map<string, Set<string>>();
    const byLanguage = new Map<string, Set<string>>();
    const byCentury = new Map<number, Set<string>>();
    const byDecade = new Map<number, Set<string>>();
    const byYear = new Map<number, Set<string>>();
    const byAudioConductor = new Map<string, Set<string>>();
    const byAudioSinger = new Map<string, Set<string>>();
    const byVideoConductor = new Map<string, Set<string>>();
    const byVideoSinger = new Map<string, Set<string>>();
    for (const opera of operas) {
      if (!opera.composerHref) continue;
      const titleKey = decodeURIComponent(opera.titleHref);
      const composer = decodeURIComponent(opera.composerHref);
      if (!byComposer.has(composer)) {
        byComposer.set(composer, new Set());
      }
      byComposer.get(composer)!.add(titleKey);

      const infoBox = await getInfoBox(opera);
      if (infoBox?.Librettist) {
        const librettist = infoBox.Librettist;
        if (!byLibrettist.has(librettist)) {
          byLibrettist.set(librettist, new Set());
        }
        byLibrettist.get(librettist)!.add(titleKey);
      }

      const language = await getLanguage(opera);
      if (!byLanguage.has(language)) {
        byLanguage.set(language, new Set());
      }
      byLanguage.get(language)!.add(titleKey);

      const century = Math.floor(opera.year / 100) * 100;
      if (!byCentury.has(century)) {
        byCentury.set(century, new Set());
      }
      byCentury.get(century)!.add(titleKey);

      const decade = Math.floor(opera.year / 10) * 10;
      if (!byDecade.has(decade)) {
        byDecade.set(decade, new Set());
      }
      byDecade.get(decade)!.add(titleKey);

      if (!byYear.has(opera.year)) {
        byYear.set(opera.year, new Set());
      }
      byYear.get(opera.year)!.add(titleKey);

      const recordings = await getRecordings(opera);
      for (const recording of recordings?.items || []) {
        let byConductorMap: Map<string, Set<string>>;
        let bySingerMap: Map<string, Set<string>>;
        if (recording.type === "audio") {
          byConductorMap = byAudioConductor;
          bySingerMap = byAudioSinger;
        } else {
          byConductorMap = byVideoConductor;
          bySingerMap = byVideoSinger;
        }
        if (recording.conductor) {
          const conductor = recording.conductor || "";
          if (!byConductorMap.has(conductor)) {
            byConductorMap.set(conductor, new Set());
          }
          byConductorMap.get(conductor)!.add(titleKey);
        }

        for (const singer of recording.cast || []) {
          if (!bySingerMap.has(singer)) {
            bySingerMap.set(singer, new Set());
          }
          bySingerMap.get(singer)!.add(titleKey);
        }
      }
    }

    const tagMap: Map<string, Set<string>> = new Map();
    // prune each map so that there are no lists with fewer than N items
    for (const map of [
      byComposer,
      byLibrettist,
      byLanguage,
      byCentury,
      byDecade,
      byYear,
      byAudioConductor,
      byAudioSinger,
      byVideoConductor,
      byVideoSinger,
    ]) {
      for (const [key, value] of map.entries()) {
        if (value.size < GROUP_SIZE) {
          // @ts-expect-error ignore delete
          map.delete(key);
        } else {
          const tagKey = `${
            map === byComposer
              ? "composer"
              : map === byLibrettist
              ? "librettist"
              : map === byLanguage
              ? "language"
              : map === byCentury
              ? "century"
              : map === byDecade
              ? "decade"
              : map === byYear
              ? "year"
              : map === byAudioConductor
              ? "audio-conductor"
              : map === byAudioSinger
              ? "audio-singer"
              : map === byVideoConductor
              ? "video-conductor"
              : map === byVideoSinger
              ? "video-singer"
              : ""
          }:::${key}`;
          if (!tagMap.has(tagKey)) {
            tagMap.set(tagKey, new Set());
          }
          for (const titleKey of value) {
            tagMap.get(tagKey)!.add(titleKey);
          }
        }
      }
    }

    // sort the tagMap by the number of items in each list
    const sortedTagMap = new Map(
      [...tagMap.entries()].sort((a, b) => b[1].size - a[1].size)
    );
    return new OperaConnections(operas, sortedTagMap);
  }
  get length() {
    return this.operas.length;
  }
}

/**
 * fill an array with N unique random numbers between 0 .. bounds
 */
function randomFill(rng: seedrandom.PRNG, n: number, bounds: number = n) {
  if (n > bounds) throw new Error("n must be less than bounds");
  const indices = new Set<number>();
  while (indices.size < n) {
    indices.add((rng() * bounds) | 0);
  }
  return [...indices];
}

export function tagToDisplay(tag: string) {
  const [category, specific] = tag.split(":");
  return category === "composer"
    ? `Composed by ${specific}`
    : category === "librettist"
    ? `Libretto by ${specific}`
    : category === "language"
    ? `Operas in ${specific}`
    : category === "century"
    ? `Operas from the ${specific}s`
    : category === "decade"
    ? `Operas from the ${specific}s`
    : category === "year"
    ? `Operas from ${specific}`
    : category === "audio-conductor"
    ? `Recorded by ${specific} (conductor)`
    : category === "audio-singer"
    ? `Recorded by ${specific} (singer)`
    : category === "video-conductor"
    ? `Video by ${specific} (conductor)`
    : category === "video-singer"
    ? `Video by ${specific} (singer)`
    : "Unknown";
}
