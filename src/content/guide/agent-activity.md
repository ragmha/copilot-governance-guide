---
title: Observe agent activity responsibly
section: Observability
order: 3
description: Choose audit and telemetry evidence with explicit privacy and coverage boundaries.
verified: "2026-11-12"
diagram: agent-activity
checks:
  - question: Does enabling identity capture avoid collecting all personal or machine identifiers?
    answer: No. Identity capture includes the Copilot account, local OS account and machine name.
  - question: Is agent session audit streaming generally available to every enterprise?
    answer: No. It is in public preview and is restricted to the enterprise types described in the current documentation.
sources:
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/monitor-agentic-activity
---

## What you will learn

- Separate session views, audit evidence and client telemetry.
- Decide what information is necessary before enabling capture.

## Choose evidence for a question

The [agent monitoring guide](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/monitor-agentic-activity) describes recent sessions, audit logs and optional OpenTelemetry. Agent session audit streaming is **public preview - use with caution**, available to enterprises using Enterprise Managed Users or GitHub Enterprise Cloud with data residency.

OTel capture classes default to false. Identity capture can identify the Copilot account, local operating-system account and machine name without collecting prompts, responses or tool content; it is still identifying data. Additional capture classes can contain code, prompts, commands and paths.

## Worked example: an investigation

**Hypothetical starting state:** A security owner wants to know whether a reported agent session occurred, not what source code it contained. No telemetry has been enabled for the pilot, and the team's retention and access approvals are undecided.

The team first checks whether an existing session view or audit record can answer the question on the relevant surface. If not, it evaluates optional telemetry and the eligibility of preview audit streaming. Identity capture includes personal and machine identifiers, so the owner proposes access and retention controls and consults privacy stakeholders before any change. Capturing prompts or tool contents would collect more than this question requires.

**Outcome:** The team has an evidence plan, not a configured monitoring system. A record can corroborate activity, but does not by itself establish authorization or the outcome of a change.

## Practice: choose proportionate evidence

**Prerequisites:** The scenario above and the [agent monitoring guide](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/monitor-agentic-activity). A local note is sufficient.

1. State the question and list possible evidence: session view, audit record or client telemetry.
2. For each, record whether it covers the relevant surface, what identifying or content data it may contain, and who should have access.
3. Write a recommendation and identify any approvals and validation still needed. With authorized access, inspect existing settings read-only; without it, use the fictional scenario. Do not enable collection or export records.

**Expected result:** A recommendation favors existing sufficient evidence, identifies privacy and coverage gaps, and does not claim that audit or telemetry is already enabled.

<details>
<summary>Model answer</summary>

Check an existing session view or eligible audit evidence first. If insufficient, assess client telemetry against the exact question, destination, access and retention approvals. Identity capture still identifies people and machines; prompts, responses and tool content require separate justification. Confirm preview eligibility and actual client coverage before relying on any source.

</details>
