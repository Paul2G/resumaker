import { AutoSaveStatus } from '@/components/auto-save-status';
import { ResumeViewer } from '@/components/resume-viewer';

export function MainArea() {
  return (
    <main className="relative order-3 grow overflow-hidden bg-foreground/10">
      <AutoSaveStatus />
      <ResumeViewer />
    </main>
  );
}
