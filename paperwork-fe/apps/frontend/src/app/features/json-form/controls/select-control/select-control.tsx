import { SelectControlProps } from '../../types/controls';
import { createControlRenderer } from '../../utils/rendering';
import { ShadcnSelect } from '@synergycodes/overflow-ui';
import { ControlWrapper } from '../control-wrapper';
import { PrimitiveFieldSchema } from '@workflow-builder/types/node-schema';
import { Icon } from '@workflow-builder/icons';

function SelectControl(props: SelectControlProps) {
  const { data, handleChange, path, enabled, schema } = props;

  const options = (schema as PrimitiveFieldSchema).options ?? [];

  const onChange = (value: string) => {
    handleChange(path, value);
  };

  return (
    <ControlWrapper {...props}>
      <ShadcnSelect.Select value={data ?? ''} onValueChange={onChange} disabled={!enabled} modal={false}>
        <ShadcnSelect.SelectTrigger>
          <ShadcnSelect.SelectValue placeholder={schema.placeholder || 'Select an option'} />
        </ShadcnSelect.SelectTrigger>
        <ShadcnSelect.SelectContent position="item-aligned">
          {options.map((option) => {
            if (option.type === 'separator') {
              return <ShadcnSelect.SelectSeparator key={`separator-${option.label}`} />;
            }
            return (
              <ShadcnSelect.SelectItem key={option.value} value={option.value}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {option.icon && <Icon name={option.icon} size="small" />}
                  <span>{option.label}</span>
                </div>
              </ShadcnSelect.SelectItem>
            );
          })}
        </ShadcnSelect.SelectContent>
      </ShadcnSelect.Select>
    </ControlWrapper>
  );
}

export const selectControlRenderer = createControlRenderer('Select', SelectControl);
