import { GithubLogoIcon, GlobeIcon } from '@phosphor-icons/react';
import { Link, useMatch } from '@tanstack/react-router';

import { LocaleSelector } from '@/components/locale-selector';
import { ResumeSelector } from '@/components/resume-selector';
import { ThemeSelector } from '@/components/theme-selector';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';

export function PrimaryHeader() {
  const match = useMatch({ from: '/resumes/$resumeId', shouldThrow: false });

  return (
    <header className="bg-background top-0 z-50 w-full flex p-2 border border-b">
      <div className="flex gap-2">
        <Link to="/" className="flex items-center">
          <h1 className="my-auto text-xl font-bold uppercase italic px-4">
            Resumaker
          </h1>
        </Link>
        {match && <ResumeSelector />}
      </div>
      <div className="ml-auto flex gap-2 items-center">
        <ButtonGroup>
          <Button variant="outline" size="icon" asChild>
            <a
              href="https://paul2g.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GlobeIcon />
            </a>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <a
              href="https://github.com/Paul2G/resumaker"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubLogoIcon />
            </a>
          </Button>
        </ButtonGroup>
        <LocaleSelector />
        <ThemeSelector />
      </div>
    </header>
  );
}
