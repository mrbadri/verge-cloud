import { cn } from "@repo/ui/lib/utils";

export interface BaseCardProps {
  children: React.ReactNode;
  className?: string;
}

export interface BaseCardFieldContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const BaseCard = ({ children, className }: BaseCardProps) => {
  return (
    <div
      className={cn(
        "bg-muted rounded-lg shadow-sm p-4  border-border border",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BaseCardFieldContainer = (props: BaseCardFieldContainerProps) => {
  const { children, className } = props;

  return (
    <div
      className={cn(
        "bg-background h-full px-4 py-5 rounded-lg border-border border",
        className,
      )}
    >
      {children}
    </div>
  );
};
