import { Link, useLocation } from '@tanstack/react-router';

import { LocaleSelector } from '@/components/locale-selector';
import { ResumeSelector } from '@/components/resume-selector';
import { ThemeSelector } from '@/components/theme-selector';

export function PrimaryHeader() {
  const location = useLocation();

  return (
    <header className="bg-background top-0 z-50 w-full flex p-2 border border-b">
      <div className="flex gap-2">
        <Link to="/" className="flex items-center">
          <h1 className="my-auto text-xl font-bold uppercase italic px-4">
            Resumaker
          </h1>
        </Link>
        {location.pathname !== '/' && <ResumeSelector />}
      </div>
      <div className="ml-auto flex gap-2 items-center">
        <LocaleSelector />
        <ThemeSelector />
      </div>
    </header>
  );
}
