"use client";

import { Button } from "@/_components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/_components/ui/dialog";
import { PlusIcon } from "lucide-react";
import UpsertDoctorsDialog from "./upsert-doctors-form";

const AddDoctorsButton = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="default"
            className="cursor-pointer items-center gap-1 rounded-lg"
          >
            <PlusIcon /> Adicionar Médicos
          </Button>
        </DialogTrigger>
        <DialogContent>
          <UpsertDoctorsDialog />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddDoctorsButton;
