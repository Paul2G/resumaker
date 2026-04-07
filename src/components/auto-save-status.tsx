import { FloppyDiskIcon, WarningIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { Spinner } from '@/components/ui/spinner';
import { useAutoSave } from '@/hooks/use-auto-save';
import { useResume } from '@/hooks/use-resume';

export function AutoSaveStatus() {
  const { t } = useTranslation();

  const { resume } = useResume();
  const { isPending, isError } = useAutoSave(resume);

  const className = `absolute left-2 top-2 flex items-center gap-1 text-sm text-foreground/70 font-medium`;

  switch (true) {
    case isPending:
      return (
        <span className={className}>
          <Spinner className="size-4 animate-spin" />
          {t('dialogs.saving')}
        </span>
      );
    case isError:
      return (
        <span className={className}>
          <WarningIcon className="size-4" />
          {t('dialogs.saveFailed')}
        </span>
      );
    default:
      return (
        <span className={className}>
          <FloppyDiskIcon className="size-4" />
          {t('dialogs.savedLocally')}
        </span>
      );
  }
}
