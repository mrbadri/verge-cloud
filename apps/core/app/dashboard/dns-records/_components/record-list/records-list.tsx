"use client";

import { useGetRecords } from "@repo/apis/core/v1/dns/{domain}/records/get/use-get-records";
import { BaseInput } from "@repo/ui/components/base-input";
import { Button } from "@repo/ui/components/button";
import { CloudSwitch } from "@repo/ui/components/cloudSwitch";
import { Separator } from "@repo/ui/components/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";
import { Pencil, Search, SlidersHorizontal, Trash2 } from "lucide-react";
import { BaseCard } from "../../../_components/base-card";
import { RecordListLoading } from "./record-list.loading";
import { useState } from "react";
import { EditRecordModal } from "../edit-record-modal";

const DisplayObjects: React.FC<any> = ({ data }) => {
  const dataArray = Array.isArray(data) ? data : [data];

  return (
    <div className="flex flex-col gap-2">
      {dataArray.map((obj, index) => {
        const keys = Object.keys(obj);

        return (
          <div key={index} className="flex items-center gap-1.5">
            <div className="">
              {keys.length > 0 ? obj[keys[0] as keyof typeof obj] : "N/A"}
            </div>
            {keys.slice(1).map((key) => (
              <div
                key={key}
                className="bg-border text-xs py-1 px-1.5 text-muted-foreground rounded-md"
              >
                <span className="key font-semibold">{key}: </span>
                <span className="value">{obj[key]}</span>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

const handleTtlShow = (ttl: string): string => {
  if (ttl === "-1") return "Auto";

  const seconds = Number(ttl);
  const minutes = Math.floor(seconds / 60);
  const days = Math.floor(minutes / (60 * 24));
  const remainingMinutes = minutes % 60;

  const parts: string[] = [];
  if (days > 0) parts.push(`${days} day${days > 1 ? "s" : ""}`);
  if (remainingMinutes > 0)
    parts.push(`${remainingMinutes} minute${remainingMinutes > 1 ? "s" : ""}`);

  return parts.join(" ") || "0 seconds";
};

export const RecordsList = () => {
  const [editId, setEditId] = useState("");
  const [openEditRecord, setOpenEditRecord] = useState(false);

  const query = useGetRecords({
    params: {
      keyPayload: "test",
    },
  });

  const handleEdit = (id: string) => {
    setEditId(id);
    setOpenEditRecord(true);
  };

  // TODO: FORM DEMO
  console.log("Record List:", query.data);

  return (
    <BaseCard>
      {/* Filter  Section */}
      <div className="flex gap-2 mb-4">
        {/* Search */}
        <div className="relative flex-1">
          <BaseInput placeholder="Search in Records" className="rounded-full" />
          <span className="absolute right-1.5 py-1.5 px-3 top-1/2 text-muted-foreground -translate-y-1/2 text-xs">
            <Search size={18} />
          </span>
        </div>
        {/*  */}
        <div className="flex gap-2">
          <Button variant="ghost" disabled className="flex gap-1 bg-border">
            <SlidersHorizontal size={16} />
            <span>Type</span>
          </Button>
          <Button variant="ghost" disabled className="flex gap-1 bg-border">
            <SlidersHorizontal size={16} />
            <span>Cloud Service</span>
          </Button>
          <Separator orientation="vertical" />
          <Button variant="ghost" disabled className="flex gap-1 bg-border">
            <SlidersHorizontal size={16} />
            <span>Sort</span>
          </Button>
        </div>
      </div>

      {/* Table */}
      <Table>
        <TableHeader className="bg-border py-4 rounded-full">
          <TableRow>
            <TableHead className="w-[100px]">Type</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>TTL</TableHead>
            <TableHead className="w-[100px] min-w-[100px]">
              Cloud Service
            </TableHead>
            <TableHead className="w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {query.isPending ? (
            <RecordListLoading />
          ) : (
            <>
              {query.data?.data.data?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    <span className="bg-border rounded-lg p-2 text-muted-foreground">
                      {item.type}
                    </span>
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <DisplayObjects data={item.value} />
                  </TableCell>
                  <TableCell>{handleTtlShow(item.ttl)}</TableCell>
                  <TableCell>
                    <CloudSwitch defaultChecked={item.cloud} />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="link"
                        className="flex gap-1 p-3 rounded-full bg-primary-100 text-primary-600"
                        onClick={() => {
                          handleEdit(item.id);
                        }}
                      >
                        <Pencil size={20} />
                      </Button>
                      <Button
                        variant="link"
                        className="flex gap-1 p-3 rounded-full bg-primary-100 text-primary-600"
                      >
                        <Trash2 size={20} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>

      {/* Edit Record Modal */}
      <EditRecordModal
        open={openEditRecord}
        setOpen={setOpenEditRecord}
        id={editId}
      />
    </BaseCard>
  );
};
