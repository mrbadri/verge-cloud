import { BaseInput } from "@repo/ui/components/base-input";
import { LabelContainer } from "@repo/ui/components/labelContainer";
import { Separator } from "@repo/ui/components/separator";
import { Controller } from "react-hook-form";
import LabelInfo from "~/app/dashboard/_components/label-info";
import { SectionNewRecordProps } from "../section-handler";

export const SectionMX = (props: SectionNewRecordProps<"MX">) => {
  const { control } = props;

  return (
    <div className="flex flex-col py-2 gap-4">
      <LabelInfo>
        SRV Record: It is used to import values related to the application.
      </LabelInfo>

      <Separator />

      <div className="flex flex-row gap-4">
        {/* Host */}
        <div className="flex-1 flex-grow-[3]">
          <Controller
            control={control}
            name={"value.host"}
            render={({ field, fieldState }) => (
              <LabelContainer
                error={fieldState.error?.message}
                label="Mail server Address"
              >
                <BaseInput
                  placeholder="e.g., mail.example.com"
                  {...field}
                  value={field.value ? String(field.value) : ""}
                />
              </LabelContainer>
            )}
          />
        </div>

        {/* Priority */}
        <div className="flex-1">
          <Controller
            control={control}
            name={`value.priority`}
            render={({ field, fieldState }) => (
              <LabelContainer
                error={fieldState.error?.message}
                label="priority"
              >
                <BaseInput
                  placeholder={"1"}
                  {...field}
                  value={field.value ? String(field.value) : ""}
                  onChange={(e) => field.onChange(+e.target.value)}
                />
              </LabelContainer>
            )}
          />
        </div>
      </div>
    </div>
  );
};
