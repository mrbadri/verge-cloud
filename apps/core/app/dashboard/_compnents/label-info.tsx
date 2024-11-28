import { DialogDescription } from "@repo/ui/components/dialog";
import { CircleAlert } from "lucide-react";

export interface LabelInfoProps {
  children: React.ReactNode;
  className?: string;
}

const LabelInfo = (props: LabelInfoProps) => {
  const { className, children } = props;

  return (
    <div className="flex gap-2">
      <CircleAlert size={24} className="text-gray-400 self-center" />
      <DialogDescription className={className}>{children}</DialogDescription>
    </div>
  );
};

export default LabelInfo;
