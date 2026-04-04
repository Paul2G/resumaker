import { createFileRoute } from '@tanstack/react-router';

import { SidebarSettings } from '@/components/sidebar-settings';

export const Route = createFileRoute('/resumes/$resumeId/settings')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <SidebarSettings />
    </>
  );
}
