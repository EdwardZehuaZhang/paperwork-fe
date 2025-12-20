import { createReactInlineContentSpec } from '@blocknote/react';
import type { MouseEventHandler } from 'react';

/**
 * Custom inline content for time placeholders.
 * Displays a stable label (e.g., [Time 1]) and carries the selected format for export/replacement.
 */
export const TimeInline = createReactInlineContentSpec(
  {
    type: 'time',
    propSchema: {
      fieldId: {
        default: '',
      },
      label: {
        default: '',
      },
      format: {
        default: '',
      },
    },
    // Styled content so BlockNote marks this inline node selectable.
    content: 'styled',
  },
  {
    render: (props) => {
      const { fieldId, label, format } = props.inlineContent.props;
      const display = label || format || 'Time';

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
          data-time-placeholder="true"
          data-field-id={fieldId}
        >
          [{display}]
        </span>
      );
    },

    toExternalHTML: (props) => {
      const { fieldId, label, format } = props.inlineContent.props;
      const display = label || format || 'Time';

      return (
        <span className="time-placeholder" data-placeholder-type="time" data-field-id={fieldId}>
          [{display}]
        </span>
      );
    },
  },
);
