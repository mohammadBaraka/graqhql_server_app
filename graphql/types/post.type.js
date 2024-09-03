export const postTypeDefs = /* GraphQL */ `
  scalar Upload
  type Post {
    id: String
    title: String
    desc: String
    img: String!
    categories: [Category]
    usersId: String
    Users: User!

    createdAt: String
    updatedAt: String
  }
  input PostInputs {
    title: String
    desc: String
    img: Upload
    usersId: String
  }
  type Query {
    getAllPosts: [Post]
    getOnePost(id: String): Post
  }

  type Mutation {
    createPost(
      title: String
      desc: String
      img: Upload
      usersId: String
      categoryId: [String]
    ): Post
    deletePost(id: String): String
  }
`;
