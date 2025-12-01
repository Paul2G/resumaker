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
  disabled,
  onChange,
  className,
  ...props
}: DatePickerProps) {
  const [date, setDate] = useState<Date | undefined>(parseDate(value));
  const [inputValue, setInputValue] = useState<string>(formatDate(value));

  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState<Date | undefined>(date);

  return (
    <div className={cn('relative w-full', className)}>
      <Input
        value={inputValue}
        className="bg-background pr-10"
        disabled={disabled}
        onChange={(e) => {
          const inputDate = e.target.value;
          setInputValue(inputDate);
          if (isValidStringDate(inputDate)) {
            const newDate = parseDate(inputDate);
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
            disabled={disabled}
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
            month={month}
            onMonthChange={setMonth}
            disabled={disabled}
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
