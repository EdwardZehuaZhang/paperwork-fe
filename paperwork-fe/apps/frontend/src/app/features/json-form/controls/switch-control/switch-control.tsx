import { Switch } from '@/components/ui/switch';
import { SwitchControlProps } from '../../types/controls';
import { createControlRenderer } from '../../utils/rendering';
import { ControlWrapper } from '../control-wrapper';

function SwitchControl(props: SwitchControlProps) {
  const { data, handleChange, path, enabled } = props;

  function onChange(checked: boolean) {
    handleChange(path, checked);
  }

  return (
    <ControlWrapper {...props}>
      <Switch disabled={!enabled} checked={data ?? false} onCheckedChange={onChange} />
    </ControlWrapper>
  );
}

export const switchControlRenderer = createControlRenderer('Switch', SwitchControl);
