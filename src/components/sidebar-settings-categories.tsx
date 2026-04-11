import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { Item, ItemContent, ItemMedia, ItemTitle } from '@/components/ui/item';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Typography } from '@/components/ui/typography';
import { useNavigationItems } from '@/hooks/use-navigation-items';
import { cn } from '@/lib/utils';

export function SidebarSettingsCategories({
  className,
  ...restOfProps
}: React.ComponentProps<'aside'>) {
  const { t } = useTranslation();

  const navigationItems = useNavigationItems();

  return (
    <aside
      className={cn(
        'order-2 overflow-y-hidden w-100 shrink-0 border-r bg-background',
        className,
      )}
      {...restOfProps}
    >
      <ScrollArea className="h-full p-4">
        <Typography variant="h4" className="mb-4">
          {t('resume:settings.title')}
        </Typography>
        {navigationItems.settings.map((item) => {
          const CustomIcon = item.icon;
          return (
            <Item size="xs" asChild key={item.title}>
              <Link
                from="/resumes/$resumeId"
                to={item.to}
                params={item.params}
                className="rounded-md data-[status='active']:bg-secondary/80 data-[status='active']:font-semibold"
              >
                <ItemMedia>
                  <CustomIcon className="size-5" />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{item.title}</ItemTitle>
                </ItemContent>
              </Link>
            </Item>
          );
        })}
      </ScrollArea>
    </aside>
  );
}
