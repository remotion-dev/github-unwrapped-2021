import { Languages } from "./get-languages";
import { Stats } from "./get-user";

export type ResponseType = {
  stats: Stats;
  languages: Languages;
};
