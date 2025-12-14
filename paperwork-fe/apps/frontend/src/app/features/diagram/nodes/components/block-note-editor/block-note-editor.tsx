import {
  useCreateBlockNote,
  SuggestionMenuController,
  getDefaultReactSlashMenuItems,
  SideMenuController,
  SideMenu,
  DragHandleMenu,
  RemoveBlockItem,
  BlockColorsItem,
} from '@blocknote/react';
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
import { getContentSuggestionItems, type FormQuestion, type FormSignature, type FormTime } from './answer-menu';

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
  /**
   * Optional array of signatures from the Form Body.
   * When provided, enables signature placeholder insertion in the editor.
   */
  signatures?: FormSignature[];
  /** Optional array of time fields from the Form Body, used by the Time placeholders */
  times?: FormTime[];
};

type FormNodeDragHandleMenuProps = Omit<React.ComponentProps<typeof DragHandleMenu>, 'children'>;

function FormNodeDragHandleMenu(props: FormNodeDragHandleMenuProps) {
  return (
    <DragHandleMenu {...props}>
      <RemoveBlockItem {...(props as any)}>Delete</RemoveBlockItem>
      <BlockColorsItem {...(props as any)}>Colors</BlockColorsItem>
    </DragHandleMenu>
  );
}

export const BlockNoteEditor = memo(
  ({ nodeId, onChange, initialContent, selected = false, questions = [], signatures = [], times = [] }: Props) => {
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

    // Generate slash menu items with content placeholders if questions or signatures exist
    const getSlashItems = useCallback(
      async (query: string) => {
        const defaultItems = getDefaultReactSlashMenuItems(editor);
        const contentItems =
          questions.length > 0 || signatures.length > 0 || times.length > 0
            ? getContentSuggestionItems(editor, questions, signatures, times)
            : [];
        // Put content items BEFORE default items so "Content" section appears at the top
        const allItems = [...contentItems, ...defaultItems];
        return filterSuggestionItems(allItems, query);
      },
      [editor, questions, signatures, times],
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
          <SideMenuController
            sideMenu={(props) => (
              <SideMenu {...props} dragHandleMenu={FormNodeDragHandleMenu as any} />
            )}
          />
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
    // Re-render if nodeId changes
    if (prevProps.nodeId !== nextProps.nodeId) {
      return false;
    }
    
    // Re-render if questions array changes (important for answer menu updates)
    if (prevProps.questions?.length !== nextProps.questions?.length) {
      return false;
    }
    
    // Re-render if signatures array changes (important for signature menu updates)
    if (prevProps.signatures?.length !== nextProps.signatures?.length) {
      return false;
    }

    // Re-render if times change (important for Time menu items)
    if (prevProps.times?.length !== nextProps.times?.length) {
      return false;
    }
    
    // Check if any question content has changed
    if (prevProps.questions && nextProps.questions) {
      for (let i = 0; i < prevProps.questions.length; i++) {
        if (
          prevProps.questions[i]?.id !== nextProps.questions[i]?.id ||
          prevProps.questions[i]?.label !== nextProps.questions[i]?.label
        ) {
          return false;
        }
      }
    }
    
    // Check if any signature content has changed
    if (prevProps.signatures && nextProps.signatures) {
      for (let i = 0; i < prevProps.signatures.length; i++) {
        if (
          prevProps.signatures[i]?.id !== nextProps.signatures[i]?.id ||
          prevProps.signatures[i]?.label !== nextProps.signatures[i]?.label
        ) {
          return false;
        }
      }
    }

    // Check if any time content has changed
    if (prevProps.times && nextProps.times) {
      for (let i = 0; i < prevProps.times.length; i++) {
        if (
          prevProps.times[i]?.id !== nextProps.times[i]?.id ||
          prevProps.times[i]?.label !== nextProps.times[i]?.label ||
          prevProps.times[i]?.format !== nextProps.times[i]?.format
        ) {
          return false;
        }
      }
    }
    
    return true;
  },
);

BlockNoteEditor.displayName = 'BlockNoteEditor';
