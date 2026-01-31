import type { IterableSectionKey, ResumeSection } from '@/types';

import { PlusIcon } from '@phosphor-icons/react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { SortableTreeList } from '@/components/sortable-tree-list';
import { Button } from '@/components/ui/button';
import { useResume } from '@/hooks/use-resume';
import { SectionIconMap, SectionItemIconMap } from '@/lib/icons-maps';
import { StaticSectionKey } from '@/types';

export function SectionsList() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { sectionKey: selectedSectionKey, itemId: selectedItemId } = useParams({
    from: '/$resumeId/sections/{-$sectionKey}/{-$itemId}',
  });

  const {
    id: resumeId,
    sections,
    setSections,
    setSectionVisibility,
    setSectionData,
    addSectionDataItem,
    removeSectionDataItem,
    setSectionDataItemVisibility,
  } = useResume();

  async function onCreateNewItem(sectionKey: IterableSectionKey) {
    const newItemId = await addSectionDataItem(sectionKey, {
      title: t(`${sectionKey}:defaults.title`),
      organization: t(`${sectionKey}:defaults.organization`),
      visible: true,
    });

    await navigate({
      to: '/$resumeId/sections/{-$sectionKey}/{-$itemId}',
      params: { resumeId, sectionKey, itemId: newItemId },
    });
  }

  async function onDeleteItem(sectionKey: IterableSectionKey, itemId: string) {
    await removeSectionDataItem(sectionKey, itemId);

    await navigate({
      to: '/$resumeId/sections/{-$sectionKey}/{-$itemId}',
      params: { resumeId, sectionKey: sectionKey, itemId: undefined },
    });
  }

  function getSectionTitle(section: ResumeSection) {
    return <b className="font-semibold">{t(`${section.key}:title`)}</b>;
  }

  function getItemTitle(item: { title: string; organization: string }) {
    return (
      <>
        <b className="font-semibold">{item.title}</b>
        <i> — {item.organization}</i>
      </>
    );
  }

  function getSectionIcon(section: ResumeSection) {
    return SectionIconMap[section.key];
  }

  function getItemIcon(sectionKey: IterableSectionKey) {
    return SectionItemIconMap[sectionKey];
  }

  return (
    <SortableTreeList
      items={sections}
      selectedItem={selectedItemId || selectedSectionKey}
      setItems={setSections}
      getItemValue={(section) => section.key}
      getItemTitle={getSectionTitle}
      getItemVisibility={(section) => section.visible}
      getItemParentCapacity={(section) => Array.isArray(section.data)}
      getItemIcon={getSectionIcon}
      setItemVisibility={(section) =>
        setSectionVisibility(section.key, !section.visible)
      }
      selectItem={(section) =>
        navigate({
          to: '/$resumeId/sections/{-$sectionKey}/{-$itemId}',
          params: { resumeId, sectionKey: section.key, itemId: undefined },
        })
      }
    >
      {(section) =>
        section.key !== StaticSectionKey.ContactInfo &&
        section.key !== StaticSectionKey.Skills &&
        section.key !== StaticSectionKey.Summary && (
          <>
            <SortableTreeList
              items={section.data}
              selectedItem={selectedItemId}
              setItems={(data) => setSectionData(section.key, data)}
              getItemValue={(item) => item.id}
              getItemTitle={getItemTitle}
              getItemVisibility={(item) => item.visible}
              getItemIcon={() => getItemIcon(section.key)}
              setItemVisibility={(item) =>
                setSectionDataItemVisibility(
                  section.key,
                  item.id,
                  !item.visible,
                )
              }
              removeItem={(item) => onDeleteItem(section.key, item.id)}
              selectItem={(item) =>
                navigate({
                  to: '/$resumeId/sections/{-$sectionKey}/{-$itemId}',
                  params: {
                    resumeId,
                    sectionKey: section.key,
                    itemId: item.id,
                  },
                })
              }
            />
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              onClick={() => onCreateNewItem(section.key)}
            >
              <PlusIcon className="size-4 ms-5.5" />
              {t(`${section.key}:actions.addItem`)}
            </Button>
          </>
        )
      }
    </SortableTreeList>
  );
}
