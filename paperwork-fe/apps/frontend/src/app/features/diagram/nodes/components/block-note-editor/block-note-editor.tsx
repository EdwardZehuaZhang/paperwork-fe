import { useCreateBlockNote, SuggestionMenuController, getDefaultReactSlashMenuItems, SideMenuController } from '@blocknote/react';
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
import { filterSuggestionItems } from '@blocknote/core';

import styles from './block-note-editor.module.css';
import { formNodeSchema, type FormNodeEditor } from './schema';
import { getAnswerSuggestionItems, type FormQuestion } from './answer-menu';

type Props = {
  nodeId: string;
  onChange?: (content: any) => void;
  initialContent?: any;
  selected?: boolean;
  /**
   * Optional array of questions from the Form Body.
   * When provided, enables answer placeholder insertion in the editor.
   */
  questions?: FormQuestion[];
};

export const BlockNoteEditor = memo(
  ({ nodeId, onChange, initialContent, selected = false, questions = [] }: Props) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const initialContentRef = useRef(initialContent);
    const [isEditorFocused, setIsEditorFocused] = useState(false);

    const editor = useCreateBlockNote(
      {
        schema: formNodeSchema,
        initialContent: initialContentRef.current,
      },
      [nodeId],
    ) as FormNodeEditor;

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

    // Generate slash menu items with answer placeholders if questions exist
    const getSlashItems = useCallback(
      async (query: string) => {
        const defaultItems = getDefaultReactSlashMenuItems(editor);
        const answerItems =
          questions.length > 0 ? getAnswerSuggestionItems(editor, questions) : [];
        // Put answer items BEFORE default items so "Answers" section appears at the top
        const allItems = [...answerItems, ...defaultItems];
        return filterSuggestionItems(allItems, query);
      },
      [editor, questions],
    );

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
          slashMenu={false}
          formattingToolbar={false}
          sideMenu={false}
          editable={isEditorFocused}
        >
          <SideMenuController />
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
          <SuggestionMenuController triggerCharacter="/" getItems={getSlashItems} />
        </BlockNoteView>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.nodeId === nextProps.nodeId;
  },
);

BlockNoteEditor.displayName = 'BlockNoteEditor';
