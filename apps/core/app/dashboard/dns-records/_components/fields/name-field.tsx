import { BaseInput, BaseInputProps } from "@repo/ui/components/base-input";

export interface NameFieldProps extends BaseInputProps {}

export const NameField = (props: NameFieldProps) => {
  return (
    <div className="relative">
      <BaseInput placeholder="Subdomain or @ for Root" {...props} />
      <span className="absolute right-1.5 bg-primary-100 text-primary-800 py-1.5 px-3 rounded top-1/2 -translate-y-1/2 text-xs">
        domainname.com
      </span>
    </div>
  );
};
