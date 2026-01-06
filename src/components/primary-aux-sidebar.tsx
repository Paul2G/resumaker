import type { Icon } from '@phosphor-icons/react';

import { GearIcon, RowsPlusBottomIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { AuxSidebarOption } from '@/context/sidebars-content-provider';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useSidebarsContent } from '@/hooks/use-sidebars-content';

const OptionIconMap: Record<AuxSidebarOption, Icon> = {
  [AuxSidebarOption.Sections]: RowsPlusBottomIcon,
  [AuxSidebarOption.DocumentSettings]: GearIcon,
};

export function PrimaryAuxSidebar() {
  const { t } = useTranslation();
  const { selectedAuxSidebarOption, setAuxSidebarOption } =
    useSidebarsContent();

  return (
    <div className="flex flex-col gap-2 p-2 border-e">
      {Object.values(AuxSidebarOption).map((option) => {
        const IconComponent = OptionIconMap[option];

        return (
          <Tooltip key={option}>
            <TooltipTrigger asChild>
              <Button
                variant={
                  option === selectedAuxSidebarOption ? 'secondary' : 'ghost'
                }
                size="icon"
                onClick={() => setAuxSidebarOption(option)}
              >
                <IconComponent className="size-4.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{t(option)}</p>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}
