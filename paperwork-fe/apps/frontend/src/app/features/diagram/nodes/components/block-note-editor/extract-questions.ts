import type { FormQuestion } from './answer-menu';
import type { NodeData } from '@workflow-builder/types/node-data';

/**
 * Extracts questions from form node data properties.
 * Converts formBody properties into a structured array of FormQuestion objects.
 * For Form nodes, always returns Q1 and Q2 regardless of whether they have values.
 *
 * @param data - The node data containing properties
 * @returns Array of FormQuestion objects for use in answer placeholders
 */
export function extractQuestionsFromNodeData(data?: NodeData): FormQuestion[] {
  if (!data?.properties) {
    return [];
  }

  const { properties } = data;
  const questions: FormQuestion[] = [];

  // Check if this is a form node with formBody
  if ('formBody' in properties && typeof properties.formBody === 'object' && properties.formBody !== null) {
    const formBody = properties.formBody as Record<string, unknown>;

    // Extract all question properties from formBody
    // For Form nodes, we always include question1 and question2 even if they're empty
    for (const [key, value] of Object.entries(formBody)) {
      // Only include fields that are actual questions (not other metadata like signature)
      if (key.startsWith('question') && typeof value === 'string') {
        // Extract question number from key (e.g., "question1" -> "1")
        const questionNumber = key.replace('question', '');
        
        questions.push({
          id: key, // Use the property key as stable ID
          label: `Q${questionNumber}`, // Display as Q1, Q2, etc.
        });
      }
    }
  }

  return questions;
}
