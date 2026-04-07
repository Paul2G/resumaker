import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, notFound, Outlet } from '@tanstack/react-router';

import { ResumeProvider } from '@/contexts/resume-provider';
import { MainArea } from '@/components/main-area';
import { SidebarAuxiliar } from '@/components/sidebar-auxiliar';
import { resumeQueryOptions } from '@/api/query-options';

export const Route = createFileRoute('/resumes/$resumeId')({
  loader: async ({ context: { queryClient }, params: { resumeId } }) => {
    const data = await queryClient.ensureQueryData(
      resumeQueryOptions(resumeId),
    );
    if (!data) throw notFound();

    return data;
  },
  component: RouteComponent,
  notFoundComponent: NotFoundComponent,
});

function RouteComponent() {
  const { resumeId } = Route.useParams();

  const { data: currentResume } = useSuspenseQuery(
    resumeQueryOptions(resumeId),
  );

  return (
    <ResumeProvider currentResume={currentResume}>
      <div className="overflow-hidden grow flex items-stretch">
        <SidebarAuxiliar />
        <Outlet />
        <MainArea />
      </div>
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
