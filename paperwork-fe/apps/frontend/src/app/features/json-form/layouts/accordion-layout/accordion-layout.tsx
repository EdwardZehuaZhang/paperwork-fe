import { Accordion, ShadcnFieldSet, ShadcnFieldLegend, ShadcnFieldGroup } from '@synergycodes/overflow-ui';
import { AccordionLayoutElement, LayoutProps } from '../../types/layouts';
import { LayoutWrapper } from '../layout-wrapper';
import { createLayoutRenderer } from '../../utils/rendering';
import { renderElements } from '../render-elements';

function AccordionLayout(props: LayoutProps<AccordionLayoutElement>) {
  const { uischema } = props;

  return (
    <LayoutWrapper {...props}>
      <Accordion label={uischema.label}>
        <ShadcnFieldSet>
          <ShadcnFieldGroup>
            {renderElements(props)}
          </ShadcnFieldGroup>
        </ShadcnFieldSet>
      </Accordion>
    </LayoutWrapper>
  );
}

export const accordionLayoutRenderer = createLayoutRenderer('Accordion', AccordionLayout);
