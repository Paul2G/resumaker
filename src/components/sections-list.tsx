import type { ResumeSection } from '@/lib/types';

import { useEffect } from 'react';
import { PlusIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { SortableTreeList } from '@/components/sortable-tree-list';
import { Button } from '@/components/ui/button';
import { useResume } from '@/hooks/use-resume';
import { useSecondarySidebar } from '@/hooks/use-secondary-sidebar';
import { SectionIconMap, SectionItemIconMap } from '@/lib/icons-maps';
import { IterableSectionKey, StaticSectionKey } from '@/lib/types';

export function SectionsList() {
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
  const { t } = useTranslation();
  const {
    selectedSectionKey,
    selectedItemId,
    setSidebarContent,
    clearSidebarContent,
  } = useSecondarySidebar();

  function onCreateNewItem(sectionKey: IterableSectionKey) {
    const newItemId = addSectionDataItem(sectionKey, {
      title: t(`${sectionKey}:defaults.title`),
      organization: t(`${sectionKey}:defaults.organization`),
      visible: true,
    });

    setSidebarContent(sectionKey, newItemId);
  }

  function onDeleteItem(sectionKey: IterableSectionKey, itemId: string) {
    setSidebarContent(sectionKey);

    removeSectionDataItem(sectionKey, itemId);
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

  useEffect(() => {
    clearSidebarContent();
  }, [resumeId]);

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
      selectItem={(section) => setSidebarContent(section.key)}
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
              selectItem={(item) => setSidebarContent(section.key, item.id)}
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
