import { createUploadthing, type FileRouter } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 2 } }).onUpload(async ({ file }) => {
    return { uploadedBy: "FileUploadUploadThingDemo" };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
