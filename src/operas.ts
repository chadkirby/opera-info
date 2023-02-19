import type { OperaData, ListedOpera, TargetOpera } from "./types.js";

import {
  operaList,
  getTitles,
  getLanguage,
  getComposerSummary,
  getRecordings,
  getSummary,
  getInfoBox,
  getRoles,
} from "./opera-getters.js";
import { makeHints } from "./hints.js";

export class Operas {
  readonly operas: OperaData[];

  constructor(filterFn: (opera: OperaData) => boolean = () => true) {
    if (!operaList) throw new Error("operas.json not found");
    this.operas = operaList.filter(filterFn);
  }
  get length() {
    return this.operas.length;
  }
  find(
    fn: (opera: OperaData, index: number, list: OperaData[]) => boolean
  ): OperaData | undefined {
    return this.operas.find(fn);
  }
  findIndex(
    fn: (opera: OperaData, index: number, list: OperaData[]) => boolean
  ): number {
    return this.operas.findIndex(fn);
  }
  map<T>(fn: (opera: OperaData, index: number, list: OperaData[]) => T): T[] {
    return this.operas.map(fn);
  }
  filter(
    fn: (opera: OperaData, index: number, list: OperaData[]) => boolean
  ): OperaData[] {
    return this.operas.filter(fn);
  }
  [Symbol.iterator]() {
    return this.operas[Symbol.iterator]();
  }
  async getOperaByTitleHref(href: string): Promise<ListedOpera | null> {
    const index = this.operas.findIndex((opera) => opera.titleHref === href);
    return await this.getBasicOpera(index);
  }
  async getBasicOpera(index: number): Promise<ListedOpera | null> {
    const opera = this.operas[index];
    return opera ? await this.ensureBasicData(opera) : null;
  }

  async ensureBasicData(opera: OperaData): Promise<ListedOpera>;
  async ensureBasicData(opera: null): Promise<null>;
  async ensureBasicData(opera: OperaData | null): Promise<ListedOpera | null> {
    if (!opera) return null;
    return {
      ...opera,
      titles: await getTitles(opera),
      language: await getLanguage(opera),
    };
  }

  async getTargetOpera(href: string): Promise<TargetOpera | null>;
  async getTargetOpera(index: number): Promise<TargetOpera | null>;
  async getTargetOpera(id: number | string): Promise<TargetOpera | null> {
    const index =
      typeof id === "number"
        ? id
        : this.operas.findIndex(
            (opera) => opera.titleHref === id || opera.title === id
          );
    const opera = this.operas[index];
    return opera ? await this.ensureTargetData(opera) : null;
  }

  async ensureTargetData(opera: OperaData): Promise<TargetOpera | null> {
    const basic = await this.ensureBasicData(opera);
    const composerSummary = await getComposerSummary(basic);
    if (!composerSummary) return null;

    const operaSummary = await getSummary(basic);
    if (!operaSummary) return null;

    const otherOperaTitles = this.operas
      .filter((o) => o.composerHref === basic.composerHref)
      .map((o) => o.title);

    const needsHints = {
      ...basic,
      composer: composerSummary?.title,
      thumbnailUrl: composerSummary?.thumbnail?.source,
      composerSummary: composerSummary,
      infobox: await getInfoBox(basic),
      operaSummary,
      recordings: (await getRecordings(basic))?.items || [],
      roles: (await getRoles(basic))?.items || [],
      otherOperaTitles,
    };
    return {
      ...needsHints,
      hints: await makeHints(needsHints),
    };
  }
}
