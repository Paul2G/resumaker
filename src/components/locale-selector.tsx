import type { Locale } from '@/constants/locales';

import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { setLocaleInDocument, setUserLocalePreference } from '@/lib/locales';
import { localeData, locales } from '@/constants/locales';

export function LocaleSelector() {
  const { i18n } = useTranslation();
  const [isOpen, setOpen] = useState(false);

  const selectedLocale = useMemo(
    () => locales.find((l) => localeData[l].langKey === i18n.language)!,
    [i18n.language],
  );

  async function selectLocale(locale: Locale) {
    await i18n.changeLanguage(locale);
    setUserLocalePreference(locale);
    setLocaleInDocument(locale);
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {localeData[selectedLocale].langLabel}
          <i className="ph ph-caret-down" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup
          value={selectedLocale}
          onValueChange={(value) =>
            selectLocale(locales.find((locale) => locale === value)!)
          }
        >
          {locales.map((l) => (
            <DropdownMenuRadioItem value={l} key={l}>
              {localeData[l].langLabel}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
