import { createFileRoute, Outlet } from '@tanstack/react-router';

import { ResumesIndexProvider } from '@/contexts/resumes-indexes-provider';
import { PrimaryHeader } from '@/components/primary-header';
import { loadAppData, saveAppData } from '@/repositories/resumes';

export const Route = createFileRoute('/resumes')({
  component: RouteComponent,
});

function RouteComponent() {
  const loadedAppData = loadAppData();

  return (
    <ResumesIndexProvider appData={loadedAppData} onSaveAppData={saveAppData}>
      <div className="h-screen flex flex-col relative bg-background text-foreground">
        <PrimaryHeader />
        <Outlet />
      </div>
    </ResumesIndexProvider>
  );
}
