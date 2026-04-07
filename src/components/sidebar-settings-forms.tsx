import type { ResumeConfig } from '@/types';

import { useParams } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { DatesForm } from '@/components/forms/config/dates-form';
import { GeneralForm } from '@/components/forms/config/general-form';
import { SheetFormatForm } from '@/components/forms/config/sheet-format-form';
import { SpacingForm } from '@/components/forms/config/spacing-form';
import { TypographyForm } from '@/components/forms/config/typography-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Typography } from '@/components/ui/typography';
import { useResume } from '@/hooks/use-resume';
import { SettingsCategory } from '@/constants/settings';

const CategoryForms = {
  [SettingsCategory.General]: GeneralForm,
  [SettingsCategory.SheetFormat]: SheetFormatForm,
  [SettingsCategory.Typography]: TypographyForm,
  [SettingsCategory.Spacing]: SpacingForm,
  [SettingsCategory.Dates]: DatesForm,
} as const;

export function SidebarSettingsForms() {
  const { resume, setConfig } = useResume();

  const { settingsCategory } = useParams({
    from: '/resumes/$resumeId/settings/{-$settingsCategory}',
  });

  return (
    <aside className="order-4 w-100 overflow-y-hidden shrink-0 border-r">
      <ScrollArea className="h-full p-4">
        <FormSelector
          settingsCategory={settingsCategory as SettingsCategory}
          currentConfig={resume.config}
          setConfig={setConfig}
        />
      </ScrollArea>
    </aside>
  );
}

function FormSelector({
  settingsCategory,
  currentConfig,
  setConfig,
}: FormSelectorProps) {
  const { t } = useTranslation();

  const CategoryForm = CategoryForms[settingsCategory];

  return (
    <>
      <Typography variant="h4" className="mb-4">
        {t(`resume:settings.${settingsCategory}`)}
      </Typography>
      <CategoryForm
        key={settingsCategory}
        defaultValues={currentConfig}
        onSave={(values) => setConfig(values)}
      />
    </>
  );
}

type FormSelectorProps = {
  settingsCategory: SettingsCategory;
  currentConfig: ResumeConfig;
  setConfig: (config: Partial<ResumeConfig>) => Promise<void>;
};
