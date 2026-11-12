---
title: Give useful instructions
section: Context Management
order: 2
description: Scope engineering guidance without confusing it with access control.
verified: "2026-11-12"
diagram: instructions-context
checks:
  - question: Do custom instructions guarantee that every response follows them?
    answer: No. Responses are non-deterministic, so outputs must still be reviewed.
  - question: Are all instruction types supported on every client and feature?
    answer: No. Check the current support matrix for the intended client and feature.
sources:
  - https://docs.github.com/en/copilot/concepts/prompting-and-context/custom-instructions
---

## What you will learn

- Choose the scope of shared instructions.
- Evaluate whether guidance actually helps a task.

## Guidance is context, not a permission

[Custom instructions](https://docs.github.com/en/copilot/concepts/prompting-and-context/custom-instructions) can be personal, repository-scoped or organization-scoped. The supported instruction types vary by client and feature. AI responses are non-deterministic: instructions may not be followed consistently, and they do not replace repository permissions or review.

Keep guidance specific to its audience. Repository-wide conventions belong with the repository; narrower instructions can avoid burdening unrelated tasks when supported. Avoid conflicting instructions.

## Worked example: a repository standard

**Hypothetical starting state:** A sample repository's maintainers want changes to include the project's existing tests. A first response proposes code but omits test instructions. The team drafts this repository-wide guidance: “For changes to this project, identify and run the relevant existing tests; report any that cannot run.”

The team repeats the same non-sensitive task in a fresh session on a supported client, then compares the response and actual test output. If the second response includes a test command but never executes it, the instruction has influenced the plan without proving the tests passed. A reviewer still checks the change and execution evidence.

**Outcome:** The draft offers a specific convention to evaluate. One comparison cannot guarantee future adherence or grant permissions.

## Practice: assess a proposed instruction

**Prerequisites:** The hypothetical instruction above and a local note. A non-sensitive sandbox repository and supported Copilot client are optional; model use can incur charges, so obtain explicit approval before a live test.

1. Write the task, expected behavior and evidence that would show a test actually ran.
2. Compare these fictional responses: A says “run the tests” with no result; B supplies a command and a successful execution log. Record what each establishes.
3. If an authorized, non-sensitive sandbox and model use are approved, compare fresh sessions with and without the instruction. Otherwise, discuss the fictional responses; do not modify repository settings.

**Expected result:** A review note distinguishes a proposed command from execution evidence and identifies the instruction owner. It does not claim that every response will comply.

<details>
<summary>Model answer</summary>

A demonstrates only a suggestion; B reports execution, which the reviewer should inspect for the relevant test and result. Neither guarantees future compliance. The repository owner maintains the guidance; repository access and required checks remain separate.

</details>
