import { createReactInlineContentSpec } from '@blocknote/react';
import type { InlineContentConfig } from '@blocknote/core';

/**
 * Custom inline content for answer placeholders.
 * These act as "variables" that reference questions in the Form Body,
 * and will be replaced with actual answers when the form is submitted.
 */
export const AnswerInline = createReactInlineContentSpec(
  {
    type: 'answer',
    propSchema: {
      questionId: {
        default: '', // stable link to Form Body question (e.g., "question1", "question2")
      },
      label: {
        default: '', // display label (e.g., "Q1", "Q2")
      },
    },
    content: 'none',
  } as const satisfies InlineContentConfig,
  {
    render: (props) => {
      const { questionId, label } = props.inlineContent.props;

      // Display like [___Q1 Answer___] with yellow background
      return (
        <span
          style={{
            backgroundColor: '#fff3b0',
            padding: '2px 6px',
            borderRadius: 4,
            fontFamily: 'monospace',
            whiteSpace: 'nowrap',
            fontSize: '0.9em',
            fontWeight: 500,
          }}
          data-answer-placeholder="true"
          data-question-id={questionId}
        >
          [{`___${label || 'Answer'} Answer___`}]
        </span>
      );
    },

    // Used for export (HTML, clipboard, PDF pipeline)
    toExternalHTML: (props) => {
      const { questionId, label } = props.inlineContent.props;

      return (
        <span className="answer-placeholder" data-question-id={questionId}>
          [{`___${label || 'Answer'} Answer___`}]
        </span>
      );
    },
  },
);
