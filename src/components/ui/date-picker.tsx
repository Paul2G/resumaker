import type { DateFormat } from '@/constants/dates';
import type { Language } from '@/constants/locales';

import React, { useEffect, useState } from 'react';
import { es } from 'react-day-picker/locale';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { formatDate } from '@/lib/dates';

/* DatePicker component allowing users to select a date either by typing or using a calendar popover.
 * **Note:** This component does not trigger form onChange events automatically if calendar popover is used, but it can via input field.
 * */
export function DatePicker({
  value,
  name,
  placeholder,
  dateFormat = 'MM/DD/YYYY',
  disabled,
  onChange,
  className,
  ...props
}: DatePickerProps) {
  const { t, i18n } = useTranslation();
  const [date, setDate] = useState<Date | undefined>(value);

  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState<Date | undefined>(date);

  useEffect(() => {
    onChange(date);
  }, [date]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          disabled={disabled}
          className="data-[empty=true]:text-muted-foreground justify-between text-left font-normal w-full"
          {...props}
        >
          <span className="capitalize">
            {date
              ? formatDate(date, dateFormat, i18n.language as Language)
              : placeholder}
          </span>
          <i className="ph ph-caret-down" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          locale={i18n.language === 'es' ? es : undefined}
          mode="single"
          selected={date}
          onSelect={setDate}
          defaultMonth={date}
          month={month}
          onMonthChange={setMonth}
          disabled={disabled}
          footer={
            <div className="w-full flex justify-end">
              <Button
                size="sm"
                variant="destructive"
                className="mt-2"
                onClick={() => {
                  setDate(undefined);
                  setOpen(false);
                }}
              >
                {t('actions.clear')}
              </Button>
            </div>
          }
        />
      </PopoverContent>
    </Popover>
  );
}
export type DatePickerProps = Omit<
  React.ComponentProps<'button'>,
  'value' | 'onChange'
> & {
  placeholder?: string;
  dateFormat?: DateFormat;
  value?: Date;
  onChange: (...event: any[]) => void;
};
