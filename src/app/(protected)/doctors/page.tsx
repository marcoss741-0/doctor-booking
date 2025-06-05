import {
  PageActions,
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
import AddDoctorsButton from "./_components/add-doctors-button";

const DoctorsPage = async () => {
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
    <>
      <PageContainer>
        <PageHeader>
          <PageHeaderContent>
            <PageTitle>Médicos</PageTitle>
            <PageDescription>
              Access a detailed overview of key metrics and patient outcomes
            </PageDescription>
          </PageHeaderContent>
          <PageActions>
            <AddDoctorsButton />
          </PageActions>
        </PageHeader>
        <PageContent>
          {/* Content goes here */}
          <p>List of doctors will be displayed here.</p>
        </PageContent>
      </PageContainer>
    </>
  );
};

export default DoctorsPage;
