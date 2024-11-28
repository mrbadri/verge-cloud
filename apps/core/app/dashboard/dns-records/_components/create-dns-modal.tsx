import { zodResolver } from "@hookform/resolvers/zod";
import { postRecordsRequestSchemaTransformed } from "@repo/apis/core/v1/dns/{domain}/records/post/post-records.schema";
import { PostRecordsRequest } from "@repo/apis/core/v1/dns/{domain}/records/post/post-records.types";
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
import { Controller, useForm } from "react-hook-form";
import { SectionHandler } from "./section-handler";

export const CreateDnsModal = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PostRecordsRequest>({
    resolver: zodResolver(postRecordsRequestSchemaTransformed),
  });

  const type = watch("type");
  const cloud = watch("cloud");

  console.log({ cloud });

  const onSubmit = (data: PostRecordsRequest) => {
    console.log(data);
    // handle your form submission here
  };

  return (
    <DialogContent className="sm:max-w-[840px]">
      <DialogHeader>
        <DialogTitle>Add New Record</DialogTitle>
        <DialogDescription>
          To activate VergeCloud's CDN and DNS services for your domain, you
          need to transfer your domain's DNS records to VergeCloud's.
        </DialogDescription>
      </DialogHeader>

      <Separator />

      <div className="flex flex-col py-2 gap-4">
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
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="NS">NS</SelectItem>
                    <SelectItem value="CNAME">CNAME</SelectItem>
                    <SelectItem value="MX">MX</SelectItem>
                    <SelectItem value="SRV">SRV</SelectItem>
                    <SelectItem value="TXT">TXT</SelectItem>
                    <SelectItem value="CAA">CAA</SelectItem>
                    <SelectItem value="TLSA">TLSA</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </LabelContainer>

          <Controller
            name="value.text"
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
                    .com
                  </span>
                </div>
              </LabelContainer>
            )}
          />

          <LabelContainer
            className="flex-1"
            label="TTL"
            error={errors.ttl?.message}
            required
          >
            <Controller
              name="ttl"
              control={control}
              render={({ field }) => (
                <Select {...field} value={String(field.value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="60">60</SelectItem>
                    <SelectItem value="300">300</SelectItem>
                    <SelectItem value="3600">3600</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </LabelContainer>
        </div>

        <SectionHandler control={control} type={type} />
      </div>

      <DialogFooter>
        <Button type="button" onClick={handleSubmit(onSubmit)}>
          Save changes
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
