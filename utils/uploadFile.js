import { __dirname } from "../index.js";
import { createWriteStream, existsSync, mkdirSync } from "fs";
import { GraphQLError } from "graphql";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});
//?===================================UPLOAD PBULIC=====================================
// export const uploadFile = async (img, context) => {
//   try {
//     const uploadFile = await img;
//     if (!uploadFile) throw new Error("No file provided");
//     const { createReadStream, filename } = uploadFile.file;

//     const newFile = `${Date.now()}_${filename}`;
//     const uploadDir = path.join(__dirname, `/public/uploads/`);

//     // Check if the uploads directory exists, and if not, create it
//     if (!existsSync(uploadDir)) {
//       mkdirSync(uploadDir, { recursive: true });
//     }

//     const filePath = path.join(uploadDir, newFile);
//     const stream = createReadStream();
//     const out = createWriteStream(filePath);
//     await stream.pipe(out);

//     await new Promise((resolve, reject) => {
//       out.on("finish", resolve);
//       out.on("error", reject);
//     });

//     const { req } = context;
//     const protocol = req.protocol;
//     const host = req.get("host");

//     // Construct the full URL for the file
//     const fileUrl = `${protocol}://${host}/public/uploads/${newFile}`;

//     return fileUrl;
//   } catch (error) {
//     throw new GraphQLError(error?.message);
//   }
// };
//?===================================UPLOAD USING CLOUDINARY=====================================
export const uploadFile = async (img) => {
  try {
    const uploadImg = await img;
    const { createReadStream, filename } = uploadImg.file;

    return new Promise((resolve, reject) => {
      const stream = createReadStream();
      const cloudinaryStream = cloudinary.uploader.upload_stream(
        {
          public_id: filename,
          folder: "uploads",
        },
        (error, result) => {
          if (error) {
            reject(new GraphQLError("No Image provided"));
          }
          resolve(result.secure_url);
        }
      );

      stream.pipe(cloudinaryStream);
    });
  } catch (error) {
    throw new GraphQLError(error?.message);
  }
};
