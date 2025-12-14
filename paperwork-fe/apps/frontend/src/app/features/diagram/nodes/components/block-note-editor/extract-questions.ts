import type { FormQuestion, FormSignature, FormTime } from './answer-menu';
import type { NodeData } from '@workflow-builder/types/node-data';

export interface FormContent {
  questions: FormQuestion[];
  signatures: FormSignature[];
  times: FormTime[];
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
    return { questions: [], signatures: [], times: [] };
  }

  const { properties } = data;
  const questions: FormQuestion[] = [];
  const signatures: FormSignature[] = [];
  const times: FormTime[] = [];

  // Check if this is a form node with formBody
  if ('formBody' in properties && typeof properties.formBody === 'object' && properties.formBody !== null) {
    const formBody = properties.formBody as Record<string, unknown>;

    // Extract all time properties from formBody (time1, time2, ...)
    for (const [key, value] of Object.entries(formBody)) {
      if (/^time\d+$/.test(key) && typeof value === 'string') {
        const timeNumber = key.replace('time', '');
        times.push({
          id: key,
          label: `Time ${timeNumber}`,
          format: value,
        });
      }
    }

    // Backwards compatibility: legacy `time` key becomes `time1`
    if (times.length === 0 && typeof formBody.time === 'string') {
      times.push({
        id: 'time1',
        label: 'Time 1',
        format: formBody.time,
      });
    }

    // Extract all question and signature properties from formBody
    for (const [key, value] of Object.entries(formBody)) {
      if (/^question\d+$/.test(key) && typeof value === 'string') {
        // Extract question number from key (e.g., "question1" -> "1")
        const questionNumber = key.replace('question', '');
        
        questions.push({
          id: key, // Use the property key as stable ID
          label: `Q${questionNumber}`, // Display as Q1, Q2, etc.
        });
      } else if (/^signature\d+$/.test(key) && typeof value === 'string') {
        // Extract signature number from key (e.g., "signature1" -> "1")
        const signatureNumber = key.replace('signature', '');
        
        signatures.push({
          id: key, // Use the property key as stable ID
          label: `Signature ${signatureNumber}`, // Display as Signature 1, Signature 2, etc.
        });
      } else if (/^money\d+$/.test(key) && typeof value === 'string') {
        const moneyNumber = key.replace('money', '');

        questions.push({
          id: key,
          label: `Money ${moneyNumber}`,
        });
      } else if (key === 'signature' && typeof value === 'string') {
        // Backwards compatibility: legacy `signature` key becomes `signature1`
        signatures.push({
          id: 'signature1',
          label: 'Signature 1',
        });
      }
    }
  }

  return { questions, signatures, times };
}

// Backwards compatibility - keep the old function name
export function extractQuestionsFromNodeData(data?: NodeData): FormQuestion[] {
  return extractContentFromNodeData(data).questions;
}
