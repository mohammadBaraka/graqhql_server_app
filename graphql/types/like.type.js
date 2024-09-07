export const likeTypeDefs = /* GraphQL */ `
  type Likes {
    id: String
    usersId: String
    postsId: String
  }
  type Query {
    getLikes: [Likes]
  }
  input ToggleLikeInput {
    usersId: String
    postsId: String
  }
  type Mutation {
    toggleLike(input: ToggleLikeInput): String
  }
`;
