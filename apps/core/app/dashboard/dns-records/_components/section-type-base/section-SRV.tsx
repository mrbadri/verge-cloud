import { BaseInput } from "@repo/ui/components/base-input";
import { LabelContainer } from "@repo/ui/components/labelContainer";
import { Separator } from "@repo/ui/components/separator";
import { Controller } from "react-hook-form";
import LabelInfo from "~/app/dashboard/_compnents/label-info";
import { SectionNewRecordProps } from "../section-handler";

export const SectionSRV = (props: SectionNewRecordProps<"SRV">) => {
  const {  control } = props;

  return (
    <div className="flex flex-col py-2 gap-4">
      <LabelInfo>
        SRV Record: It is used to import values related to the application.
      </LabelInfo>
      
      <Separator />

      <div className="flex flex-col gap-4">
        {/* Target */}
        <div className="flex-1">
          <Controller
            control={control}
            name={`value.target`}
            render={({ field, fieldState }) => (
              <LabelContainer error={fieldState.error?.message} label="Target">
                <BaseInput
                  placeholder={"target"}
                  {...field}
                  value={field.value}
                />
              </LabelContainer>
            )}
          />
        </div>

        <div className="flex flex-row gap-4">
          {/* Port */}
          <div className="flex-1">
            <Controller
              control={control}
              name={`value.port`}
              render={({ field, fieldState }) => (
                <LabelContainer error={fieldState.error?.message} label="Port">
                  <BaseInput
                    placeholder={"port"}
                    {...field}
                    value={field.value ? String(field.value) : ""}
                    onChange={(e) => field.onChange(+e.target.value)} 
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

          {/* Weight */}
          <div className="flex-1">
            <Controller
              control={control}
              name={"value.weight"}
              render={({ field, fieldState }) => (
                <LabelContainer
                  error={fieldState.error?.message}
                  label="Weight"
                >
                  <BaseInput
                    placeholder="Weight"
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
    </div>
  );
};
