import { Skeleton } from "@repo/ui/components/skeleton";

export const EditRecordModalLoading = () => {
  return (
    <div className="flex flex-col py-2 gap-3">
      <Skeleton className="w-full h-8 rounded-md bg-border" />
      <Skeleton className="w-full h-8 rounded-md bg-border" />
      <Skeleton className="w-full h-8 rounded-md bg-border" />
      <Skeleton className="w-full h-8 rounded-md bg-border" />
      <Skeleton className="w-full h-8 rounded-md bg-border" />
      <Skeleton className="w-full h-8 rounded-md bg-border" />
    </div>
  );
};
