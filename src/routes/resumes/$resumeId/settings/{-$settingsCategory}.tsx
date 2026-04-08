import { createFileRoute, redirect } from '@tanstack/react-router';

import { SidebarSettingsCategories } from '@/components/sidebar-settings-categories';
import { SidebarSettingsForms } from '@/components/sidebar-settings-forms';
import { isValueOf } from '@/lib/utils';
import { SettingsCategory } from '@/constants/settings';

export const Route = createFileRoute(
  '/resumes/$resumeId/settings/{-$settingsCategory}',
)({
  beforeLoad: ({ params }) => {
    if (!isValueOf(SettingsCategory)(params.settingsCategory)) {
      throw redirect({
        from: '/resumes/$resumeId/settings/{-$settingsCategory}',
        to: '/resumes/$resumeId/settings/{-$settingsCategory}',
        params: (prev) => ({
          ...prev,
          settingsCategory: SettingsCategory.General,
        }),
      });
    }
  },
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
