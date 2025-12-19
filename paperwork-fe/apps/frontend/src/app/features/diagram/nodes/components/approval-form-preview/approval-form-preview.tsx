import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group';
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText } from '@phosphor-icons/react';
import { DateTimeField } from '../form-preview/date-time-field';
import { SignatureFileUpload } from '@/components/file-upload-demo';
import styles from '../form-preview/form-preview.module.css';

interface ApprovalFormPreviewProps {
  formBody: Record<string, unknown>;
  noteRequirement: 'optional' | 'required';
  notePlaceholder: string;
}

export function ApprovalFormPreview({ formBody, noteRequirement, notePlaceholder }: ApprovalFormPreviewProps) {
  const mergedFormBody: Record<string, unknown> = {
    ...formBody,
  };

  // Ensure at least one signature exists for approval
  if (!Object.keys(mergedFormBody).some((key) => /^signature\d+$/.test(key))) {
    mergedFormBody.signature1 = '';
  }

  const questions = Object.entries(mergedFormBody)
    .filter(([key]) => /^question\d+$/.test(key))
    .sort((a, b) => Number.parseInt(a[0].replace('question', ''), 10) - Number.parseInt(b[0].replace('question', ''), 10));

  const moneyQuestions = Object.entries(mergedFormBody)
    .filter(([key]) => /^money\d+$/.test(key))
    .sort((a, b) => Number.parseInt(a[0].replace('money', ''), 10) - Number.parseInt(b[0].replace('money', ''), 10));

  const signatures = Object.entries(mergedFormBody)
    .filter(([key]) => /^signature\d+$/.test(key))
    .sort((a, b) => Number.parseInt(a[0].replace('signature', ''), 10) - Number.parseInt(b[0].replace('signature', ''), 10));

  const times = Object.entries(mergedFormBody)
    .filter(([key]) => /^time\d+$/.test(key))
    .sort((a, b) => Number.parseInt(a[0].replace('time', ''), 10) - Number.parseInt(b[0].replace('time', ''), 10));

  const orderedFields = [
    ...times.map(([key, value]) => ({ type: 'time' as const, key, value })),
    ...questions.map(([key, value]) => ({ type: 'question' as const, key, value })),
    ...moneyQuestions.map(([key, value]) => ({ type: 'money' as const, key, value })),
    ...signatures.map(([key, value]) => ({ type: 'signature' as const, key, value })),
  ];

  const hasNoFields = orderedFields.length === 0;

  if (hasNoFields) {
    return (
      <div className={styles['preview-container']}>
        <div className={styles['empty-container']}>
          <Empty className="border border-dashed">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <FileText className="h-12 w-12" />
              </EmptyMedia>
              <EmptyTitle>No Form Fields Defined</EmptyTitle>
              <EmptyDescription>
                Link a form or sheet node to preview its fields. Approval extras (signature and note) will appear below.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </div>
      </div>
    );
  }

  return (
    <div className={styles['preview-container']}>
      <ScrollArea className={styles['scroll-area']}>
        <div className={styles['form-content']}>
          <FieldSet>
            <FieldGroup>
              {orderedFields.map((field) => {
                if (field.type === 'question') {
                  const questionNumber = field.key.replace('question', '');
                  return (
                    <Field key={field.key}>
                      <FieldLabel htmlFor={field.key}>Question {questionNumber}</FieldLabel>
                      <Textarea
                        id={field.key}
                        placeholder={typeof field.value === 'string' && field.value ? field.value : 'Enter your answer here...'}
                        rows={4}
                      />
                      <FieldDescription>Text question</FieldDescription>
                    </Field>
                  );
                }

                if (field.type === 'money') {
                  const moneyNumber = field.key.replace('money', '');
                  const currencyKey = `${field.key}Currency`;
                  const currency = (mergedFormBody[currencyKey] as string) || 'USD';

                  return (
                    <Field key={field.key}>
                      <FieldLabel htmlFor={field.key}>Money {moneyNumber}</FieldLabel>
                      <InputGroup>
                        <InputGroupAddon>
                          <InputGroupText>$</InputGroupText>
                        </InputGroupAddon>
                        <InputGroupInput
                          id={field.key}
                          placeholder={typeof field.value === 'string' && field.value ? field.value : '0.00'}
                        />
                        <InputGroupAddon align="inline-end">
                          <InputGroupText>{currency}</InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                      <FieldDescription>Money field in {currency}</FieldDescription>
                    </Field>
                  );
                }

                if (field.type === 'signature') {
                  const signatureNumber = field.key.replace('signature', '');
                  const label = typeof field.value === 'string' && field.value ? field.value : `Signature ${signatureNumber}`;

                  return (
                    <Field key={field.key}>
                      <FieldLabel htmlFor={field.key}>{label}</FieldLabel>
                      <SignatureFileUpload />
                      <FieldDescription>Upload signature files</FieldDescription>
                    </Field>
                  );
                }

                if (field.type === 'time') {
                  const timeNumber = field.key.replace('time', '');
                  const format = typeof field.value === 'string' && field.value ? field.value : 'Date, Month and Year';
                  return <DateTimeField key={field.key} questionKey={field.key} label={`Date/Time ${timeNumber}`} format={format} />;
                }

                return null;
              })}

              <Field>
                <FieldLabel>Note</FieldLabel>
                <div className="flex gap-3 flex-col sm:flex-row">
                  <div className="sm:w-48 w-full">
                    <Select value={noteRequirement} onValueChange={() => undefined}>
                      <SelectTrigger aria-label="Note requirement">
                        <SelectValue placeholder="Select requirement" />
                      </SelectTrigger>
                      <SelectContent position="item-aligned">
                        <SelectItem value="optional">Optional</SelectItem>
                        <SelectItem value="required">Required</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Textarea placeholder={notePlaceholder || 'Additional note'} rows={3} />
                </div>
                <FieldDescription>Approval note</FieldDescription>
              </Field>
            </FieldGroup>
          </FieldSet>
        </div>
      </ScrollArea>
    </div>
  );
}
