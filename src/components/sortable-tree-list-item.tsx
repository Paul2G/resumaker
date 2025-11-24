import { useState } from 'react';
import {
  CaretRightIcon,
  DotsSixVerticalIcon,
  EyeIcon,
  EyeSlashIcon,
  TrashIcon,
} from '@phosphor-icons/react';

import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { SortableItemHandle } from '@/components/ui/sortable';
import { cn } from '@/lib/utils';

export function SortableTreeListItem({
  title,
  visible,
  hasChildren,
  children,
  onRemove,
  onSelect,
  onToggleVisibility,
}: SectionsListItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div
        className={cn(
          'relative group h-8 w-full flex items-center rounded-md gap-1.5 px-1',
          'text-sm font-medium ',
          'transition-all hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        )}
      >
        <button
          className="cursor-pointer absolute inset-0 z-1"
          onClick={onSelect}
        />
        <div className="flex z-2">
          <CollapsibleTrigger disabled={!hasChildren} asChild>
            <Button
              variant="ghost"
              size="icon-xs"
              className={cn(!hasChildren && '!opacity-0')}
            >
              <CaretRightIcon
                className={cn('size-3 transition-all', isOpen && 'rotate-90')}
              />
            </Button>
          </CollapsibleTrigger>
          <SortableItemHandle asChild>
            <Button variant="ghost" size="icon-xs">
              <DotsSixVerticalIcon weight="bold" className="size-4" />
            </Button>
          </SortableItemHandle>
        </div>
        <div className="grow">{title}</div>
        <div className="z-2 flex">
          {onRemove && (
            <Button
              variant="ghost"
              size="icon-xs"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={onRemove}
            >
              <TrashIcon className="size-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon-xs"
            className={cn(
              visible && 'opacity-0',
              'group-hover:opacity-100 transition-opacity',
            )}
            onClick={onToggleVisibility}
          >
            {visible ? (
              <EyeIcon className="size-4" />
            ) : (
              <EyeSlashIcon className="size-4" />
            )}
          </Button>
        </div>
      </div>
      <CollapsibleContent>{children}</CollapsibleContent>
    </Collapsible>
  );
}

export type SectionsListItemProps = {
  title: React.ReactNode;
  visible?: boolean;
  hasChildren?: boolean;
  children?: React.ReactNode;
  onSelect: () => void;
  onToggleVisibility: () => void;
  onRemove?: () => void;
};
