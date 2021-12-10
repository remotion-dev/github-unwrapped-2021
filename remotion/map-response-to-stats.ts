import groupBy from "lodash.groupby";
import { All } from "../src/get-all";

// Space saving format for contributions to not run into 256KB payload format
// weekday, contributions, date, color
export type SpaceSavingContribution = [number, number, string, string];

type TopLanguage = {
  color: string;
  name: string;
};

type Weekdays = {
  least: Weekday;
  leastCount: number;
  mostCount: number;
  most: Weekday;
  ratio: number;
};

export type CompactStats = {
  contributionCount: number;
  contributions: { [key: string]: SpaceSavingContribution[] };
  avatar: string;
  topLanguage: TopLanguage | null;
  starsThisYear: number;
  weekdays: Weekdays;
};

export const getStarsThisYear = (response: All) => {
  const edge = response.data.user.starredRepositories.edges ?? [];
  const starsThisYear = edge.filter(
    (e) => new Date(e.starredAt).getFullYear() === 2021
  );
  return starsThisYear.length;
};

export type Weekday = "0" | "1" | "2" | "3" | "4" | "5" | "6";

export const getMostProductive = (response: All): Weekdays => {
  const weekdays: { [key in Weekday]: number } = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  };
  for (const r of response.data.user.contributionsCollection.contributionCalendar.weeks
    .map((w) => w.contributionDays)
    .flat(1)) {
    weekdays[r.weekday] += r.contributionCount;
  }

  const entries = Object.entries(weekdays) as [Weekday, number][];

  const sortedDays = entries.slice().sort((a, b) => a[1] - b[1]);

  const [leastDay, leastAmount] = sortedDays[0];
  const [mostDay, mostAmount] = sortedDays[sortedDays.length - 1];

  const ratio = Math.max(mostAmount, 1) / Math.max(leastAmount, 1);

  return {
    least: leastDay,
    most: mostDay,
    ratio: ratio,
    leastCount: leastAmount,
    mostCount: mostAmount,
  };
};

export const getTopLanguage = (response: All): TopLanguage => {
  const langs: { [key: string]: number } = {};
  const languages = response.data.user.repositories.nodes
    .filter((n) => n.languages.edges?.[0])
    .map((n) => n.languages.edges[0].node);

  for (const lang of languages) {
    if (!langs[lang.id]) {
      langs[lang.id] = 0;
    }
    langs[lang.id]++;
  }

  const topEntries = Object.entries(langs)
    .sort((a, b) => a[1] - b[1])
    .reverse();

  const lang = languages.find((l) => l.id === topEntries[0][0]);

  if (!lang) {
    return null;
  }
  return {
    color: lang.color,
    name: lang.name,
  };
};

export const mapResponseToStats = (response: All): CompactStats => {
  const allDays =
    response.data.user.contributionsCollection.contributionCalendar.weeks
      .map((w) => w.contributionDays)
      .flat(1);

  const groupedByMonth = groupBy(
    allDays.map(
      (d) =>
        [
          d.weekday,
          d.contributionCount,
          d.date,
          d.color,
        ] as SpaceSavingContribution
    ),
    ([_, __, date]) => date.split("-")[1]
  );

  return {
    contributionCount: allDays.reduce((a, b) => a + b.contributionCount, 0),
    contributions: groupedByMonth,
    avatar: response.data.user.avatarUrl,
    topLanguage: getTopLanguage(response),
    starsThisYear: getStarsThisYear(response),
    weekdays: getMostProductive(response),
  };
};
