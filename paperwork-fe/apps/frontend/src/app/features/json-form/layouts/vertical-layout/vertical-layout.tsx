import { LayoutWrapper } from '../layout-wrapper';
import { renderElements } from '../render-elements';
import { LayoutProps, VerticalLayoutElement } from '../../types/layouts';
import { createLayoutRenderer } from '../../utils/rendering';
import { ShadcnFieldGroup } from '@synergycodes/overflow-ui';

function VerticalLayout(props: LayoutProps<VerticalLayoutElement>) {
  return (
    <LayoutWrapper {...props}>
      <ShadcnFieldGroup>
        {renderElements(props)}
      </ShadcnFieldGroup>
    </LayoutWrapper>
  );
}

export const verticalLayoutRenderer = createLayoutRenderer('VerticalLayout', VerticalLayout);
