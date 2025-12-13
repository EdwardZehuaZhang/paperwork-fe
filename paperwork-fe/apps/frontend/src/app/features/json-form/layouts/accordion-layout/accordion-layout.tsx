import { Accordion } from '@synergycodes/overflow-ui';
import { FieldSet, FieldGroup } from '@/components/ui/field';
import { AccordionLayoutElement, LayoutProps } from '../../types/layouts';
import { LayoutWrapper } from '../layout-wrapper';
import { createLayoutRenderer } from '../../utils/rendering';
import { renderElements } from '../render-elements';

function AccordionLayout(props: LayoutProps<AccordionLayoutElement>) {
  const { uischema } = props;

  return (
    <LayoutWrapper {...props}>
      <Accordion label={uischema.label}>
        <FieldSet>
          <FieldGroup>
            {renderElements(props)}
          </FieldGroup>
        </FieldSet>
      </Accordion>
    </LayoutWrapper>
  );
}

export const accordionLayoutRenderer = createLayoutRenderer('Accordion', AccordionLayout);
