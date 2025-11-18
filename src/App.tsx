import { ResumeProvider } from '@/context/resume-provider';
import { ThemeProvider } from '@/context/theme-provider';
import { MainArea } from '@/components/main-area';
import { PrimaryAuxSidebar } from '@/components/primary-aux-sidebar';
import { PrimaryHeader } from '@/components/primary-header';
import { PrimarySidebar } from '@/components/primary-sidebar';
import { SecondarySidebar } from '@/components/secondary-sidebar';
import {
  loadResumeFromLocalStorage,
  saveResumeOnLocalStorage,
} from '@/lib/utils';

function App() {
  const loadedResume = loadResumeFromLocalStorage();

  return (
    <ThemeProvider>
      <ResumeProvider
        currentResume={loadedResume}
        onSave={saveResumeOnLocalStorage}
      >
        <div className="h-screen flex flex-col relative bg-background text-foreground">
          <PrimaryHeader />
          <div className="overflow-hidden grow flex items-streetch">
            <PrimaryAuxSidebar />
            <PrimarySidebar />
            <MainArea />
            <SecondarySidebar />
          </div>
        </div>
      </ResumeProvider>
    </ThemeProvider>
  );
}

export default App;
