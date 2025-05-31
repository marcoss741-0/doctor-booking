import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/_components/ui/tabs";
import SignupForm from "./_components/signup-form";
import SigninForm from "./_components/signin-form";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const AuthenticationPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Fazer Login</TabsTrigger>
          <TabsTrigger value="signup">Criar conta</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          {/* SigninForm */}
          <SigninForm />
        </TabsContent>
        <TabsContent value="signup">
          {/* SignupForm */}
          <SignupForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthenticationPage;
