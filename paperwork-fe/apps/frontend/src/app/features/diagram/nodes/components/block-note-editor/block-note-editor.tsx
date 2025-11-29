import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import '@blocknote/core/fonts/inter.css';
import { memo } from 'react';

import styles from './block-note-editor.module.css';

type Props = {
  nodeId: string;
  onChange?: (content: any) => void;
  initialContent?: any;
};

export const BlockNoteEditor = memo(({ nodeId, onChange, initialContent }: Props) => {
  const editor = useCreateBlockNote({
    initialContent,
  });

  const handleChange = () => {
    if (onChange) {
      onChange(editor.document);
    }
  };

  return (
    <div className={styles['editor-container']}>
      <BlockNoteView editor={editor} onChange={handleChange} theme="light" />
    </div>
  );
});

BlockNoteEditor.displayName = 'BlockNoteEditor';
