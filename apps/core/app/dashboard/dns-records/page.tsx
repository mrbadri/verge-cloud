"use client";

import { Button } from "@repo/ui/components/button";
import {
  Dialog,
  DialogTrigger
} from "@repo/ui/components/dialog";
import { useTheme } from "next-themes";
import { useState } from "react";
import { CreateDnsModal } from "./_components/create-dns-modal";
import { RecordsList } from "./_components/records-list";



const DNSRecordsPage = () => {
  const { setTheme, theme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="py-6">
      <div className="flex  justify-between items-center gap-1 w-full mb-4">
        <span>
          To activate VergeCloud's CDN and DNS services for your domain, you
          need to transfer your domain's DNS records to VergeCloud's
        </span>

        <Dialog open={open} onOpenChange={setOpen} >
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setTheme(theme === "dark" ? "light" : "dark");
              }}
            >
              New Record
            </Button>
          </DialogTrigger>
          <CreateDnsModal open={open} setOpen={setOpen} />
        </Dialog>
      </div>
      
      <RecordsList />
    </div>
  );
};

export default DNSRecordsPage;
