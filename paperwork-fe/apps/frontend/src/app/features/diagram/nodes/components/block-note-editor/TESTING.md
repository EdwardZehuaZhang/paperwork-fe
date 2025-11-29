# Testing the Answer Placeholder Feature

## Prerequisites

Ensure you have a Form node in your workflow diagram.

## Step-by-Step Testing Guide

### 1. Set Up Form Questions

1. Create or select a Form node in the diagram
2. The Form node automatically comes with 2 default questions:
   - **Question 1**: "Question 1" (default)
   - **Question 2**: "Question 2" (default)
3. (Optional) Open the properties panel (right side) and expand **"Form Body"** to customize:
   - **Question 1**: "What is the company name?"
   - **Question 2**: "What is the project budget?"

### 2. Add Answer Placeholders to the Note

1. Click on the Form node to select it
2. The node should expand to show the Preview section
3. Click inside the BlockNote editor
4. Press `/` or click the `+` button on the left side
5. You should see the **"Answers"** section **at the very top** of the menu (above "Headings")
6. Click on **"Q1 Answer"**
7. A yellow placeholder `[___Q1 Answer___]` should appear

### 3. Create a Template

Try creating a simple contract template:

```
AGREEMENT

This agreement is made between [___Q1 Answer___] and XYZ Services.

Project Budget: [___Q2 Answer___]

Terms and Conditions:
1. The client agrees to the stated budget
2. Payment terms: Net 30 days
3. Deliverables as outlined in the scope

Signatures:
_________________
Client Representative
```

### 4. Verify Placeholder Behavior

- **Visual**: Placeholders should have a yellow background
- **Non-editable**: You cannot edit the placeholder text directly
- **Deletion**: You can delete the entire placeholder with backspace
- **Insertion**: Each placeholder has a space after it for easy typing

### 5. Test Multiple Nodes

1. Create a second Form node
2. Add different questions to this node
3. Verify that:
   - Each node only shows its own questions in the "Answers" menu
   - No Q1/Q2 from the first node appears in the second node's menu
   - Each node maintains independent placeholders

### 6. Save and Reload

1. Add some answer placeholders to a form node
2. Save your work (the editor content is auto-saved in `node.data.editorContent`)
3. Refresh the page
4. Select the node again
5. Verify that the placeholders are still there with correct formatting

## Expected Behavior

### ✅ Correct Behavior

- Yellow background on all answer placeholders
- Placeholders appear in the "Answers" section of the slash menu
- Only questions from the current node appear
- Placeholders are preserved when saving/loading
- Can insert placeholders anywhere (headings, paragraphs, lists)

### ❌ Issues to Watch For

- If no "Answers" section appears:
  - Verify the node type is actually a Form node
  - Check browser console for errors
  - Make sure the node has the default questions (all new Form nodes should have Q1 and Q2 by default)
  
- If placeholders don't have yellow background:
  - Check browser console for errors
  - Verify the custom schema is loading correctly

- If questions from other nodes appear:
  - This would be a bug - each node should be isolated

## Testing Different Node Types

This feature only works with **Form nodes** that have a `formBody` property. 

Other node types (Notification, Decision, etc.) will:
- Not show the "Answers" section in the slash menu
- Not have answer placeholders available
- Still have access to all standard BlockNote features

## Future: Testing Answer Replacement

Once the form submission system is implemented, you'll be able to:

1. Send the form link to someone
2. They fill in the answers:
   - Q1: "Acme Corporation"
   - Q2: "$75,000"
3. Generate the final document
4. All `[___Q1 Answer___]` become "Acme Corporation"
5. All `[___Q2 Answer___]` become "$75,000"
6. Export to PDF with filled values

## Troubleshooting

### "Answers" section doesn't appear

```typescript
// Check if questions are being extracted
// In browser console:
console.log(node.data.properties.formBody);
```

Should show:
```json
{
  "question1": "What is the company name?",
  "question2": "What is the project budget?"
}
```

### Placeholders aren't saving

Check `node.data.editorContent` in the browser console. It should contain JSON with inline content like:

```json
{
  "type": "answer",
  "props": {
    "questionId": "question1",
    "label": "Q1"
  }
}
```

### No yellow background

Verify the styles are being applied in browser DevTools. Look for:
```css
background-color: #fff3b0;
padding: 2px 6px;
border-radius: 4px;
```

## Next Steps

After confirming this works, the next phase would be:

1. **Form Generation**: Create a public form URL from the questions
2. **Response Collection**: Store form submissions
3. **Answer Replacement**: Implement the `resolveAnswersInDocument()` function
4. **PDF Export**: Generate final documents with filled answers
5. **Signature Integration**: Handle signature fields specially
