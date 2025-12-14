import { createReactInlineContentSpec } from '@blocknote/react';

/**
 * Custom inline content for time placeholders.
 * Displays the selected time format as: [Date, Month and Year]
 */
export const TimeInline = createReactInlineContentSpec(
  {
    type: 'time',
    propSchema: {
      format: {
        default: '',
      },
    },
    content: 'none',
  },
  {
    render: (props) => {
      const { format } = props.inlineContent.props;
      const display = format || 'Time';

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
            whiteSpace: 'nowrap',
          }}
          data-time-placeholder="true"
        >
          [{display}]
        </span>
      );
    },

    toExternalHTML: (props) => {
      const { format } = props.inlineContent.props;
      const display = format || 'Time';

      return <span className="time-placeholder">[{display}]</span>;
    },
  },
);
