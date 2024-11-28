import { Controller } from "react-hook-form";
import LabelInfo from "~/app/dashboard/_compnents/label-info";
import { CloudField } from "../fields/cloud-field";
import { SectionNewRecordProps } from "../section-handler";

export const SectionCNAME = (props: SectionNewRecordProps<"CNAME">) => {
  const { control } = props;

  return (
    <div className="flex flex-col py-2 gap-4">
      <LabelInfo>
        TLSA Record: The TLS Authentication record
        (TLSA) is used to associate a TLS server certificate or public key with
        the domain name where the record is found.
      </LabelInfo>

      <Controller
        name="cloud"
        control={control}
        render={({ field }) => (
          <CloudField value={field.value} onChange={field.onChange} />
        )}
      />
    </div>
  );
};
