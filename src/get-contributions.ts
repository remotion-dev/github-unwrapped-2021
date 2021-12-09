import { contributions } from "../remotion/contributions";

export type Contributions = typeof contributions;

const query = (username: string) =>
  `
{
  user(login: "${username}") {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            weekday
            date
            color
          }
        }
      }
    }
  }
}
`.trim();

export const getContributions = async (
  username: string,
  token: string
): Promise<Contributions> => {
  const res = await fetch(`https://api.github.com/graphql`, {
    method: "post",
    body: JSON.stringify({ query: query(username) }),
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  });
  return res.json();
};
