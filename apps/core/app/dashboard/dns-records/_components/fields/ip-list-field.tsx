import { Controller, useFieldArray } from "react-hook-form";

import { BaseInput } from "@repo/ui/components/base-input";
import { Button } from "@repo/ui/components/button";
import { LabelContainer } from "@repo/ui/components/labelContainer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";

import { Plus, Trash2 } from "lucide-react";
import { SectionNewRecordProps } from "../section-handler";

export interface IpListFieldProps extends SectionNewRecordProps<"A"> {}

export const IpListField = (props: IpListFieldProps) => {
  const { control, form } = props;
  const { watch } = form;

  const geo_filter = watch("ip_filter_mode.geo_filter");
  const showCountry = geo_filter === "country";

  const order = watch("ip_filter_mode.order");
  const showWeight = order === "weighted";

  const upstreamHttps = watch("upstream_https");
  const showPort = upstreamHttps === "http" || upstreamHttps === "https";
  const portPlaceholder = upstreamHttps === "http" ? "80" : "443";

  const { fields, append, remove } = useFieldArray({
    control,
    name: "value",
  });

  const AddIp = () => {
    append({ country: "", ip: "", weight: null });
  };

  return (
    <div>
      <h2 className="font-semibold">Value</h2>

      {/* Section List Fields */}
      <div className="flex flex-col gap-5 w-full">
        {fields.map((item, index) => (
          <div className="flex gap-3 items-end" key={item.id}>
            {/* Weight */}
            {showWeight && (
              <div className="flex-1">
                <Controller
                  control={control}
                  name={`value.${index}.weight`}
                  render={({ field, fieldState }) => (
                    <LabelContainer error={fieldState.error?.message}>
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
            )}

            {/* Country */}
            {showCountry && (
              <div className="flex-1">
                <Controller
                  control={control}
                  name={`value.${index}.country`}
                  render={({ field, fieldState }) => (
                    <LabelContainer error={fieldState.error?.message}>
                      <Select
                        {...field}
                        value={String(field.value)}
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Germany">Germany</SelectItem>
                          <SelectItem value="France">France</SelectItem>
                          <SelectItem value="Italy">Italy</SelectItem>
                          <SelectItem value="Spain">Spain</SelectItem>
                          <SelectItem value="United States">
                            United States
                          </SelectItem>
                          <SelectItem value="Canada">Canada</SelectItem>
                          <SelectItem value="Mexico">Mexico</SelectItem>
                          <SelectItem value="Brazil">Brazil</SelectItem>
                        </SelectContent>
                      </Select>
                    </LabelContainer>
                  )}
                />
              </div>
            )}

            {/* Port */}
            {showPort && (
              <div className="flex-1">
                <Controller
                  control={control}
                  name={`value.${index}.port`}
                  render={({ field, fieldState }) => (
                    <LabelContainer
                      error={fieldState.error?.message}
                      label="Port"
                    >
                      <BaseInput
                        placeholder={portPlaceholder}
                        {...field}
                        value={field.value ? String(field.value) : ""}
                      />
                    </LabelContainer>
                  )}
                />
              </div>
            )}

            {/* IP */}
            <div className="flex-1 flex-grow-[2]">
              <Controller
                control={control}
                name={`value.${index}.ip`}
                render={({ field, fieldState }) => (
                  <LabelContainer
                    error={fieldState.error?.message}
                    label="IPv4 Address"
                  >
                    <BaseInput
                      placeholder="eg. 1.2.3.4"
                      {...field}
                      value={String(field.value)}
                    />
                  </LabelContainer>
                )}
              />
            </div>

            {/* Delete Button */}
            <Button
              variant="secondary"
              className="px-3"
              onClick={() => remove(index)}
              type="button"
            >
              <Trash2 size={18} className="text-zinc-500" />
            </Button>
          </div>
        ))}
      </div>

      {/* Add New Value Button */}
      <Button
        variant="link"
        className="flex gap-1.5 text-primary-500 hover:no-underline"
        onClick={AddIp}
      >
        <Plus size={18} />
        <span>Add New Value</span>
      </Button>
    </div>
  );
};
