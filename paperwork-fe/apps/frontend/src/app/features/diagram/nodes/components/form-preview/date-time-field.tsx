import { Field, FieldLabel, FieldDescription } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

interface DateTimeFieldProps {
  label: string;
  questionKey: string;
  format: string;
  value?: Date;
}

function pad2(value: number) {
  return String(value).padStart(2, '0');
}

function formatDateForOption(date: Date, format: string) {
  const day = pad2(date.getDate());
  const month = pad2(date.getMonth() + 1);
  const year = String(date.getFullYear());

  switch (format) {
    case 'Date, Month and Year': {
      return `${day}/${month}/${year}`;
    }
    case 'Month and Year': {
      return `${month}/${year}`;
    }
    case 'Date and Month': {
      return `${day}/${month}`;
    }
    case 'Year Only': {
      return year;
    }
    case 'Monthly Only': {
      return month;
    }
    case 'Date Only': {
      return day;
    }
    default: {
      return '';
    }
  }
}

export function DateTimeField({ label, questionKey, format, value }: DateTimeFieldProps) {
  // Map format string to display format
  const getFormatDisplay = () => {
    switch (format) {
      case 'Date, Month and Year': {
        return 'DD/MM/YYYY';
      }
      case 'Month and Year': {
        return 'MM/YYYY';
      }
      case 'Date and Month': {
        return 'DD/MM';
      }
      case 'Year Only': {
        return 'YYYY';
      }
      case 'Monthly Only': {
        return 'MM';
      }
      case 'Date Only': {
        return 'DD';
      }
      default: {
        return 'Select date';
      }
    }
  };

  const resolvedDisplay = value ? formatDateForOption(value, format) : getFormatDisplay();
  const fallbackDisplay = value ? '—' : 'Select date';

  return (
    <Field>
      <FieldLabel htmlFor={questionKey}>{label}</FieldLabel>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={questionKey}
            variant="outline"
            className={cn('w-full justify-start text-left font-normal', 'text-muted-foreground')}
            disabled
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {resolvedDisplay || fallbackDisplay}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="single" disabled initialFocus />
        </PopoverContent>
      </Popover>
      <FieldDescription>Format: {format} (read-only preview)</FieldDescription>
    </Field>
  );
}
