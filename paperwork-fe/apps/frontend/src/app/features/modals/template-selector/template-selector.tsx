import { DiagramModel } from '@workflow-builder/types/common';
import { useTranslation } from 'react-i18next';
import useStore from '@/store/store';
import { templates } from '@/data/templates';
import { useCallback } from 'react';
import { useFitView } from '@/hooks/use-fit-view';
import { Card } from '@/components/ui/card';
import { Icon } from '@workflow-builder/icons';
import { cn } from '@/lib/utils';
import { closeModal } from '../stores/use-modal-store';

export function TemplateSelector() {
  const { t } = useTranslation();
  const setDiagramModel = useStore((store) => store.setDiagramModel);
  const fitView = useFitView();

  const selectTemplate = useCallback(
    (model?: DiagramModel) => {
      setDiagramModel(model);
      fitView();
      closeModal();
    },
    [setDiagramModel, fitView],
  );

  return (
    <div className="flex flex-col gap-6">
      <p className="text-center text-sm text-muted-foreground">
        Get started quickly with pre-designed templates for your Workflow Editor
      </p>
      <div className="grid grid-cols-3 gap-3">
        {templates.map(({ icon, id, name, value }) => (
          <Card
            key={id}
            className={cn(
              'flex flex-col items-start gap-4 p-4 cursor-pointer transition-colors',
              'hover:border-primary hover:shadow-md',
            )}
            onClick={() => selectTemplate(value)}
          >
            <Icon name={icon} size="large" className="text-primary" />
            <div className="flex flex-col gap-1 w-full">
              <span className="text-sm font-medium leading-none">{name}</span>
              <span className="text-xs text-muted-foreground">
                {value.diagram.nodes.length} nodes
              </span>
            </div>
          </Card>
        ))}
        <Card
          className={cn(
            'flex flex-col items-start gap-4 p-4 cursor-pointer transition-colors',
            'border-2 border-dashed bg-transparent',
            'hover:border-primary hover:shadow-md',
          )}
          onClick={() => selectTemplate()}
        >
          <Icon name="CornersOut" size="large" className="text-primary" />
          <div className="flex flex-col gap-1 w-full">
            <span className="text-sm font-medium leading-none">
              {t('templateSelector.emptyCanvas')}
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
}
