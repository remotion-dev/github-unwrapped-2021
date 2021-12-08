import { stats } from "./stats";

const query = (username: string) => `
{
      search (query: "${username}", type: USER, first: 1){
        edges {
          node {
            ... on User {
              login
              bioHTML
              email
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
              sponsorshipsAsSponsor (first: 1) {
                edges {
                  node {
                    privacyLevel
                    isOneTimePayment
                    tier {
                      monthlyPriceInCents
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
`;

export const getUser = async (username: string): Promise<typeof stats> => {
  const res = await fetch(`https://api.github.com/graphql`, {
    method: "post",
    body: query(username),
    headers: {
      "content-type": "application/json",
    },
  });
  return res.json();
};
