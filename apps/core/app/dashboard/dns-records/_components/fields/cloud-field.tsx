import { CloudSwitch } from "@repo/ui/components/cloudSwitch";
import { DialogDescription } from "@repo/ui/components/dialog";
import { cn } from "@repo/ui/lib/utils";

export interface CloudFieldProps {
  value: boolean | undefined;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: boolean) => void;
}

export const CloudField = (props: CloudFieldProps) => {
  const { value, onChange } = props;

  return (
    <div
      className={cn(
        "transition justify-between items-center gap-3 px-3 py-3 rounded-md flex",
        value ? "bg-card" : "bg-muted",
      )}
    >
      <div>
        <CloudSwitch checked={value} onCheckedChange={onChange} />
      </div>
      <DialogDescription className="flex-1 text-foreground">
        Using the Cloud option the traffic to your server go through Verge's
        edge servers so it will be secured and optimized. When the Cloud option
        is disabled, your origin server address is publicly exposed and is not
        protected against cyber threats.
      </DialogDescription>
    </div>
  );
};
