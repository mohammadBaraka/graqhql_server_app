import { __dirname } from "../index.js";
import { createWriteStream } from "fs";
import { GraphQLError } from "graphql";
import path from "path";
export const uploadFile = async (img, context) => {
  try {
    const uploadFile = await img;
    if (!uploadFile) throw new Error("No file provided");
    const { createReadStream, filename } = uploadFile.file;

    const newFile = `${Date.now()}_${filename}`;
    if (!newFile) throw new Error("No file provided");
    const filePath = path.join(__dirname, `/public/uploads/${newFile}`);
    const stream = createReadStream();
    const out = createWriteStream(filePath);
    await stream.pipe(out);

    await new Promise((resolve, reject) => {
      out.on("finish", resolve);
      out.on("error", reject);
    });

    const { req } = context;
    const protocol = req.protocol;
    const host = req.get("host");

    // Construct the full URL for the file
    const fileUrl = `${protocol}://${host}/public/uploads/${newFile}`;

    return fileUrl;
  } catch (error) {
    throw new GraphQLError(error?.message);
  }
};
