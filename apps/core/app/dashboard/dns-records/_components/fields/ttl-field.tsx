import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@repo/ui/components/select";

export interface TTLFieldProps extends React.ComponentProps<typeof Select> {}

export const TTLField = (props: TTLFieldProps) => {
  return (
    <Select
    {...props}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        {/* TODO: Check Auto Option with Owner */}
        <SelectItem value="-1">Auto</SelectItem>
        <SelectItem value="120">2 minutes</SelectItem>
        <SelectItem value="180">3 minutes</SelectItem>
        <SelectItem value="300">5 minutes</SelectItem>
        <SelectItem value="600">10 minutes</SelectItem>
        <SelectItem value="900">15 minutes</SelectItem>
        <SelectItem value="1800">30 minutes</SelectItem>
        <SelectItem value="3600">1 hour</SelectItem>
        <SelectItem value="7200">2 hours</SelectItem>
        <SelectItem value="18000">5 hours</SelectItem>
        <SelectItem value="43200">12 hours</SelectItem>
        <SelectItem value="86400">1 day</SelectItem>
        <SelectItem value="172800">2 days</SelectItem>
        <SelectItem value="432000">3 days</SelectItem>
      </SelectContent>
    </Select>
  );
};
