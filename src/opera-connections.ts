import seedrandom from "seedrandom";
import { DateTime } from "luxon";
import type { OperaData } from "./types.js";

import {
  operaList,
  getLanguage,
  getRecordings,
  getInfoBox,
} from "./opera-getters.js";

const PUZZLE_SIZE = 12;
const GROUP_SIZE = 3;

export class OperaConnections {
  readonly obscureCategories: Map<string, Set<string>> = new Map();
  readonly lessObscureCategories: Map<string, Set<string>> = new Map();
  readonly commonCategories: Map<string, Set<string>> = new Map();
  readonly veryCommonCategories: Map<string, Set<string>> = new Map();
  readonly operasByHref: Map<string, OperaData> = new Map();
  readonly hrefToIndex: Map<string, number> = new Map();
  constructor(
    readonly operas: OperaData[],
    readonly tagMap: Map<string, Set<string>>
  ) {
    for (const [key, value] of this.tagMap.entries()) {
      if (value.size < 10) {
        this.obscureCategories.set(key, value);
      } else if (value.size < 20) {
        this.lessObscureCategories.set(key, value);
      } else if (value.size < 50) {
        this.commonCategories.set(key, value);
      } else {
        this.veryCommonCategories.set(key, value);
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
        console.log(tagList);
        return puzzle;
      } catch (e) {
        console.log(e);
      }

      // const tagToIndexList = this.evalMap(...puzzle.indices);
      // const indexToTagGroupsMap = new Map<number, string[]>();
      // // prune each map so that there are no lists with fewer than 3 items
      // for (const { indices } of tagToIndexList) {
      //   if (indices.length >= GROUP_SIZE) {
      //     for (const index of indices) {
      //       if (!indexToTagGroupsMap.has(index)) {
      //         indexToTagGroupsMap.set(index, []);
      //       }
      //       indexToTagGroupsMap.get(index)!.push(key);
      //     }
      //   }
      // }
      // // first, we need every item to be in at least one group-of-N
      // if (indexToTagGroupsMap.size !== indices.length) continue;
      // // second we need N groups of N where each group is unique
      // const groups: Record<string, { fixed: number[]; floating: number[] }> =
      //   {};
      // for (const [index, tags] of indexToTagGroupsMap.entries()) {
      //   const key = tags[0];
      //   if (!groups[key]) {
      //     groups[key] = { fixed: [], floating: [] };
      //   }
      //   if (tags.length === 1) {
      //     groups[key].fixed.push(index);
      //   } else {
      //     groups[key].floating.push(index);
      //   }
      // }

      // // remove any groups that have fewer than N items
      // for (const [key, { fixed, floating }] of Object.entries(groups)) {
      //   if (fixed.length + floating.length < GROUP_SIZE) {
      //     delete groups[key];
      //   } else if (fixed.length + floating.length === GROUP_SIZE) {
      //     // these items are not floating anymore
      //     groups[key].fixed.push(...groups[key].floating);
      //     groups[key].floating = [];
      //   }
      // }

      // // if we have fewer than N groups of N, we can't continue
      // if (Object.keys(groups).length < GROUP_SIZE) continue;

      // // if we have duplicates in the fixed items, we can't continue
      // const fixedIndices = Object.values(groups).flatMap(
      //   (value) => value.fixed
      // );
      // if (fixedIndices.length !== new Set(fixedIndices).size) continue;

      // let singerCounts = 0;
      // let conductorCounts = 0;
      // let languageCounts = 0;
      // let dateCounts = 0;
      // for (const [key, value] of tagToIndexList.entries()) {
      //   if (value.length === GROUP_SIZE) {
      //     if (key.includes("singer")) singerCounts++;
      //     if (key.includes("conductor")) conductorCounts++;
      //     if (key.includes("language")) languageCounts++;
      //     if (key.includes("century") || key.includes("decade")) {
      //       dateCounts++;
      //     }
      //   }
      // }
      // // if there are exactly N groups of N and if every item in each
      // // group is unique, return the indices
      // if (
      //   singerCounts < 3 &&
      //   conductorCounts < 3 &&
      //   languageCounts < 3 &&
      //   dateCounts < 3
      // ) {
      //   const nGroups = [...tagToIndexList.values()].filter(
      //     (value) => value.length === GROUP_SIZE
      //   );
      //   const nGroupIndices = nGroups.flatMap((value) => value.indices);
      //   if (nGroupIndices.length === new Set(nGroupIndices).size) {
      //     return { indices, tagToIndexMap: tagToIndexList, indexToTagGroupsMap };
      //   }
      // }
    }
    throw new Error("Could not find a puzzle");
  }

  tryPuzzleIndices(rng: seedrandom.PRNG) {
    // build two groups of items based on the obscure category
    const { indices: obscureIndices, tagList: obscureTagList } = this.fillFrom(
      rng,
      this.getRandomCategory(rng, this.obscureCategories),
      []
    );

    const { indices: lessObscureIndices, tagList: lessObscureTagList } =
      this.fillFrom(
        rng,
        this.getRandomCategory(rng, this.lessObscureCategories),
        obscureTagList.flatMap((x) => x.tags)
      );

    const { indices: commonIndices, tagList: commonTagList } = this.fillFrom(
      rng,
      this.getRandomCategory(rng, this.commonCategories),
      [
        ...obscureTagList.flatMap((x) => x.tags),
        ...lessObscureTagList.flatMap((x) => x.tags),
      ]
    );

    const { indices: veryCommonIndices } = this.fillFrom(
      rng,
      this.getRandomCategory(rng, this.veryCommonCategories),
      [
        ...obscureTagList.flatMap((x) => x.tags),
        ...lessObscureTagList.flatMap((x) => x.tags),
        ...commonTagList.flatMap((x) => x.tags),
      ]
    );

    return [
      ...obscureIndices,
      ...lessObscureIndices,
      ...commonIndices,
      ...veryCommonIndices,
    ];
  }

  getRandomCategory(
    rng: seedrandom.PRNG,
    category:
      | typeof this.commonCategories
      | typeof this.veryCommonCategories
      | typeof this.lessObscureCategories
      | typeof this.obscureCategories
  ) {
    const keys = [...category.keys()];
    return category.get(keys[(rng() * keys.length) | 0])!;
  }

  fillFrom(
    rng: seedrandom.PRNG,
    hrefs: Set<string>,
    withoutTags: string[] = []
  ) {
    let tries = 100;
    while (--tries > 0) {
      const randomList = randomFill(rng, GROUP_SIZE, hrefs.size).map(
        (i) => [...hrefs][i]
      );
      const indices = randomList.map((href) => this.hrefToIndex.get(href)!);
      const tagList = this.evalMap(...indices);
      const tags = tagList.flatMap((x) => x.tags);
      if (withoutTags.every((tag) => !tags.includes(tag))) {
        return { indices, tagList };
      }
    }
    throw new Error("Could not find a puzzle");
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

  evalPuzzle(indices: number[]) {
    const tagToIndexMap = this.evalMap(...indices);
    console.log(tagToIndexMap);
  }

  evalMap(...indices: number[]): Array<{
    readonly indices: number[];
    readonly length: number;
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
        length: indices.split(",").length,
        tags,
        titleHrefs: indices.split(",").map((index) => {
          return this.operas[Number(index)].titleHref;
        }),
      }))
      .sort((a, b) => b.length - a.length);
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
  operaHasTag(index: number, tag: string) {
    const entries = this.tagMap.get(tag);
    if (!entries) return false;
    const titleKey = decodeURIComponent(this.operas[index].titleHref);
    return entries.has(titleKey);
  }

  getTags(index: number) {
    const opera = this.operas[index];
    const titleKey = decodeURIComponent(opera.titleHref);
    const tags: {
      type:
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
function randomFill(rng: seedrandom.PRNG, n: number, bounds: number) {
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
