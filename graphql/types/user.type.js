export const userTpedDefs = /* GraphQL */ `
  scalar Upload
  type User {
    id: String
    name: String
    email: String
    img: String!
    password: String
    token: String
    # posts
    # likes
    comments: [Comments]
    createdAt: String
    updatedAt: String
  }
  input RegisterInputs {
    name: String
    email: String
    password: String
    img: Upload
  }
  input LoginInputs {
    email: String
    password: String
  }
  type Query {
    getAllUsers: [User]
    getUser(id: String): User
    sendToken: User
  }
  type Mutation {
    register(name: String, email: String, password: String, img: Upload): User
    login(input: LoginInputs): User
    logout: User
  }
`;
