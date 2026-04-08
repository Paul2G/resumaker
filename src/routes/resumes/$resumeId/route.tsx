import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, notFound, Outlet } from '@tanstack/react-router';

import { ResumeProvider } from '@/contexts/resume-provider';
import { AppErrorComponent } from '@/components/app-error-component';
import { MainArea } from '@/components/main-area';
import { SidebarAuxiliar } from '@/components/sidebar-auxiliar';
import { NotOkResponseError } from '@/lib/errors';
import { resumeQueryOptions } from '@/api/query-options';

export const Route = createFileRoute('/resumes/$resumeId')({
  loader: async ({ context: { queryClient }, params: { resumeId } }) => {
    try {
      return await queryClient.ensureQueryData(resumeQueryOptions(resumeId));
    } catch (error) {
      if (error instanceof NotOkResponseError && error.status === 404) {
        throw notFound();
      }

      throw error;
    }
  },
  component: RouteComponent,
  errorComponent: ({ error, reset }) => (
    <AppErrorComponent error={error} reset={reset} />
  ),
  notFoundComponent: () => <AppErrorComponent isNotFound />,
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
