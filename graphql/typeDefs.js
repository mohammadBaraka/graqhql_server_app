import { categoryTypeDefs } from "./types/category.type.js";
import { commentTypeDefs } from "./types/comments.type.js";
import { likeTypeDefs } from "./types/like.type.js";
import { postTypeDefs } from "./types/post.type.js";
import { userTpedDefs } from "./types/user.type.js";

export const typeDefs = `
${userTpedDefs}
${categoryTypeDefs}
${postTypeDefs}
${commentTypeDefs}
${likeTypeDefs}
`;
