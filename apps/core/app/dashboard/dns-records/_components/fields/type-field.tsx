import { PostRecordsRequest } from "@repo/apis/core/v1/dns/{domain}/records/post/post-records.types";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@repo/ui/components/select";

// TODO: Add All Type select
export interface TypeFieldProps {
  value: PostRecordsRequest["type"] | undefined;
  onChange: (value: PostRecordsRequest["type"]) => void;
}

export const TypeField = (props: TypeFieldProps) => {
  const { value, onChange } = props;
  
  return (
    <Select
      value={value}
      onValueChange={(value: PostRecordsRequest["type"]) => {
        onChange(value);
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="A">A</SelectItem>
        <SelectItem value="NS">NS</SelectItem>
        <SelectItem value="MX">MX</SelectItem>
        <SelectItem value="SRV">SRV</SelectItem>
        <SelectItem value="TXT">TXT</SelectItem>
        <SelectItem value="CNAME">CNAME (Coming Soon)</SelectItem>
        <SelectItem value="CAA">CAA (Coming Soon)</SelectItem>
        <SelectItem value="TLSA">TLSA (Coming Soon)</SelectItem>
      </SelectContent>
    </Select>
  );
};
