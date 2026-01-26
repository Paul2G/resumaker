import { createFileRoute, notFound, Outlet } from '@tanstack/react-router';

import { ResumeProvider } from '@/context/resume-provider';
import { SidebarsContentProvider } from '@/context/sidebars-content-provider';
import { MainArea } from '@/components/main-area';
import { SidebarAuxiliar } from '@/components/sidebar-auxiliar';
import { useResumesIndex } from '@/hooks/use-resumes-index';
import { loadResume } from '@/repositories/resumes';

export const Route = createFileRoute('/$resumeId')({
  component: RouteComponent,
  notFoundComponent: NotFoundComponent,
  loader: ({ params }) => {
    const { resumeId } = params;

    const resume = loadResume(resumeId);

    if (!resume) {
      throw notFound();
    }

    return { resume };
  },
});

function RouteComponent() {
  const { updateResume } = useResumesIndex();

  const { resume: selectedResume } = Route.useLoaderData();

  return (
    <ResumeProvider currentResume={selectedResume} onSave={updateResume}>
      <SidebarsContentProvider>
        <div className="overflow-hidden grow flex items-streetch">
          <SidebarAuxiliar />
          <Outlet />
          <MainArea />
        </div>
      </SidebarsContentProvider>
    </ResumeProvider>
  );
}

function NotFoundComponent() {
  return (
    <div className="flex items-center justify-center h-full w-full">
      Resume not found
    </div>
  );
}
