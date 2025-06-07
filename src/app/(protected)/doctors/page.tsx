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
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { doctorsTable } from "@/db/schema";
import DoctorCard from "./_components/doctor-card";

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

  const doctors = await db.query.doctorsTable.findMany({
    where: eq(doctorsTable.clinicId, session.user.clinic.id),
  });

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
          {doctors.length === 0 && <p>No doctors found for this clinic.</p>}
          <div className="grid grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </PageContent>
      </PageContainer>
    </>
  );
};

export default DoctorsPage;
