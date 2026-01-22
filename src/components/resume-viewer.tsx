import { useEffect, useRef } from 'react';
import { PrinterIcon } from '@phosphor-icons/react';

import { ResumePreview } from '@/components/resume/resume-preview';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

export function ResumeViewer({ ...props }: ResumeViewerProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // function saveDocument() {
  //   const doc = new jsPDF({
  //     format: 'letter',
  //     unit: 'in',
  //     orientation: 'portrait',
  //     putOnlyUsedFonts: true,
  //   });
  //   if (previewRef.current) {
  //     const $resume = previewRef.current.cloneNode(true) as HTMLDivElement;
  //     $resume?.style.removeProperty('transform');
  //
  //     doc.html($resume, {
  //       callback: function (doc) {
  //         doc.save('resume.pdf');
  //       },
  //       margin: 0,
  //       html2canvas: {
  //         scale: 1 / 96, // 1/96in
  //       },
  //     });
  //   }
  // }

  function printDocument() {
    window.print();
  }

  useEffect(() => {
    if (containerRef.current && previewRef.current) {
      new ResizeObserver(() => {
        const containerWidth = containerRef.current?.offsetWidth || 1;
        const previewWidth = previewRef.current?.offsetWidth || 0;

        if (previewWidth > containerWidth) {
          const scale = containerWidth / previewWidth;
          previewRef.current!.style.transform = `scale(${scale})`;
        }
      }).observe(containerRef.current);
    }
  }, [containerRef, previewRef]);

  return (
    <div
      id="preview-container"
      className="relative h-full"
      ref={containerRef}
      {...props}
    >
      <ScrollArea className="h-full">
        <div className="overflow-hidden flex justify-center h-full p-8">
          <ResumePreview className="origin-top" ref={previewRef} />
        </div>
      </ScrollArea>
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <Button size="icon" onClick={printDocument}>
          <PrinterIcon weight="light" className="size-6" />
        </Button>
        {/*<Button size="icon" onClick={saveDocument}>*/}
        {/*  <FloppyDiskIcon weight="light" className="size-6" />*/}
        {/*</Button>*/}
      </div>
    </div>
  );
}

export type ResumeViewerProps = Omit<React.ComponentProps<'div'>, 'ref'> & {};
