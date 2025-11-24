import React from 'react';

import { SortableTreeListItem } from '@/components/sortable-tree-list-item';
import {
  Sortable,
  SortableContent,
  SortableItem,
} from '@/components/ui/sortable';

export function SortableTreeList<T>({
  items,
  setItems,
  getItemValue,
  getItemTitle,
  getItemVisibility = () => false,
  getItemParentCapacity = () => false,
  removeItem,
  setItemVisibility,
  children,
}: {
  items: T[];
  setItems: (items: T[]) => void;
  getItemValue: (item: T) => string;
  getItemTitle: (item: T) => React.ReactNode;
  getItemVisibility?: (item: T) => boolean;
  getItemParentCapacity?: (item: T) => boolean;
  setItemVisibility: (item: T) => void;
  removeItem?: (item: T) => void;
  children?: (item: T) => React.ReactNode;
}) {
  return (
    <>
      {/* @ts-ignore */}
      <Sortable
        value={items}
        onValueChange={setItems}
        getItemValue={getItemValue}
        orientation="vertical"
      >
        <SortableContent>
          {items.map((item) => {
            const value = getItemValue(item);
            const hasChildren = getItemParentCapacity(item) && !!children;

            return (
              <SortableItem value={value} key={value}>
                <SortableTreeListItem
                  title={getItemTitle(item)}
                  visible={getItemVisibility(item)}
                  hasChildren={hasChildren}
                  onSelect={() => {}}
                  onToggleVisibility={() => setItemVisibility(item)}
                  onRemove={removeItem ? () => removeItem(item) : undefined}
                  key={value}
                >
                  {hasChildren && (
                    <div className="w-full ps-8 flex flex-col">
                      {children(item)}
                    </div>
                  )}
                </SortableTreeListItem>
              </SortableItem>
            );
          })}
        </SortableContent>
      </Sortable>
    </>
  );
}
