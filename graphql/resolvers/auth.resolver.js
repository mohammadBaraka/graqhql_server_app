import { GraphQLError } from "graphql";
import { prisma } from "../../utils/connect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { checkAuth } from "../../utils/verify.js";
import { uploadFile } from "../../utils/uploadFile.js";
export const authResolvers = {
  Query: {
    sendToken: async (_, {}, context) => {
      try {
        const user = checkAuth(context);
        return user;
      } catch (error) {
        throw new GraphQLError(error?.message);
      }
    },
  },
  Mutation: {
    register: async (_, { name, email, password, img }, context) => {
      try {
        const file = await uploadFile(img);
        const hashedPass = await bcrypt.hash(password, 10);
        const userEmail = await prisma.users.findUnique({
          where: { email },
        });
        if (userEmail) throw new GraphQLError("User already exists!");
        try {
          const user = await prisma.users.create({
            data: { name, email, password: hashedPass, img: file },
          });
          return user;
        } catch (error) {
          throw new GraphQLError(error?.message);
        }
      } catch (error) {
        throw new GraphQLError(error?.message);
      }
    },

    login: async (_, { input }, { res }) => {
      try {
        if (!res) {
          throw new Error(
            "Response object (res) is not available in the context."
          );
        }

        const { email, password } = input;
        const userEmail = await prisma.users.findUnique({
          where: { email },
        });
        if (!userEmail) throw new GraphQLError("User not already exists!");
        const passIsMatch = await bcrypt.compare(password, userEmail.password);
        if (!passIsMatch) throw new GraphQLError("Invalid email or password");
        const age = 1000 * 60 * 60 * 24 * 7;
        const token = jwt.sign(
          { id: userEmail.id, name: userEmail.name, img: userEmail.img },
          process.env.SECRET_KEY,
          {
            expiresIn: age,
          }
        );
        res.cookie("accessToken", token, {
          httpOnly: true,
          // sameSite: "none",
          maxAge: age,
          secure: process.env.NODE_ENV === "production" ? true : false,
        });

        return {
          id: userEmail.id,
          name: userEmail.name,
          email: userEmail.email,
          createdAt: userEmail.createdAt,
          updatedAt: userEmail.updatedAt,
          token,
        };
      } catch (error) {
        throw new GraphQLError(error?.message);
      }
    },
    logout: async (_, {}, context) => {
      const loggedInUser = checkAuth(context);

      try {
        const user = await prisma.users.findMany({
          where: {
            id: loggedInUser?.id,
          },
        });
        context.res.clearCookie("accessToken", {
          httpOnly: true,
          sameSite: "none",
          path: "/",
          secure: true,
        });
        return user[0];
      } catch (error) {
        throw new GraphQLError(error?.message);
      }
    },
  },
};
