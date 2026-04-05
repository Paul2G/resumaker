import { useTranslation } from 'react-i18next';

import { ResumeConfigForm } from '@/components/forms/config/resume-config-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Typography } from '@/components/ui/typography';
import { useResume } from '@/hooks/use-resume';

export function SidebarSettings() {
  const { t } = useTranslation();
  const { config, setConfig } = useResume();

  return (
    <aside className="order-2 overflow-y-hidden w-100 shrink-0 border-r">
      <ScrollArea className="h-full p-4">
        <Typography variant="h4" className="mb-4">
          {t('documentSettings')}
        </Typography>
        <ResumeConfigForm currentConfig={config} onSave={setConfig} />
      </ScrollArea>
    </aside>
  );
}
