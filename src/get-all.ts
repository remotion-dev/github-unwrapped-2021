import { all } from "../remotion/all";

export type All = typeof all;

const query = (username: string) =>
  `{
  user(login: "${username}") {
    pullRequests(first: 1) {
      edges {
        node {
          additions
        }
      }
    }
    starredRepositories(first: 100, orderBy: {field: STARRED_AT, direction: DESC}) {
      edges {
        node {
          name
          owner {
            login
          }
        }
        starredAt
      }
    }
    repositories(last: 50, isFork: false) {
      nodes {
        name
        url
        languages(first: 1, orderBy: {field: SIZE, direction: DESC}) {
          edges {
            size
            node {
              id
              color
              name
            }
          }
        }
      }
    }
    avatarUrl
    contributionsCollection {
      contributionCalendar {
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

export const getAll = async (username: string, token: string): Promise<All> => {
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
