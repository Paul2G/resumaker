import type { ProjectLocale } from '@/lib/locales';

import { useMemo, useState } from 'react';
import { CaretDownIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  projectLocales,
  setLocaleInDocument,
  setUserLocalePreference,
} from '@/lib/locales';
import { cn } from '@/lib/utils';

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
        <Button variant="outline">
          <span>{selectedLocale.languageLabel}</span>
          <CaretDownIcon
            weight="bold"
            className={cn('transition-transform', isOpen && 'rotate-180')}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {projectLocales.map((locale) => (
          <DropdownMenuItem
            key={locale.key}
            onClick={() => selectLocale(locale)}
          >
            {locale.languageLabel}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
