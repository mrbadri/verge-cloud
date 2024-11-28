"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import * as React from "react";

import { cn } from "@repo/ui/lib/utils";
import { Label } from "./label";
import { CircleAlert } from "lucide-react";

export interface LabelContainerProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  label?: string;
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
    <div className={cn("relative w-full flex flex-col", className)}>
      <Label
        ref={ref}
        htmlFor={id}
        className=" px-1 flex gap-1 text-muted-foreground text-xs mb-1"
        {...props}
      >
        <span>{label}</span>
        {required && <CircleAlert size={12} className="text-gray-400" />}
      </Label>
      {children}
      <span
        className={cn(
          //  Defined in tailwind.config.js
          "text-[10px] hidden relative",
          (helperText || error) && "block",
          !!error && "dark:text-error-400  text-error-500",
        )}
      >
        <span className="absolute p-1 py-0.5">{error ?? helperText}</span>
      </span>
    </div>
  ),
);
LabelContainer.displayName = "LabelContainer";

export { LabelContainer };
