import { ContactInfoForm } from '@/components/forms/contact-info-form';
import { ExperienceItemForm } from '@/components/forms/experience-item-form';
import { SummaryForm } from '@/components/forms/summary-form';
import { useSecondarySidebar } from '@/hooks/use-secondary-sidebar';
import { SectionKey } from '@/lib/types';

export function SecondarySidebar() {
  const { selectedSectionKey, selectedItemId } = useSecondarySidebar();

  function FormSelector() {
    switch (selectedSectionKey) {
      case SectionKey.ContactInfo:
        return <ContactInfoForm />;
      case SectionKey.Summary:
        return <SummaryForm />;
      case SectionKey.Experience:
        if (!selectedItemId) return <span>Experience section</span>;

        return <ExperienceItemForm itemId={selectedItemId} />;
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
