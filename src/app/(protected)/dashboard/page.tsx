/* eslint-disable react/no-unescaped-entities */
import {
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/_components/page-container";
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

  if (!session.user.clinic) {
    redirect("/clinic-form");
  }

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Dashboard</PageTitle>
          <PageDescription>
            {session.user.email} - {session.user.name}
          </PageDescription>
        </PageHeaderContent>
      </PageHeader>
      <PageContent>
        <p>
          Welcome to the dashboard! Here you can find an overview of your
          clinic's performance and patient data.
        </p>
      </PageContent>
    </PageContainer>
  );
};

export default DashboardPage;
