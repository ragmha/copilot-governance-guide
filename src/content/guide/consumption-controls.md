---
title: Choose consumption guardrails
section: Billing & Cost Control
order: 3
description: Distinguish user consumption limits from controls on metered charges.
verified: "2026-11-12"
diagram: consumption-controls
scenarioDiagram: budget-scenario
checks:
  - question: Can a cost-center metered budget extend a user's exhausted user-level budget?
    answer: No. A user-level budget hard stop still blocks the user even if the cost center has metered budget remaining.
  - question: What is the difference between an alert-only threshold and an enforced stop?
    answer: An alert-only threshold notifies an owner while spending may continue; an enforced limit blocks applicable metered use when reached.
sources:
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets
---

## What you will learn

- Distinguish the different budgets and their scope.
- Choose a response to an alert or enforced stop.

## Controls are not interchangeable

[Budget controls](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets) distinguish user-level budgets, which cap an individual's total credit consumption and always hard-stop, from cost-center, organization and enterprise metered-spend controls. A cost-center metered budget does not cap its share of included usage or override an exhausted user-level budget.

Resolve user-level budget (ULB) precedence by specificity, not by choosing the smallest amount: individual ULB, then cost-center ULB, then universal ULB. The first configured applicable value wins. An included usage control for a cost center separately limits its draw on the shared included pool; a cost-center metered budget limits charges in the metered phase. The [budget documentation](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets) explains that these controls are independent and spending limits enforce a stop only when configured to do so.

## Worked example: a blocked user

**Hypothetical starting state:** A user has a universal ULB of $20, a cost-center ULB of $10 and an individual ULB of $15. The user has consumed $15 worth of credits in the current cycle. The shared included pool and the cost-center metered budget both have headroom. These amounts illustrate the rules, not recommended limits.

The individual ULB is the most specific, so $15 applies even though the cost-center default is lower. The user's applicable ULB is exhausted, so a new credit-consuming request is blocked. Remaining pool or metered-budget headroom does not override the hard stop. The owner must investigate and obtain approval before changing any control.

**Outcome:** The result is a ULB block, not proof that the shared pool or metered budget is exhausted. An enforced metered limit could independently block metered use even when a ULB has headroom.

## Practice: trace a request

**Prerequisites:** Use the hypothetical budgets above and the [budget reference](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets). No live budget or spend is needed.

1. Write down all three ULBs and circle the effective one by specificity.
2. Compare the user's consumption with that ULB. Decide whether the pool and metered controls are reached for this request.
3. With authorized read-only sandbox access, compare existing test settings and the applicable precedence. Otherwise, work through the example offline. Do not change limits or generate billable usage.

**Expected result:** The trace identifies the $15 individual ULB and a hard stop before relying on remaining pool or metered headroom. This calculation is not a live verification.

<details>
<summary>Model answer</summary>

The individual ULB overrides the $10 cost-center and $20 universal defaults. At $15 consumed it is exhausted; the request is blocked. The separate included-usage and metered-spending controls still matter when the ULB permits a request. For detailed budgeting, see the [AI Credits Learning Guide](https://ragmha.github.io/ai-credits-guide/).

</details>
