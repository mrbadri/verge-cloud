import { BaseInput } from "@repo/ui/components/base-input";
import { LabelContainer } from "@repo/ui/components/labelContainer";
import { Separator } from "@repo/ui/components/separator";
import { Controller } from "react-hook-form";
import LabelInfo from "~/app/dashboard/_components/label-info";
import { SectionNewRecordProps } from "../section-handler";
import { Textarea } from "@repo/ui/components/textarea";

export const SectionTXT = (props: SectionNewRecordProps<"TXT">) => {
  const { control } = props;

  return (
    <div className="flex flex-col py-2 gap-4">
      <LabelInfo>
        SRV Record: It is used to import values related to the application.
      </LabelInfo>

      <Separator />

      <div className="flex flex-row gap-4">
        {/* Host */}
        <div className="flex-1 ">
          <Controller
            control={control}
            name={"value.text"}
            render={({ field, fieldState }) => (
              <LabelContainer
                error={fieldState.error?.message}
                label="Content"
              >
                <Textarea
                  placeholder="e.g., v=spf1 include:_spf.example.com all"
                  {...field}
                  value={field.value ? String(field.value) : ""}
                />
              </LabelContainer>
            )}
          />
        </div>
      </div>
    </div>
  );
};
