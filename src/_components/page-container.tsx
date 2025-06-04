import { ReactNode } from "react";

export const PageContainer = ({ children }: { children: ReactNode }) => {
  return <div className="space-y-6 p-6">{children}</div>;
};

export const PageHeader = ({ children }: { children: ReactNode }) => {
  return <div className="flex items-center justify-between">{children}</div>;
};

export const PageHeaderContent = ({ children }: { children: ReactNode }) => {
  return <div className="space-y-1">{children}</div>;
};

export const PageTitle = ({ children }: { children: ReactNode }) => {
  return <h1 className="text-2xl font-bold">{children}</h1>;
};

export const PageDescription = ({ children }: { children: ReactNode }) => {
  return <p className="text-muted-foreground text-sm">{children}</p>;
};

export const PageActions = ({ children }: { children: ReactNode }) => {
  return <div className="flex items-center gap-2">{children}</div>;
};

export const PageContent = ({ children }: { children: ReactNode }) => {
  return <div className="space-y-6">{children}</div>;
};
