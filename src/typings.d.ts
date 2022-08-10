export interface OperaData {
  title: string;
  titleHref: string;
  composer: string;
  composerHref: string;
  year: number;
  factoid: string;
}

declare module "operas.json" {
  export default Array<OperaData>;
}

declare module "composer-summaries.json" {
  export default Array<ComposerSummary>;
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

declare module "opera-summaries.json" {
  export default Array<ComposerSummary>;
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
