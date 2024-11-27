import { coreApi } from "#instance/core-api";
import { ApiResponse } from "@repo/apis/types/api.types";
import { requestHandler } from "@repo/apis/utils/request-handler";
import path from "path";
import { postRecordsSchema as schema } from "./post-records.schema";
import {
  PostRecordsRequest,
  PostRecordsResponseTransformed,
} from "./post-records.types";

export const postRecordsURL = (domain: string) =>
  path.join("/api/v1/dns/", domain, "/records");

export const postRecords = async (
  props?: PostRecordsRequest,
): Promise<ApiResponse<PostRecordsResponseTransformed>> => {
  const payloadParsed = schema.request.parse(props);

  // TODO: Get Domain from props
  const URL = postRecordsURL("test.com");

  const response = await requestHandler(
    () => coreApi.post(URL, payloadParsed),
    schema.response._def.schema,
  );

  const dataParsed = schema.response.parse(response.data);

  return { ...response, data: dataParsed };
};
