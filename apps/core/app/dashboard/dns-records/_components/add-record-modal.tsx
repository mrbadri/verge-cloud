import { zodResolver } from "@hookform/resolvers/zod";
import { getRecordsQueryKey } from "@repo/apis/core/v1/dns/{domain}/records/get/use-get-records";
import { postRecordsRequestSchemaTransformed } from "@repo/apis/core/v1/dns/{domain}/records/post/post-records.schema";
import { PostRecordsRequest } from "@repo/apis/core/v1/dns/{domain}/records/post/post-records.types";
import { UsePostRecords } from "@repo/apis/core/v1/dns/{domain}/records/post/use-post-records";
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
import { LabelContainer } from "@repo/ui/components/labelContainer";
import { Separator } from "@repo/ui/components/separator";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { NameField } from "./fields/name-field";
import { TTLField } from "./fields/ttl-field";
import { TypeField } from "./fields/type-field";
import { SectionHandler } from "./section-handler";

export interface AddRecordModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
export const AddRecordModal = (props: AddRecordModalProps) => {
  const { open, setOpen } = props;

  const form = useForm<PostRecordsRequest>({
    resolver: zodResolver(postRecordsRequestSchemaTransformed),
  });
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = form;

  const type = watch("type");
  const cloud = watch("cloud");

  const queryClient = useQueryClient();

  useEffect(() => {
    if (cloud) {
      form.setValue("ttl", "-1");
    }
  }, [cloud]);

  const mutation = UsePostRecords({
    onSuccess: () => {
      toast.success("Records saved successfully");
      form.reset();
      queryClient.refetchQueries({
        queryKey: getRecordsQueryKey(),
      });

      setOpen(false);
    },
  });

  // TODO: Remove console.log (For Demo)
  console.log("Form Errors:", errors);

  // TODO: We can Enhance this
  const handleChangetype = (type: PostRecordsRequest["type"]) => {
    const name = form.getValues("name");
    const ttl = form.getValues("ttl");

    form.reset();
    form.setValue("type", type);
    form.setValue("ttl", ttl);
    form.setValue("name", name);
    form.setValue("cloud", false);

    if (type === "A") {
      form.setValue("value", [
        {
          country: "",
          ip: "",
          port: null,
          weight: null,
        },
      ]);
      form.setValue("ip_filter_mode", {
        count: "single",
        geo_filter: "none",
        order: "none",
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (data: PostRecordsRequest) => {
    // TODO: Remove console.log (For Demo)
    console.log("Submit Add Form:", data);
    mutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[840px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Add New Record</DialogTitle>
          <DialogDescription>
            To activate VergeCloud's CDN and DNS services for your domain, you
            need to transfer your domain's DNS records to VergeCloud's.
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <div className="flex flex-col py-2 gap-3">
          <div className="flex gap-4">
            <Controller
              name="type"
              control={control}
              render={({ field, fieldState }) => (
                <LabelContainer
                  className="flex-1"
                  label="Type"
                  error={fieldState.error?.message}
                  required
                >
                  <TypeField
                    value={field.value}
                    onChange={(value: PostRecordsRequest["type"]) => {
                      field.onChange(value);
                      handleChangetype(value);
                    }}
                  />
                </LabelContainer>
              )}
            />

            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <LabelContainer
                  className="flex-1 relative flex-grow-[2]"
                  label="Name"
                  error={fieldState.error?.message}
                >
                  <NameField {...field} />
                </LabelContainer>
              )}
            />

            <Controller
              name="ttl"
              control={control}
              render={({ field }) => (
                <LabelContainer
                  className="flex-1"
                  label="TTL"
                  error={errors.ttl?.message}
                  required
                >
                  <TTLField
                    disabled={cloud}
                    {...field}
                    value={field.value ? String(field.value) : ""}
                    onValueChange={(value) => field.onChange(value)}
                  />
                </LabelContainer>
              )}
            />
          </div>

          <SectionHandler control={control} form={form} type={type} />

          <Separator />
        </div>

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
            // disabled={mutation.isPending}
            isLoading={mutation.isPending}
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
