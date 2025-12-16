import { FormBodyControlProps } from '../../types/controls';
import { createControlRenderer } from '../../utils/rendering';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FieldSet, FieldGroup } from '@/components/ui/field';
import { ControlWrapper } from '../control-wrapper';
import { Trash, Plus } from '@phosphor-icons/react';
import { useCallback } from 'react';

import styles from './form-body-control.module.css';

function FormBodyControl(props: FormBodyControlProps) {
  const { data, handleChange, path, enabled } = props;

  const formBody = (data || {}) as Record<string, unknown>;

  // Extract only question fields (question1, question2, etc.)
  const questions = Object.entries(formBody)
    .filter(([key]) => key.startsWith('question'))
    .sort((a, b) => {
      const numA = parseInt(a[0].replace('question', ''), 10);
      const numB = parseInt(b[0].replace('question', ''), 10);
      return numA - numB;
    });

  // Extract signature fields (signature1, signature2, etc.)
  const signatures = Object.entries(formBody)
    .filter(([key]) => key.startsWith('signature'))
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
    const updated = { ...formBody, [newQuestionKey]: `Question ${nextNumber}` };
    handleChange(path, updated);
  }, [questions, formBody, handleChange, path]);

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
    const updated = { ...formBody, [newSignatureKey]: `Signatory ${nextNumber}` };
    handleChange(path, updated);
  }, [signatures, formBody, handleChange, path]);

  return (
    <div className={styles['form-body-container']}>
      <Accordion type="single" collapsible defaultValue="content">
        <AccordionItem value="content">
          <AccordionTrigger>Content</AccordionTrigger>
          <AccordionContent>
            <FieldSet>
              <FieldGroup>
                <div className={styles['content-section']}>
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
                              <Trash className={styles['delete-icon']} weight="bold" />
                            </Button>
                          </div>
                          <Input
                            type="text"
                            value={String(questionValue || '')}
                            onChange={(e) => handleQuestionChange(questionKey, e.target.value)}
                            disabled={!enabled}
                            placeholder={`Enter ${label} text...`}
                            className={styles['question-input']}
                          />
                        </div>
                      );
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAddQuestion}
                    disabled={!enabled}
                    className={styles['add-button']}
                  >
                    <Plus className={styles['add-icon']} weight="bold" />
                    Add Question
                  </Button>

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
                              <Trash className={styles['delete-icon']} weight="bold" />
                            </Button>
                          </div>
                          <Input
                            type="text"
                            value={String(signatureValue || '')}
                            onChange={(e) => handleSignatureChange(signatureKey, e.target.value)}
                            disabled={!enabled}
                            placeholder="Signatory"
                            className={styles['signature-input']}
                          />
                        </div>
                      );
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAddSignature}
                    disabled={!enabled}
                    className={styles['add-button']}
                  >
                    <Plus className={styles['add-icon']} weight="bold" />
                    Add Signature
                  </Button>
                </div>
              </FieldGroup>
            </FieldSet>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export const formBodyControlRenderer = createControlRenderer('FormBody', FormBodyControl);
