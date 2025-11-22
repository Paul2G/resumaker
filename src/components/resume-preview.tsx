import { ResumeContactInfo } from '@/components/resume-contact-info';
import { ResumeSummary } from '@/components/resume-summary';
import { useResume } from '@/hooks/use-resume';
import { StaticSectionKey } from '@/lib/types';

export function ResumePreview() {
  const { sections } = useResume();

  return (
    <div className="font-[Times_New_Roman] text-black/70 p-4">
      <div
        id="sheet-1"
        className="bg-white max-w-full w-[50rem] aspect-[17/22] mx-auto flex flex-col gap-2 shadow-md border py-16 px-12"
      >
        {sections.map(({ key, data, visible }) => {
          if (!visible) return null;

          if (key === StaticSectionKey.ContactInfo) {
            return <ResumeContactInfo contactInfo={data} key={key} />;
          }

          if (key === StaticSectionKey.Summary)
            return <ResumeSummary summary={data} key={key} />;
        })}
      </div>
    </div>
  );
}
