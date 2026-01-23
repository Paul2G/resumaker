import { useTranslation } from 'react-i18next';

import { AuxSidebarOption } from '@/context/sidebars-content-provider';
import { SectionsList } from '@/components/sections-list';
import { Typography } from '@/components/ui/typography';
import { useSidebarsContent } from '@/hooks/use-sidebars-content';

export function PrimarySidebar() {
  const { t } = useTranslation();
  const { selectedAuxSidebarOption } = useSidebarsContent();

  return (
    <aside className="overflow-y-auto w-100 shrink-0 border-r p-4 flex flex-col gap-2">
      {selectedAuxSidebarOption === AuxSidebarOption.Sections && (
        <>
          <Typography variant="h4">{t('sections')}</Typography>
          <SectionsList />
        </>
      )}
      {/*{selectedAuxSidebarOption === AuxSidebarOption.DocumentSettings && (*/}
      {/*  <Typography variant="h2">Some settings here</Typography>*/}
      {/*)}*/}
    </aside>
  );
}
