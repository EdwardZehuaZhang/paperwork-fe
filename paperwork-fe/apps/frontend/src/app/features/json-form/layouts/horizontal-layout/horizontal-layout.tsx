import { LayoutWrapper } from '../layout-wrapper';
import { HorizontalLayoutElement, LayoutProps } from '../../types/layouts';
import { renderElements } from '../render-elements';
import { createLayoutRenderer } from '../../utils/rendering';
import { CSSProperties, useMemo } from 'react';
import { useHasChildError } from './use-has-child-error';

function HorizontalLayout(props: LayoutProps<HorizontalLayoutElement>) {
  const hasErrors = useHasChildError(props.uischema.elements);

  const { uischema } = props;
  const { layoutColumns } = uischema;

  const style: CSSProperties = useMemo(
    () => {
      const baseStyle: CSSProperties = {
        display: 'grid',
        gap: '1rem',
        alignItems: 'center',
        width: '100%',
      };
      
      if (layoutColumns) {
        baseStyle.gridTemplateColumns = layoutColumns;
      } else {
        baseStyle.gridAutoFlow = 'column';
        baseStyle.gridAutoColumns = '1fr';
      }
      
      return baseStyle;
    },
    [layoutColumns],
  );

  return (
    <LayoutWrapper hasErrors={hasErrors} {...props}>
      <div style={style}>
        {renderElements(props)}
      </div>
    </LayoutWrapper>
  );
}

export const horizontalLayoutRenderer = createLayoutRenderer('HorizontalLayout', HorizontalLayout);
