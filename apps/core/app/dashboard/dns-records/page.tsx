"use client";

import { Button } from "@repo/ui/components/button";
import { Dialog, DialogTrigger } from "@repo/ui/components/dialog";
import { useState } from "react";
import { AddRecordModal } from "./_components/add-record-modal";
import { RecordsList } from "./_components/record-list/records-list";

const DNSRecordsPage = () => {
  const [openNewRecord, setOpenNewRecord] = useState(false);

  return (
    <div className="py-6">
      <div className="flex  justify-between items-center gap-1 w-full mb-4">
        <span>
          To activate VergeCloud's CDN and DNS services for your domain, you
          need to transfer your domain's DNS records to VergeCloud's
        </span>

        <Button onClick={() => setOpenNewRecord(true)}>New Record</Button>
      </div>

      <RecordsList />

      {/* Add New Record Modal */}
      <AddRecordModal open={openNewRecord} setOpen={setOpenNewRecord} />
    </div>
  );
};

export default DNSRecordsPage;
