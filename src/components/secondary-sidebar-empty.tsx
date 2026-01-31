import { InfoIcon, PlusIcon } from '@phosphor-icons/react';
import { useNavigate } from '@tanstack/react-router';
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
import { SectionIconMap } from '@/lib/icons-maps';
import { IterableSectionKey } from '@/lib/types';
import { isValueOf } from '@/lib/utils';

export function SecondarySidebarEmpty({
  sectionKey,
}: SecondarySidebarEmptyProps) {
  const { t } = useTranslation();
  const { addSectionDataItem } = useResume();
  const navigate = useNavigate();

  if (isValueOf(IterableSectionKey)(sectionKey)) {
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
            onClick={async () => {
              {
                const itemId = await addSectionDataItem(sectionKey, {
                  title: t(`${sectionKey}:defaults.title`),
                  organization: t(`${sectionKey}:defaults.organization`),
                  visible: true,
                });

                await navigate({
                  from: '/$resumeId/sections/{-$sectionKey}/{-$itemId}',
                  params: (prev) => ({ ...prev, sectionKey, itemId }),
                });
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
  sectionKey?: IterableSectionKey | string;
};
