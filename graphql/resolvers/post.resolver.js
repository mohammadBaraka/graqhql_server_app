import { GraphQLError } from "graphql";
import { prisma } from "../../utils/connect.js";
import { checkAuth } from "../../utils/verify.js";
import { uploadFile } from "../../utils/uploadFile.js";
export const postReaolvers = {
  Query: {
    getAllPosts: async () => {
      try {
        const Users = true;
        const posts = await prisma.posts.findMany({ include: { Users } });
        if (!posts.length) throw new GraphQLError("There is no posts to show!");
        return posts;
      } catch (error) {
        throw new GraphQLError(error?.message);
      }
    },
    getOnePost: async (_, { id }) => {
      try {
        const Users = true;
        const posts = await prisma.posts.findMany({
          where: { id },
          include: { Users },
        });
        if (!posts.length) throw new GraphQLError("Post Not Found");
        return posts[0];
      } catch (error) {
        throw new GraphQLError(error?.message);
      }
    },
  },
  Mutation: {
    createPost: async (_, { title, desc, img, categoryId }, context) => {
      try {
        const user = checkAuth(context);
        const fileUrl = await uploadFile(img, context);

        const post = await prisma.posts.create({
          data: {
            title,
            desc,
            img: fileUrl,
            usersId: user.id,
            categories: {
              create: categoryId.map((id) => ({ categoryId: id })), // Simplified to connect a single category
            },
          },
          include: { Users: true },
        });

        return post;
      } catch (error) {
        throw new GraphQLError(error?.message);
      }
    },
    deletePost: async (_, { id }, context) => {
      try {
        const userId = checkAuth(context);
        const post = await prisma.posts.findMany({
          where: { id },
        });
        if (!post.length) throw new GraphQLError("Post Not Found");
        const allowed = userId?.id === post[0].usersId;
        if (!allowed) throw new Error("Not Allowed To Delte Post");
        await prisma.posts.delete({
          where: { id },
        });
        return "Post Deleted Success";
      } catch (error) {
        throw new GraphQLError(error?.message);
      }
    },
  },
};
