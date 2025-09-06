interface PageContainerProps {
  children: React.ReactNode;
}

export function PageContainer({ children }: PageContainerProps) {
  return <div className="mx-auto max-w-6xl space-y-6 p-6">{children}</div>;
}
