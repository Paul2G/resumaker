import { useTranslation } from 'react-i18next';

import { Typography } from '@/components/ui/typography';

export function SidebarSettings() {
  const { t } = useTranslation();

  return (
    <aside className="order-2 overflow-y-auto w-100 shrink-0 border-r p-4 flex flex-col gap-2">
      <Typography variant="h4">{t('documentSettings')}</Typography>
    </aside>
  );
}
