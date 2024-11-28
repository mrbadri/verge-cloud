import { DialogDescription } from "@repo/ui/components/dialog";
import { LabelContainer } from "@repo/ui/components/labelContainer";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@repo/ui/components/select";
import { Controller } from "react-hook-form";
import {
  BaseCard,
  BaseCardFieldContainer,
} from "~/app/dashboard/_compnents/base-card";
import { SectionNewRecordProps } from "../section-handler";

// export interface UpstreamHttpsFieldProps {
//   onChange: (value: string) => void;
//   value?: string | undefined;
// }

export interface UpstreamHttpsFieldProps extends SectionNewRecordProps<"A"> {}

export const LoadBalanceField = (props: UpstreamHttpsFieldProps) => {
  const { control } = props;

  return (
    <BaseCard className="flex flex-col  gap-3">
      <div className="flex-1">
        {/* TODO: add Typography  */}
        <h2 className="font-semibold">DNS Records Load Balancer</h2>
        <DialogDescription>
          A description about this section and help or guide for each controller
        </DialogDescription>
      </div>
      <div className="flex gap-3">
        {/* Field */}

        <div className="flex-1 ">
          <BaseCardFieldContainer>
            <Controller
              control={control}
              name={`ip_filter_mode.count`}
              render={({ field, fieldState }) => (
                <LabelContainer
                  label="Response Type"
                  error={fieldState.error?.message}
                >
                  <Select
                    {...field}
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="multi">Multi</SelectItem>
                    </SelectContent>
                  </Select>
                </LabelContainer>
              )}
            />
          </BaseCardFieldContainer>
        </div>
        {/* Field */}

        <div className="flex-1 ">
          <BaseCardFieldContainer>
            <Controller
              control={control}
              name={`ip_filter_mode.order`}
              render={({ field, fieldState }) => (
                <LabelContainer
                  label="Load Balancing"
                  error={fieldState.error?.message}
                >
                  <Select
                    {...field}
                    defaultValue="none"
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Off</SelectItem>
                      <SelectItem value="weighted">Weighted</SelectItem>
                      <SelectItem value="rr">Round-robin</SelectItem>
                    </SelectContent>
                  </Select>
                </LabelContainer>
              )}
            />
          </BaseCardFieldContainer>
        </div>
        {/* Field */}

        <div className="flex-1 ">
          <BaseCardFieldContainer>
            <Controller
              control={control}
              name={`ip_filter_mode.geo_filter`}
              render={({ field, fieldState }) => (
                <LabelContainer
                  label="Location"
                  error={fieldState.error?.message}
                >
                  <Select
                    {...field}
                    defaultValue="none"
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Off</SelectItem>
                      <SelectItem value="location">Location</SelectItem>
                      <SelectItem value="country">Country</SelectItem>
                    </SelectContent>
                  </Select>
                </LabelContainer>
              )}
            />
          </BaseCardFieldContainer>
        </div>
      </div>
    </BaseCard>
  );
};
