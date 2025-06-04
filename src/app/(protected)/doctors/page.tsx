import {
  PageActions,
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/_components/page-container";
import { Button } from "@/_components/ui/button";
import { PlusIcon } from "lucide-react";

const DoctorsPage = () => {
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
            <Button
              variant="default"
              className="cursor-pointer items-center gap-1 rounded-lg"
            >
              <PlusIcon /> Adicionar Médicos
            </Button>
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
