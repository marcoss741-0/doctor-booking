import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FormClicnic from "./components/form";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const ClinicFormPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }
  return (
    <>
      <Dialog open>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Clinica</DialogTitle>
            <DialogDescription>
              Adicione uma clinica para continuar.
            </DialogDescription>
          </DialogHeader>
          {/* Formulário para cadastro da clinica */}
          <FormClicnic />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ClinicFormPage;
