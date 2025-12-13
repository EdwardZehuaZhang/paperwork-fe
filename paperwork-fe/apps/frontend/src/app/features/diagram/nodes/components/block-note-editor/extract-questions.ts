import type { FormQuestion, FormSignature } from './answer-menu';
import type { NodeData } from '@workflow-builder/types/node-data';

export interface FormContent {
  questions: FormQuestion[];
  signatures: FormSignature[];
}

/**
 * Extracts questions and signatures from form node data properties.
 * Converts formBody properties into structured arrays of FormQuestion and FormSignature objects.
 *
 * @param data - The node data containing properties
 * @returns Object with questions and signatures arrays for use in content placeholders
 */
export function extractContentFromNodeData(data?: NodeData): FormContent {
  if (!data?.properties) {
    return { questions: [], signatures: [] };
  }

  const { properties } = data;
  const questions: FormQuestion[] = [];
  const signatures: FormSignature[] = [];

  // Check if this is a form node with formBody
  if ('formBody' in properties && typeof properties.formBody === 'object' && properties.formBody !== null) {
    const formBody = properties.formBody as Record<string, unknown>;

    // Extract all question and signature properties from formBody
    for (const [key, value] of Object.entries(formBody)) {
      if (key.startsWith('question') && typeof value === 'string') {
        // Extract question number from key (e.g., "question1" -> "1")
        const questionNumber = key.replace('question', '');
        
        questions.push({
          id: key, // Use the property key as stable ID
          label: `Q${questionNumber}`, // Display as Q1, Q2, etc.
        });
      } else if (key.startsWith('signature') && typeof value === 'string') {
        // Extract signature number from key (e.g., "signature1" -> "1")
        const signatureNumber = key.replace('signature', '');
        
        signatures.push({
          id: key, // Use the property key as stable ID
          label: `Signature ${signatureNumber}`, // Display as Signature 1, Signature 2, etc.
        });
      }
    }
  }

  return { questions, signatures };
}

// Backwards compatibility - keep the old function name
export function extractQuestionsFromNodeData(data?: NodeData): FormQuestion[] {
  return extractContentFromNodeData(data).questions;
}
