import type { ErrorComponentProps } from '@tanstack/react-router';

import {
  ArrowsCounterClockwiseIcon,
  CaretLeftIcon,
  HouseIcon,
  QuestionIcon,
  WarningCircleIcon,
} from '@phosphor-icons/react';
import { useCanGoBack, useRouter } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';

interface AppErrorComponentProps extends Partial<ErrorComponentProps> {
  title?: string;
  description?: string;
  isNotFound?: boolean;
}

export function AppErrorComponent({
  error,
  reset,
  title,
  description,
  isNotFound,
}: AppErrorComponentProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const canGoBack = useCanGoBack();

  const isDev = import.meta.env.DEV;

  // Content priority: Manual Prop -> Translated Generic Message
  const displayTitle =
    title ||
    (isNotFound ? t('errors.notFound.title') : t('errors.generic.title'));

  const displayDescription =
    description ||
    (isNotFound
      ? t('errors.notFound.description')
      : t('errors.generic.description'));

  return (
    <div className="grow flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
      <div className="bg-muted mb-6 flex h-20 w-20 items-center justify-center rounded-full">
        {isNotFound ? (
          <QuestionIcon
            className="text-muted-foreground h-10 w-10"
            weight="duotone"
          />
        ) : (
          <WarningCircleIcon
            className="h-10 w-10 text-destructive"
            weight="duotone"
          />
        )}
      </div>

      <Typography variant="h2" className="mb-2 border-none">
        {displayTitle}
      </Typography>

      <Typography variant="lead" className="max-w-[450px] mb-8">
        {displayDescription}
      </Typography>

      {/* Technical details (Technical strings are not translated) */}
      {!isNotFound && error && isDev && (
        <div className="bg-muted mb-8 w-full max-w-2xl overflow-auto rounded-md p-4 text-left font-mono text-xs">
          <Typography
            variant="inline-code"
            className="text-destructive whitespace-pre-wrap"
          >
            {JSON.stringify(error, null, 2)}
          </Typography>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-center gap-2">
        {canGoBack && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.history.back()}
          >
            <CaretLeftIcon className="h-4 w-4" weight="bold" />
          </Button>
        )}
        <Button variant="outline" onClick={() => router.navigate({ to: '/' })}>
          <HouseIcon className="h-4 w-4" weight="bold" />
          {t('actions.goHome')}
        </Button>
        {reset && (
          <Button variant="default" onClick={() => reset()}>
            <ArrowsCounterClockwiseIcon className="h-4 w-4" weight="bold" />
            {t('actions.retry')}
          </Button>
        )}
      </div>
    </div>
  );
}
