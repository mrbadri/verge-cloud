import { z } from "zod";

// Request
export const getRecordsRequestSchemaTransformed = z
  .object({
    keyPayload: z.string(),
  })
  .transform((data) => data);

// Response
const DnsRecordIpFilterModeSchema = z.object({
  count: z.string(),
  geo_filter: z.string(),
  order: z.string(),
});

export const DataItemSchema = z
  .object({
    cloud: z.boolean(),
    created_at: z.string().datetime(),
    id: z.string(),
    ip_filter_mode: DnsRecordIpFilterModeSchema,
    count: z.string(),
    geo_filter: z.string(),
    order: z.string(),
    is_protected: z.boolean(),
    name: z.string(),
    ttl: z.number().int(),
    type: z.string(),
    updated_at: z.string().datetime(),
    upstream_https: z.string(),
    usage: z.array(z.string()).nullable(),
    value: z.array(z.any()).nullable(),
  })
  .transform((data) => data);

export const getRecordsResponseSchemaTransofrmed = z
  .object({
    data: z.array(DataItemSchema),
    message: z.string(),
    meta: z.any().nullable(),
  })
  .transform((data) => data);

export const getRecordsSchema = {
  response: getRecordsResponseSchemaTransofrmed,
  request: getRecordsRequestSchemaTransformed,
};
