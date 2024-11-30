import { coreApi } from "#instance/core-api"; 
import path from "path";
import { ApiResponse } from "@repo/apis/types/api.types";
import { requestHandler } from "@repo/apis/utils/request-handler";
import { getRecordSchema as schema } from "./get-record.schema";
import {
  GetRecordRequest,
  GetRecordResponse,
  GetRecordResponseTransformed,
} from "./get-record.types";

const getRecordURL = () => path.join("/api/record");

export const getRecord = async (
  props: GetRecordRequest,
): Promise<ApiResponse<GetRecordResponseTransformed>> => {
  const payloadParsed = schema.request.parse(props);
  const URL = getRecordURL();

  const response = await requestHandler(
    () => coreApi.get<GetRecordResponse>(URL, { params: payloadParsed }),
    schema.response._def.schema,
    {
      isMock: true,
    },
  );

  const dataParsed = schema.response.parse(response.data);

  return { ...response, data: dataParsed };
};
