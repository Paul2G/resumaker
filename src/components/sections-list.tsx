import type { ResumeSection, SectionKey } from '@/lib/types';
import type { Icon } from '@phosphor-icons/react';

import {
  AddressBookIcon,
  ArchiveIcon,
  ArticleMediumIcon,
  BookBookmarkIcon,
  BooksIcon,
  BriefcaseIcon,
  CertificateIcon,
  FolderIcon,
  GraduationCapIcon,
  LightbulbIcon,
  MedalIcon,
  NewspaperClippingIcon,
  PlusIcon,
  ScrollIcon,
} from '@phosphor-icons/react';

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

const SectionIcon: Record<SectionKey, Icon> = {
  contactInfo: AddressBookIcon,
  summary: ArticleMediumIcon,
  experience: BriefcaseIcon,
  education: GraduationCapIcon,
  projects: ArchiveIcon,
  certifications: CertificateIcon,
  courses: BooksIcon,
  skills: LightbulbIcon,
} as const;

const SectionItemIcon: Record<IterableSectionKey, Icon> = {
  experience: NewspaperClippingIcon,
  education: ScrollIcon,
  projects: FolderIcon,
  certifications: MedalIcon,
  courses: BookBookmarkIcon,
} as const;

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

  function getSectionTitle(section: ResumeSection) {
    return <b className="font-semibold">{titles[section.key]}</b>;
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
    return SectionIcon[section.key];
  }

  function getItemIcon(sectionKey: IterableSectionKey) {
    return SectionItemIcon[sectionKey];
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
              Add new
            </Button>
          </>
        )
      }
    </SortableTreeList>
  );
}
