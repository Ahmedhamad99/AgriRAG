import { z } from "zod";

import { VALIDATION } from "@/constants/validation";

export const uploadSchema = z.object({
  file: z
    .instanceof(File, {
      message: "Please choose a PDF file.",
    })
    .refine(
      file =>
        VALIDATION.ACCEPTED_FILE_TYPES.includes(file.type),
      {
        message: "Only PDF files are supported.",
      }
    )
    .refine(
      file =>
        file.size <= VALIDATION.MAX_UPLOAD_SIZE,
      {
        message: "File exceeds 20 MB.",
      }
    ),
});

export type UploadFormValues =
  z.infer<typeof uploadSchema>;