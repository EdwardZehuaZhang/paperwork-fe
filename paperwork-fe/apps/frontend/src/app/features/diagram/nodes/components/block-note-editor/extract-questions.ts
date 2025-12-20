import type { FormAddress, FormCurrentTime, FormQuestion, FormSignature, FormTime } from './answer-menu';
import type { NodeData } from '@workflow-builder/types/node-data';

function getCustomLabel(fieldId: string, rawValue: unknown, fallbackLabel: string): string {
  if (typeof rawValue !== 'string') return fallbackLabel;

  const trimmed = rawValue.trim();
  if (!trimmed) return fallbackLabel;

  // Support values like "question1: Company name" by stripping the prefix.
  const colonIndex = trimmed.indexOf(':');
  if (colonIndex > -1) {
    const prefix = trimmed.slice(0, colonIndex).trim().toLowerCase();
    const expected = fieldId.trim().toLowerCase();

    if (prefix === expected) {
      const rest = trimmed.slice(colonIndex + 1).trim();
      return rest || fallbackLabel;
    }
  }

  return trimmed;
}

export interface FormContent {
  questions: FormQuestion[];
  signatures: FormSignature[];
  times: FormTime[];
  currentTimes: FormCurrentTime[];
  addresses: FormAddress[];
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
    return { questions: [], signatures: [], times: [], currentTimes: [], addresses: [] };
  }

  const { properties } = data;
  const questions: FormQuestion[] = [];
  const signatures: FormSignature[] = [];
  const times: FormTime[] = [];
  const currentTimes: FormCurrentTime[] = [];
  const addresses: FormAddress[] = [];

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

    // Extract all current time properties from formBody (currentTime1, currentTime2, ...)
    for (const [key, value] of Object.entries(formBody)) {
      if (/^currentTime\d+$/.test(key) && typeof value === 'string') {
        const timeNumber = key.replace('currentTime', '');
        currentTimes.push({
          id: key,
          label: `Current Time ${timeNumber}`,
          format: value,
        });
      }
    }

    // Extract all address properties from formBody (address1, address2, ...)
    for (const [key, value] of Object.entries(formBody)) {
      if (/^address\d+$/.test(key) && typeof value === 'string') {
        const addressNumber = key.replace('address', '');
        addresses.push({
          id: key,
          label: `Address ${addressNumber}`,
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

    // Extract all question, money, and signature properties from formBody
    for (const [key, value] of Object.entries(formBody)) {
      if (/^question\d+$/.test(key) && typeof value === 'string') {
        // Extract question number from key (e.g., "question1" -> "1")
        const questionNumber = key.replace('question', '');

        questions.push({
          id: key, // Use the property key as stable ID
          label: getCustomLabel(key, value, `Q${questionNumber}`),
        });
      } else if (/^signature\d+$/.test(key) && typeof value === 'string') {
        // Extract signature number from key (e.g., "signature1" -> "1")
        const signatureNumber = key.replace('signature', '');

        signatures.push({
          id: key, // Use the property key as stable ID
          label: `Signature ${signatureNumber}`,
        });
      } else if (/^money\d+$/.test(key) && typeof value === 'string') {
        const moneyNumber = key.replace('money', '');

        questions.push({
          id: key,
          label: getCustomLabel(key, value, `Money ${moneyNumber}`),
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

  return { questions, signatures, times, currentTimes, addresses };
}

// Backwards compatibility - keep the old function name
export function extractQuestionsFromNodeData(data?: NodeData): FormQuestion[] {
  return extractContentFromNodeData(data).questions;
}
