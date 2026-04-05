import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { createFileRoute, notFound, Outlet } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { ResumeProvider } from '@/contexts/resume-provider';
import { MainArea } from '@/components/main-area';
import { SidebarAuxiliar } from '@/components/sidebar-auxiliar';
import { onMutationError, onMutationSuccess } from '@/lib/mutation-toast';
import {
  resumeQueryOptions,
  resumeUpdateMutationOptions,
} from '@/api/query-options';

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
  const { t } = useTranslation();
  const { resumeId } = Route.useParams();

  const queryClient = useQueryClient();
  const { data: currentResume } = useSuspenseQuery(
    resumeQueryOptions(resumeId),
  );
  const { mutate: updateResume } = useMutation({
    ...resumeUpdateMutationOptions(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
      onMutationSuccess(t)();
    },
    onError: onMutationError(t),
  });

  return (
    <ResumeProvider currentResume={currentResume} onSave={updateResume}>
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
