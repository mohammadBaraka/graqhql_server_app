import { GraphQLError } from "graphql";
import { prisma } from "../../utils/connect.js";
export const userResolvers = {
  Query: {
    getAllUsers: async () => {
      try {
        const users = await prisma.users.findMany();
        if (!users.length) throw new GraphQLError("There is no usrs to show");
        return users;
      } catch (error) {
        throw new GraphQLError(error?.message);
      }
    },
    getUser: async (_, { id }) => {
      try {
        const user = await prisma.users.findMany({
          where: {
            id,
          },
        });

        if (!user.length) throw new GraphQLError("There is no user to show");
        return user[0];
      } catch (error) {
        throw new GraphQLError(error?.message);
      }
    },
  },

  Mutation: {},
};
