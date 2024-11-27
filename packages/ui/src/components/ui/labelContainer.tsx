"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import * as React from "react";

import { cn } from "@repo/ui/lib/utils";
import { Label } from "./label";
import { CircleAlert } from "lucide-react";

export interface LabelContainerProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  label: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

const LabelContainer = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelContainerProps
>(
  (
    {
      className,
      children,
      error,
      helperText,
      id,
      label,
      required = false,
      ...props
    },
    ref,
  ) => (
    <div className={cn("w-full flex flex-col gap-1", className)}>
      <Label ref={ref} htmlFor={id} className=" px-1 flex gap-1" {...props}>
        <span>{label}</span>
        {required && <CircleAlert size={12} className="text-gray-400" />}
      </Label>
      {children}
      <span
        className={cn(
          "text-xs  px-1 hidden",
          (helperText || error) && "block",
          !!error && "dark:text-error-400  text-error-500",
        )}
      >
        {error ?? helperText}
      </span>
    </div>
  ),
);
LabelContainer.displayName = "LabelContainer";

export { LabelContainer };
