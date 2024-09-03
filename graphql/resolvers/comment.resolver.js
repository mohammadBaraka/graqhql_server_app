import { GraphQLError } from "graphql";
import { prisma } from "../../utils/connect.js";
import { checkAuth } from "../../utils/verify.js";

export const commentResolvers = {
  Query: {
    getAllComments: async () => {
      try {
        const comments = await prisma.comments.findMany({});
        return comments;
      } catch (error) {
        throw new GraphQLError(error?.message);
      }
    },
  },
  Mutation: {
    createComment: async (_, { input }, context) => {
      try {
        let { title, postsId } = input;
        const userId = checkAuth(context);
        await prisma.comments.create({
          data: { title, postsId, usersId: userId?.id },
        });
        return "Comment created successfully";
      } catch (error) {
        throw new GraphQLError(error?.message);
      }
    },
    deleteComment: async (_, { id }) => {
      try {
        await prisma.comments.delete({
          where: {
            id,
          },
        });
        return "Comment deleted successfully";
      } catch (error) {
        throw new GraphQLError(error?.message);
      }
    },
  },
};
