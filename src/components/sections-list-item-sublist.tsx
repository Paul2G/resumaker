import type { SectionDataItem } from '@/lib/types';

import { PlusIcon } from '@phosphor-icons/react';

import { SectionsListItem } from '@/components/sections-list-item';
import { Button } from '@/components/ui/button';
import {
  Sortable,
  SortableContent,
  SortableItem,
} from '@/components/ui/sortable';

export function SectionsListItemSublist({
  items,
  setItems,
  addItem,
  removeItem,
  selectItem,
  toggleItemVisibility,
}: SectionsListItemSublistProps) {
  if (!Array.isArray(items)) return null;

  return (
    <div className="w-full ps-8 flex flex-col">
      <Sortable
        value={items}
        onValueChange={setItems}
        getItemValue={(item: SectionDataItem) => item.id}
        orientation="vertical"
      >
        <SortableContent>
          {items.map((item) => (
            <SortableItem value={item.id} key={item.id}>
              <SectionsListItem
                title={item.title}
                visible={item.visible}
                onRemove={() => removeItem(item.id)}
                onSelect={selectItem}
                onToggleVisibility={() =>
                  toggleItemVisibility(item.id, !item.visible)
                }
              />
            </SortableItem>
          ))}
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            onClick={() =>
              addItem({
                id: crypto.randomUUID(),
                title: 'New entry',
                organization: 'Somewhere',
                visible: true,
              })
            }
          >
            <PlusIcon className="size-4 ms-5.5" />
            Add new
          </Button>
        </SortableContent>
      </Sortable>
    </div>
  );
}

export type SectionsListItemSublistProps = {
  items: SectionDataItem[];
  setItems: (items: SectionDataItem[]) => void;
  selectItem: () => void;
  addItem: (item: SectionDataItem) => void;
  removeItem: (itemId: string) => void;
  toggleItemVisibility: (itemId: string, visible: boolean) => void;
};
