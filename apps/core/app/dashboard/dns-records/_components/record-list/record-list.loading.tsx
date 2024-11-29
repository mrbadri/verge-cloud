import { Skeleton } from "@repo/ui/components/skeleton";
import { TableCell, TableRow } from "@repo/ui/components/table";

export const RecordListLoading = () => {
  return (
    <>
      {[1, 2, 3, 5, 6, 7, 9, 10]?.map((item) => (
        <TableRow key={item}>
          <TableCell>
            <Skeleton className="w-full h-8 rounded-md bg-border" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-full h-8 rounded-md bg-border" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-full h-8 rounded-md bg-border" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-full h-8 rounded-md bg-border" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[100px] h-8 rounded-md bg-border" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-full h-8 rounded-md bg-border" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};
