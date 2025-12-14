import {
  BlockNoteSchema,
  defaultBlockSpecs,
  defaultInlineContentSpecs,
  defaultStyleSpecs,
} from '@blocknote/core';

import { AnswerInline } from './answer-inline';
import { SignatureInline } from './signature-inline';
import { TimeInline } from './time-inline';

/**
 * Extended BlockNote schema for Form nodes.
 * Includes custom "answer" and "signature" inline content types for placeholders.
 */
export const formNodeSchema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
  },
  inlineContentSpecs: {
    ...defaultInlineContentSpecs,
    answer: AnswerInline,
    signature: SignatureInline,
    time: TimeInline,
  },
  styleSpecs: {
    ...defaultStyleSpecs,
  },
});

/**
 * Type-safe editor for Form nodes
 */
export type FormNodeEditor = typeof formNodeSchema.BlockNoteEditor;
