import { ResumePreview } from '@/components/resume-preview';
import { ScrollArea } from '@/components/ui/scroll-area';

export function MainArea() {
  return (
    <main className="grow overflow-hidden">
      <ScrollArea className="h-full">
        <ResumePreview />
      </ScrollArea>
    </main>
  );
}
