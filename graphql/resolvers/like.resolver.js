import { GraphQLError } from "graphql";
import { prisma } from "../../utils/connect.js";
import { checkAuth } from "../../utils/verify.js";
export const likeResolver = {
  Query: {
    getLikes: async () => {
      try {
        const likes = await prisma.likes.findMany();
        return likes;
      } catch (error) {
        throw new GraphQLError(error?.message);
      }
    },
  },
  Mutation: {
    toggleLike: async (_, { input }, context) => {
      try {
        const user = checkAuth(context);
        const existingLike = await prisma.likes.findFirst({
          where: {
            postsId: input.postsId,
            usersId: user.id,
          },
        });
        if (!existingLike) {
          await prisma.likes.create({
            data: {
              postsId: input.postsId,
              usersId: user.id,
            },
          });
          return "Liked added successfully";
        } else {
          await prisma.likes.delete({
            where: {
              id: existingLike.id,
            },
          });
          return "Liked removed successfully";
        }
      } catch (error) {
        throw new GraphQLError(error?.message);
      }
    },
  },
};
