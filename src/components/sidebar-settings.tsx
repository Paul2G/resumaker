import { useTranslation } from 'react-i18next';

import { ResumeConfigForm } from '@/components/forms/resume-config-form';
import { Typography } from '@/components/ui/typography';
import { useResume } from '@/hooks/use-resume';

export function SidebarSettings() {
  const { t } = useTranslation();
  const { config, setConfig } = useResume();

  return (
    <aside className="order-2 overflow-y-auto w-100 shrink-0 border-r p-4 flex flex-col gap-2">
      <Typography variant="h4" className="mb-4">
        {t('documentSettings')}
      </Typography>
      <ResumeConfigForm currentConfig={config} onSave={setConfig} />
    </aside>
  );
}
