---
title: Set the agent operating scope
section: Agent Governance
order: 2
description: Decide where cloud work is allowed and how humans review its output.
verified: "2026-11-12"
diagram: agent-operating-scope
checks:
  - question: Does enabling a cloud policy automatically grant repository write access?
    answer: No. Repository permissions and other applicable controls remain separate.
  - question: Is a pull request produced by an agent proof that its changes are safe to merge?
    answer: No. Review the changes and apply the repository's required checks and human approvals.
sources:
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/manage-copilot-in-the-cloud
  - https://docs.github.com/en/copilot/concepts/copilot-surfaces/copilot-on-github
---

## What you will learn

- Separate availability, repository scope and review.
- Select a bounded pilot without treating an agent as an approver.

## Where work can happen

The [Copilot in the cloud policy](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/manage-copilot-in-the-cloud) controls the unified cloud experience, including starting cloud sessions from supported local clients. Administrators can select organizations and block the feature in particular repositories. Existing repository permissions still matter; the [GitHub.com overview](https://docs.github.com/en/copilot/concepts/copilot-surfaces/copilot-on-github) states that without write access a session is read-only.

Cloud sandboxes, Actions-based environments and remote environments have different capabilities. Check the actual environment, repository protections and applicable settings rather than treating every cloud execution path as identical.

## Worked example: repository pilot

**Hypothetical starting state:** An organization plans a cloud pilot for a sample repository and excludes a sensitive repository. A developer has write access to the sample repository; another has read-only access. The sample repository already has a human review process.

The pilot owner checks the cloud policy and repository exclusion, then confirms each person's repository permission. The first developer can propose a non-sensitive test change for normal review; the second person's cloud session is read-only. An agent-generated pull request still goes through the repository's checks and human review.

**Outcome:** The team can predict different experiences based on repository access. A policy decision alone has not granted write access or proved the repository protection works.

## Practice: trace the operating scope

**Prerequisites:** The hypothetical facts above, or permission to inspect an existing authorized sandbox. Do not assign work or change repository settings in production.

1. List the cloud policy scope, the two repository states and each person's repository permission.
2. Predict which person can propose a change and which has a read-only session.
3. If permitted, inspect the existing sandbox policy and test accounts' access without changing them. Without a sandbox, discuss the evidence needed to prove an exclusion and a review gate work.

**Expected result:** A matrix separates feature availability, repository access and review responsibility. A written matrix is a prediction, not a configured or tested gate.

<details>
<summary>Model answer</summary>

The sample repository is in the pilot; the sensitive one is excluded. The writer may propose work subject to applicable policy and review; the read-only user has a read-only session. An authorized test of the actual configuration is needed before claiming enforcement.

</details>
