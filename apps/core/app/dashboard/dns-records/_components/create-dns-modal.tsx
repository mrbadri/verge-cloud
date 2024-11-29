import { zodResolver } from "@hookform/resolvers/zod";
import { postRecordsRequestSchemaTransformed } from "@repo/apis/core/v1/dns/{domain}/records/post/post-records.schema";
import { PostRecordsRequest } from "@repo/apis/core/v1/dns/{domain}/records/post/post-records.types";
import { UsePostRecords } from "@repo/apis/core/v1/dns/{domain}/records/post/use-post-records";
import { BaseInput } from "@repo/ui/components/base-input";
import { Button } from "@repo/ui/components/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/dialog";
import { LabelContainer } from "@repo/ui/components/labelContainer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import { Separator } from "@repo/ui/components/separator";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { SectionHandler } from "./section-handler";
import { useQueryClient } from "@repo/apis/providers/api-provider";
import { getRecordsQueryKey } from "@repo/apis/core/v1/dns/{domain}/records/get/use-get-records";

export interface CreateDnsModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
export const CreateDnsModal = (props: CreateDnsModalProps) => {
  const { setOpen } = props;

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
      form.setValue("ttl", -1);
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
    console.log("Submit Form:", data);
    mutation.mutate(data);
  };

  return (
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
          <LabelContainer
            className="flex-1"
            label="Type"
            error={errors.type?.message}
            required
          >
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  onValueChange={(value: PostRecordsRequest["type"]) => {
                    field.onChange(value);
                    handleChangetype(value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="NS">NS</SelectItem>
                    <SelectItem value="MX">MX</SelectItem>
                    <SelectItem value="SRV">SRV</SelectItem>
                    <SelectItem value="TXT">TXT</SelectItem>
                    <SelectItem value="CNAME">CNAME (Coming Soon)</SelectItem>
                    <SelectItem value="CAA">CAA (Coming Soon)</SelectItem>
                    <SelectItem value="TLSA">TLSA (Coming Soon)</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </LabelContainer>

          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <LabelContainer
                className="flex-1 relative flex-grow-[2]"
                label="Name"
                error={fieldState.error?.message}
              >
                <div className="relative">
                  <BaseInput {...field} placeholder="Subdomain or @ for Root" />
                  <span className="absolute right-1.5 bg-primary-100 text-primary-800 py-1.5 px-3 rounded top-1/2 -translate-y-1/2 text-xs">
                    domainname.com
                  </span>
                </div>
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
                <Select
                  disabled={cloud}
                  {...field}
                  value={field.value ? String(field.value) : ""}
                  onValueChange={(value) => field.onChange(+value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* TODO: Check Auto Option with Owner */}
                    <SelectItem value="-1">Auto</SelectItem>
                    <SelectItem value="120">2 minutes</SelectItem>
                    <SelectItem value="180">3 minutes</SelectItem>
                    <SelectItem value="300">5 minutes</SelectItem>
                    <SelectItem value="600">10 minutes</SelectItem>
                    <SelectItem value="900">15 minutes</SelectItem>
                    <SelectItem value="1800">30 minutes</SelectItem>
                    <SelectItem value="3600">1 hour</SelectItem>
                    <SelectItem value="7200">2 hours</SelectItem>
                    <SelectItem value="18000">5 hours</SelectItem>
                    <SelectItem value="43200">12 hours</SelectItem>
                    <SelectItem value="86400">1 day</SelectItem>
                    <SelectItem value="172800">2 days</SelectItem>
                    <SelectItem value="432000">3 days</SelectItem>
                  </SelectContent>
                </Select>
              </LabelContainer>
            )}
          />
        </div>

        <SectionHandler control={control} form={form} type={type} />

        <Separator />
      </div>

      <DialogFooter>
        {/* Cencel Button */}
        <Button type="button" variant="ghost" onClick={() => handleClose()}>
          Cancel
        </Button>
        <Button
          type="button"
          isLoading={mutation.isPending}
          onClick={handleSubmit(onSubmit)}
        >
          Save
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
