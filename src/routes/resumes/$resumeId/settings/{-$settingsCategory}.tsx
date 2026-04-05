import { createFileRoute } from '@tanstack/react-router';

import { SidebarSettingsCategories } from '@/components/sidebar-settings-categories';
import { SidebarSettingsForms } from '@/components/sidebar-settings-forms';

export const Route = createFileRoute(
  '/resumes/$resumeId/settings/{-$settingsCategory}',
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <SidebarSettingsCategories />
      <SidebarSettingsForms />
    </>
  );
}
