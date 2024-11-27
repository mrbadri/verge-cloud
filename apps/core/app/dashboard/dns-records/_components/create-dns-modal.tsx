import { BaseInput } from "@repo/ui/components/base-input";
import { Button } from "@repo/ui/components/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/dialog";
import { LabelContainer } from "@repo/ui/components/labelContainer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import { Separator } from "@repo/ui/components/separator";
import { CircleAlert } from "lucide-react";

export const CreateDnsModal = () => {
  return (
    <DialogContent className="sm:max-w-[840px]">
      <DialogHeader>
        <DialogTitle>Add New Record </DialogTitle>
        <DialogDescription>
          To activate VergeCloud's CDN and DNS services for your domain, you
          need to transfer your domain's DNS records to VergeCloud's
        </DialogDescription>
      </DialogHeader>

      <Separator />

      {/* Section One */}
      <div className="flex flex-col py-2 gap-4">
        <div className="flex gap-4 ">
          {/* Record Type */}
          <LabelContainer
            className="flex-1"
            label="Type"
            error="This field is required"
            required
          >
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A">A</SelectItem>
                <SelectItem value="NS">NS</SelectItem>
                <SelectItem value="CNAME">NS</SelectItem>
                <SelectItem value="MX">MX</SelectItem>
                <SelectItem value="SRV">SRV</SelectItem>
                <SelectItem value="TXT">TXT</SelectItem>
                <SelectItem value="CAA">CAA</SelectItem>
                <SelectItem value="TLSA">TLSA</SelectItem>
              </SelectContent>
            </Select>
          </LabelContainer>

          {/* Name */}
          <LabelContainer
            className="flex-1 relative flex-grow-[2]"
            label="Name"
          >
            <BaseInput placeholder="Subdomain or @ for Root" />
            <span className="absolute right-1.5 bg-primary-100 text-primary-800 py-1.5 px-3 rounded top-1/2 -translate-y-1/2 text-xs">
              .com
            </span>
          </LabelContainer>

          {/* Record Type */}
          <LabelContainer className="flex-1" label="TTL" required>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A">A</SelectItem>
                <SelectItem value="NS">NS</SelectItem>
                <SelectItem value="CNAME">NS</SelectItem>
                <SelectItem value="MX">MX</SelectItem>
                <SelectItem value="SRV">SRV</SelectItem>
                <SelectItem value="TXT">TXT</SelectItem>
                <SelectItem value="CAA">CAA</SelectItem>
                <SelectItem value="TLSA">TLSA</SelectItem>
              </SelectContent>
            </Select>
          </LabelContainer>
        </div>

        <div className="flex gap-2 ">
          <CircleAlert size={24} className="text-gray-400 self-center" />
          <DialogDescription>
            TLSA Record: The TLS Authentication record (TLSA) is used to
            associate a TLS server certificate or public key with the domain
            name where the record is found
          </DialogDescription>
        </div>
      </div>

      <Separator />

      <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </DialogContent>
  );
};
