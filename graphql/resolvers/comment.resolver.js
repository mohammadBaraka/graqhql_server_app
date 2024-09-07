import { GraphQLError } from "graphql";
import { prisma } from "../../utils/connect.js";
import { checkAuth } from "../../utils/verify.js";

export const commentResolvers = {
  Query: {
    getAllComments: async () => {
      try {
        const comments = await prisma.comments.findMany({
          include: { user: true, post: true },
        });
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
    updateComment: async (_, { input }, context) => {
      const { id, title, postsId } = input;
      try {
        const userId = checkAuth(context);
        await prisma.comments.update({
          where: {
            id,
          },
          data: { title, usersId: userId?.id, postsId },
        });
        return "Comment updated successfully";
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
