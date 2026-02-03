import { useRef } from 'react';
import { PrinterIcon } from '@phosphor-icons/react';

import { ResumePreview } from '@/components/resume/resume-preview';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useResume } from '@/hooks/use-resume';

export function ResumeViewer({ ...props }: ResumeViewerProps) {
  const resume = useResume();

  const previewRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  function printDocument() {
    const pageTitle = document.title;
    document.title = resume.config.name;
    window.print();
    document.title = pageTitle;
  }

  return (
    <div
      id="preview-container"
      className="relative h-full"
      ref={containerRef}
      {...props}
    >
      <ScrollArea className="h-full">
        <div className="overflow-hidden flex justify-center h-full p-8">
          <ResumePreview
            resume={resume}
            className="origin-top"
            ref={previewRef}
          />
        </div>
      </ScrollArea>
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <Button size="icon" onClick={printDocument}>
          <PrinterIcon weight="light" className="size-6" />
        </Button>
      </div>
    </div>
  );
}

export type ResumeViewerProps = Omit<React.ComponentProps<'div'>, 'ref'> & {};
