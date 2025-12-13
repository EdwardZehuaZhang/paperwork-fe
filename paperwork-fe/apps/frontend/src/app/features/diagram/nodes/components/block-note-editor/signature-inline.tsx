import { createReactInlineContentSpec } from '@blocknote/react';
import { defaultProps } from '@blocknote/core';

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
    content: 'none',
  },
  {
    render: (props) => {
      const { label } = props.inlineContent.props;
      return (
        <span
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
