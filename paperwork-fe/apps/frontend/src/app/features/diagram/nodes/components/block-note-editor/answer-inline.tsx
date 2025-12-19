import { createReactInlineContentSpec } from '@blocknote/react';
import type { InlineContentConfig } from '@blocknote/core';
import type { MouseEventHandler } from 'react';

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
    // Use styled so BlockNote marks this inline node selectable; this enables NodeSelection for click-to-select.
    content: 'styled',
  } as const satisfies InlineContentConfig,
  {
    render: (props) => {
      const { questionId, label } = props.inlineContent.props;

      const selectThisToken: MouseEventHandler<HTMLSpanElement> = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const tiptapEditor = (props.editor as any)._tiptapEditor;
        const view = (props.editor as any).prosemirrorView ?? tiptapEditor?.view;
        const state = tiptapEditor?.state;
        if (!view || !state) return;

        const candidatePos = view.posAtDOM(event.currentTarget, 0);
        const node = state.doc.nodeAt(candidatePos);

        // Prefer a node selection now that the inline content is selectable.
        if (node && tiptapEditor.commands?.setNodeSelection) {
          tiptapEditor.chain().focus().setNodeSelection(candidatePos).run();
          return;
        }

        // Fallback: text selection spanning the node still preserves it when copied inside the editor.
        if (node) {
          tiptapEditor
            .chain()
            .focus()
            .setTextSelection({ from: candidatePos, to: candidatePos + node.nodeSize })
            .run();
          return;
        }

        view.focus();
      };

      // Display like [___Q1 Answer___] with yellow background
      return (
        <span
          contentEditable={false}
          onMouseDown={selectThisToken}
          onDoubleClick={selectThisToken}
          className="bg-yellow-200"
          style={{
            color: '#333',
            padding: '3px 8px',
            borderRadius: '4px',
            fontWeight: '500',
            border: '1px solid #999',
            display: 'inline-block',
            fontSize: '0.9em',
            whiteSpace: 'nowrap',
          }}
          data-answer-placeholder="true"
          data-question-id={questionId}
        >
          [{`${label || 'Answer'} Answer`}]
        </span>
      );
    },

    // Used for export (HTML, clipboard, PDF pipeline)
    toExternalHTML: (props) => {
      const { questionId, label } = props.inlineContent.props;

      return (
        <span className="answer-placeholder" data-question-id={questionId}>
          [{`${label || 'Answer'} Answer`}]
        </span>
      );
    },
  },
);
