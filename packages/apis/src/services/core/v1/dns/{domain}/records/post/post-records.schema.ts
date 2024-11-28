import { z } from "zod";

const baseSchema = z.object({
  cloud: z.boolean().optional(),
  ip_filter_mode: z.object({
    country: z.string(),
    geo_filter: z.string(),
    order: z.string(),
  }),
  name: z.string(),
  ttl: z.number(),
  upstream_https: z.string().optional(),
});

const typeASchema = baseSchema.extend({
  type: z.literal("A"),
  value: z.object({
    country: z.string().nullable(),
    ip: z
      .string()
      .regex(
        /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
      ),
    port: z.number().nullable(),
    weight: z.number().nullable(),
  }),
});

const typeCNAMESchema = baseSchema.extend({
  type: z.literal("CNAME"),
  value: z.object({
    host: z.string(),
    host_header: z.string().nullable(),
    port: z.number().nullable(),
  }),
});

const typeNSchema = baseSchema.extend({
  type: z.literal("NS"),
  value: z.object({
    host: z.string(),
  }),
});

const typeMXchema = baseSchema.extend({
  type: z.literal("MX"),
  value: z.object({
    port: z.union([z.number().int().min(1).max(65535), z.null()]),
    priority: z.union([z.number().int().min(0).max(9999), z.null()]),
    target: z
      .string()
      .max(500)
      .regex(/^([a-zA-Z0-9._-])+$/, "Invalid hostname format"),
    weight: z.union([z.number().int().min(0).max(1000), z.null()]),
  }),
});

const typeTXTchema = baseSchema.extend({
  type: z.literal("TXT"),
  value: z.object({
    text: z.string().max(500),
  }),
});

const typeCAAschema = baseSchema.extend({
  type: z.literal("CAA"),
  value: z.object({
    tag: z.enum(["issuewild", "issue", "iodef"]),
    value: z
      .string()
      .regex(/^(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/, "Invalid domain format"),
  }),
});

const typeTLSAschema = baseSchema.extend({
  type: z.literal("TLSA"),
  value: z.object({
    certificate: z.string(),
    matching_type: z.string().max(255),
    selector: z.string().max(255),
    usage: z.string().max(255),
  }),
});

const typeSRVschema = baseSchema.extend({
  type: z.literal("SRV"),
  value: z.object({
    port: z.number().int().nullable().optional(),

    priority: z.number().int().nullable().optional(),

    target: z
      .string()
      .min(1)
      .max(500)
      .regex(/^([a-zA-Z0-9._-])+$/),

    weight: z.number().int().nullable().optional(),
  }),
});

export const postRecordsRequestSchemaTransformed = z
  .discriminatedUnion("type", [
    typeASchema,
    typeCAAschema,
    typeCNAMESchema,
    typeNSchema,
    typeMXchema,
    typeTXTchema,
    typeTLSAschema,
    typeSRVschema
  ])
  .transform((data) => {
    return data;
  });

export const postRecordsResponseSchemaTransofrmed = z
  .object({
    keyBody: z.string(),
  })
  .transform((data) => data);

export const postRecordsSchema = {
  response: postRecordsResponseSchemaTransofrmed,
  request: postRecordsRequestSchemaTransformed,
};
