import { FieldSet, FieldGroup } from '@/components/ui/field';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { AccordionLayoutElement, LayoutProps } from '../../types/layouts';
import { LayoutWrapper } from '../layout-wrapper';
import { createLayoutRenderer } from '../../utils/rendering';
import { renderElements } from '../render-elements';

function AccordionLayout(props: LayoutProps<AccordionLayoutElement>) {
  const { uischema } = props;
  const label = uischema.label ?? 'Section';

  return (
    <LayoutWrapper {...props}>
      <Accordion type="single" collapsible defaultValue="section">
        <AccordionItem value="section" className="border-b-0">
          <AccordionTrigger>{label}</AccordionTrigger>
          <AccordionContent className="pb-6">
            <FieldSet>
              <FieldGroup>{renderElements(props)}</FieldGroup>
            </FieldSet>
          </AccordionContent>
          <Separator />
        </AccordionItem>
      </Accordion>
    </LayoutWrapper>
  );
}

export const accordionLayoutRenderer = createLayoutRenderer('Accordion', AccordionLayout);
