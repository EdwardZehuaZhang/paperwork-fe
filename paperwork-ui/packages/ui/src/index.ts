// [TODO] Improvement: Should we automate it?
// Using glob library could help us generate this entrypoint and imports
import './styles/tailwind.css';

export * from './components/accordion/accordion';
export * from './components/avatar/avatar';

export * from './components/button/nav-button/nav-button';
export * from './components/button/regular-button/button';

export * from './components/checkbox/checkbox';

export * from './components/date-picker/date-picker';

export * from './components/input/input';

export * from './components/menu/menu';

export * from './components/modal/modal';

export * from './components/radio-button/radio';

export * from './components/select/select';

export * from './components/switch/switch';
export * from './components/switch/icon-switch/icon-switch';

export * from './components/snackbar/snackbar';

export * from './components/status/status';

export * from './components/text-area/text-area';

export * from './components/tooltip/tooltip';
export * from './components/tooltip/tooltip-content';
export * from './components/tooltip/tooltip-trigger';

export * from './components/node/node-as-port-wrapper/node-as-port-wrapper';
export * from './components/node/node-description/node-description';
export * from './components/node/node-icon/node-icon';
export * from './components/node/node-panel/node-panel';

export * from './components/edge/edge-label/edge-label';
export * from './components/edge/use-edge-styles/use-edge-styles';

export * from './components/separator/separator';

export * from './components/status/status';

export * from './components/segment-picker/segment-picker';

export * from './components/collapsible/collapsible';

// Shadcn components (proof of coexistence)
export * from './components/shadcn/card';
export { Button as ShadcnButton } from './components/shadcn/button';
export * from './components/shadcn/dropdown-menu';
export * from './components/shadcn/menubar/menubar';

// Shadcn Form Components (with Shadcn prefix to avoid conflicts)
export { Input as ShadcnInput } from './components/shadcn/input/input';
export { Label as ShadcnLabel } from './components/shadcn/label/label';
export { Textarea as ShadcnTextarea } from './components/shadcn/textarea/textarea';
export * as ShadcnSelect from './components/shadcn/select/select';
export { Checkbox as ShadcnCheckbox } from './components/shadcn/checkbox/checkbox';
export {
  Field as ShadcnField,
  FieldLabel as ShadcnFieldLabel,
  FieldDescription as ShadcnFieldDescription,
  FieldError as ShadcnFieldError,
  FieldGroup as ShadcnFieldGroup,
  FieldLegend as ShadcnFieldLegend,
  FieldSeparator as ShadcnFieldSeparator,
  FieldSet as ShadcnFieldSet,
  FieldContent as ShadcnFieldContent,
  FieldTitle as ShadcnFieldTitle,
} from './components/shadcn/field';

// Additional Shadcn Components (complete library)
// Note: Using Shadcn prefix for components that conflict with existing paperwork-ui components
export { Accordion as ShadcnAccordion, AccordionContent as ShadcnAccordionContent, AccordionItem as ShadcnAccordionItem, AccordionTrigger as ShadcnAccordionTrigger } from './components/shadcn/accordion';
export * from './components/shadcn/alert';
export * from './components/shadcn/alert-dialog';
export * from './components/shadcn/aspect-ratio';
export { Avatar as ShadcnAvatar, AvatarImage as ShadcnAvatarImage, AvatarFallback as ShadcnAvatarFallback } from './components/shadcn/avatar';
export * from './components/shadcn/badge';
export * from './components/shadcn/breadcrumb';
export * from './components/shadcn/button-group';
export * from './components/shadcn/calendar';
export * from './components/shadcn/carousel';
// Note: Chart component exported, but chart examples (charts/*) and blocks (blocks/*) are excluded from build for reference only
export * from './components/shadcn/chart';
export { Collapsible as ShadcnCollapsible, CollapsibleTrigger as ShadcnCollapsibleTrigger, CollapsibleContent as ShadcnCollapsibleContent } from './components/shadcn/collapsible';
export * from './components/shadcn/command';
export * from './components/shadcn/context-menu';
export * from './components/shadcn/dialog';
export * from './components/shadcn/drawer';
export * from './components/shadcn/empty';
export * from './components/shadcn/form';
export * from './components/shadcn/hover-card';
export * from './components/shadcn/input-group';
export * from './components/shadcn/input-otp';
export * from './components/shadcn/item';
export * from './components/shadcn/kbd';
export * from './components/shadcn/native-select';
export * from './components/shadcn/navigation-menu';
export * from './components/shadcn/pagination';
export * from './components/shadcn/popover';
export * from './components/shadcn/progress';
export * from './components/shadcn/radio-group';
export * from './components/shadcn/resizable';
export * from './components/shadcn/scroll-area';
export { Separator as ShadcnSeparator } from './components/shadcn/separator';
export * from './components/shadcn/sheet';
export * from './components/shadcn/sidebar';
export * from './components/shadcn/skeleton';
export * from './components/shadcn/slider';
export * from './components/shadcn/sonner';
export * from './components/shadcn/spinner';
export { Switch as ShadcnSwitch } from './components/shadcn/switch';
export * from './components/shadcn/table';
export * from './components/shadcn/tabs';
export * from './components/shadcn/toggle';
export * from './components/shadcn/toggle-group';
export { Tooltip as ShadcnTooltip, TooltipTrigger as ShadcnTooltipTrigger, TooltipContent as ShadcnTooltipContent, TooltipProvider as ShadcnTooltipProvider } from './components/shadcn/tooltip';

// Shadcn Utilities & Hooks
export * from './lib/utils';
export * from './hooks/use-mobile';

// Types
export * from './components/button/regular-button/types';
export * from './components/date-picker/types';
export * from './components/input/types';
export * from './components/menu/types';
export * from './components/modal/types';
export * from './components/select/types';
export * from './components/snackbar/types';
export * from './components/tooltip/types';
export * from './shared/types/size';
export * from './shared/types/item-size';
export * from './components/edge/types';
