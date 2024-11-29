"use client";

import * as SwitchPrimitives from "@radix-ui/react-switch";
import * as React from "react";

import { Cloud, CloudOff } from "lucide-react";
import { Switch } from "./switch";
import { cn } from "@repo/ui/lib/utils";

const CloudSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, onCheckedChange, defaultChecked , ...props }, ref) => {
  const [val, setVal] = React.useState(defaultChecked);

  return (
    <div
      className={cn(
        "flex items-center  py-3 px-4 gap-2  rounded-full",
        val ? "bg-primary-100" : "bg-background",
        className,
      )}
    >
      <Switch
        {...props}
        defaultChecked={defaultChecked}
        onCheckedChange={(value) => {
          setVal(value);
          onCheckedChange?.(value);
        }}
        ref={ref}
      />
      {val ? (
        <Cloud className="text-primary-500" />
      ) : (
        <CloudOff className="text-zinc-500" size={24} />
      )}
    </div>
  );
});
CloudSwitch.displayName = "CloudSwitch";

export { CloudSwitch };
