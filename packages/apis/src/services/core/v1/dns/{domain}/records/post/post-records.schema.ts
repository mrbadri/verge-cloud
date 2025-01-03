import { z } from "zod";

const IPSchema = z.object({
  ip: z
    .string()
    .regex(
      /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/,
      "Invalid IPv4 address",
    ),
  weight: z
    .number({ message: "Weight must number" })
    .int()
    .min(0)
    .max(1000)
    .nullable(),
  country: z.string().nullable().optional(),
  port: z.number().int().min(1).max(65535).nullable().optional(),
});

const baseSchema = z.object({
  cloud: z.boolean().optional(),
  ip_filter_mode: z
    .object({
      count: z.enum(["single", "multi"]),
      geo_filter: z.enum(["none", "location", "country"]),
      order: z.enum(["none", "weighted", "rr"]),
    })
    .optional(),
  name: z.string(),
  ttl: z.enum([
    "-1",
    "120",
    "180",
    "300",
    "600",
    "900",
    "1800",
    "3600",
    "7200",
    "18000",
    "43200",
    "86400",
    "172800",
    "432000",
  ]),
  upstream_https: z.enum(["http", "https", "auto", "default"]).optional(),
});

export const typeASchema = baseSchema.extend({
  type: z.literal("A"),
  value: z.array(IPSchema),
});

export const typeCNAMESchema = baseSchema.extend({
  type: z.literal("CNAME"),
  value: z.object({
    host: z.string(),
    host_header: z.string().nullable(),
    port: z.number().nullable(),
  }),
});

export const typeNSchema = baseSchema.extend({
  type: z.literal("NS"),
  value: z.object({
    host: z.string(),
  }),
});

export const typeMXchema = baseSchema.extend({
  type: z.literal("MX"),
  value: z.object({
    host: z.string(),
    priority: z.number().int().min(0).max(9999),
  }),
});

export const typeTXTchema = baseSchema.extend({
  type: z.literal("TXT"),
  value: z.object({
    text: z.string().max(500),
  }),
});

export const typeCAAschema = baseSchema.extend({
  type: z.literal("CAA"),
  value: z.object({
    tag: z.enum(["issuewild", "issue", "iodef"]),
    value: z
      .string()
      .regex(/^(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/, "Invalid domain format"),
  }),
});

export const typeTLSAschema = baseSchema.extend({
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
    target: z
      .string()
      .min(1)
      .max(500)
      .regex(/^([a-zA-Z0-9._-])+$/),
    port: z.number().int().nullable(),
    priority: z.number().int().nullable().optional(),
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
    typeSRVschema,
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
