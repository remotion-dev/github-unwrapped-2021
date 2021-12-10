import { getContributions } from "../src/get-contributions";
import { getLanguages } from "../src/get-languages";
import { getUser } from "../src/get-user";

export const getUserLocal = async (username: string) => {
  const [stats, languages, contributions] = await Promise.all([
    getUser(username, process.env.GITHUB_TOKEN as string),
    getLanguages(username, process.env.GITHUB_TOKEN),
    getContributions(username, process.env.GITHUB_TOKEN),
  ]);

  return {
    stats,
    contributions,
    languages,
  };
};
