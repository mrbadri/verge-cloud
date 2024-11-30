import {
  ApiError,
  ApiResponse,
  UseMutationProps,
} from "@repo/apis/types/api.types";
import { useMutation } from "@tanstack/react-query";
import { putRecord } from "./put-record";
import {} from "./put-record.schema";
import {
  PutRecordRequest,
  PutRecordResponseTransformed,
} from "./put-record.types";

export type UsePutRecordProps = UseMutationProps<
  ApiResponse<PutRecordResponseTransformed>,
  ApiError,
  PutRecordRequest
>;

export const putRecordQueryKey = () => ["putRecord"];

export const usePutRecord = (props?: UsePutRecordProps) => {
  const mutation = useMutation<
    ApiResponse<PutRecordResponseTransformed>,
    ApiError,
    PutRecordRequest
  >({
    mutationKey: putRecordQueryKey(),
    mutationFn: (data) => putRecord(data),
    ...props,
  });

  return mutation;
};
