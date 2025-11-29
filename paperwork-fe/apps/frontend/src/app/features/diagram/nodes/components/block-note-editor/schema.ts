import {
  BlockNoteSchema,
  defaultBlockSpecs,
  defaultInlineContentSpecs,
  defaultStyleSpecs,
} from '@blocknote/core';

import { AnswerInline } from './answer-inline';

/**
 * Extended BlockNote schema for Form nodes.
 * Includes the custom "answer" inline content type for answer placeholders.
 */
export const formNodeSchema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
  },
  inlineContentSpecs: {
    ...defaultInlineContentSpecs,
    answer: AnswerInline,
  },
  styleSpecs: {
    ...defaultStyleSpecs,
  },
});

/**
 * Type-safe editor for Form nodes
 */
export type FormNodeEditor = typeof formNodeSchema.BlockNoteEditor;
