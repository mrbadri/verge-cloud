import { DialogDescription } from "@repo/ui/components/dialog";

const fieldsA = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 ">
        <DialogDescription>
          TLSA Record: The TLS Authentication record (TLSA) is used to
          associate a TLS server certificate or public key with the domain
          name where the record is found
        </DialogDescription>
      </div>
    </div>
  );
};

export default fieldsA;