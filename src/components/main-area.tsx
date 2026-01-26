import { ResumeViewer } from '@/components/resume-viewer';

export function MainArea() {
  return (
    <main className="order-3 grow overflow-hidden bg-foreground/10">
      <ResumeViewer />
    </main>
  );
}
