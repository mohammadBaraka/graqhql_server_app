export const categoryTypeDefs = /* GraphQL */ `
  type Category {
    id: String
    title: String
    posts: [Post]
    createdAt: String
    updatedAt: String
  }
  type Query {
    getAllCategories: [Category]
  }
  type Mutation {
    createCategory(title: String, posts: [String]): String
  }
`;
