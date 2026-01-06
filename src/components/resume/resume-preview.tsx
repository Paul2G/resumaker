import { ResumePreviewContactInfo } from '@/components/resume/resume-preview-contact-info';
import { ResumePreviewSummary } from '@/components/resume/resume-preview-summary';
import { useResume } from '@/hooks/use-resume';
import { SectionKey } from '@/lib/types';

export function ResumePreview() {
  const { sections } = useResume();

  return (
    <div className="font-[Times_New_Roman] text-black/70 p-4">
      <div
        id="sheet-1"
        className="bg-white max-w-full w-[50rem] aspect-[17/22] mx-auto flex flex-col gap-2 shadow-md border py-16 px-12"
      >
        <pre className="text-xs">{JSON.stringify(sections, null, 2)}</pre>
        {sections.map(({ key, data, visible }) => {
          if (!visible) return null;

          switch (key) {
            case SectionKey.ContactInfo:
              return <ResumePreviewContactInfo data={data} key={key} />;
            case SectionKey.Summary:
              return <ResumePreviewSummary data={data} key={key} />;
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}
