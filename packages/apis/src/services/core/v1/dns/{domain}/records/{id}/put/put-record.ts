import { coreApi } from "#instance/core-api"; 
import { ApiResponse } from "@repo/apis/types/api.types";
import { requestHandler } from "@repo/apis/utils/request-handler";
import path from "path";
import { putRecordSchema as schema } from "./put-record.schema";
import {
  PutRecordRequest,
  PutRecordResponseTransformed,
} from "./put-record.types";

export const putRecordURL = () => path.join("/api/v1/dns/{domain}/records/{id}");

export const putRecord = async (
  props?: PutRecordRequest,
): Promise<ApiResponse<PutRecordResponseTransformed>> => {
  const payloadParsed = schema.request.parse(props);

  const URL = putRecordURL();

  const response = await requestHandler(
    () => coreApi.put(URL, payloadParsed),
    schema.response._def.schema,
    {
      isMock: true,
    }
  );

  const dataParsed = schema.response.parse(response.data);

  return { ...response, data: dataParsed };
};
