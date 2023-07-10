export enum OpenAIModel {
  'gpt-3.5-turbo'
  // 'gpt-4'
}

export type PGEssay = {
  title: string;
  url: string;
  date: string;
  thanks: string;
  content: string;
  length: number;
  tokens: number;
  chunks: PGChunk[];
};

export type PGChunk = {
  article: string;
  source: string;
  section: string;
  // essay_thanks: string;
  paragraph: string;
  // content_length: number;
  // content_tokens: number;
  embedding: number[];
};

export type PGJSON = {
  current_date: string;
  author: string;
  url: string;
  length: number;
  tokens: number;
  essays: PGEssay[];
};
