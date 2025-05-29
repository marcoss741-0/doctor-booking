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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Email inválido").nonempty("Email é obrigatório"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

const SigninForm = () => {
  type LOGINSCHEMA = z.infer<typeof loginSchema>;
  const form = useForm<LOGINSCHEMA>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  function onSubmit(data: LOGINSCHEMA) {
    console.log(data);
  }
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Fazer login</CardTitle>
          <CardDescription>
            Faça login com o google ou use suas credenciais
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              >
                Fazer login
              </Button>
            </form>
          </Form>
          <Button
            type="button"
            variant="outline"
            className="w-full cursor-pointer items-center gap-2"
          >
            <Image
              src="/google.svg"
              alt="Login with google"
              width={20}
              height={20}
            />
            Login com google
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default SigninForm;
