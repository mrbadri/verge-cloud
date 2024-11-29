import {
  ApiError,
  ApiResponse,
  UseQueryProps,
  WithParams,
} from "@repo/apis/types/api.types";
import { useQuery } from "@tanstack/react-query";
import { getRecords } from "./get-records";
import {
  GetRecordsRequest,
  GetRecordsResponseTransformed,
} from "./get-records.types";

export type UseGetRecordsProps = UseQueryProps<
  ApiResponse<GetRecordsResponseTransformed>,
  WithParams<GetRecordsRequest>
>;

export const getRecordsQueryKey = () => ["getRecords"];

export const useGetRecords = (props: UseGetRecordsProps) => {
  const { params, ...resProps } = props;

  const query = useQuery<ApiResponse<GetRecordsResponseTransformed>, ApiError>({
  queryKey: getRecordsQueryKey(),
  queryFn: () => getRecords(params),
    ...resProps,
  });

  return query;
};
