import { LocaleSelector } from '@/components/locale-selector';

import { ThemeSelector } from './theme-selector';

export function PrimaryHeader() {
  return (
    <header className="bg-background top-0 z-50 w-full flex p-2 border border-b">
      <h1 className="my-auto text-xl font-bold uppercase italic px-4">
        Resume Maker
      </h1>
      <div className="ml-auto flex gap-2 items-center">
        <LocaleSelector />
        <ThemeSelector />
      </div>
    </header>
  );
}
