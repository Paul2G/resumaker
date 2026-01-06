import { InfoIcon, PlusIcon } from '@phosphor-icons/react';
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
import { useSidebarsContent } from '@/hooks/use-sidebars-content';
import { SectionIconMap } from '@/lib/icons-maps';
import { IterableSectionKey } from '@/lib/types';

export function SecondarySidebarEmpty({
  sectionKey,
}: SecondarySidebarEmptyProps) {
  const { t } = useTranslation();
  const { addSectionDataItem } = useResume();
  const { setSidebarContent } = useSidebarsContent();

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

  // This should never happen, but maybe in the future so return a fallback UI
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <InfoIcon />
        </EmptyMedia>
        <EmptyTitle>{t('dialogs.noSectionSelected.title')}</EmptyTitle>
        <EmptyDescription>
          {t('dialogs.noSectionSelected.description')}
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}

export type SecondarySidebarEmptyProps = {
  sectionKey?: IterableSectionKey;
};
