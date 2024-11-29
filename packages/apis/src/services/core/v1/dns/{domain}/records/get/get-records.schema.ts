import { z } from "zod";
import { typeASchema, typeNSchema } from "../post/post-records.schema";

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

export const postRecordsValueSchema = z.union([
  typeASchema.shape.value,
  typeNSchema.shape.value,
  // TODO: add All type
  // typeCAAschema.shape.value,
  // typeCNAMESchema.shape.value,
  // typeMXchema.shape.value,
  // typeTXTchema.shape.value,
  // typeTLSAschema.shape.value,
  // typeSRVschema.shape.value,
]);


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
    ttl: z.enum(["-1", "120", "180", "300", "600", "900", "1800", "3600", "7200", "18000", "43200", "86400", "172800", "432000"]),
    type: z.enum(["A", "NS", "MX", "SRV", "TXT", "CNAME", "CAA", "TLSA"]),
    updated_at: z.string().datetime(),
    upstream_https: z.string(),
    usage: z.array(z.string()).nullable(),
    value: postRecordsValueSchema,
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
