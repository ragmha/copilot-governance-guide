---
title: Maintain the access lifecycle
section: Access Management
order: 3
description: Reconcile membership, activity and support before changing access.
verified: "2026-11-12"
diagram: access-lifecycle
checks:
  - question: Does low observed activity by itself explain why a person is not using Copilot?
    answer: No. Installation, network access, training or a legitimate period away could be relevant; investigate before acting.
  - question: What happens when someone leaves a directly licensed enterprise team?
    answer: The team assignment changes; check the plan's removal timing and whether another assignment path also grants access.
sources:
  - https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-access/grant-access
  - https://docs.github.com/en/enterprise-cloud@latest/copilot/tutorials/roll-out-at-scale/assign-licenses/remind-inactive-users
---

## What you will learn

- Connect assignment, onboarding, review and removal.
- Use activity as a prompt for investigation, not proof of performance.

## From assignment to review

For directly assigned enterprise teams, adding or removing a member affects the seat granted through that team. Enterprises using Enterprise Managed Users can synchronize a team with an identity-provider group. Other assignment paths and the plan's removal timing still need separate review; don't assume that every removal takes effect immediately. See [enterprise assignment](https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-access/grant-access).

The [inactive-user tutorial](https://docs.github.com/en/enterprise-cloud@latest/copilot/tutorials/roll-out-at-scale/assign-licenses/remind-inactive-users) describes using organization seat-assignment activity to identify people who may need help. Activity evidence has a scope: it is not a measure of a person's performance or proof that a seat is unnecessary.

## Worked example: an inactive seat

**Hypothetical starting state:** A recently licensed developer appears inactive in an organization-level seat report. They were away during part of the review period, and a second organization may also assign them access.

The owner confirms the report's scope and assignment date, then offers setup help instead of assuming the seat is unnecessary. The developer still needs access and reports a network setup issue. The owner routes that issue to support and records a later review. The possible second assignment remains an open question, not proof of duplicate access.

**Outcome:** The seat is retained while the issue is investigated. The activity report identified a support opportunity; it did not measure performance or verify usage across every client.

## Practice: reconcile a seat

**Prerequisites:** Use the hypothetical record above. A real report is optional and should be viewed only with permission.

1. List the known facts, the missing assignment source and one possible reason for inactivity.
2. Write a supportive follow-up and name the person responsible for resolving the network issue.
3. With an authorized, read-only sandbox report, compare a test user's assignment and last activity with the membership record. Otherwise, discuss how a second assignment could change the removal plan.

**Expected result:** A review note distinguishes reported inactivity from its unknown cause and names the next action. No seat has been removed.

<details>
<summary>Model answer</summary>

Keep the seat pending support; ask the access owner to confirm all assignment paths before proposing any removal. Set an organization-specific follow-up date. A report, notification or worksheet alone does not prove that the user can connect or that access has been revoked.

</details>
