import { useParams } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { CertificationForm } from '@/components/forms/sections/certification-form';
import { ContactInfoForm } from '@/components/forms/sections/contact-info-form';
import { CourseForm } from '@/components/forms/sections/course-form';
import { EducationItemForm } from '@/components/forms/sections/education-item-form';
import { ExperienceItemForm } from '@/components/forms/sections/experience-item-form';
import { ProjectForm } from '@/components/forms/sections/project-form';
import { SkillsForm } from '@/components/forms/sections/skills-form';
import { SummaryForm } from '@/components/forms/sections/summary-form';
import { SecondarySidebarEmpty } from '@/components/secondary-sidebar-empty';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Typography } from '@/components/ui/typography';
import { useResume } from '@/hooks/use-resume';
import { cn, isValueOf } from '@/lib/utils';
import {
  IterableSectionKey,
  SectionKey,
  StaticSectionKey,
} from '@/constants/sections';

const ItemForms = {
  [IterableSectionKey.Experience]: ExperienceItemForm,
  [IterableSectionKey.Education]: EducationItemForm,
  [IterableSectionKey.Projects]: ProjectForm,
  [IterableSectionKey.Certifications]: CertificationForm,
  [IterableSectionKey.Courses]: CourseForm,
} as const;

const SectionForms = {
  [StaticSectionKey.ContactInfo]: ContactInfoForm,
  [StaticSectionKey.Summary]: SummaryForm,
  [StaticSectionKey.Skills]: SkillsForm,
} as const;

export function SidebarSectionsForms({
  className,
  ...restOfProps
}: React.ComponentProps<'aside'>) {
  const {
    getSectionData,
    setSectionData,
    getSectionDataItem,
    updateSectionDataItem,
  } = useResume();

  const { sectionKey: selectedSectionKey, itemId: selectedItemId } = useParams({
    from: '/resumes/$resumeId/sections/{-$sectionKey}/{-$itemId}',
  });

  return (
    <aside
      className={cn(
        'order-4 w-100 overflow-y-hidden shrink-0 border-r bg-background',
        className,
      )}
      {...restOfProps}
    >
      <ScrollArea className="h-full p-4">
        <FormSelector
          selectedSectionKey={selectedSectionKey}
          selectedItemId={selectedItemId}
          getSectionData={getSectionData}
          setSectionData={setSectionData}
          getSectionDataItem={getSectionDataItem}
          updateSectionDataItem={updateSectionDataItem}
        />
      </ScrollArea>
    </aside>
  );
}

function FormSelector({
  selectedSectionKey,
  selectedItemId,
  getSectionData,
  setSectionData,
  getSectionDataItem,
  updateSectionDataItem,
}: FormSelectorProps) {
  const { t } = useTranslation();

  if (!isValueOf(SectionKey)(selectedSectionKey))
    return <SecondarySidebarEmpty />;

  if (isValueOf(IterableSectionKey)(selectedSectionKey)) {
    const item = getSectionDataItem(selectedSectionKey, selectedItemId!);
    if (!item) return <SecondarySidebarEmpty sectionKey={selectedSectionKey} />;

    const ItemForm = ItemForms[selectedSectionKey];
    return (
      <>
        <Typography variant="h4" className="mb-4">
          {t(`${selectedSectionKey}:item.title`)}
        </Typography>
        <ItemForm
          defaultValues={item}
          onSave={(values) => updateSectionDataItem(selectedSectionKey, values)}
        />
      </>
    );
  }

  const data = getSectionData(selectedSectionKey);
  const SectionForm = SectionForms[selectedSectionKey];
  return (
    <>
      <Typography variant="h4" className="mb-4">
        {t(`${selectedSectionKey}:title`)}
      </Typography>
      <SectionForm
        // @ts-ignore
        defaultValues={data}
        onSave={(values) => setSectionData(selectedSectionKey, values)}
      />
    </>
  );
}

type FormSelectorProps = {
  selectedSectionKey?: string;
  selectedItemId?: string;
  getSectionData: (sectionKey: StaticSectionKey) => any;
  setSectionData: (sectionKey: StaticSectionKey, data: any) => void;
  getSectionDataItem: (
    sectionKey: IterableSectionKey,
    itemId: string,
  ) => any | undefined;
  updateSectionDataItem: (sectionKey: IterableSectionKey, values: any) => void;
};
