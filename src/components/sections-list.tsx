import type { SectionKey } from '@/lib/types';

import { PlusIcon } from '@phosphor-icons/react';

import { SortableTreeList } from '@/components/sortable-tree-list';
import { Button } from '@/components/ui/button';
import { useResume } from '@/hooks/use-resume';
import { useSecondarySidebar } from '@/hooks/use-secondary-sidebar';
import { IterableSectionKey, StaticSectionKey } from '@/lib/types';

const titles: Record<SectionKey, string> = {
  certifications: 'Certifications',
  courses: 'Courses',
  education: 'Education',
  experience: 'Experience',
  projects: 'Projects',
  skills: 'Skills',
  summary: 'Summary',
  contactInfo: 'Contact Info',
};

export function SectionsList() {
  const {
    sections,
    setSections,
    setSectionVisibility,
    setSectionData,
    addSectionDataItem,
    removeSectionDataItem,
    setSectionDataItemVisibility,
  } = useResume();
  const { selectedSectionKey, selectedItemId, setSidebarContent } =
    useSecondarySidebar();

  function onCreateNewItem(sectionKey: IterableSectionKey) {
    const newItemId = crypto.randomUUID();

    addSectionDataItem(sectionKey, {
      id: newItemId,
      title: 'New entry',
      organization: 'Somewhere',
      visible: true,
    });

    setSidebarContent(sectionKey, newItemId);
  }

  function onDeleteItem(sectionKey: IterableSectionKey, itemId: string) {
    setSidebarContent(sectionKey);

    removeSectionDataItem(sectionKey, itemId);
  }

  return (
    <SortableTreeList
      items={sections}
      selectedItem={selectedItemId || selectedSectionKey}
      setItems={setSections}
      getItemValue={(item) => item.key}
      getItemTitle={(item) => <b>{titles[item.key]}</b>}
      getItemVisibility={(item) => item.visible}
      getItemParentCapacity={(item) => Array.isArray(item.data)}
      setItemVisibility={(item) =>
        setSectionVisibility(item.key, !item.visible)
      }
      selectItem={(item) => setSidebarContent(item.key)}
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
              getItemTitle={(item) => (
                <>
                  <b>{item.title}</b>
                  <i> — {item.organization}</i>
                </>
              )}
              getItemVisibility={(item) => item.visible}
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
              Add new
            </Button>
          </>
        )
      }
    </SortableTreeList>
  );
}
