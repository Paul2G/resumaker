import { createFileRoute, Outlet } from '@tanstack/react-router';

import { NavigationProgress } from '@/components/navigation-progress';
import { PrimaryHeader } from '@/components/primary-header';
import { resumesIndexQueryOptions } from '@/api/query-options';

export const Route = createFileRoute('/resumes')({
  loader: async ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(resumesIndexQueryOptions()),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-screen flex flex-col relative bg-foreground/10 text-foreground">
      <NavigationProgress />
      <PrimaryHeader />
      <Outlet />
    </div>
  );
}
