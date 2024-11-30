import { z } from "zod";
import { postRecordsRequestSchemaTransformed } from "../../post/post-records.schema";

// Request
export const getRecordRequestSchemaTransformed = z
  .object({
    id: z.string(),
  })
  .transform((data) => data);

// Response
export const getRecordResponseSchemaTransofrmed =
  postRecordsRequestSchemaTransformed.transform((data) => data);

export const getRecordSchema = {
  response: getRecordResponseSchemaTransofrmed,
  request: getRecordRequestSchemaTransformed,
};
