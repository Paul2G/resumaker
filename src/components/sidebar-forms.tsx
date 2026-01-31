import { useParams } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { CertificationForm } from '@/components/forms/certification-form';
import { ContactInfoForm } from '@/components/forms/contact-info-form';
import { CourseForm } from '@/components/forms/course-form';
import { EducationItemForm } from '@/components/forms/education-item-form';
import { ExperienceItemForm } from '@/components/forms/experience-item-form';
import { ProjectForm } from '@/components/forms/project-form';
import { SkillsForm } from '@/components/forms/skills-form';
import { SummaryForm } from '@/components/forms/summary-form';
import { SecondarySidebarEmpty } from '@/components/secondary-sidebar-empty';
import { Typography } from '@/components/ui/typography';
import { useResume } from '@/hooks/use-resume';
import { isValueOf } from '@/lib/utils';
import { IterableSectionKey, SectionKey, StaticSectionKey } from '@/types';

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
};

export function SidebarForms() {
  const { t } = useTranslation();
  const {
    getSectionData,
    setSectionData,
    getSectionDataItem,
    updateSectionDataItem,
  } = useResume();

  const { sectionKey: selectedSectionKey, itemId: selectedItemId } = useParams({
    from: '/$resumeId/sections/{-$sectionKey}/{-$itemId}',
  });

  const isSectionKeyValid = isValueOf(SectionKey)(selectedSectionKey);
  const isIterableSection = isValueOf(IterableSectionKey)(selectedSectionKey);

  function FormSelector() {
    if (!isSectionKeyValid) return <SecondarySidebarEmpty />;

    if (isIterableSection) {
      const item = getSectionDataItem(selectedSectionKey, selectedItemId);
      if (!item)
        return <SecondarySidebarEmpty sectionKey={selectedSectionKey} />;

      const ItemForm = ItemForms[selectedSectionKey];
      return (
        <>
          <Typography variant="h4" className="mb-4">
            {t(`${selectedSectionKey}:item.title`)}
          </Typography>
          <ItemForm
            defaultValues={item}
            onSave={(values) =>
              updateSectionDataItem(selectedSectionKey, values)
            }
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
          // @ts-ignore an issue inferring type
          defaultValues={data}
          onSave={(values) => setSectionData(selectedSectionKey, values)}
        />
      </>
    );
  }

  return (
    <aside className="order-4 w-100 shrink-0 border-l p-4 overflow-y-auto">
      <FormSelector />
    </aside>
  );
}
