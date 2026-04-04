import { createFileRoute } from '@tanstack/react-router';

import { SidebarForms } from '@/components/sidebar-forms';
import { SidebarSections } from '@/components/sidebar-sections';

export const Route = createFileRoute(
  '/resumes/$resumeId/sections/{-$sectionKey}/{-$itemId}',
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <SidebarSections />
      <SidebarForms />
    </>
  );
}
