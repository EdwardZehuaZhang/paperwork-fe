import { type DefaultReactSuggestionItem } from '@blocknote/react';
import type { FormNodeEditor } from './schema';

export interface FormQuestion {
  id: string; // stable ID linking to the form body property (e.g., "question1", "question2")
  label: string; // display label (e.g., "Q1", "Q2", "Question 1")
}

/**
 * Generates suggestion menu items for answer placeholders.
 * Each item creates an answer inline content linked to a specific question.
 *
 * @param editor - The BlockNote editor instance
 * @param questions - Array of questions from the Form Body
 * @returns Array of suggestion items for the "Answers" group
 */
export const getAnswerSuggestionItems = (
  editor: FormNodeEditor,
  questions: FormQuestion[],
): DefaultReactSuggestionItem[] => {
  return questions.map((q, index) => {
    const label = q.label || `Q${index + 1}`;

    return {
      title: `${label} Answer`,
      group: 'Answers', // Creates the "Answers" section in the menu
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
};
