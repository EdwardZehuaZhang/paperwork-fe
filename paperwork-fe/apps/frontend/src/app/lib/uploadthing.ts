import { generateReactHelpers } from "@uploadthing/react";

import type { OurFileRouter } from "./uploadthing-core";

export const { uploadFiles, useUploadThing } = generateReactHelpers<OurFileRouter>();
