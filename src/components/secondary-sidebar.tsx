import { CertificationForm } from '@/components/forms/certification-form';
import { ContactInfoForm } from '@/components/forms/contact-info-form';
import { CourseForm } from '@/components/forms/course-form';
import { EducationItemForm } from '@/components/forms/education-item-form';
import { ExperienceItemForm } from '@/components/forms/experience-item-form';
import { ProjectForm } from '@/components/forms/project-form';
import { SummaryForm } from '@/components/forms/summary-form';
import { useSecondarySidebar } from '@/hooks/use-secondary-sidebar';
import { SectionKey } from '@/lib/types';

export function SecondarySidebar() {
  const { selectedSectionKey, selectedItemId } = useSecondarySidebar();

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
      case SectionKey.Experience:
        return <span>Experience section</span>;
      case SectionKey.Education:
        return <span>Education section</span>;
      default:
        return <span>Nothing to see here</span>;
    }
  }

  return (
    <aside className="w-100 border-l p-4 overflow-y-auto">
      {<FormSelector />}
    </aside>
  );
}
