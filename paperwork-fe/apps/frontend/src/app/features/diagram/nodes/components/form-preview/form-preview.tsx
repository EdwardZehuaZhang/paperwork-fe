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
import { DateTimeField } from './date-time-field';
import { AddressField } from './address-field';
import { SignatureFileUpload } from '@/components/file-upload-demo';

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

  // Extract current times (currentTime1, currentTime2, etc.)
  const currentTimes = Object.entries(formBody)
    .filter(([key]) => /^currentTime\d+$/.test(key))
    .sort((a, b) => {
      const numberA = Number.parseInt(a[0].replace('currentTime', ''), 10);
      const numberB = Number.parseInt(b[0].replace('currentTime', ''), 10);
      return numberA - numberB;
    });

  // Extract addresses (address1, address2, etc.)
  const addresses = Object.entries(formBody)
    .filter(([key]) => /^address\d+$/.test(key))
    .sort((a, b) => {
      const numberA = Number.parseInt(a[0].replace('address', ''), 10);
      const numberB = Number.parseInt(b[0].replace('address', ''), 10);
      return numberA - numberB;
    });

  // Create ordered array of all field types to match properties panel order: times -> current times -> addresses -> questions -> money -> signatures
  const orderedFields = [
    ...times.map(([key, value]) => ({
      type: 'time' as const,
      key,
      value,
    })),
    ...currentTimes.map(([key, value]) => ({
      type: 'currentTime' as const,
      key,
      value,
    })),
    ...addresses.map(([key, value]) => ({
      type: 'address' as const,
      key,
      value,
    })),
    ...questions.map(([key, value]) => ({
      type: 'question' as const,
      key,
      value,
    })),
    ...moneyQuestions.map(([key, value]) => ({
      type: 'money' as const,
      key,
      value,
    })),
    ...signatures.map(([key, value]) => ({
      type: 'signature' as const,
      key,
      value,
    })),
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
              {/* Render fields in order: times -> current times -> addresses -> questions -> money -> signatures */}
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
                  const currency = (formBody[currencyKey] as string) || 'USD';

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

                if (field.type === 'currentTime') {
                  const timeNumber = field.key.replace('currentTime', '');
                  const format = typeof field.value === 'string' && field.value ? field.value : 'Date, Month and Year';
                  return (
                    <DateTimeField
                      key={field.key}
                      questionKey={field.key}
                      label={`Current Time ${timeNumber}`}
                      format={format}
                      value={new Date()}
                    />
                  );
                }

                if (field.type === 'address') {
                  const addressNumber = field.key.replace('address', '');
                  const format =
                    typeof field.value === 'string' && field.value
                      ? field.value
                      : 'Street Address, City and Postal Code';

                  return (
                    <AddressField
                      key={field.key}
                      questionKey={field.key}
                      label={`Address ${addressNumber}`}
                      format={format}
                    />
                  );
                }

                return null;
              })}
            </FieldGroup>
          </FieldSet>
        </div>
      </ScrollArea>
    </div>
  );
}
