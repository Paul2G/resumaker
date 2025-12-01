import type { ProjectLocale } from '@/lib/locales';

import { useMemo, useState } from 'react';
import { TranslateIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  projectLocales,
  setLocaleInDocument,
  setUserLocalePreference,
} from '@/lib/locales';

export function LocaleSelector() {
  const { i18n } = useTranslation();
  const [isOpen, setOpen] = useState(false);

  const selectedLocale = useMemo(
    () => projectLocales.find((locale) => locale.language === i18n.language)!,
    [i18n.language],
  );

  async function selectLocale(locale: ProjectLocale) {
    await i18n.changeLanguage(locale.key);
    setUserLocalePreference(locale);
    setLocaleInDocument(locale);
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <TranslateIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup
          value={selectedLocale.key}
          onValueChange={(value) =>
            selectLocale(projectLocales.find((locale) => locale.key === value)!)
          }
        >
          {projectLocales.map((locale) => (
            <DropdownMenuRadioItem value={locale.key} key={locale.key}>
              {locale.languageLabel}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
