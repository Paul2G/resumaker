import * as React from 'react';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils.ts';

export function CollapsibleCard({
  title,
  children,
  ...props
}: SectionCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card data-state={isOpen ? 'open' : 'closed'} {...props}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {title}
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <ChevronDown
                  className={cn(isOpen && 'rotate-180', 'duration-300')}
                />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </CardTitle>
        </CardHeader>
        <CollapsibleContent>
          <CardContent>{children}</CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}

export type SectionCardProps = React.ComponentProps<'div'> & {
  title: string;
  children?: React.ReactNode;
};
