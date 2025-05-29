"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const registerSchema = z.object({
  name: z.string().trim().min(2, { message: "O nome é obrigatório!" }),
  email: z.string().email("Email inválido").nonempty("Email é obrigatório"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  type REGISTERSCHEMA = z.infer<typeof registerSchema>;
  const form = useForm<REGISTERSCHEMA>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: REGISTERSCHEMA) {
    try {
      await authClient.signUp.email(
        {
          name: data.name,
          email: data.email,
          password: data.password,
        },
        {
          onRequest: () => {
            setIsLoading(true);
          },
          onSuccess: () => {
            setIsLoading(false);
            toast.success("Usuario cadastrado com êxito!");
            router.push("/dashboard");
          },
          onError: (ctx) => {
            setIsLoading(false);
            if (ctx.error.code === "USER_ALREADY_EXISTS") {
              toast.warning("Usuario ja existe para o email informado!");
            } else {
              toast.error("Erro ao cadastrar usuario!");
            }
          },
        },
      );
    } catch (error) {
      toast.error("Ooops, erro inesperado ao cadastrar usuario!");
      console.log(error);
    }
  }
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Crie sua conta</CardTitle>
          <CardDescription>
            crie uma conta para ter acesso a nossa plataforma
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Seu nome" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="your@mail.com"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                variant="default"
                className="w-full cursor-pointer rounded-lg"
                disabled={isLoading}
              >
                {isLoading && (
                  <LoaderCircle size={20} className="animate-spin text-white" />
                )}
                Criar conta
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};
export default SignupForm;
