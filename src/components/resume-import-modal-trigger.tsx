import type { ImportResumeJson } from '@/types/resume';
import type { UseFormSetError } from 'react-hook-form';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ImportResumeFileForm } from '@/components/forms/import-resume-file-form';
import { ImportResumeJsonForm } from '@/components/forms/import-resume-json-form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import { useImportResume } from '@/hooks/resume-actions';

export function ResumeImportModalTrigger({
  children,
  asChild,
}: ResumeImportModalTriggerProps) {
  const { t } = useTranslation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { mutate: importResume, isPending } = useImportResume({
    onSuccess: () => setIsDialogOpen(false),
  });

  async function handleFileImport(file: File, setError: (msg: string) => void) {
    try {
      const text = await file.text();
      importResume(JSON.parse(text));
    } catch {
      setError(t('core:dialogs.importResume.errors.invalidJson'));
    }
  }

  function handleJsonImport(
    { json }: ImportResumeJson,
    setError: UseFormSetError<ImportResumeJson>,
  ) {
    try {
      importResume(JSON.parse(json));
    } catch {
      setError('json', {
        message: t('core:dialogs.importResume.errors.invalidJson'),
      });
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('core:dialogs.importResume.title')}</DialogTitle>
          <DialogDescription>
            {t('core:dialogs.importResume.description')}
          </DialogDescription>
        </DialogHeader>

        <ImportResumeFileForm onSave={handleFileImport} />

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Separator className="flex-1" />
          {t('dialogs.or')}
          <Separator className="flex-1" />
        </div>

        <ImportResumeJsonForm onSubmit={handleJsonImport}>
          {(isSubmitting) => (
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                disabled={isSubmitting || isPending}
                onClick={() => setIsDialogOpen(false)}
              >
                {t('core:dialogs.cancel')}
              </Button>
              <Button type="submit" disabled={isSubmitting || isPending}>
                {isPending && <Spinner />}
                {t('core:actions.importResume')}
              </Button>
            </DialogFooter>
          )}
        </ImportResumeJsonForm>
      </DialogContent>
    </Dialog>
  );
}

export type ResumeImportModalTriggerProps = {
  children: React.ReactNode;
  asChild?: boolean;
};
