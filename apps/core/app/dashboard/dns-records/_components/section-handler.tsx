import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import {
  PostRecordsRequest,
  PostRecordsRequestType,
} from "@repo/apis/core/v1/dns/{domain}/records/post/post-records.types";
import { Control, UseFormReturn } from "react-hook-form";

export interface SectionHandlerProps {
  type: string | undefined;
  control: Control<PostRecordsRequest>;
  form: UseFormReturn<PostRecordsRequest>;
}

export interface SectionNewRecordProps<T extends PostRecordsRequest["type"]> {
  control: Control<PostRecordsRequestType<T>>;
  form: UseFormReturn<PostRecordsRequestType<T>>;
}

export const SectionHandler = (props: SectionHandlerProps) => {
  const { type, form, control } = props;

  if (!type) return null;

  const Component = useMemo(() => {
    return dynamic<Omit<SectionHandlerProps, "type">>(
      async () => {
        try {
          const mod = await import(`./section-type-base/section-${type}.tsx`);
          return (
            mod[`Section${type}`] ||
            (() => <div>Error: Component not found</div>)
          );
        } catch (error) {
          console.error(`Failed to load section type: ${type}`, error);
          return () => (
            <div className="flex items-center justify-center h-40 bg-muted rounded-md ">
              <span className="text-2xl font-semibold text-muted-foreground">Coming Soon</span>
            </div>
          );
        }
      },
      {
        ssr: false,
        // TODO: Add loading state
        // loading: () => <div>Loading...</div>,
      },
    );
  }, [type]);

  return <Component control={control} form={form} />;
};
