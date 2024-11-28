import { z } from "zod";
import { postRecordsSchema } from "./post-records.schema";

// Response
export type PostRecordsRequest = z.input<typeof postRecordsSchema.request>;

export type PostRecordsRequestType<T extends PostRecordsRequest["type"]> = Extract<PostRecordsRequest, { type: T }>; 


export type PostRecordsRequestTransofrmed = z.infer<
  typeof postRecordsSchema.request
>;

// Request
export type PostRecordsResponse = z.input<typeof postRecordsSchema.response>;

export type PostRecordsResponseTransformed = z.infer<
  typeof postRecordsSchema.response
>;
