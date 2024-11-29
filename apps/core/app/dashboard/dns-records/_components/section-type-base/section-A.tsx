import { Controller } from "react-hook-form";
import LabelInfo from "~/app/dashboard/_components/label-info";
import { CloudField } from "../fields/cloud-field";
import { SectionNewRecordProps } from "../section-handler";
import { UpstreamHttpsField } from "../fields/upstream-https-field";
import { Separator } from "@repo/ui/components/separator";
import { IpListField } from "../fields/ip-list-field";
import { LoadBalanceField } from "../fields/load-balance-field";

export const SectionA = (props: SectionNewRecordProps<"A">) => {
  const { form, control } = props;

  const { watch } = form;

  const cloud = watch("cloud");
  const ipList = watch("value");
  const hasIpList = ipList?.length > 1;

  return (
    <div className="flex flex-col py-2 gap-4">
      <LabelInfo>
        TLSA Record: The TLS Authentication record (TLSA) is used to associate a
        TLS server certificate or public key with the domain name where the
        record is found.
      </LabelInfo>

      <Controller
        name="cloud"
        control={control}
        render={({ field }) => (
          <CloudField value={field.value} onChange={field.onChange} />
        )}
      />

      <IpListField control={control} form={form} />

      {(hasIpList || cloud) && <Separator />}

      {hasIpList && <LoadBalanceField control={control} form={form} />}

      {cloud && (
        <Controller
          name="upstream_https"
          control={control}
          render={({ field }) => (
            <UpstreamHttpsField value={field.value} onChange={field.onChange} />
          )}
        />
      )}

    </div>
  );
};
