import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignupForm from "./components/signup-form";
import SigninForm from "./components/signin-form";

const AuthenticationPage = () => {
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
