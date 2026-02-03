import { GearIcon, RowsPlusBottomIcon } from '@phosphor-icons/react';
import { Link, useLocation } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function SidebarAuxiliar() {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <div className="order-1 flex flex-col gap-2 p-2 border-e">
      <Tooltip>
        <TooltipTrigger asChild>
          {/* @ts-ignore */}
          <Link to="/$resumeId/sections">
            <Button
              size="icon"
              variant={
                location.pathname.includes('/sections') ? 'secondary' : 'ghost'
              }
            >
              <RowsPlusBottomIcon className="size-4.5" />
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{t('sections')}</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          {/* @ts-ignore */}
          <Link to="/$resumeId/settings">
            <Button
              size="icon"
              variant={
                location.pathname.includes('/settings') ? 'secondary' : 'ghost'
              }
            >
              <GearIcon className="size-4.5" />
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{t('documentSettings')}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
