import { useEffect } from 'react';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { ResumesIndexProvider } from '@/context/resumes-indexes-provider';
import { ThemeProvider } from '@/context/theme-provider';
import { PrimaryHeader } from '@/components/primary-header';
import { Toaster } from '@/components/ui/sonner';
import { getUserLocalePreference, setLocaleInDocument } from '@/lib/locales';
import { loadAppData, saveAppData } from '@/repositories/resumes';

function RootLayout() {
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
        <div className="h-screen flex flex-col relative bg-background text-foreground">
          <PrimaryHeader />
          <Outlet />
        </div>
      </ResumesIndexProvider>
      <Toaster />
    </ThemeProvider>
  );
}

export const Route = createRootRoute({ component: RootLayout });
