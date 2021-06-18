export const starredRepoQuery = `
  {
    user(login: "RatakondalaArun") {
      pinnedItems(first: 6) {
        nodes {
          ... on Gist {
            name
            url
            stargazerCount
            description
            createdAt
          }
          ... on Repository {
            name
            url
            description
            stargazerCount
            owner {
              login
            }
            languages(first: 5, orderBy: { field: SIZE, direction: ASC }) {
              nodes {
                name
                color
              }
            }
            releases(first: 1) {
              edges {
                node {
                  name
                  tagName
                  url
                  updatedAt
                  createdAt
                }
              }
            }
          }
        }
        totalCount
      }
    }
  }
`;
