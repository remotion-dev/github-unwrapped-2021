import { CompactStats } from "../remotion/map-response-to-stats";
import { mongoClient } from "./mongo";

type CacheCollection = {
  username: string;
  stats: CompactStats;
};

export const collection = async () => {
  const client = await mongoClient;
  return client.db("wrapped").collection<CacheCollection>("wrapped");
};

export const saveCache = async (username: string, stats: CompactStats) => {
  const coll = await collection();
  return coll.insertOne({
    stats,
    username,
  });
};

export const getFromCache = async (username: string) => {
  const coll = await collection();
  const f = await coll.findOne({
    username,
  });
  if (f) {
    return f.stats;
  }
  return null;
};
