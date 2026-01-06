import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { ResumeProvider } from '@/context/resume-provider';
import { ResumesIndexProvider } from '@/context/resumes-indexes-provider';
import { SidebarsContentProvider } from '@/context/sidebars-content-provider';
import { ThemeProvider } from '@/context/theme-provider';
import { MainArea } from '@/components/main-area';
import { PrimaryAuxSidebar } from '@/components/primary-aux-sidebar';
import { PrimaryHeader } from '@/components/primary-header';
import { PrimarySidebar } from '@/components/primary-sidebar';
import { SecondarySidebar } from '@/components/secondary-sidebar';
import { getUserLocalePreference, setLocaleInDocument } from '@/lib/locales';
import { loadAppData, saveAppData } from '@/repositories/resumes';

function App() {
  const { i18n } = useTranslation();

  const loadedLocale = getUserLocalePreference();
  const loadedAppData = loadAppData();

  useEffect(() => {
    i18n.changeLanguage(loadedLocale.language).then();
    setLocaleInDocument(loadedLocale);
  }, []);

  return (
    <ThemeProvider>
      <ResumesIndexProvider appData={loadedAppData} onSaveAppData={saveAppData}>
        {({ selectedResume, updateResume }) => {
          const isResumeSelected = !!selectedResume;

          return (
            <div className="h-screen flex flex-col relative bg-background text-foreground">
              <PrimaryHeader />
              {isResumeSelected && (
                <ResumeProvider
                  currentResume={selectedResume}
                  onSave={updateResume}
                >
                  <SidebarsContentProvider>
                    <div className="overflow-hidden grow flex items-streetch">
                      <PrimaryAuxSidebar />
                      <PrimarySidebar />
                      <MainArea />
                      <SecondarySidebar />
                    </div>
                  </SidebarsContentProvider>
                </ResumeProvider>
              )}
            </div>
          );
        }}
      </ResumesIndexProvider>
    </ThemeProvider>
  );
}

export default App;
