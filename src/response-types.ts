import { languages } from "../remotion/languages";
import { stats } from "../remotion/stats";
import { Languages } from "./get-languages";
import { Stats } from "./get-user";

export type ResponseType = {
  stats: Stats;
  languages: Languages;
};

export const defaultResponse: ResponseType = {
  languages: languages,
  stats: stats,
};
