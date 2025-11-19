import { SectionsList } from '@/components/sections-list';

export function PrimarySidebar() {
  return (
    <aside className="overflow-y-auto w-100 border-r p-4 flex flex-col">
      <SectionsList />
    </aside>
  );
}
