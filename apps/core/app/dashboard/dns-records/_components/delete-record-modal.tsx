import { getRecordsQueryKey } from "@repo/apis/core/v1/dns/{domain}/records/get/use-get-records";
import { useDeleteRecord } from "@repo/apis/core/v1/dns/{domain}/records/{id}/delete/use-delete-record";
import { useQueryClient } from "@repo/apis/providers/api-provider";
import { Button } from "@repo/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/dialog";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

export interface DeleteRecordModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id: string;
}
export const DeleteRecordModal = (props: DeleteRecordModalProps) => {
  const { open, setOpen, id } = props;

  const queryClient = useQueryClient();

  const mutation = useDeleteRecord({
    onSuccess: () => {
      toast.success("Records deleted successfully");
      queryClient.refetchQueries({
        queryKey: getRecordsQueryKey(),
      });

      setOpen(false);
    },
    onError: () => {
      toast.error("Records deleted failed");
    },
  });

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = () => {
    console.log("Submit Delete Form:", id);
    mutation.mutate({ id });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[840px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Delete Record</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this record?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            onClick={() => handleClose()}
            disabled={mutation.isPending}
            type="button"
            variant="ghost"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={mutation.isPending}
            isLoading={mutation.isPending}
            onClick={onSubmit}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
