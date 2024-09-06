import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { resolvers } from "./graphql/resolvers.js";
import { typeDefs } from "./graphql/typeDefs.js";
import { fileURLToPath } from "url";
import path from "path";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(graphqlUploadExpress());

// Serve static files from the "uploads" directory
app.use(
  "/public/uploads",
  express.static(path.join(__dirname, "public/uploads"))
);

// CORS
app.use(
  cors({
    origin: ["http://localhost:3000", "https://graphql-client-app.vercel.app"],
    credentials: true,
  })
);

// Apollo Server
const server = new ApolloServer({
  csrfPrevention: false,
  typeDefs,
  resolvers,
});

// Start the server
server.start().then(() => {
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req, res }) => ({ req, res }),
    })
  );

  // Start Express server
  app.listen(4000, () => {
    console.log("Server is running on http://localhost:4000/graphql");
  });
});
