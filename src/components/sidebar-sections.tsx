import { useTranslation } from 'react-i18next';

import { SectionsList } from '@/components/sections-list';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Typography } from '@/components/ui/typography';
import { cn } from '@/lib/utils';

export function SidebarSections({
  className,
  ...restOfProps
}: React.ComponentProps<'aside'>) {
  const { t } = useTranslation();

  return (
    <aside
      className={cn(
        'order-2 w-100 overflow-y-hidden shrink-0 border-r bg-background',
        className,
      )}
      {...restOfProps}
    >
      <ScrollArea className="h-full p-4">
        <Typography variant="h4" className="mb-4">
          {t('sections')}
        </Typography>
        <SectionsList />
      </ScrollArea>
    </aside>
  );
}
