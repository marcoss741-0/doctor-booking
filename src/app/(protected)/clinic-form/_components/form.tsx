"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/_components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/_components/ui/input";
import { DialogFooter } from "@/_components/ui/dialog";
import { Button } from "@/_components/ui/button";
import { Loader, PlusIcon } from "lucide-react";
import { toast } from "sonner";
import { createClinic } from "@/actions/create-clinic";
import { isRedirectError } from "next/dist/client/components/redirect-error";

const clinicSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "O nome da clinica precisa ser informado!" }),
});

type CLINICSCHEMA = z.infer<typeof clinicSchema>;

const FormClicnic = () => {
  const form = useForm<CLINICSCHEMA>({
    resolver: zodResolver(clinicSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(data: CLINICSCHEMA) {
    try {
      await createClinic(data.name);
      // toast.success("Clínica criada com êxito!");
      // form.reset();
    } catch (error) {
      if (isRedirectError(error)) {
        return;
      }
      console.log(error);
      toast.error("Erro ao criar clínica!");
    }
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Clinica</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Informe o nome da clinica"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <Button type="submit" className="cursor-pointer items-center gap-2">
              {form.formState.isSubmitting ? (
                <Loader className="animate-spin" />
              ) : (
                <PlusIcon />
              )}
              Criar Clínica
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};

export default FormClicnic;
