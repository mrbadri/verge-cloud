import { z } from "zod";
import { deleteRecordSchema } from "./delete-record.schema";

// Response
export type DeleteRecordRequest = z.input<typeof deleteRecordSchema.request>;

export type DeleteRecordRequestTransofrmed = z.infer<
  typeof deleteRecordSchema.request
>;

// Request
export type DeleteRecordResponse = z.input<typeof deleteRecordSchema.response>;

export type DeleteRecordResponseTransformed = z.infer<
  typeof deleteRecordSchema.response
>;
