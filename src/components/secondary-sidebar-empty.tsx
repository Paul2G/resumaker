import { PlusIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { useResume } from '@/hooks/use-resume';
import { useSecondarySidebar } from '@/hooks/use-secondary-sidebar';
import { SectionIconMap } from '@/lib/icons-maps';
import { IterableSectionKey } from '@/lib/types';

export function SecondarySidebarEmpty({
  sectionKey,
}: SecondarySidebarEmptyProps) {
  const { t } = useTranslation();
  const { addSectionDataItem } = useResume();
  const { setSidebarContent } = useSecondarySidebar();

  if (sectionKey) {
    const Icon = SectionIconMap[sectionKey];

    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Icon />
          </EmptyMedia>
          <EmptyTitle>{t(`${sectionKey}:title`)}</EmptyTitle>
          <EmptyDescription>{t(`${sectionKey}:description`)}</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button
            onClick={() => {
              {
                const newItemId = addSectionDataItem(sectionKey, {
                  title: t(`${sectionKey}:defaults.title`),
                  organization: t(`${sectionKey}:defaults.organization`),
                  visible: true,
                });

                setSidebarContent(sectionKey, newItemId);
              }
            }}
          >
            <PlusIcon />
            {t(`${sectionKey}:actions.addItem`)}
          </Button>
        </EmptyContent>
      </Empty>
    );
  }

  return <div>Nada aqui</div>;
}

export type SecondarySidebarEmptyProps = {
  sectionKey?: IterableSectionKey;
};
