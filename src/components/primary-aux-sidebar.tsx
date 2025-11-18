import { GearIcon, RowsPlusBottomIcon } from '@phosphor-icons/react';

import { Button } from '@/components/ui/button';

export function PrimaryAuxSidebar() {
  return (
    <div className="flex flex-col gap-2 p-2 border-e">
      <Button variant="secondary" size="icon">
        <RowsPlusBottomIcon />
      </Button>
      <Button variant="ghost" size="icon">
        <GearIcon />
      </Button>
    </div>
  );
}
