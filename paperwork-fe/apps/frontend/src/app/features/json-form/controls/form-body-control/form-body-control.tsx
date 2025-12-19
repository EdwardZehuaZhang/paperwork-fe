import { FormBodyControlProps } from '../../types/controls';
import { createControlRenderer } from '../../utils/rendering';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { CurrencySelect } from '@/components/ui/currency-select';
import { FieldSet, FieldGroup } from '@/components/ui/field';
import { Separator } from '@/components/ui/separator';
import { ControlWrapper } from '../control-wrapper';
import { Trash, Plus } from '@phosphor-icons/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';

import styles from './form-body-control.module.css';

function FormBodyControl(props: FormBodyControlProps) {
  const { data, handleChange, path, enabled } = props;

  const formBody = (data || {}) as Record<string, unknown>;

  // Migrate legacy keys for backwards compatibility
  useEffect(() => {
    const shouldMigrateTime = typeof formBody.time === 'string' && typeof formBody.time1 !== 'string';
    const shouldMigrateSignature =
      typeof (formBody as any).signature === 'string' && typeof formBody.signature1 !== 'string';

    if (!shouldMigrateTime && !shouldMigrateSignature) {
      return;
    }

    const updated = { ...formBody };

    if (shouldMigrateTime) {
      const legacyTime = updated.time as string;
      delete updated.time;
      updated.time1 = legacyTime;
    }

    if (shouldMigrateSignature) {
      const legacySignature = (updated as any).signature as string;
      delete (updated as any).signature;
      updated.signature1 = legacySignature;
    }

    handleChange(path, updated);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formBody, handleChange, path]);

  const [addFieldOpen, setAddFieldOpen] = useState(false);

  const timeOptions = [
    'Date, Month and Year',
    'Month and Year',
    'Date and Month',
    'Year Only',
    'Monthly Only',
    'Date Only',
  ] as const;

  const addressOptions = [
    'Street Address',
    'Street Address and City',
    'Street Address, City and Postal Code',
  ] as const;

  const times = useMemo(
    () =>
      Object.entries(formBody)
        .filter(([key]) => /^time\d+$/.test(key))
        .sort((a, b) => {
          const numA = parseInt(a[0].replace('time', ''), 10);
          const numB = parseInt(b[0].replace('time', ''), 10);
          return numA - numB;
        }),
    [formBody],
  );

  const currentTimes = useMemo(
    () =>
      Object.entries(formBody)
        .filter(([key]) => /^currentTime\d+$/.test(key))
        .sort((a, b) => {
          const numA = parseInt(a[0].replace('currentTime', ''), 10);
          const numB = parseInt(b[0].replace('currentTime', ''), 10);
          return numA - numB;
        }),
    [formBody],
  );

  const addresses = useMemo(
    () =>
      Object.entries(formBody)
        .filter(([key]) => /^address\d+$/.test(key))
        .sort((a, b) => {
          const numA = parseInt(a[0].replace('address', ''), 10);
          const numB = parseInt(b[0].replace('address', ''), 10);
          return numA - numB;
        }),
    [formBody],
  );

  // Extract only question fields (question1, question2, etc.)
  const questions = Object.entries(formBody)
    .filter(([key]) => /^question\d+$/.test(key))
    .sort((a, b) => {
      const numA = parseInt(a[0].replace('question', ''), 10);
      const numB = parseInt(b[0].replace('question', ''), 10);
      return numA - numB;
    });

  // Extract money question fields (money1, money2, etc.)
  const moneyQuestions = useMemo(
    () =>
      Object.entries(formBody)
        .filter(([key]) => /^money\d+$/.test(key))
        .sort((a, b) => {
          const numA = parseInt(a[0].replace('money', ''), 10);
          const numB = parseInt(b[0].replace('money', ''), 10);
          return numA - numB;
        }),
    [formBody],
  );

  // Extract signature fields (signature1, signature2, etc.)
  const signatures = Object.entries(formBody)
    .filter(([key]) => /^signature\d+$/.test(key))
    .sort((a, b) => {
      const numA = parseInt(a[0].replace('signature', ''), 10);
      const numB = parseInt(b[0].replace('signature', ''), 10);
      return numA - numB;
    });

  const handleQuestionChange = useCallback(
    (questionKey: string, value: string) => {
      const updated = { ...formBody, [questionKey]: value };
      handleChange(path, updated);
    },
    [formBody, handleChange, path],
  );

  const handleDeleteQuestion = useCallback(
    (questionKey: string) => {
      const updated = { ...formBody };
      delete updated[questionKey];
      handleChange(path, updated);
    },
    [formBody, handleChange, path],
  );

  const handleAddQuestion = useCallback(() => {
    // Find the next available question number
    const questionNumbers = questions
      .map(([key]) => parseInt(key.replace('question', ''), 10))
      .sort((a, b) => a - b);

    let nextNumber = 1;
    for (const num of questionNumbers) {
      if (num === nextNumber) {
        nextNumber++;
      } else {
        break;
      }
    }

    const newQuestionKey = `question${nextNumber}`;
    const updated = { ...formBody, [newQuestionKey]: '' };
    handleChange(path, updated);
  }, [questions, formBody, handleChange, path]);

  const handleMoneyQuestionChange = useCallback(
    (moneyKey: string, value: string) => {
      const updated = { ...formBody, [moneyKey]: value };
      handleChange(path, updated);
    },
    [formBody, handleChange, path],
  );

  const handleMoneyCurrencyChange = useCallback(
    (moneyKey: string, currency: string) => {
      const currencyKey = `${moneyKey}Currency`;
      const updated = { ...formBody, [currencyKey]: currency };
      handleChange(path, updated);
    },
    [formBody, handleChange, path],
  );

  const handleDeleteMoney = useCallback(
    (moneyKey: string) => {
      const updated = { ...formBody };
      delete updated[moneyKey];
      delete updated[`${moneyKey}Currency`];
      handleChange(path, updated);
    },
    [formBody, handleChange, path],
  );

  const handleAddMoney = useCallback(() => {
    const moneyNumbers = moneyQuestions
      .map(([key]) => parseInt(key.replace('money', ''), 10))
      .sort((a, b) => a - b);

    let nextNumber = 1;
    for (const num of moneyNumbers) {
      if (num === nextNumber) {
        nextNumber++;
      } else {
        break;
      }
    }

    const newMoneyKey = `money${nextNumber}`;
    const updated = {
      ...formBody,
      [newMoneyKey]: '',
      [`${newMoneyKey}Currency`]: '',
    };

    handleChange(path, updated);
  }, [moneyQuestions, formBody, handleChange, path]);

  const handleTimeChange = useCallback(
    (timeKey: string, value: string) => {
      const updated = { ...formBody, [timeKey]: value };
      handleChange(path, updated);
    },
    [formBody, handleChange, path],
  );

  const handleFieldLabelChange = useCallback(
    (fieldKey: string, value: string) => {
      const labelKey = `${fieldKey}Label`;
      const updated = { ...formBody };
      const trimmed = value.trim();

      if (trimmed) {
        updated[labelKey] = value;
      } else {
        delete updated[labelKey];
      }

      handleChange(path, updated);
    },
    [formBody, handleChange, path],
  );

  const handleDeleteTime = useCallback(
    (timeKey: string) => {
      const updated = { ...formBody };
      delete updated[timeKey];
      delete updated[`${timeKey}Label`];
      handleChange(path, updated);
    },
    [formBody, handleChange, path],
  );

  const handleAddTime = useCallback(() => {
    const timeNumbers = times
      .map(([key]) => parseInt(key.replace('time', ''), 10))
      .sort((a, b) => a - b);

    let nextNumber = 1;
    for (const num of timeNumbers) {
      if (num === nextNumber) {
        nextNumber++;
      } else {
        break;
      }
    }

    const newTimeKey = `time${nextNumber}`;
    const updated = { ...formBody, [newTimeKey]: 'Date, Month and Year' };
    handleChange(path, updated);
  }, [times, formBody, handleChange, path]);

  const handleCurrentTimeChange = useCallback(
    (currentTimeKey: string, value: string) => {
      const updated = { ...formBody, [currentTimeKey]: value };
      handleChange(path, updated);
    },
    [formBody, handleChange, path],
  );

  const handleDeleteCurrentTime = useCallback(
    (currentTimeKey: string) => {
      const updated = { ...formBody };
      delete updated[currentTimeKey];
      delete updated[`${currentTimeKey}Label`];
      handleChange(path, updated);
    },
    [formBody, handleChange, path],
  );

  const handleAddCurrentTime = useCallback(() => {
    const currentTimeNumbers = currentTimes
      .map(([key]) => parseInt(key.replace('currentTime', ''), 10))
      .sort((a, b) => a - b);

    let nextNumber = 1;
    for (const num of currentTimeNumbers) {
      if (num === nextNumber) {
        nextNumber++;
      } else {
        break;
      }
    }

    const newCurrentTimeKey = `currentTime${nextNumber}`;
    const updated = { ...formBody, [newCurrentTimeKey]: 'Date, Month and Year' };
    handleChange(path, updated);
  }, [currentTimes, formBody, handleChange, path]);

  const handleAddressChange = useCallback(
    (addressKey: string, value: string) => {
      const updated = { ...formBody, [addressKey]: value };
      handleChange(path, updated);
    },
    [formBody, handleChange, path],
  );

  const handleDeleteAddress = useCallback(
    (addressKey: string) => {
      const updated = { ...formBody };
      delete updated[addressKey];
      delete updated[`${addressKey}Label`];
      handleChange(path, updated);
    },
    [formBody, handleChange, path],
  );

  const handleAddAddress = useCallback(() => {
    const addressNumbers = addresses
      .map(([key]) => parseInt(key.replace('address', ''), 10))
      .sort((a, b) => a - b);

    let nextNumber = 1;
    for (const num of addressNumbers) {
      if (num === nextNumber) {
        nextNumber++;
      } else {
        break;
      }
    }

    const newAddressKey = `address${nextNumber}`;
    const updated = { ...formBody, [newAddressKey]: 'Street Address, City and Postal Code' };
    handleChange(path, updated);
  }, [addresses, formBody, handleChange, path]);

  const handleSignatureChange = useCallback(
    (signatureKey: string, value: string) => {
      const updated = { ...formBody, [signatureKey]: value };
      handleChange(path, updated);
    },
    [formBody, handleChange, path],
  );

  const handleDeleteSignature = useCallback(
    (signatureKey: string) => {
      const updated = { ...formBody };
      delete updated[signatureKey];
      handleChange(path, updated);
    },
    [formBody, handleChange, path],
  );

  const handleAddSignature = useCallback(() => {
    // Find the next available signature number
    const signatureNumbers = signatures
      .map(([key]) => parseInt(key.replace('signature', ''), 10))
      .sort((a, b) => a - b);

    let nextNumber = 1;
    for (const num of signatureNumbers) {
      if (num === nextNumber) {
        nextNumber++;
      } else {
        break;
      }
    }

    const newSignatureKey = `signature${nextNumber}`;
    const updated = { ...formBody, [newSignatureKey]: '' };
    handleChange(path, updated);
  }, [signatures, formBody, handleChange, path]);

  const addFieldOptions = useMemo(
    () =>
      [
        {
          value: 'question',
          label: 'Question',
          onSelect: () => handleAddQuestion(),
        },
        {
          value: 'money',
          label: 'Money',
          onSelect: () => handleAddMoney(),
        },
        {
          value: 'signature',
          label: 'Signature',
          onSelect: () => handleAddSignature(),
        },
        {
          value: 'time',
          label: 'Time',
          onSelect: () => handleAddTime(),
        },
        {
          value: 'currentTime',
          label: 'Current time',
          onSelect: () => handleAddCurrentTime(),
        },
        {
          value: 'address',
          label: 'Address',
          onSelect: () => handleAddAddress(),
        },
      ] as const,
    [handleAddQuestion, handleAddMoney, handleAddSignature, handleAddTime, handleAddCurrentTime, handleAddAddress],
  );

  return (
    <div className={styles['form-body-container']}>
      <Accordion type="single" collapsible defaultValue="content">
        <AccordionItem value="content" className="border-b-0">
          <AccordionTrigger>Content</AccordionTrigger>
          <AccordionContent className="pb-6">
            <FieldSet>
              <FieldGroup>
                <div className={styles['content-section']}>
                  <div className={styles['times-list']}>
                    {times.map(([timeKey, timeValue]) => {
                      const timeNumber = timeKey.replace('time', '');
                      const customLabel = typeof formBody[`${timeKey}Label`] === 'string' ? String(formBody[`${timeKey}Label`]) : '';
                      const label = customLabel.trim() ? customLabel : `Time ${timeNumber}`;

                      return (
                        <div key={timeKey} className={styles['time-item']}>
                          <div className={styles['time-row']}>
                            <label className={styles['time-label']}>{label}</label>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteTime(timeKey)}
                              disabled={!enabled}
                              className={styles['delete-button']}
                              title={`Delete ${label}`}
                            >
                              <Trash className={styles['delete-icon']} />
                            </Button>
                          </div>
                          <Input
                            type="text"
                            value={customLabel}
                            onChange={(e) => handleFieldLabelChange(timeKey, e.target.value)}
                            disabled={!enabled}
                            placeholder="Enter a question"
                            className={styles['field-question']}
                          />
                          <Select
                            value={typeof timeValue === 'string' ? timeValue : 'Date, Month and Year'}
                            onValueChange={(value) => handleTimeChange(timeKey, value)}
                            disabled={!enabled}
                          >
                            <SelectTrigger className={styles['time-select']}>
                              <SelectValue placeholder="Select a time format" />
                            </SelectTrigger>
                            <SelectContent position="item-aligned">
                              {timeOptions.map((opt) => (
                                <SelectItem key={opt} value={opt}>
                                  {opt}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      );
                    })}
                  </div>

                  <div className={styles['times-list']}>
                    {currentTimes.map(([currentTimeKey, currentTimeValue]) => {
                      const timeNumber = currentTimeKey.replace('currentTime', '');
                      const customLabel =
                        typeof formBody[`${currentTimeKey}Label`] === 'string' ? String(formBody[`${currentTimeKey}Label`]) : '';
                      const label = customLabel.trim() ? customLabel : `Current Time ${timeNumber}`;

                      return (
                        <div key={currentTimeKey} className={styles['time-item']}>
                          <div className={styles['time-row']}>
                            <label className={styles['time-label']}>{label}</label>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteCurrentTime(currentTimeKey)}
                              disabled={!enabled}
                              className={styles['delete-button']}
                              title={`Delete ${label}`}
                            >
                              <Trash className={styles['delete-icon']} />
                            </Button>
                          </div>
                          <Input
                            type="text"
                            value={customLabel}
                            onChange={(e) => handleFieldLabelChange(currentTimeKey, e.target.value)}
                            disabled={!enabled}
                            placeholder="Enter a question"
                            className={styles['field-question']}
                          />
                          <Select
                            value={typeof currentTimeValue === 'string' ? currentTimeValue : 'Date, Month and Year'}
                            onValueChange={(value) => handleCurrentTimeChange(currentTimeKey, value)}
                            disabled={!enabled}
                          >
                            <SelectTrigger className={styles['time-select']}>
                              <SelectValue placeholder="Select a time format" />
                            </SelectTrigger>
                            <SelectContent position="item-aligned">
                              {timeOptions.map((opt) => (
                                <SelectItem key={opt} value={opt}>
                                  {opt}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      );
                    })}
                  </div>

                  <div className={styles['times-list']}>
                    {addresses.map(([addressKey, addressValue]) => {
                      const addressNumber = addressKey.replace('address', '');
                      const customLabel = typeof formBody[`${addressKey}Label`] === 'string' ? String(formBody[`${addressKey}Label`]) : '';
                      const label = customLabel.trim() ? customLabel : `Address ${addressNumber}`;

                      return (
                        <div key={addressKey} className={styles['time-item']}>
                          <div className={styles['time-row']}>
                            <label className={styles['time-label']}>{label}</label>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteAddress(addressKey)}
                              disabled={!enabled}
                              className={styles['delete-button']}
                              title={`Delete ${label}`}
                            >
                              <Trash className={styles['delete-icon']} />
                            </Button>
                          </div>
                          <Input
                            type="text"
                            value={customLabel}
                            onChange={(e) => handleFieldLabelChange(addressKey, e.target.value)}
                            disabled={!enabled}
                            placeholder="Enter a question"
                            className={styles['field-question']}
                          />
                          <Select
                            value={typeof addressValue === 'string' ? addressValue : 'Street Address, City and Postal Code'}
                            onValueChange={(value) => handleAddressChange(addressKey, value)}
                            disabled={!enabled}
                          >
                            <SelectTrigger className={styles['time-select']}>
                              <SelectValue placeholder="Select an address format" />
                            </SelectTrigger>
                            <SelectContent position="item-aligned">
                              {addressOptions.map((opt) => (
                                <SelectItem key={opt} value={opt}>
                                  {opt}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      );
                    })}
                  </div>

                  <div className={styles['questions-list']}>
                    {questions.map(([questionKey, questionValue]) => {
                      const questionNumber = questionKey.replace('question', '');
                      const label = `Question ${questionNumber}`;

                      return (
                        <div key={questionKey} className={styles['question-item']}>
                          <div className={styles['question-row']}>
                            <label className={styles['question-label']}>{label}</label>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteQuestion(questionKey)}
                              disabled={!enabled}
                              className={styles['delete-button']}
                              title={`Delete ${label}`}
                            >
                              <Trash className={styles['delete-icon']} />
                            </Button>
                          </div>
                          <Input
                            type="text"
                            value={String(questionValue || '')}
                            onChange={(e) => handleQuestionChange(questionKey, e.target.value)}
                            disabled={!enabled}
                            placeholder={"Enter a question"}
                            className={styles['question-input']}
                          />
                        </div>
                      );
                    })}
                  </div>

                  <div className={styles['money-list']}>
                    {moneyQuestions.map(([moneyKey, moneyQuestionValue]) => {
                      const moneyNumber = moneyKey.replace('money', '');
                      const label = `Money ${moneyNumber}`;
                      const currencyValue = String(formBody[`${moneyKey}Currency`] || '');

                      return (
                        <div key={moneyKey} className={styles['money-item']}>
                          <div className={styles['money-row']}>
                            <label className={styles['money-label']}>{label}</label>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteMoney(moneyKey)}
                              disabled={!enabled}
                              className={styles['delete-button']}
                              title={`Delete ${label}`}
                            >
                              <Trash className={styles['delete-icon']} />
                            </Button>
                          </div>
                          <CurrencySelect
                            value={currencyValue}
                            onValueChange={(currency) => handleMoneyCurrencyChange(moneyKey, currency)}
                            disabled={!enabled}
                            placeholder="Select a currency"
                            className={styles['money-currency']}
                          />
                          <Input
                            type="text"
                            value={String(moneyQuestionValue || '')}
                            onChange={(e) => handleMoneyQuestionChange(moneyKey, e.target.value)}
                            disabled={!enabled}
                            placeholder="Enter a question"
                            className={styles['money-question']}
                          />
                        </div>
                      );
                    })}
                  </div>

                  <div className={styles['signatures-list']}>
                    {signatures.map(([signatureKey, signatureValue]) => {
                      const signatureNumber = signatureKey.replace('signature', '');
                      const label = `Signature ${signatureNumber}`;

                      return (
                        <div key={signatureKey} className={styles['signature-item']}>
                          <div className={styles['signature-row']}>
                            <label className={styles['signature-label']}>{label}</label>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteSignature(signatureKey)}
                              disabled={!enabled}
                              className={styles['delete-button']}
                              title={`Delete ${label}`}
                            >
                              <Trash className={styles['delete-icon']} />
                            </Button>
                          </div>
                          <Input
                            type="text"
                            value={String(signatureValue || '')}
                            onChange={(e) => handleSignatureChange(signatureKey, e.target.value)}
                            disabled={!enabled}
                            placeholder="Signature"
                            className={styles['signature-input']}
                          />
                        </div>
                      );
                    })}
                  </div>

                  <Popover open={addFieldOpen} onOpenChange={setAddFieldOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        role="combobox"
                        aria-expanded={addFieldOpen}
                        disabled={!enabled}
                        className={cn(styles['add-button'], 'justify-start gap-2')}
                      >
                        <Plus />
                        Add Field
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[220px] p-0" align="start">
                      <Command>
                        <CommandInput placeholder="Search fields..." />
                        <CommandList>
                          <CommandEmpty>No field found.</CommandEmpty>
                          <CommandGroup>
                            {addFieldOptions.map((opt) => (
                              <CommandItem
                                key={opt.value}
                                value={opt.value}
                                onSelect={() => {
                                  opt.onSelect();
                                  setAddFieldOpen(false);
                                }}
                              >
                                {opt.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </FieldGroup>
            </FieldSet>
          </AccordionContent>
          <Separator />
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export const formBodyControlRenderer = createControlRenderer('FormBody', FormBodyControl);
