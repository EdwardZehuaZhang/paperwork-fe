import { useMemo, useState } from 'react';
import { createControlRenderer } from '../../utils/rendering';
import { LinkedNodeSelectControlProps } from '../../types/controls';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Check, CaretDown, X } from '@phosphor-icons/react';
import useStore from '@/store/store';
import { cn } from '@/lib/utils';

export function LinkedNodeSelectControl(props: LinkedNodeSelectControlProps) {
  const { data, handleChange, path, uischema, enabled } = props;
  const placeholder = uischema.options?.placeholder || 'Select a node';

  const nodes = useStore((store) => store.nodes);
  const [open, setOpen] = useState(false);

  const options = useMemo(() => {
    return nodes
      .filter((node) => node.data?.type === 'form' || node.data?.type === 'sheet')
      .map((node) => {
        const properties = node.data?.properties as { label?: string } | undefined;
        return {
          id: node.id,
          label: properties?.label || node.data?.type || 'Untitled node',
          type: node.data?.type,
        };
      });
  }, [nodes]);

  const selectedOption = options.find((opt) => opt.id === data);

  const setValue = (value: string) => {
    handleChange(path, value);
    setOpen(false);
  };

  const clearValue = () => {
    handleChange(path, '');
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={!enabled}
          className="w-full justify-between"
        >
          <span className="truncate text-left">
            {selectedOption ? `${selectedOption.label} (${selectedOption.type})` : placeholder}
          </span>
          <div className="flex items-center gap-1">
            {selectedOption && (
              <X
                size={16}
                className="text-muted-foreground"
                onClick={(e) => {
                  e.stopPropagation();
                  clearValue();
                }}
              />
            )}
            <CaretDown size={16} className="text-muted-foreground" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[280px]" align="start">
        <Command>
          <CommandInput placeholder="Search nodes..." />
          <CommandList>
            <CommandEmpty>No nodes found.</CommandEmpty>
            <CommandGroup>
              {options.map((opt) => (
                <CommandItem
                  key={opt.id}
                  value={`${opt.label} ${opt.type}`}
                  onSelect={() => setValue(opt.id)}
                >
                  <Check
                    size={16}
                    className={cn(
                      'mr-2',
                      opt.id === selectedOption?.id ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  <span className="truncate">{opt.label}</span>
                  <span className="ml-2 text-muted-foreground text-xs">{opt.type}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export const linkedNodeSelectControlRenderer = createControlRenderer('LinkedNodeSelect', LinkedNodeSelectControl);
