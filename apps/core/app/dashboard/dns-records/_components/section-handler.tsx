import React from "react";
import dynamic from "next/dynamic";
import { PostRecordsRequest } from "@repo/apis/core/v1/dns/{domain}/records/post/post-records.types";
import { Control } from "react-hook-form";

export interface SectionHandlerProps {
  type: string | undefined;
  control: Control<PostRecordsRequest>;
}

export type SectionNewRecordProps = Omit<SectionHandlerProps, "type">;

const SectionHandlerComponent = (props: SectionHandlerProps) => {
  const { type } = props;

  if (!type) return null;

  const Component = dynamic<SectionNewRecordProps>(
    async () => {
      try {
        const mod = await import(`./section-type-base/section-${type}.tsx`);
        return (
          mod[`Section${type}`] || (() => <div>Error: Component not found</div>)
        );
      } catch (error) {
        console.error(`Failed to load section type: ${type}`, error);
        return () => <div>Error loading component</div>;
      }
    },
    {
      ssr: false,
      // TODO: Add loading state
      // loading: () => <div>Loading...</div>,
    },
  );

  return <Component control={props.control} />;
};

export const SectionHandler = React.memo(SectionHandlerComponent);
