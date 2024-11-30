import { z } from "zod";
import { getRecordSchema } from "./get-record.schema";

// Response
export type GetRecordRequest = z.input<typeof getRecordSchema.request>;

export type GetRecordRequestTransofrmed = z.infer<
  typeof getRecordSchema.request
>;

// Request
export type GetRecordResponse = z.input<typeof getRecordSchema.response>;

export type GetRecordResponseTransformed = z.infer<
  typeof getRecordSchema.response
>;
