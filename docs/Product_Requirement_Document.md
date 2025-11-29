## Paperwork — Product Requirements Document (Narrative Draft)

> **Working title:** Paperwork
> **One-liner:** “Turn messy email + Excel + Word admin chaos into clear, guided workflows that live in one place.”

---

### 1. Background & Vision

In universities, governments and large orgs, “small” admin tasks are bizarrely painful:

* To buy a simple team meal with school funds, you:

  * Ask HOD about budget.
  * Ask admin which budget code to use.
  * Buy the thing.
  * Photograph the receipt.
  * Log into SAP / Workday.
  * Upload Excel templates, receipts, approvals.
  * Wait in a black box while finance, admin, and others “do something”.

All the **rules and know-how live in people’s heads**:

* “This Excel column should *exclude* GST.”
* “Use this year’s template, not last year’s.”
* “Don’t forget to get Prof X’s approval before sending to finance.”
* “Winnie is the one who knows this special code — email her.”

That means:

* New staff keep asking, “How do I do claims?”
* Admins keep saying, “The system can only do like that.”
* People pass around Excel / Word documents, edit them, email back and forth, screenshot approvals, attach those screenshots into another system.
* If you mess up one small thing, the whole chain restarts.

**Vision:**
Put the *process* into the system, not into people’s heads.

Paperwork should:

* Let **admins and project owners** model their real workflows (claims, contracts, registrations, payouts, etc.) as node-based flows.
* Let **normal staff (“taskers”)** simply search “food claim” or “pay external examiner”, follow a guided form, and click submit.
* Route the request to the right people in the right order.
* Make the status visible to everyone.
* Eliminate copy–paste, redundant attachments, and “can you resend the latest Excel?” emails.

Think:
**“Toyota production line mindset, applied to office admin workflows.”**
People can come and go, but the process remains embedded in the system.

---

### 2. Problem Statement

#### 2.1 Today’s Reality

Common patterns across the stories in the transcript:

* **Everything runs on email + Excel + Word + PDFs.**

  * Excel templates are manually passed around and edited.
  * Word contracts require manual find/replace of party names, amounts, clauses.
  * Approvals come via email; people screenshot the email and upload it as “proof”.

* **Black box workflows.**

  * Once you send a request (claim / form / contract), it disappears.
  * You don’t know:

    * Who has it.
    * What stage it’s stuck in.
    * Whether someone forgot to process it.
  * You just “wait for an email”.

* **Hidden knowledge.**

  * What’s the Maybank unique ID?
    → “Email some funny person and ask.”
  * Should I include GST or not?
    → Buried in a PDF nobody reads, or in someone’s memory.
  * Which Excel template is the latest?
    → “Please use the *new* template” after you’ve filled the old one.

* **Inefficient approvals.**

  * Boss signs wrong version → repeat the entire chain.
  * Multiple bosses sign in sequence via email/attachments.
  * Versioning chaos: Excel v1, v2, v3… across email threads.

* **Rigid vendor tools.**

  * SAP, Workday and similar systems:

    * Cover some standardized flows (e.g. basic claims).
    * Are mostly unchangeable by local admins.
    * Force everything else back into Excel/email land.

#### 2.2 Why this matters

* Massive **time waste** for staff, admins, and academic leaders.
* High **error rate** (wrong template, wrong code, wrong GST, missed approver).
* No **traceable, human-friendly history** when something goes wrong.
* Heavy **training burden** for new staff (“admin lore” + “tribal knowledge”).
* Organizations cannot easily **standardize or improve** processes.

---

### 3. Product Concept

**Paperwork** is a workflow platform focused specifically on **administrative workflows** (claims, contracts, budgeting, payouts, registrations, etc.), not generic “project tasks”.

2 main sides:

1. **Tasker side (normal staff / users)**

   * See a **Google-style search bar** on a dashboard.
   * Type “food claim”, “external examiner payment”, “Maybank vendor setup”.
   * Get a small set of relevant, curated workflows.
   * Pick one, fill a guided form, attach receipts, and hit submit.
   * See a clear **status / progress bar** (“30% – waiting for HOD approval”).

2. **Workflow owner side (admins / project owners)**

   * Use a **node-based builder** on a canvas to define:

     * Steps in the workflow (nodes).
     * Who is responsible at each step.
     * What fields/forms appear at each step.
     * What gets checked/computed.
   * Define once, re-use many times.
   * Update workflows over time with version control.

Everything lives in **one platform**:

* No emailing Excel.
* No uploading Excel into SAP just to have SAP copy/paste data into some internal field.
* No screenshotting approvals.

---

### 4. Users & Personas

#### 4.1 Tasker (Normal Staff / Lecturer / Student Leader)

* Wants to:

  * Claim reimbursements.
  * Request budgets.
  * Pay vendors / external examiners.
  * Submit lists (e.g. “hours taught”, “student emails”).
* Pain points:

  * Doesn’t know which form or template to use.
  * No idea who to email.
  * Fear of “doing it wrong” and being asked to redo.
* Success for them:

  * Search → choose workflow → fill → submit → see where it is.

#### 4.2 Workflow Owner / Admin (e.g. Winnie from Admin, Finance Officer)

* Designs and maintains workflows for their department or function.
* Examples:

  * Budget claims process.
  * External examiner payment process.
  * Contract generation & signing sequence.
  * Data collection for central reporting (hours, emails, etc.).
* Pain points:

  * Building and updating Excel/Word templates.
  * Chasing people for information.
  * Manually consolidating dozens of Excel files.
* Success for them:

  * Intuitive builder to create “one true flow”.
  * Less email chasing.
  * Confidence everything passes through the right checks.

#### 4.3 Approvers (HODs, Directors, Finance, External Parties)

* Role:

  * Approve or reject parts of a workflow.
* Today:

  * Receive long emails or Excel attachments.
  * Need to manually inspect every field.
  * May have to sign multiple times when versions change.
* Success:

  * See **only what they need** in a short, clean form.
  * Click “approve / reject” with optional comments.
  * Have digital signatures / audit trail embedded.

#### 4.4 Super Admin / Org Owner (e.g. University IT / Central Admin)

* Sets global policies and permissions.
* Approves which departments can define which workflows and nodes.
* Cares about:

  * Data residency and security.
  * Role-based permissions.
  * Integration with existing systems (SAP, payroll, banks, etc.).

---

### 5. Key Use Cases (Story-Driven)

#### 5.1 Simple Food Claim (Core MVP story)

**Today:**

* Staff emails HOD: “Can I treat students to a meal?”
* HOD approves via email → staff screenshots the email.
* Staff buys meal, keeps receipt.
* Logs into Workday / SAP, uploads receipt + approval screenshot.
* Fills Excel or forms by hand with budget codes, project numbers, etc.
* Waits in the dark for finance to process.

**With Paperwork:**

1. **Staff / Tasker**

   * Logs into Paperwork.
   * Types `food claim` into search bar.
   * Sees **“Entertainment / Food Claim (DID)”** workflow.
   * Clicks it → gets Step 1 form:

     * Event description.
     * Date.
     * Number of people.
     * Estimated amount.
     * Project or cost centre (with lookup from internal lists).
   * Clicks “Submit pre-approval”.

2. **HOD Approver**

   * Sees a **card** on their dashboard:

     * “Food claim – $xxx – from [Staff Name]”.
     * Key fields summarized.
   * Clicks in:

     * Can scroll through details.
     * Can add comments.
     * Approve / Reject with digital signature.
   * On approve:

     * Staff sees green “You may now spend up to $xxx”.

3. **Staff After Spending**

   * Returns to same ticket.
   * Uploads receipt photo(s).
   * Confirms final amount.
   * Clicks “Submit for reimbursement”.

4. **Admin / Finance**

   * Receive a prepared form with:

     * All necessary fields already validated.
     * Project code, vendor code, taxes correctly mapped.
   * Approve → route to payroll / bank integration.

5. **Staff**

   * Dashboard shows:

     * Status bar: “Submitted → HOD approved → Finance approved → Payment scheduled.”
     * No emails, no Excel.

#### 5.2 External Examiner Payment

* Workflow involves:

  * Registering an external examiner.
  * Generating a contract document.
  * Getting multiple bosses to sign.
  * Paying them via bank.
* Paperwork should allow:

  * A modular contract builder with variable fields (name, amount, dates).
  * Optional clauses (e.g. IP clause on/off).
  * Digital signing sequences (boss → external → final archive).
  * Clear history for who approved what and when.

#### 5.3 Mass Data Collection (Hours, Emails, etc.)

* Task owner (admin) wants to collect:

  * Teaching hours across all staff, or
  * All students’ personal emails from multiple programs.
* Today:

  * Sends Excel template to all directors → they forward to staff → staff fill → send back → admin consolidates manually into one master Excel.
* With Paperwork:

  * Admin creates a **“Hours Collection” workflow**:

    * Fields: person, role, hours, course, etc.
  * Generates a link or assigns it to a group.
  * Everyone fills via a web form.
  * Data auto-consolidated into a central view/export.

---

### 6. Scope for MVP (v0)

**Goal of MVP:**
Demonstrate end-to-end value on **one or two concrete workflows** (e.g. food claim + a simple contract), not solve everything.

#### 6.1 Core Capabilities

1. **Authentication & Basic Roles**

   * Users can log in (SSO or simple auth).
   * Simple roles:

     * Tasker
     * Workflow Owner
     * Approver
     * Super Admin (for now, limited to configuration)

2. **Tasker Dashboard**

   * Global search bar (“What do you want to do?”).
   * List of:

     * Active tickets with progress.
     * Completed tickets (basic history).
   * Each ticket shows:

     * Title, status, last updated, next step.

3. **Workflow Discovery**

   * Search term → list of matching workflows (by title, tags, department).
   * Basic filters (e.g. “DID only”).

4. **Guided Forms / Steps**

   * Once a workflow is selected:

     * Tasker sees step-by-step form.
     * Simple field types: text, number, date, dropdown, file upload.
   * Validation:

     * Required fields.
     * Simple numeric checks (e.g. > 0).
   * At submit, a ticket is created.

5. **Routing & Approvals**

   * Node-based logic in the background:

     * Node types for MVP:

       * Form node (user fills fields).
       * Approval node (user reviews and approves/rejects).
       * Notify / Inform node (no action needed).
   * Routing:

     * On approval → next node.
     * On rejection → ticket returns to previous node with comments.

6. **Approver View**

   * Approvers see:

     * List of tickets needing their action.
     * Clear due date / priority.
   * Detail view:

     * Relevant fields only.
     * Approval buttons:

       * Approve (optionally add comment).
       * Reject (comment required).
   * Digital signature UX (simple “sign as [Name] @ [Role]”).

7. **Workflow Builder (Owner Side) — MVP Level**

   * A canvas with draggable nodes and connecting lines (React Flow-style).
   * Owners can:

     * Add Start node.
     * Add Form nodes (define fields + who fills it).
     * Add Approval nodes (assign to specific roles/users).
     * Add End node.
   * Simple versioning:

     * “Draft” vs “Published”.
     * Once published:

       * New tickets use the new version.
       * Existing tickets continue on the old.

8. **Basic Audit Trail**

   * Each ticket shows:

     * Timeline of events (created, approved, rejected, re-submitted).
     * Who did what, when.

9. **No AI, No Complex Analytics (MVP)**

   * Explicitly **no AI** in v0.
   * No fancy dashboards/analytics yet; only basic lists and exports.

---

### 7. UX Principles & Style

* **One-page mental model for taskers.**

  * They should feel like everything is happening in “one place”, not hopping through multiple systems.
  * Where possible, use one main canvas/board metaphor.

* **Google-like simplicity on the front.**

  * Search bar front and center.
  * Clear suggestions and workflow names.

* **Node-based clarity on the back.**

  * Workflow owners see the “railway map” of their processes.
  * Each node is simple and explainable.

* **Show progress, kill the black box.**

  * Status bar with stages.
  * Text like: “Waiting for HOD review”, “With Finance”, “Completed”.

* **Minimize cognitive load.**

  * Approvers should see minimal, high-signal information.
  * Taskers should see only the fields they must fill.

* **Respect existing habits, but remove stupid parts.**

  * Accept that people are used to forms and signatures.
  * Improve routing, versioning, and data reuse, not everything at once.

---

### 8. Non-Goals / Out of Scope (for MVP)

* Full **HR suite** (leave, HR performance, etc.) — that’s Workday territory.
* Full **financial system** (general ledger, bank reconciliation, tax filings).
* Deep **role-based permission matrix** with complex custom roles.

  * For MVP we keep role model simple.
* Deep **contract redlining at sentence-level** (Google Docs-level complexity).
* Full **mobile app** — responsive web is enough for v0.
* Heavy **AI features** (natural language workflow creation, auto-coding, etc.).

---

### 9. Architecture & Tech Notes (High-Level, Non-technical)

This is deliberately non-deep-tech, just enough for product framing:

* Core concepts:

  * **Workflow definition**

    * A graph of nodes and edges.
    * Owned by a workflow owner.
    * Has versions.
  * **Ticket**

    * A single run of a workflow (e.g. “Ben’s food claim #123”).
    * Stores all submitted data + history.
  * **Node**

    * A specific step: form, approval, notify, etc.
  * **User**

    * Has one or more roles (tasker, approver, owner).

* Data routing:

  * “Hot path”: ticket moves from node to node, carrying data.
  * “Cold storage”: old tickets and versions are mostly archived, occasionally queried.

* Integrations (future):

  * Bank APIs (for payables).
  * SAP/Workday connectors.
  * Organization SSO.

---

### 10. Risks & Open Questions

#### 10.1 Complexity of Role & Permission System

* Danger:

  * Role-based permissions can explode into a matrix that nobody understands or controls.
* MVP mitigation:

  * Keep roles coarse (Tasker, Approver, Owner, Super Admin).
  * Limit who can create workflows.
  * Workflow ownership is **single-owner** to avoid edit chaos.
* Open question:

  * How to scale from simple roles to real enterprise role trees later?

#### 10.2 Workflow Versioning & In-flight Tickets

* Problem:

  * If a workflow changes (e.g. HOD step added), what happens to tickets already midway?
* Proposed rule of thumb:

  * New version applies only to **new tickets**.
  * For major schema changes, allow “rollback” behaviour:

    * On critical fixes, optionally roll all in-flight tickets back to a stable earlier step.
* Needs further design and edge-case handling.

#### 10.3 Data Schema Explosion

* Every node can have different fields; across workflows this can get messy.
* Strategy:

  * Enforce simple, reusable field types for MVP.
  * Avoid hyper-customised schemas per ticket early on.
  * Later introduce custom field libraries per organisation.

#### 10.4 Legal & Compliance Responsibility

* Question:

  * If a workflow is misconfigured (e.g. missing approver) and something goes wrong, who is responsible?
* Position:

  * The **workflow owner** (and their organization) remains responsible for process design.
  * Paperwork is the “railway tracks”, not the “train inspector”.

#### 10.5 Go-to-Market / Beachhead

* Biggest strategic risk:

  * Paperwork solves a very broad, horizontal pain.
    “So substantial it risks solving nothing for nobody.”
* Proposed beachhead:

  * Pick **one or two workflows** in a specific context (e.g. a single faculty’s claims and external examiner payments).
  * Nail them so hard that:

    * Staff love the experience.
    * Admins see time saved.
    * Leadership sees fewer errors and better visibility.

---

### 11. Success Metrics (Early)

For the first pilot / MVP:

* **Quantitative**

  * Time to complete a typical food claim:

    * From first submission to final approval compared to baseline.
  * Number of back-and-forth emails per claim/contract.
  * Number of rejected / resubmitted forms due to “wrong template / wrong field”.
  * Number of tickets processed per month via Paperwork.

* **Qualitative**

  * Tasker satisfaction: “I know what to do and where my request is.”
  * Admin satisfaction: “I spend less time chasing and consolidating.”
  * Approver satisfaction: “It’s easy to approve things correctly.”

---

### 12. Roadmap (Narrative)

1. **Phase 0 — Figma & Narrative**

   * Turn this PRD into:

     * Key screens: tasker dashboard, search, workflow list, ticket view, approver view, workflow builder canvas.
   * Validate with a few admin/staff users:

     * Does this match their mental model and pain?

2. **Phase 1 — MVP Build**

   * Implement:

     * Authentication & roles.
     * Tasker dashboard + search.
     * Simple workflow builder.
     * Ticket engine (node transitions).
     * One or two workflows fully implemented (e.g. food claim, simple contract).

3. **Phase 2 — Pilot & Learn**

   * Run pilot with a small department.
   * Measure metrics and gather stories.
   * Adjust UX, add missing field types, iron out edge cases.

4. **Phase 3 — Deepening**

   * Add:

     * More node types (lookups, conditionals, branching).
     * Simple analytics.
     * Early integrations (export to SAP / bank, etc.).