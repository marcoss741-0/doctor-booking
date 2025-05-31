import { db } from "@/db";
import { usersToClinicsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/authentication");
  }

  const clicnics = await db.query.usersToClinicsTable.findMany({
    where: eq(usersToClinicsTable.userId, session?.user?.id),
  });

  if (clicnics.length === 0) {
    redirect("/clinic-form");
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
