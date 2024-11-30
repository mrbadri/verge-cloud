import { z } from "zod";

// Response
export const deleteRecordRequestSchemaTransformed = z
  .object({
    id: z.string(),
  })
  .transform((data) => data);

// Request
export const deleteRecordResponseSchemaTransofrmed = z
  .object({
    message: z.string(),
  })
  .transform((data) => data);

export const deleteRecordSchema = {
  response: deleteRecordResponseSchemaTransofrmed,
  request: deleteRecordRequestSchemaTransformed,
};
