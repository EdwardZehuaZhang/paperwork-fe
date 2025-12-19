import { createReactInlineContentSpec } from '@blocknote/react';
import { defaultProps } from '@blocknote/core';
import type { MouseEventHandler } from 'react';

/**
 * Custom inline content for signature placeholders.
 * Displays as [___Signature 1___] with gray box styling.
 */
export const SignatureInline = createReactInlineContentSpec(
  {
    type: 'signature',
    propSchema: {
      ...defaultProps,
      signatureId: {
        default: '',
      },
      label: {
        default: '',
      },
    },
    // Styled content so BlockNote marks it selectable; this allows NodeSelection.
    content: 'styled',
  },
  {
    render: (props) => {
      const { label } = props.inlineContent.props;
      const selectThisToken: MouseEventHandler<HTMLSpanElement> = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const tiptapEditor = (props.editor as any)._tiptapEditor;
        const view = (props.editor as any).prosemirrorView ?? tiptapEditor?.view;
        const state = tiptapEditor?.state;
        if (!view || !state) return;

        const candidatePos = view.posAtDOM(event.currentTarget, 0);
        const node = state.doc.nodeAt(candidatePos);

        if (node && tiptapEditor.commands?.setNodeSelection) {
          tiptapEditor.chain().focus().setNodeSelection(candidatePos).run();
          return;
        }

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
      return (
        <span
          contentEditable={false}
          onMouseDown={selectThisToken}
          onDoubleClick={selectThisToken}
          style={{
            backgroundColor: '#e5e5e5',
            color: '#333',
            padding: '3px 8px',
            borderRadius: '4px',
            fontWeight: '500',
            border: '1px solid #999',
            display: 'inline-block',
            fontSize: '0.9em',
          }}
        >
          [___{label}___]
        </span>
      );
    },
  },
);
