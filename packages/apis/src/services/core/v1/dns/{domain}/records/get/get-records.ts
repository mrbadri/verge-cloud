import { coreApi } from "#instance/core-api"; 
import path from "path";
import { ApiResponse } from "@repo/apis/types/api.types";
import { requestHandler } from "@repo/apis/utils/request-handler";
import { getRecordsSchema as schema } from "./get-records.schema";
import {
  GetRecordsRequest,
  GetRecordsResponse,
  GetRecordsResponseTransformed,
} from "./get-records.types";

const getRecordsURL = () => path.join("/api/records");

export const getRecords = async (
  props: GetRecordsRequest,
): Promise<ApiResponse<GetRecordsResponseTransformed>> => {
  const payloadParsed = schema.request.parse(props);
  const URL = getRecordsURL();

  const response = await requestHandler(
    () => coreApi.get<GetRecordsResponse>(URL, { params: payloadParsed }),
    schema.response._def.schema,
    {
      isMock: true,
    },
  );

  const dataParsed = schema.response.parse(response.data);

  return { ...response, data: dataParsed };
};
