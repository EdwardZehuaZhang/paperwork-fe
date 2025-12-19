import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Upload } from '@phosphor-icons/react';

interface SignatureFieldProps {
  label: string;
  questionKey: string;
}

export function SignatureField({ label, questionKey }: SignatureFieldProps) {
  return (
    <Field>
      <FieldLabel htmlFor={questionKey}>{label}</FieldLabel>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Input
            id={questionKey}
            type="text"
            placeholder="No file selected"
            disabled
            readOnly
            className="pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full"
            disabled
          >
            <Upload className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <FieldDescription>Upload a signature file (read-only preview)</FieldDescription>
    </Field>
  );
}
