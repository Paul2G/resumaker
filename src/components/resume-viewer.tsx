import { useRef } from 'react';
import { FileArrowDownIcon, PrinterIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { ResumePreview } from '@/components/resume/resume-preview';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useResume } from '@/hooks/use-resume';

export function ResumeViewer({ ...props }: ResumeViewerProps) {
  const { t } = useTranslation();

  const { resume } = useResume();

  const previewRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  function printDocument() {
    const pageTitle = document.title;
    document.title = resume.config.name;
    window.print();
    document.title = pageTitle;
  }

  function downloadJSON() {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(resume));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', `${resume.config.name}.json`);
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
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
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              aria-label={t('actions.downloadJson')}
              size="icon-lg"
              onClick={downloadJSON}
            >
              <FileArrowDownIcon weight="light" className="size-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            {t('actions.downloadJson')}
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              aria-label={t('actions.print')}
              size="icon-lg"
              onClick={printDocument}
            >
              <PrinterIcon weight="light" className="size-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">{t('actions.print')} </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}

export type ResumeViewerProps = Omit<React.ComponentProps<'div'>, 'ref'> & {};
