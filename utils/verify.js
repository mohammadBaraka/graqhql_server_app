import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";

export const checkAuth = (context) => {
  const token = context.req.cookies.accessToken;
  if (!token) {
    throw new GraphQLError("unuthorized");
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    return decoded;
  } catch (error) {
    throw new GraphQLError("Invalid/Expired token");
  }
};
