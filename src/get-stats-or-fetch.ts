import {
  CompactStats,
  mapResponseToStats,
} from "../remotion/map-response-to-stats";
import { getFromCache, saveCache } from "./db/cache";
import { getAll } from "./get-all";

export const getStatsOrFetch = async (
  user: string
): Promise<CompactStats | null> => {
  const cache = await getFromCache(user);
  if (cache) {
    return cache;
  }
  const ast = await getAll(user, process.env.GITHUB_TOKEN);
  if (!ast.data.user) {
    return null;
  }
  const compact = mapResponseToStats(ast);
  saveCache(user, compact);

  return compact;
};
