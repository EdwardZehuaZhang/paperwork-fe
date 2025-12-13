import { LayoutWrapper } from '../layout-wrapper';
import { renderElements } from '../render-elements';
import { LayoutProps, VerticalLayoutElement } from '../../types/layouts';
import { createLayoutRenderer } from '../../utils/rendering';
import { FieldGroup } from '@/components/ui/field';

function VerticalLayout(props: LayoutProps<VerticalLayoutElement>) {
  return (
    <LayoutWrapper {...props}>
      <FieldGroup>
        {renderElements(props)}
      </FieldGroup>
    </LayoutWrapper>
  );
}

export const verticalLayoutRenderer = createLayoutRenderer('VerticalLayout', VerticalLayout);
