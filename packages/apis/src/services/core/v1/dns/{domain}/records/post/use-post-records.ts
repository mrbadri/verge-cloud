import {
  ApiError,
  ApiResponse,
  UseMutationProps,
} from "@repo/apis/types/api.types";
import { useMutation } from "@tanstack/react-query";
import { postRecords } from "./post-records";
import {} from "./post-records.schema";
import {
  PostRecordsRequest,
  PostRecordsResponseTransformed,
} from "./post-records.types";

export type UsePostRecordsProps = UseMutationProps<
  ApiResponse<PostRecordsResponseTransformed>,
  ApiError,
  PostRecordsRequest
>;

export const postRecordsQueryKey = () => ["postRecords"];

export const UsePostRecords = (props?: UsePostRecordsProps) => {
  const mutation = useMutation<
    ApiResponse<PostRecordsResponseTransformed>,
    ApiError,
    PostRecordsRequest
  >({
    mutationKey: postRecordsQueryKey(),
    mutationFn: (data) => postRecords(data),
    ...props,
  });

  return mutation;
};
