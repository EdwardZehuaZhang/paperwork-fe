import useStore from '@/store/store';
import { openModal } from '@/features/modals/stores/use-modal-store';
import { TemplateSelector } from './template-selector';

export function openTemplateSelectorModal() {
  openModal({
    content: <TemplateSelector />,
    title: 'Get started',
    onModalClosed: () => useStore.getState().setDiagramModel(undefined, { skipIfNotEmpty: true }),
  });
}
