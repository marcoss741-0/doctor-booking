import { Button } from "@/_components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/dashboard");
  }
  return (
    <div className="p-5">
      <h1>Home Page</h1>
      <Button className="mt-4">Click Me</Button>
    </div>
  );
}
