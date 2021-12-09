import { languages } from "../remotion/languages";

const query = (username: string) => {
  return `
{
  user(login: "${username}") {
    repositories(last: 50, isFork: false) {
      nodes {
        name
        url
        languages (first: 1, orderBy: {field: SIZE, direction: DESC}) {
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
  }
}
    `;
};

export type Languages = typeof languages;

export const getLanguages = async (
  username: string,
  token: string
): Promise<Languages> => {
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
