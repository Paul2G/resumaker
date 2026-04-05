import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { DatesForm } from '@/components/forms/config/dates-form';
import { GeneralForm } from '@/components/forms/config/general-form';
import { SheetFormatForm } from '@/components/forms/config/sheet-format-form';
import { SpacingForm } from '@/components/forms/config/spacing-form';
import { TypographyForm } from '@/components/forms/config/typography-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Typography } from '@/components/ui/typography';
import { onMutationError, onMutationSuccess } from '@/lib/mutation-toast';
import { isValueOf } from '@/lib/utils';
import {
  resumeQueryOptions,
  resumeUpdateMutationOptions,
} from '@/api/query-options';
import { SettingsCategory } from '@/constants/settings';

const CategoryForms = {
  [SettingsCategory.General]: GeneralForm,
  [SettingsCategory.SheetFormat]: SheetFormatForm,
  [SettingsCategory.Typography]: TypographyForm,
  [SettingsCategory.Spacing]: SpacingForm,
  [SettingsCategory.Dates]: DatesForm,
} as const;

export function SidebarSettingsForms() {
  const { t } = useTranslation();

  const queryClient = useQueryClient();
  const { resumeId, settingsCategory } = useParams({
    from: '/resumes/$resumeId/settings/{-$settingsCategory}',
  });
  const { data: resume } = useSuspenseQuery(resumeQueryOptions(resumeId));
  const { mutate: updateResume, isPending } = useMutation({
    ...resumeUpdateMutationOptions(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
      queryClient.invalidateQueries({ queryKey: ['resume', resumeId] });
      onMutationSuccess(t)();
    },
    onError: onMutationError(t),
  });

  const isCategoryValid = isValueOf(SettingsCategory)(settingsCategory);

  function FormSelector() {
    if (!isCategoryValid)
      return (
        <>
          <Typography variant="h4" className="mb-4">
            Select a category.
          </Typography>
          <Typography variant="p">Nothing here yet.</Typography>
        </>
      );

    const CategoryForm = CategoryForms[settingsCategory];

    return (
      <>
        <Typography variant="h4" className="mb-4">
          {t(`resume:settings.${settingsCategory}`)}
        </Typography>
        <CategoryForm
          isLoading={isPending}
          defaultValues={resume.config}
          onSave={(values) =>
            updateResume({
              ...resume,
              config: { ...resume.config, ...values },
            })
          }
        />
      </>
    );
  }

  return (
    <aside className="order-4 w-100 overflow-y-hidden shrink-0 border-r">
      <ScrollArea className="h-full p-4">
        <FormSelector />
      </ScrollArea>
    </aside>
  );
}
