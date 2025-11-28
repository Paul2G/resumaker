import React, { useState } from 'react';
import { CalendarIcon } from '@phosphor-icons/react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { formatDate, isValidStringDate, parseDate } from '@/lib/dates';
import { cn } from '@/lib/utils';

/* DatePicker component allowing users to select a date either by typing or using a calendar popover.
 * **Note:** This component does not trigger form onChange events automatically if calendar popover is used but it can via input field.
 * */
export function DatePicker({
  value,
  name,
  onChange,
  className,
  ...props
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const [inputValue, setInputValue] = useState<string>(formatDate(value));

  return (
    <div className={cn('relative w-full', className)}>
      <Input
        value={inputValue}
        placeholder="01/01/2025"
        className="bg-background pr-10"
        onChange={(e) => {
          const inputDate = e.target.value;
          setInputValue(inputDate);
          if (isValidStringDate(inputDate)) {
            const newDate = parseDate(inputDate)!;
            setDate(newDate);
            onChange(newDate);
          }
        }}
        onBlur={() => {
          setInputValue(formatDate(date));
        }}
        {...props}
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date-picker"
            variant="ghost"
            className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
          >
            <CalendarIcon weight="fill" className="size-4" />
            <span className="sr-only">Select date</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden p-0"
          align="end"
          alignOffset={-8}
          sideOffset={10}
        >
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(newDate) => {
              setDate(newDate);
              setInputValue(formatDate(newDate));
              onChange(newDate);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
export type DatePickerProps = Omit<
  React.ComponentProps<'input'>,
  'value' | 'onChange'
> & {
  value?: Date | string;
  onChange: (...event: any[]) => void;
};
