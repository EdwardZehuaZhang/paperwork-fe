import { SelectControlProps } from '../../types/controls';
import { createControlRenderer } from '../../utils/rendering';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectSeparator,
} from '@/components/ui/select';
import { ControlWrapper } from '../control-wrapper';
import { PrimitiveFieldSchema } from '@workflow-builder/types/node-schema';
import { Icon } from '@workflow-builder/icons';

function SelectControl(props: SelectControlProps) {
  const { data, handleChange, path, enabled, schema } = props;

  const options = (schema as PrimitiveFieldSchema).options ?? [];

  const onChange = (value: string) => {
    handleChange(path, value);
  };

  const stopEventPropagation = (event: React.SyntheticEvent) => {
    event.stopPropagation();
  };

  return (
    <ControlWrapper {...props}>
      <Select value={data ?? ''} onValueChange={onChange} disabled={!enabled}>
        <SelectTrigger onPointerDown={stopEventPropagation} onClick={stopEventPropagation}>
          <SelectValue placeholder={schema.placeholder || 'Select an option'} />
        </SelectTrigger>
        <SelectContent
          position="item-aligned"
          onPointerDown={stopEventPropagation}
          onClick={stopEventPropagation}
        >
          {options.map((option, index) => {
            if (option.type === 'separator') {
              return <SelectSeparator key={`separator-${index}`} />;
            }
            return (
              <SelectItem key={option.value} value={option.value}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {option.icon && <Icon name={option.icon} size="small" />}
                  <span>{option.label}</span>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </ControlWrapper>
  );
}

export const selectControlRenderer = createControlRenderer('Select', SelectControl);
