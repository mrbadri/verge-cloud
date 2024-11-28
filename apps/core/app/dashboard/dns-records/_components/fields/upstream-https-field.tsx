import { DialogDescription } from "@repo/ui/components/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@repo/ui/components/select";
import {
  BaseCard,
  BaseCardFieldContainer,
} from "~/app/dashboard/_compnents/base-card";

export interface UpstreamHttpsFieldProps {
  onChange: (value: string) => void;
  value?: string | undefined;
}

export const UpstreamHttpsField = (props: UpstreamHttpsFieldProps) => {
  const { onChange, value } = props;

  return (
    <BaseCard className="flex  gap-3">
      {/* Left Side */}
      <div className="flex-1">
        {/* TODO: add Typography  */}
        <h2 className="font-semibold">Origin Server Connection Protocol</h2>
        <DialogDescription>
          You can choose the connection protocol between edge servers and your
          origin server (HTTP or HTTPS).
        </DialogDescription>
      </div>
      {/* Right Side */}
      <div className="basis-[300px]">
        <BaseCardFieldContainer>
          <Select defaultValue="default" value={value} onValueChange={onChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="auto">Auto</SelectItem>
              <SelectItem value="http">Http</SelectItem>
              <SelectItem value="https">Https</SelectItem>
            </SelectContent>
          </Select>
        </BaseCardFieldContainer>
      </div>
    </BaseCard>
  );
};
