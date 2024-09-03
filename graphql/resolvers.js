import { authResolvers } from "./resolvers/auth.resolver.js";
import { categoryResolvers } from "./resolvers/category.resolver.js";
import { commentResolvers } from "./resolvers/comment.resolver.js";
import { postReaolvers } from "./resolvers/post.resolver.js";
import { userResolvers } from "./resolvers/user.resolver.js";

export const resolvers = {
  Query: {
    ...authResolvers.Query,
    ...userResolvers.Query,
    ...categoryResolvers.Query,
    ...postReaolvers.Query,
    ...commentResolvers.Query,
  },
  Mutation: {
    ...authResolvers.Mutation,
    ...userResolvers.Mutation,
    ...categoryResolvers.Mutation,
    ...postReaolvers.Mutation,
    ...commentResolvers.Mutation,
  },
};
