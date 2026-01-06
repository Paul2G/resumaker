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
import { useSidebarsContent } from '@/hooks/use-sidebars-content';
import { SectionKey } from '@/lib/types';

export function SecondarySidebar() {
  const { t } = useTranslation();
  const { selectedSectionKey, selectedItemId } = useSidebarsContent();

  function FormSelector() {
    if (selectedItemId) {
      switch (selectedSectionKey) {
        case SectionKey.Experience:
          return <ExperienceItemForm itemId={selectedItemId} />;
        case SectionKey.Education:
          return <EducationItemForm itemId={selectedItemId} />;
        case SectionKey.Projects:
          return <ProjectForm itemId={selectedItemId} />;
        case SectionKey.Certifications:
          return <CertificationForm itemId={selectedItemId} />;
        case SectionKey.Courses:
          return <CourseForm itemId={selectedItemId} />;
      }
    }

    switch (selectedSectionKey) {
      case SectionKey.ContactInfo:
        return <ContactInfoForm />;
      case SectionKey.Summary:
        return <SummaryForm />;
      case SectionKey.Skills:
        return <SkillsForm />;
      default:
        return <SecondarySidebarEmpty sectionKey={selectedSectionKey} />;
    }
  }

  return (
    <aside className="w-100 border-l p-4 overflow-y-auto">
      {selectedItemId && (
        <Typography variant="h4" className="mb-4">
          {t(`${selectedSectionKey}:item.title`)}
        </Typography>
      )}
      {selectedSectionKey && !selectedItemId && (
        <Typography variant="h4" className="mb-4">
          {t(`${selectedSectionKey}:title`)}
        </Typography>
      )}
      <FormSelector />
    </aside>
  );
}
