import { stats } from "../remotion/stats";

export type Stats = typeof stats;

const query = (username: string) =>
  `
{
  search (query: "${username}", type: USER, first: 1){
    edges {
      node {
        ... on User {
          login
          avatarUrl
          bioHTML
          pullRequests (first: 1) {
            edges {
              node {
                additions
              }
            }
          }
          starredRepositories (first: 100, orderBy: {field: STARRED_AT, direction: DESC}) {
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
        }
      }
    }
  }
}
`.trim();

export const getUser = async (
  username: string,
  token: string
): Promise<Stats> => {
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
