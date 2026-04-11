import { useRef } from 'react';
import { BracketsCurlyIcon, PrinterIcon } from '@phosphor-icons/react';
import { createPortal } from 'react-dom';
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
    const margin = `${resume.config.margin}mm`;

    // Inject a <style> tag that:
    const style = document.createElement('style');
    style.id = 'resume-print-margin-override';
    style.textContent = `
    @media print {
      @page { 
        margin: ${margin} !important; 
        size: ${resume.config.paperSize === 'a4' ? '210mm 297mm' : '8.5in 11in'} !important;
      }
    }
  `;
    document.head.appendChild(style);

    const pageTitle = document.title;
    document.title = resume.config.name;

    const cleanup = () => {
      document.title = pageTitle;
      document.getElementById('resume-print-margin-override')?.remove();
      window.removeEventListener('afterprint', cleanup);
    };
    window.addEventListener('afterprint', cleanup);

    window.print();
  }

  function downloadJSON() {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(resume));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', `${resume.config.name}.json`);
    document.body.appendChild(downloadAnchorNode);
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
      {/* ── Visible preview ─────────────────────────────────────────── */}
      <ScrollArea className="h-full">
        <div className="flex justify-center h-full py-12 px-8">
          <ResumePreview
            resume={resume}
            className="origin-top"
            ref={previewRef}
          />
        </div>
      </ScrollArea>

      {/* ── FAB buttons ─────────────────────────────────────────────── */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              aria-label={t('actions.downloadJson')}
              size="icon-lg"
              onClick={downloadJSON}
            >
              <BracketsCurlyIcon weight="light" className="size-6" />
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
          <TooltipContent side="left">{t('actions.print')}</TooltipContent>
        </Tooltip>
      </div>

      {/*
       * ── Print portal ───────────────────────────────────────────────
       * Direct <body> child — zero clipping ancestors.
       * Hidden on screen, shown exclusively during print.
       */}
      {createPortal(
        <div id="resume-print-portal">
          <ResumePreview resume={resume} />
        </div>,
        document.body,
      )}
    </div>
  );
}

export type ResumeViewerProps = Omit<React.ComponentProps<'div'>, 'ref'> & {};
