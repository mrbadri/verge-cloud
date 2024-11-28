import { Separator } from "@repo/ui/components/separator";
import { CloudField } from "../fields/cloud-field";
import { Control, Controller } from "react-hook-form";
import { PostRecordsRequest } from "@repo/apis/core/v1/dns/{domain}/records/post/post-records.types";

export interface SectionAProps {
  control: Control<PostRecordsRequest>;
}

export const SectionA = (props: SectionAProps) => {
  const { control } = props;

  return (
    <div>
      <Separator />
      <Controller
        name="cloud"
        control={control}
        render={({ field }) => (
          <CloudField value={field.value} onChange={field.onChange} />
        )}
      />
    </div>
  );
};
