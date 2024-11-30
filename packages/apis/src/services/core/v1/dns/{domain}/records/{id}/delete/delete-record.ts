import { coreApi } from "#instance/core-api";
import { ApiResponse } from "@repo/apis/types/api.types";
import { requestHandler } from "@repo/apis/utils/request-handler";
import path from "path";
import { deleteRecordSchema as schema } from "./delete-record.schema";
import {
  DeleteRecordRequest,
  DeleteRecordResponseTransformed,
} from "./delete-record.types";

export const deleteRecordURL = (domain: string, id: string) =>
  path.join("/api/v1/dns/{domain}/records/{id}");

export const deleteRecord = async (
  props?: DeleteRecordRequest,
): Promise<ApiResponse<DeleteRecordResponseTransformed>> => {
  const payloadParsed = schema.request.parse(props);

  // TODO: Handle Domain
  const URL = deleteRecordURL("domainname.com", payloadParsed.id);

  const response = await requestHandler(
    () => coreApi.delete(URL),
    schema.response._def.schema,
    {
      isMock: true,
    }
  );

  const dataParsed = schema.response.parse(response.data);

  return { ...response, data: dataParsed };
};
