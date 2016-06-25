export interface ComicDataWrapper {
  code?: number;
  status?: string;
  copyright?: string;
  attributionText?: string;
  attributionHTML?: string;
  data?: ComicDataContainer;
  etag?: string;
}

export interface ComicDataContainer {
  offset?: number;
  limit?: number;
  total?: number;
  count?: number;
  results?: MarvelComic[];
}

export interface MarvelComic {
  id?: number;
  digitalId?: number;
  title?: string;
  issueNumber?: number;
  variantDescription?: string;
  description?: string;
  modified?: Date;
  isbn?: string;
  upc?: string;
  diamondCode?: string;
  ean?: string;
  issn?: string;
  format?: string;
  pageCount?: number;
  textObjects?: TextObject[];
  resourceURI?: string;
  urls?: ComicUrl[];
  series?: SeriesSummary;
  variants?: ComicSummary[];
  collections?: ComicSummary[];
  collectedIssues?: ComicSummary[];
  dates?: ComicDate[];
  prices?: ComicPrice[];
  thumbnail?: ComicImage;
  images?: ComicImage[];
  creators?: CreatorList;
  characters?: CharacterList;
  stories?: StoryList;
  events?: EventList;
}

export interface ComicUrl {
  type?: string;
  url?: string;
}

export interface TextObject {
  type?: string;
  language?: string;
  text?: string;
}

export interface SeriesSummary {
  resourceURI?: string;
  name?: string;
}

export interface ComicSummary {
  resourceURI?: string;
  name?: string;
}

export interface ComicDate {
  type?: string;
  date?: Date;
}

export interface ComicPrice {
  type?: string;
  price?: number;
}

export interface ComicImage {
  path?: string;
  extension?: string;
}

export interface CreatorList {
  available?: number;
  returned?: number;
  collectionURI?: string;
  items?: CreatorSummary[];
}

export interface CreatorSummary {
  resourceURI?: string;
  name?: string;
  role?: string;
}

export interface CharacterList {
  available?: number;
  returned?: number;
  collectionURI?: string;
  items?: CharacterSummary[];
}

export interface CharacterSummary {
  resourceURI?: string;
  name?: string;
  role?: string;
}

export interface StoryList {
  available?: number;
  returned?: number;
  collectionURI?: string;
  items?: StorySummary[];
}

export interface StorySummary {
  resourceURI?: string;
  name?: string;
  type?: string;
}

export interface EventList {
  available?: number;
  returned?: number;
  collectionURI?: string;
  items?: EventSummary[];
}

export interface EventSummary {
  resourceURI?: string;
  name?: string;
}

export interface UserData {
  comics: Map<any, any>;
}
