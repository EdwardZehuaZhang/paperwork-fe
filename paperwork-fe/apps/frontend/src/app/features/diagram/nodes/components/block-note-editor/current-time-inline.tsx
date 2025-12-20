import { createReactInlineContentSpec } from '@blocknote/react';
import type { MouseEventHandler } from 'react';

/**
 * Custom inline content for current time placeholders.
 * Displays a stable label (e.g., [Current Time 1]) and carries the selected format for export/replacement.
 */
export const CurrentTimeInline = createReactInlineContentSpec(
  {
    type: 'currentTime',
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
      const display = label || format || 'Current Time';

      const selectThisToken: MouseEventHandler<HTMLSpanElement> = (event) => {
        event.preventDefault();
        event.stopPropagation();

        type PMView = {
          posAtDOM: (node: Node, offset: number) => number;
          focus: () => void;
        };

        type PMNode = { nodeSize: number };
        type PMDocument = { nodeAt: (pos: number) => PMNode | null };

        type TipTapChain = {
          focus: () => TipTapChain;
          setNodeSelection?: (pos: number) => TipTapChain;
          setTextSelection?: (range: { from: number; to: number }) => TipTapChain;
          run: () => void;
        };

        type TipTapEditor = {
          view?: PMView;
          state?: { doc: PMDocument };
          commands?: { setNodeSelection?: (pos: number) => unknown };
          chain: () => TipTapChain;
        };

        const editorRecord = props.editor as unknown as Record<string, unknown>;
        const tiptapEditor = editorRecord['_tiptapEditor'] as TipTapEditor | undefined;
        const prosemirrorView = editorRecord['prosemirrorView'] as PMView | undefined;
        const view = prosemirrorView ?? tiptapEditor?.view;
        const state = tiptapEditor?.state;
        if (!view || !state) return;

        const candidatePos = view.posAtDOM(event.currentTarget, 0);
        const node = state.doc.nodeAt(candidatePos);

        if (node && tiptapEditor?.commands?.setNodeSelection) {
          const chain = tiptapEditor.chain().focus();
          (chain.setNodeSelection?.(candidatePos) ?? chain).run();
          return;
        }

        if (node) {
          const chain = tiptapEditor.chain().focus();
          (chain.setTextSelection?.({ from: candidatePos, to: candidatePos + node.nodeSize }) ?? chain).run();
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
          data-current-time-placeholder="true"
          data-field-id={fieldId}
        >
          [{display}]
        </span>
      );
    },

    toExternalHTML: (props) => {
      const { fieldId, label, format } = props.inlineContent.props;
      const display = label || format || 'Current Time';

      return (
        <span className="time-placeholder" data-placeholder-type="currentTime" data-field-id={fieldId}>
          [{display}]
        </span>
      );
    },
  },
);
