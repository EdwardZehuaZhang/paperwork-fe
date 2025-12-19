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
import { FileText } from '@phosphor-icons/react';
import { SignatureField } from './signature-field';
import { DateTimeField } from './date-time-field';

import styles from './form-preview.module.css';

interface FormPreviewProps {
  formBody: Record<string, unknown>;
}

export function FormPreview({ formBody }: FormPreviewProps) {
  // Extract questions (question1, question2, etc.)
  const questions = Object.entries(formBody)
    .filter(([key]) => /^question\d+$/.test(key))
    .sort((a, b) => {
      const numberA = Number.parseInt(a[0].replace('question', ''), 10);
      const numberB = Number.parseInt(b[0].replace('question', ''), 10);
      return numberA - numberB;
    });

  // Extract money questions (money1, money2, etc.)
  const moneyQuestions = Object.entries(formBody)
    .filter(([key]) => /^money\d+$/.test(key))
    .sort((a, b) => {
      const numberA = Number.parseInt(a[0].replace('money', ''), 10);
      const numberB = Number.parseInt(b[0].replace('money', ''), 10);
      return numberA - numberB;
    });

  // Extract signatures (signature1, signature2, etc.)
  const signatures = Object.entries(formBody)
    .filter(([key]) => /^signature\d+$/.test(key))
    .sort((a, b) => {
      const numberA = Number.parseInt(a[0].replace('signature', ''), 10);
      const numberB = Number.parseInt(b[0].replace('signature', ''), 10);
      return numberA - numberB;
    });

  // Extract times (time1, time2, etc.)
  const times = Object.entries(formBody)
    .filter(([key]) => /^time\d+$/.test(key))
    .sort((a, b) => {
      const numberA = Number.parseInt(a[0].replace('time', ''), 10);
      const numberB = Number.parseInt(b[0].replace('time', ''), 10);
      return numberA - numberB;
    });

  const hasNoFields =
    questions.length === 0 &&
    moneyQuestions.length === 0 &&
    signatures.length === 0 &&
    times.length === 0;

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
                Add questions, money fields, signatures, or date/time fields in the properties panel to preview the
                form.
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
              {/* Render text questions */}
              {questions.map(([key, value]) => {
                const questionNumber = key.replace('question', '');
                return (
                  <Field key={key}>
                    <FieldLabel htmlFor={key}>Question {questionNumber}</FieldLabel>
                    <Textarea
                      id={key}
                      placeholder={typeof value === 'string' && value ? value : 'Enter your answer here...'}
                      rows={4}
                      disabled
                      readOnly
                    />
                    <FieldDescription>Text question (read-only preview)</FieldDescription>
                  </Field>
                );
              })}

              {/* Render money questions */}
              {moneyQuestions.map(([key, value]) => {
                const moneyNumber = key.replace('money', '');
                const currencyKey = `${key}Currency`;
                const currency = (formBody[currencyKey] as string) || 'USD';

                return (
                  <Field key={key}>
                    <FieldLabel htmlFor={key}>Money {moneyNumber}</FieldLabel>
                    <InputGroup>
                      <InputGroupAddon>
                        <InputGroupText>$</InputGroupText>
                      </InputGroupAddon>
                      <InputGroupInput
                        id={key}
                        placeholder={typeof value === 'string' && value ? value : '0.00'}
                        disabled
                        readOnly
                      />
                      <InputGroupAddon align="inline-end">
                        <InputGroupText>{currency}</InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    <FieldDescription>Money field in {currency} (read-only preview)</FieldDescription>
                  </Field>
                );
              })}

              {/* Render signatures */}
              {signatures.map(([key, value]) => {
                const signatureNumber = key.replace('signature', '');
                const label =
                  typeof value === 'string' && value ? value : `Signature ${signatureNumber}`;
                return <SignatureField key={key} questionKey={key} label={label} />;
              })}

              {/* Render date/time fields */}
              {times.map(([key, value]) => {
                const timeNumber = key.replace('time', '');
                const format = typeof value === 'string' && value ? value : 'Date, Month and Year';
                return <DateTimeField key={key} questionKey={key} label={`Date/Time ${timeNumber}`} format={format} />;
              })}
            </FieldGroup>
          </FieldSet>
        </div>
      </ScrollArea>
    </div>
  );
}
