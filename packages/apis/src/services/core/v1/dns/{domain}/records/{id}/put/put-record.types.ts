import { z } from "zod";
import { putRecordSchema } from "./put-record.schema";

// Response
export type PutRecordRequest = z.input<typeof putRecordSchema.request>;

export type PutRecordRequestTransofrmed = z.infer<
  typeof putRecordSchema.request
>;

// Request
export type PutRecordResponse = z.input<typeof putRecordSchema.response>;

export type PutRecordResponseTransformed = z.infer<
  typeof putRecordSchema.response
>;
