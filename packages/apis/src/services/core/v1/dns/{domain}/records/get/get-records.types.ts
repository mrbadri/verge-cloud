import { z } from "zod";
import { getRecordsSchema } from "./get-records.schema";

// Response
export type GetRecordsRequest = z.input<typeof getRecordsSchema.request>;

export type GetRecordsRequestTransofrmed = z.infer<
  typeof getRecordsSchema.request
>;

// Request
export type GetRecordsResponse = z.input<typeof getRecordsSchema.response>;

export type GetRecordsResponseTransformed = z.infer<
  typeof getRecordsSchema.response
>;
