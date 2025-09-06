export const CONTENT_TYPE = 'application/json';
export type SEARCHPARAMS = Promise<{
  [key: string]: string | string[] | undefined;
}>;
export type PARAMS = Promise<{ slug: string }>;
