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
}

export function DateTimeField({ label, questionKey, format }: DateTimeFieldProps) {
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
            {getFormatDisplay()}
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
