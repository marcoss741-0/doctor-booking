"use client";

import { Button } from "@/_components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/_components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/_components/ui/form";
import { Input } from "@/_components/ui/input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, LoaderIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Email inválido").nonempty("Email é obrigatório"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

const SigninForm = () => {
  type LOGINSCHEMA = z.infer<typeof loginSchema>;
  const [isLoading, setIsLoading] = useState(false);
  const [signinGoogleLoading, setSigninGoogleLoading] = useState(false);
  const router = useRouter();
  const form = useForm<LOGINSCHEMA>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LOGINSCHEMA) {
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          setIsLoading(false);
          toast.success("Login realizado!");
          router.push("/dashboard");
        },
        onError: (ctx) => {
          setIsLoading(false);

          if (ctx.error.statusText === "UNAUTHORIZED") {
            toast.error("Ooops, Email ou senha incorretos!");
          }
        },
      },
    );
  }

  async function signinGoogle() {
    await authClient.signIn.social(
      {
        provider: "google",
        callbackURL: "/dashboard",
      },
      {
        onRequest: () => {
          setSigninGoogleLoading(true);
        },
        onSuccess: () => {
          setSigninGoogleLoading(false);
          router.push("/dashboard");
        },
      },
    );
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
                className="w-full cursor-pointer gap-2 rounded-lg"
                disabled={isLoading}
              >
                {isLoading && <LoaderCircle className="animate-spin" />}
                Fazer login
              </Button>
            </form>
          </Form>
          <Button
            type="button"
            variant="outline"
            className="w-full cursor-pointer items-center gap-2"
            disabled={signinGoogleLoading}
            onClick={signinGoogle}
          >
            {signinGoogleLoading ? (
              <LoaderIcon className="animate-spin" />
            ) : (
              <Image
                src="/google.svg"
                alt="Login with google"
                width={20}
                height={20}
              />
            )}
            Login com google
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default SigninForm;
