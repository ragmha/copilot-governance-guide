---
title: Choose an assignment path
section: Access Management
order: 2
description: Decide who assigns seats and what each assignment path means for policy and ownership.
verified: "2026-11-12"
diagram: access-assignment
checks:
  - question: Does enabling Copilot for an organization automatically give all its members a seat?
    answer: No. An organization owner must choose how to grant access, including whether all members or selected members receive seats.
  - question: What should an enterprise check before directly assigning seats?
    answer: Check the plan supports direct assignment, set policies for enterprise-assigned users, and review budgets and network requirements.
sources:
  - https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-access/grant-access
  - https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/administer-copilot/manage-for-organization/manage-access/grant-access
---

## What you will learn

- Distinguish enterprise assignment from organization assignment.
- Choose an owner and verify the policies that follow a seat.

## The decision

A person needs an assigned seat. The available assignment paths depend on the plan: an enterprise owner can directly assign seats to individuals or enterprise teams with Copilot access or Copilot Business. With Copilot Business or Enterprise, the enterprise can instead enable organizations to assign seats. An organization owner then chooses who receives access. See [enterprise assignment](https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-access/grant-access) and [organization assignment](https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/administer-copilot/manage-for-organization/manage-access/grant-access).

Access to Copilot is not the same decision as repository permissions. Before assignment, GitHub recommends checking policies, budgets and network requirements. For enterprise-assigned people, set **Policies for enterprise-assigned users**: the separate default determines the outcome when a policy is set to “Let organizations decide.”

## Worked example: a controlled pilot

**Hypothetical starting state:** A Copilot Business enterprise plans a pilot for a team of four. The enterprise owner can assign directly; the team's organization is also eligible for organization assignment. One pilot member lacks access to the intended repository.

The access owner chooses a directly assigned enterprise team because a named owner can maintain its membership. Before assignment, the owner checks the enterprise-assigned policy default and obtains finance approval for the pilot. The repository owner separately reviews the member's repository permissions. An organization-assigned seat would be an alternative, but its organization owner would then maintain the assignment.

**Outcome:** The documented proposal has an assignment path, membership owner, policy default and funding approver. The person without repository access still needs an independent repository-access decision. The proposal does not itself assign a seat or establish the person's effective access.

## Practice: trace two access questions

**Prerequisites:** Paper or a local note and the hypothetical pilot above. No GitHub permissions or production changes are required.

1. Make two columns: “Copilot seat” and “repository access.” List the decision owner and evidence needed in each.
2. Record the setting that supplies delegated-policy defaults for the directly assigned pilot.
3. If you have **read-only access to an authorized sandbox**, compare an existing test user's assignment source with repository access. Do not assign a seat or change permissions. Otherwise, discuss the two columns using the hypothetical state.

**Expected result:** A two-column record identifies separate evidence for the seat and repository access; the discussion alone does not demonstrate either is configured.

<details>
<summary>Model answer</summary>

The enterprise assignment record supplies evidence of the Copilot seat and the enterprise owner is accountable for that path. The repository access record and repository owner are separate. Check **Policies for enterprise-assigned users** for delegated-policy defaults. A real verification requires an authorized test account and observed settings or behavior, not this worksheet.

</details>
