# BlockNote Answer Placeholder System

## Overview

This system enables Form nodes to have dynamic answer placeholders in their BlockNote editors. These placeholders act as "variables" that reference questions defined in the Form Body section of the properties panel.

## How It Works

### 1. **Custom Inline Content: Answer Placeholders**

Answer placeholders are custom inline content blocks that display as:

```
[___Q1 Answer___]
```

with a yellow background (`#fff3b0`). They are:
- Non-editable tokens (like mentions)
- Linked to specific questions via `questionId`
- Scoped to individual nodes (no cross-node pollution)

### 2. **Form Node Structure**

Form nodes have a `formBody` property in their schema with questions:

```typescript
formBody: {
  question1: "What is the company name?",
  question2: "What is the project budget?",
  signature: "yes"
}
```

### 3. **Question Extraction**

The `extractQuestionsFromNodeData()` utility:
- Scans the node's `properties.formBody`
- Identifies all fields starting with `"question"`
- Returns a structured array:

```typescript
[
  { id: "question1", label: "Q1" },
  { id: "question2", label: "Q2" }
]
```

### 4. **Dynamic Slash Menu**

When editing a Form node's BlockNote editor:
1. Press `/` or click the `+` button
2. A new **"Answers"** section appears in the menu
3. Items are dynamically generated from the node's questions:
   - Q1 Answer
   - Q2 Answer
   - etc.

### 5. **Inserting Placeholders**

Selecting an answer item from the menu:
- Inserts the custom inline content at the cursor
- Links it to the specific question via `questionId`
- Displays with yellow background formatting

## File Structure

```
block-note-editor/
├── answer-inline.tsx          # Custom inline content definition
├── answer-menu.ts             # Suggestion menu items generator
├── schema.ts                  # Extended BlockNote schema
├── extract-questions.ts       # Utility to extract questions from node data
├── block-note-editor.tsx      # Main editor component
└── index.ts                   # Exports
```

## Usage Example

### In a Form Node

1. **Define questions** in the properties panel:
   - Question 1: "What is the company name?"
   - Question 2: "What is the project budget?"

2. **Edit the note template**:
   - Click the node to expand
   - In the Preview section, type `/`
   - Select "Q1 Answer" from the "Answers" group
   - The text `[___Q1 Answer___]` appears with yellow background

3. **Save and use**:
   - The placeholder is stored in `node.data.editorContent`
   - Later, when form responses exist, these placeholders can be replaced with actual answers during PDF/HTML export

## Future: Answer Replacement

When implementing the form submission and document generation:

```typescript
function resolveAnswersInDocument(
  blocks: PartialBlock[],
  answersByQuestionId: Record<string, string>
): PartialBlock[] {
  // Walk the document tree
  // Find all inline content with type: "answer"
  // Replace with StyledText using answersByQuestionId[questionId]
  // Return modified document for PDF export
}
```

Example usage:
```typescript
const answers = {
  question1: "Acme Corp",
  question2: "$50,000"
};

const filledDocument = resolveAnswersInDocument(
  node.data.editorContent,
  answers
);

// Export filledDocument to PDF
```

## Key Design Decisions

### Why Custom Inline Content (not Blocks)?

Answer placeholders use **inline content** instead of full blocks because:
- They can be inserted anywhere (paragraphs, headings, lists)
- They flow naturally with surrounding text
- They're easier to style inline with formatting

### Why Yellow Background?

- High visibility in the editor
- Clear distinction from regular text
- Matches common "placeholder/variable" UI patterns

### Why Scoped to Node?

Each node maintains its own:
- `questions` array
- `editorContent` state
- Slash menu items

This ensures:
- No question leakage between nodes
- Independent form definitions
- Isolated document templates

## Extension Points

### Adding More Question Fields

To support more questions, update `form/schema.ts`:

```typescript
formBody: {
  question1: { type: 'string' },
  question2: { type: 'string' },
  question3: { type: 'string' }, // New question
  // ...
}
```

The system will automatically:
- Extract the new question
- Add it to the "Answers" menu
- Allow insertion in the editor

### Custom Styling

To change placeholder appearance, modify `answer-inline.tsx`:

```typescript
render: (props) => (
  <span
    style={{
      backgroundColor: '#your-color',
      // ... custom styles
    }}
  >
    {/* custom rendering */}
  </span>
)
```

### Export Formatting

Customize how placeholders appear in exports via `toExternalHTML`:

```typescript
toExternalHTML: (props) => (
  <span className="custom-export-class">
    {/* export-specific rendering */}
  </span>
)
```

## Technical Notes

- **Schema persistence**: The custom schema is client-side only; server sees standard BlockNote JSON
- **Performance**: Questions are extracted via `useMemo` to avoid recalculation
- **Type safety**: Full TypeScript support with `FormNodeEditor` type
- **Lazy loading**: BlockNote editor is lazy-loaded to reduce initial bundle size
