export const commentTypeDefs = /* GraphQL */ `
  type Comments {
    id: String
    title: String
    usersId: String
    postsId: String
    user: User
    post: Post
    createdAt: String
    updatedAt: String
  }

  input CommentInputs {
    title: String
    usersId: String
    postsId: String
  }
  input UpdateInputs {
    id: String
    title: String
    usersId: String
    postsId: String
  }
  type Query {
    getAllComments: [Comments]
  }

  type Mutation {
    updateComment(input: UpdateInputs): String
    createComment(input: CommentInputs): String
    deleteComment(id: String): String
  }
`;
