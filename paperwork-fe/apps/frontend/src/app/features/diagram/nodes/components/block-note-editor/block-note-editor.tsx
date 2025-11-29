import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import '@blocknote/core/fonts/inter.css';
import { memo, useCallback, useRef, useEffect, useState } from 'react';
import {
  FormattingToolbar,
  FormattingToolbarController,
  BlockTypeSelect,
  BasicTextStyleButton,
  TextAlignButton,
  ColorStyleButton,
  NestBlockButton,
  UnnestBlockButton,
  CreateLinkButton,
} from '@blocknote/react';

import styles from './block-note-editor.module.css';

type Props = {
  nodeId: string;
  onChange?: (content: any) => void;
  initialContent?: any;
  selected?: boolean;
};

export const BlockNoteEditor = memo(
  ({ nodeId, onChange, initialContent, selected = false }: Props) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const initialContentRef = useRef(initialContent);
    const [isEditorFocused, setIsEditorFocused] = useState(false);

    const editor = useCreateBlockNote(
      {
        initialContent: initialContentRef.current,
      },
      [nodeId],
    );

    const handleChange = useCallback(() => {
      if (onChange) {
        onChange(editor.document);
      }
    }, [onChange, editor]);

    const handleEditorClick = useCallback(() => {
      if (selected) {
        setIsEditorFocused(true);
      }
    }, [selected]);

    useEffect(() => {
      if (!selected) {
        setIsEditorFocused(false);
      }
    }, [selected]);

    useEffect(() => {
      const container = containerRef.current;
      if (!container || !isEditorFocused) return;

      const stopAllPropagation = (event: Event) => {
        event.stopPropagation();
      };

      container.addEventListener('pointerdown', stopAllPropagation, true);
      container.addEventListener('pointermove', stopAllPropagation, true);
      container.addEventListener('pointerup', stopAllPropagation, true);
      container.addEventListener('mousedown', stopAllPropagation, true);
      container.addEventListener('mousemove', stopAllPropagation, true);
      container.addEventListener('mouseup', stopAllPropagation, true);
      container.addEventListener('wheel', stopAllPropagation, true);

      return () => {
        container.removeEventListener('pointerdown', stopAllPropagation, true);
        container.removeEventListener('pointermove', stopAllPropagation, true);
        container.removeEventListener('pointerup', stopAllPropagation, true);
        container.removeEventListener('mousedown', stopAllPropagation, true);
        container.removeEventListener('mousemove', stopAllPropagation, true);
        container.removeEventListener('mouseup', stopAllPropagation, true);
        container.removeEventListener('wheel', stopAllPropagation, true);
      };
    }, [isEditorFocused]);

    return (
      <div
        ref={containerRef}
        className={`${styles['editor-container']} ${isEditorFocused ? styles['selected'] : ''}`}
        onClick={handleEditorClick}
      >
        <BlockNoteView
          editor={editor}
          onChange={handleChange}
          theme="light"
          formattingToolbar={false}
          editable={isEditorFocused}
        >
          <FormattingToolbarController
            formattingToolbar={() => (
              <FormattingToolbar>
                <BlockTypeSelect key="blockTypeSelect" />
                <BasicTextStyleButton basicTextStyle="bold" key="boldStyleButton" />
                <BasicTextStyleButton basicTextStyle="italic" key="italicStyleButton" />
                <BasicTextStyleButton basicTextStyle="underline" key="underlineStyleButton" />
                <BasicTextStyleButton basicTextStyle="strike" key="strikeStyleButton" />
                <BasicTextStyleButton basicTextStyle="code" key="codeStyleButton" />
                <TextAlignButton textAlignment="left" key="textAlignLeftButton" />
                <TextAlignButton textAlignment="center" key="textAlignCenterButton" />
                <TextAlignButton textAlignment="right" key="textAlignRightButton" />
                <ColorStyleButton key="colorStyleButton" />
                <NestBlockButton key="nestBlockButton" />
                <UnnestBlockButton key="unnestBlockButton" />
                <CreateLinkButton key="createLinkButton" />
              </FormattingToolbar>
            )}
          />
        </BlockNoteView>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.nodeId === nextProps.nodeId;
  },
);

BlockNoteEditor.displayName = 'BlockNoteEditor';
