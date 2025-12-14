import { type DefaultReactSuggestionItem } from '@blocknote/react';
import type { FormNodeEditor } from './schema';

export interface FormQuestion {
  id: string; // stable ID linking to the form body property (e.g., "question1", "question2")
  label: string; // display label (e.g., "Q1", "Q2", "Question 1")
}

export interface FormSignature {
  id: string; // stable ID linking to the form body property (e.g., "signature1", "signature2")
  label: string; // display label (e.g., "Signature 1", "Signature 2")
}

export interface FormTime {
  id: string; // stable ID linking to the form body property (e.g., "time1", "time2")
  label: string; // display label (e.g., "Time 1", "Time 2")
  format: string; // stored format (e.g., "Date, Month and Year")
}

/**
 * Generates suggestion menu items for content placeholders (answers and signatures).
 * Each item creates inline content linked to a specific question or signature.
 *
 * @param editor - The BlockNote editor instance
 * @param questions - Array of questions from the Form Body
 * @param signatures - Array of signatures from the Form Body
 * @returns Array of suggestion items for the "Content" group
 */
export const getContentSuggestionItems = (
  editor: FormNodeEditor,
  questions: FormQuestion[],
  signatures: FormSignature[],
  times: FormTime[] = [],
): DefaultReactSuggestionItem[] => {
  const timeItems: DefaultReactSuggestionItem[] = times.map((t, index) => {
    const label = t.label || `Time ${index + 1}`;
    const format = t.format || 'Date, Month and Year';

    return {
      title: label,
      group: 'Content',
      aliases: [label.toLowerCase(), 'time', t.id],
      subtext: `Insert time placeholder (${format})`,
      onItemClick: () => {
        editor.insertInlineContent([
          {
            type: 'time',
            props: {
              format,
            },
          },
          ' ',
        ]);
      },
    };
  });

  const questionItems = questions.map((q, index) => {
    const label = q.label || `Q${index + 1}`;

    return {
      title: `${label} Answer`,
      group: 'Content', // Creates the "Content" section in the menu
      aliases: [label.toLowerCase(), 'answer', q.id],
      subtext: `Insert placeholder for ${label}`,
      onItemClick: () => {
        editor.insertInlineContent([
          {
            type: 'answer',
            props: {
              questionId: q.id,
              label,
            },
          },
          ' ', // add trailing space for easier typing
        ]);
      },
    };
  });

  const signatureItems = signatures.map((s, index) => {
    const label = s.label || `Signature ${index + 1}`;

    return {
      title: `${label}`,
      group: 'Content', // Creates the "Content" section in the menu
      aliases: [label.toLowerCase(), 'signature', s.id],
      subtext: `Insert placeholder for ${label}`,
      onItemClick: () => {
        editor.insertInlineContent([
          {
            type: 'signature',
            props: {
              backgroundColor: 'default',
              textColor: 'default',
              textAlignment: 'left',
              signatureId: s.id,
              label,
            },
          },
          ' ', // add trailing space for easier typing
        ]);
      },
    };
  });

  return [...timeItems, ...questionItems, ...signatureItems];
};
