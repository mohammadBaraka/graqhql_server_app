import { GraphQLError } from "graphql";
import { prisma } from "../../utils/connect.js";

export const categoryResolvers = {
  Query: {
    getAllCategories: async () => {
      const categoies = await prisma.category.findMany();
      if (!categoies.length)
        throw new GraphQLError("There is No Categories to show");
      return categoies;
    },
  },
  Mutation: {
    createCategory: async (_, { title, post }) => {
      try {
        await prisma.category.create({
          data: { title, post },
        });
        return "Category Created Success!";
      } catch (error) {
        throw new GraphQLError(error?.message);
      }
    },
  },
};
