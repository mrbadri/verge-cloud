import {
  ApiError,
  ApiResponse,
  UseQueryProps,
  WithParams,
} from "@repo/apis/types/api.types";
import { useQuery } from "@tanstack/react-query";
import { getRecord } from "./get-record";
import {
  GetRecordRequest,
  GetRecordResponseTransformed,
} from "./get-record.types";

export type UseGetRecordProps = UseQueryProps<
  ApiResponse<GetRecordResponseTransformed>,
  WithParams<GetRecordRequest>
>;

export const getRecordQueryKey = (id: string) => ["getRecord", id];

export const useGetRecord = (props: UseGetRecordProps) => {
  const { params, ...resProps } = props;

  const query = useQuery<ApiResponse<GetRecordResponseTransformed>, ApiError>({
    queryKey: getRecordQueryKey(params.id),
    queryFn: () => getRecord(params),
    enabled: !!params.id,
    ...resProps,
  });

  return query;
};
