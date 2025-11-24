import type { SectionKey } from '@/lib/types';

import { PlusIcon } from '@phosphor-icons/react';

import { SortableTreeList } from '@/components/sortable-tree-list';
import { Button } from '@/components/ui/button';
import { useResume } from '@/hooks/use-resume';
import { StaticSectionKey } from '@/lib/types';

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

  return (
    <SortableTreeList
      items={sections}
      setItems={setSections}
      getItemValue={(item) => item.key}
      getItemTitle={(item) => titles[item.key]}
      getItemVisibility={(item) => item.visible}
      getItemParentCapacity={(item) => Array.isArray(item.data)}
      setItemVisibility={(item) =>
        setSectionVisibility(item.key, !item.visible)
      }
    >
      {(section) =>
        section.key !== StaticSectionKey.ContactInfo &&
        section.key !== StaticSectionKey.Skills &&
        section.key !== StaticSectionKey.Summary && (
          <>
            <SortableTreeList
              items={section.data}
              setItems={(data) => setSectionData(section.key, data)}
              getItemValue={(item) => item.id}
              getItemTitle={(item) => item.title}
              getItemVisibility={(item) => item.visible}
              setItemVisibility={(item) =>
                setSectionDataItemVisibility(
                  section.key,
                  item.id,
                  !item.visible,
                )
              }
              removeItem={(item) => removeSectionDataItem(section.key, item.id)}
            />
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              onClick={() =>
                addSectionDataItem(section.key, {
                  id: crypto.randomUUID(),
                  title: 'New entry',
                  organization: 'Somewhere',
                  visible: true,
                })
              }
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
