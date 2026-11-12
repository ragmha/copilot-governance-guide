---
title: Decide who pays and who responds
section: Billing & Cost Control
order: 2
description: Assign responsibility for licenses, metered usage and financial reporting.
verified: "2026-11-12"
diagram: billing-ownership
checks:
  - question: Does an assigned seat eliminate the need to plan for metered consumption?
    answer: No. Seat access and metered AI-credit consumption are separate billing questions.
  - question: Is a forecast the same thing as authorization to incur charges?
    answer: No. A forecast estimates usage; your organization's approval process authorizes spending.
sources:
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/billing
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets
---

## What you will learn

- Separate seat ownership from usage funding.
- Name an owner for budget alerts and reconciliation.

## The financial decision

[GitHub billing documentation](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/billing) describes usage in AI credits. Copilot Business and Enterprise include a shared pool; Copilot access has no included allowance and metered usage starts with the first use. Check the plan and paid-usage policy before estimating exposure.

A forecast estimates possible consumption. A budget may alert or enforce a stop depending on its configuration. Neither replaces your organization's authority to approve purchases or charges.

## Worked example: shared funding

**Hypothetical starting state:** A Copilot Business pilot has a shared included pool, a platform team that manages seats, and a finance team that approves metered spending. The pilot has an alert-only metered threshold; no one has been named to respond.

The platform owner asks finance who will receive alerts and whether the business values continuity or a hard stop. Finance chooses a named responder and retains approval authority. The team records that an alert-only threshold can be crossed while charges continue. The enterprise metered budget does not cap license fees; the [budget documentation](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets) explains the distinction.

**Outcome:** The proposal names a seat owner, spending approver and alert responder. It does not configure a threshold or approve additional spending. If the pool is exhausted, the paid-usage policy and applicable enforced limits determine whether metered use can continue.

## Practice: route a budget alert

**Prerequisites:** Paper or a local note. Assume the hypothetical pilot above; do not make a purchase or change a budget.

1. List who owns seat assignment, who approves metered spending and who investigates an alert.
2. Record whether the example threshold stops usage, and list the separate license-fee question.
3. If you have an authorized sandbox and billing read access, inspect an existing test budget's scope and stop setting without saving changes. Otherwise, discuss the alert-only case.

**Expected result:** A response record identifies the owner and the difference between an alert, a stop and purchase approval. The worksheet does not establish a configured budget.

<details>
<summary>Model answer</summary>

The platform team owns seats; finance approves metered spending and assigns an alert responder. The example is alert-only, so charges can continue. Review license fees separately and escalate any proposed change through the organization's approval process.

</details>

For detailed credit calculations and budgeting, see the [AI Credits Learning Guide](https://ragmha.github.io/ai-credits-guide/).
