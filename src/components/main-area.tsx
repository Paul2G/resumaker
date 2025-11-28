import { ResumePreview } from '@/components/resume/resume-preview';
import { ScrollArea } from '@/components/ui/scroll-area';

export function MainArea() {
  return (
    <main className="grow overflow-hidden bg-foreground/10">
      <ScrollArea className="h-full">
        <ResumePreview />
      </ScrollArea>
    </main>
  );
}
