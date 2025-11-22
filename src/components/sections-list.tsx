import type { ResumeSection, SectionDataItem, SectionKey } from '@/lib/types';

import { SectionsListItem } from '@/components/sections-list-item';
import { SectionsListItemSublist } from '@/components/sections-list-item-sublist';
import {
  Sortable,
  SortableContent,
  SortableItem,
} from '@/components/ui/sortable';
import { useResume } from '@/hooks/use-resume';

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
    setSectionData,
    setSectionVisibility,
    addSectionDataItem,
    removeSectionDataItem,
    setSectionDataItemVisibility,
  } = useResume();

  return (
    <Sortable
      value={sections}
      onValueChange={setSections}
      getItemValue={(section: ResumeSection) => section.key}
      orientation="vertical"
    >
      <SortableContent>
        {sections.map((section) => (
          <SortableItem value={section.key} key={section.key}>
            <SectionsListItem
              title={titles[section.key]}
              visible={section.visible}
              hasItems={Array.isArray(section.data)}
              onSelect={() => {}}
              onToggleVisibility={() =>
                setSectionVisibility(section.key, !section.visible)
              }
              key={section.key}
            >
              {Array.isArray(section.data) && (
                <SectionsListItemSublist
                  items={section.data}
                  selectItem={() => {}}
                  setItems={(items: SectionDataItem[]) =>
                    setSectionData(section.key, items)
                  }
                  addItem={(item: SectionDataItem) =>
                    addSectionDataItem(section.key, item)
                  }
                  removeItem={(itemId: string) =>
                    removeSectionDataItem(section.key, itemId)
                  }
                  toggleItemVisibility={(itemId: string, visible: boolean) =>
                    setSectionDataItemVisibility(section.key, itemId, visible)
                  }
                />
              )}
            </SectionsListItem>
          </SortableItem>
        ))}
      </SortableContent>
    </Sortable>
  );
}
