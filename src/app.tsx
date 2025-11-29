import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { ResumeProvider } from '@/context/resume-provider';
import { SecondarySidebarProvider } from '@/context/secondary-sidebar-provider';
import { ThemeProvider } from '@/context/theme-provider';
import { MainArea } from '@/components/main-area';
import { PrimaryAuxSidebar } from '@/components/primary-aux-sidebar';
import { PrimaryHeader } from '@/components/primary-header';
import { PrimarySidebar } from '@/components/primary-sidebar';
import { SecondarySidebar } from '@/components/secondary-sidebar';
import { getUserLocalePreference, setLocaleInDocument } from '@/lib/locales';
import {
  loadResumeFromLocalStorage,
  saveResumeOnLocalStorage,
} from '@/lib/utils';

function App() {
  const { i18n } = useTranslation();

  const loadedResume = loadResumeFromLocalStorage();
  const loadedLocale = getUserLocalePreference();

  useEffect(() => {
    i18n.changeLanguage(loadedLocale.language).then();
    setLocaleInDocument(loadedLocale);
  }, []);

  return (
    <ThemeProvider>
      <ResumeProvider
        currentResume={loadedResume}
        onSave={saveResumeOnLocalStorage}
      >
        <SecondarySidebarProvider>
          <div className="h-screen flex flex-col relative bg-background text-foreground">
            <PrimaryHeader />
            <div className="overflow-hidden grow flex items-streetch">
              <PrimaryAuxSidebar />
              <PrimarySidebar />
              <MainArea />
              <SecondarySidebar />
            </div>
          </div>
        </SecondarySidebarProvider>
      </ResumeProvider>
    </ThemeProvider>
  );
}

export default App;
