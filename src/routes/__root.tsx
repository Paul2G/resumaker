import type { QueryClient } from '@tanstack/react-query';

import { useEffect } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { useTranslation } from 'react-i18next';

import { Toaster } from '@/components/ui/sonner';
import { getUserLocalePreference, setLocaleInDocument } from '@/lib/locales';

type RootRouteContext = {
  queryClient: QueryClient;
  i18n: ReturnType<typeof useTranslation>['i18n'];
};

export const Route = createRootRouteWithContext<RootRouteContext>()({
  component: RootLayout,
});

function RootLayout() {
  const { i18n } = useTranslation();

  const loadedLocale = getUserLocalePreference();

  useEffect(() => {
    i18n.changeLanguage(loadedLocale).then();
    setLocaleInDocument(loadedLocale);
  }, []);

  return (
    <>
      <Outlet />
      <Toaster />
      <ReactQueryDevtools buttonPosition="bottom-left" />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
