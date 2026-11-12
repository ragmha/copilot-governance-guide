---
title: Resolve policy scope
section: User Governance
order: 2
description: Trace where a user's policies come from and check conflicts before drawing conclusions.
verified: "2026-11-12"
diagram: policy-scope
checks:
  - question: Does the most restrictive organization policy always win within an enterprise?
    answer: No. The least restrictive usually applies across licensing organizations within one enterprise, with documented exceptions.
  - question: What handles delegated policies for directly enterprise-assigned users?
    answer: The separate Policies for enterprise-assigned users setting supplies their default.
sources:
  - https://docs.github.com/en/copilot/concepts/enterprise/policies
  - https://docs.github.com/en/copilot/reference/enterprise-administrators/policy-conflicts
---

## What you will learn

- Identify the seat source and relevant policy scope.
- Recognize when conflicting policies need a feature-specific check.

## Policies follow access

Enterprise administrators generally set policies first: enable, disable or delegate to organizations. Most policies apply to users licensed by the organization or enterprise, but some apply more broadly to resources. Enterprise-assigned users have a separate default for policies delegated to organizations. See [GitHub Copilot policies](https://docs.github.com/en/copilot/concepts/enterprise/policies).

When multiple licensing organizations within one enterprise disagree, the least restrictive setting usually applies, with exceptions. The [conflict reference](https://docs.github.com/en/copilot/reference/enterprise-administrators/policy-conflicts) lists IDE Chat as least restrictive and suggestions matching public code as most restrictive. Across multiple enterprises the most restrictive setting almost always applies, also with exceptions. Check the specific policy rather than treating either summary as a universal precedence algorithm.

## Worked example: two licensing organizations

**Hypothetical starting state:** A developer receives seats from two organizations in one enterprise. The enterprise delegates IDE Chat and suggestions matching public code to organizations. Organization A enables both; organization B disables both.

The administrator traces both seat sources and consults the conflict reference. IDE Chat uses the least restrictive organization, so the prediction is enabled. Suggestions matching public code uses the most restrictive organization, so the prediction is disabled. The administrator also checks the actual surface before asserting an effective setting.

**Outcome:** The expected results differ: IDE Chat enabled, suggestions matching public code disabled. These are predictions, not observed tests. A directly enterprise-assigned user instead needs the separate enterprise-assigned default checked for delegated policies.

## Practice: resolve a delegated setting

**Prerequisites:** The hypothetical facts above and the [policy documentation](https://docs.github.com/en/copilot/concepts/enterprise/policies). No settings need to be changed.

1. Write the enterprise decision, each licensing organization and its setting.
2. Use the conflict reference to state the expected outcome for each policy. Add the separate check for a directly assigned user.
3. In an authorized sandbox, read the relevant settings and use an approved test account to inspect the feature on the intended surface. Without a sandbox, compare your prediction with the model answer; do not call it observed behavior.

**Expected result:** A trace identifies both license sources, each policy's conflict rule and the unverified surface.

<details>
<summary>Model answer</summary>

Enterprise: delegated; A: enabled; B: disabled. Predict IDE Chat enabled and suggestions matching public code disabled, following their respective least- and most-restrictive rules. For a directly assigned person, inspect **Policies for enterprise-assigned users**. Confirm the supported surface before calling either outcome verified.

</details>
