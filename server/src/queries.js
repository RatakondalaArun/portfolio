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

export const blogsQuery = `
query{
  repository(name: "RatakondalaArun", owner: "RatakondalaArun") {
    blogs: object(expression: "main:blogs") {
      ... on Tree {
        entries {
          name
          object {
            ... on Tree {
              entries {
                name
                path
                content: object {
                  ... on Blob {
                    text
                  }
                }
              }
            }
          }
        }
      }
      ... on Blob {
        text
      }
    }
  }
}    
`;
