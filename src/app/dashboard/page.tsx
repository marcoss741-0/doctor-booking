import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/authentication");
  }

  return (
    <>
      <div className="p-5">
        <h1>Dashboard</h1>
        <p>{session?.user.name}</p>
        <p>{session?.user.email}</p>
      </div>
    </>
  );
};

export default DashboardPage;
