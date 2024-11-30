import { z } from "zod";
import { postRecordsRequestSchemaTransformed } from "../../post/post-records.schema";

// Response
export const putRecordRequestSchemaTransformed =
  postRecordsRequestSchemaTransformed.transform((data) => data);

// Request
export const putRecordResponseSchemaTransofrmed = z
  .object({
    message: z.string(),
  })
  .transform((data) => data);

export const putRecordSchema = {
  response: putRecordResponseSchemaTransofrmed,
  request: putRecordRequestSchemaTransformed,
};
