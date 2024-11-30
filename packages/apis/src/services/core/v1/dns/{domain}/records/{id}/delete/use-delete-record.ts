import {
  ApiError,
  ApiResponse,
  UseMutationProps,
} from "@repo/apis/types/api.types";
import { useMutation } from "@tanstack/react-query";
import { deleteRecord } from "./delete-record";
import {} from "./delete-record.schema";
import {
  DeleteRecordRequest,
  DeleteRecordResponseTransformed,
} from "./delete-record.types";

export type UseDeleteRecordProps = UseMutationProps<
  ApiResponse<DeleteRecordResponseTransformed>,
  ApiError,
  DeleteRecordRequest
>;

export const deleteRecordQueryKey = () => ["deleteRecord"];

export const useDeleteRecord = (props?: UseDeleteRecordProps) => {
  const mutation = useMutation<
    ApiResponse<DeleteRecordResponseTransformed>,
    ApiError,
    DeleteRecordRequest
  >({
    mutationKey: deleteRecordQueryKey(),
    mutationFn: (data) => deleteRecord(data),
    ...props,
  });

  return mutation;
};
