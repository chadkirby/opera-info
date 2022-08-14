export interface OperaData {
  year: number;
  title: string;
  titleHref: string;
  composer: string;
  composerHref?: string;
  factoid: string;
}

export interface TargetOpera extends OperaData {
  thumbnailUrl: string;
  infobox: InfoBox | null;
  composerSummary: ComposerSummary;
  operaSummary: OperaSummary;
  recordings: RecordingItem[];
  roles: RoleItem[];
  otherOperaTitles: string[];
  hints: Hint[];
}

export interface Hint {
  category: "factoid" | "recording" | "composer" | "role";
  hint: string;
}

export interface ListedOpera extends OperaData {
  titles: string[];
  language: string;
}

export interface InfoBox {
  titles?: string[];
  Librettist?: string;
  "Based on"?: string;
  Language?: string;
  Premiere?: string;
  Website?: string;
  "Other title"?: string;
  Translation?: string;
}

export interface ComposerSummary {
  title: string;
  displaytitle: string;
  titles: {
    canonical: string;
    normalized: string;
    display: string;
  };
  thumbnail: {
    source: string;
    width: number;
    height: number;
  };
  originalimage: {
    source: string;
    width: number;
    height: number;
  };
  lang: string;
  dir: string;
  revision: string;
  tid: string;
  timestamp: string;
  description: string;
  description_source: string;
  content_urls: {
    desktop: {
      page: string;
      revisions: string;
      edit: string;
      talk: string;
    };
    mobile: {
      page: string;
      revisions: string;
      edit: string;
      talk: string;
    };
  };
  extract: string;
  extract_html: string;
}

export interface OperaSummary {
  title: string;
  displaytitle: string;
  wikibase_item: string;
  titles: {
    canonical: string;
    normalized: string;
    display: string;
  };
  thumbnail: {
    source: string;
    width: number;
    height: number;
  };
  originalimage: {
    source: string;
    width: number;
    height: number;
  };
  lang: string;
  dir: string;
  revision: string;
  tid: string;
  timestamp: string;
  content_urls: {
    desktop: {
      page: string;
      revisions: string;
      edit: string;
      talk: string;
    };
    mobile: {
      page: string;
      revisions: string;
      edit: string;
      talk: string;
    };
  };
  extract: string;
  extract_html: string;
}

export interface RoleData {
  items: RoleItem[];
}

export interface RoleItem {
  role: string;
  voiceType: string;
}

export interface RecordingData {
  items: RecordingItem[];
}

export interface RecordingItem {
  year: number;
  cast: string[];
  conductor: string;
}

export interface TitleHref extends Partial<OperaData> {
  titleHref: string;
}
