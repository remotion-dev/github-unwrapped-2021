import { contributions } from "../remotion/contributions";
import { languages } from "../remotion/languages";
import { stats } from "../remotion/stats";
import { Contributions } from "./get-contributions";
import { Languages } from "./get-languages";
import { Stats } from "./get-user";

export type ResponseType = {
  stats: Stats;
  languages: Languages;
  contributions: Contributions;
};

export const defaultResponse: ResponseType = {
  languages: languages,
  stats: stats,
  contributions: contributions,
};
