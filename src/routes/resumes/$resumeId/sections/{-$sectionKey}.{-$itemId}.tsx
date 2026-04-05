import { createFileRoute } from '@tanstack/react-router';

import { SidebarSections } from '@/components/sidebar-sections';
import { SidebarSectionsForms } from '@/components/sidebar-sections-forms';

export const Route = createFileRoute(
  '/resumes/$resumeId/sections/{-$sectionKey}/{-$itemId}',
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <SidebarSections />
      <SidebarSectionsForms />
    </>
  );
}
