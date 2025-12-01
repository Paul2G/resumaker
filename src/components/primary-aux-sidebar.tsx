import { GearIcon, RowsPlusBottomIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function PrimaryAuxSidebar() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-2 p-2 border-e">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="secondary" size="icon">
            <RowsPlusBottomIcon className="size-4.5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{t('sections')}</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon">
            <GearIcon className="size-4.5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{t('documentSettings')}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
