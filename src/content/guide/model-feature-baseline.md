---
title: Set a model and feature baseline
section: User Governance
order: 3
description: Balance vetted availability, new releases and delegated decisions.
verified: "2026-11-12"
diagram: model-feature-baseline
checks:
  - question: Do enabled features and enabled models share one default policy?
    answer: No. Separate defaults control unconfigured generally available features and models.
  - question: Can organization and enterprise-team model controls both govern granular access in the opt-in team mode?
    answer: No. Enterprise-team model access is an exclusive opt-in mode; review the migration and current documentation before switching.
sources:
  - https://docs.github.com/en/copilot/concepts/enterprise/policies
  - https://docs.github.com/en/copilot/concepts/enterprise/default-availability
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-availability-of-default-models
---

## What you will learn

- Separate a model decision from a feature decision.
- Choose who evaluates newly available capabilities.

## Two decisions, two defaults

The [policy documentation](https://docs.github.com/en/copilot/concepts/enterprise/policies) describes separate controls for the default availability of unconfigured generally available models and features. Explicit settings and delegated decisions remain important: automatic availability favors speed, while a review-first approach favors deliberate vetting.

The [default-availability reference](https://docs.github.com/en/copilot/concepts/enterprise/default-availability) distinguishes model availability from the model selected by default in a session. Preview models do not follow the GA default; the reference also lists exceptions for open-weight models, models outside GitHub's data-retention agreement, and models restricted by residency or FedRAMP policies. Check the current model-specific status and applicable restrictions.

Enterprise owners can explicitly enable, disable or delegate model availability. Granular access normally works through organizations; enterprise-team model access is an opt-in **public preview - use with caution** and uses an exclusive team-based mode. Consult [model availability](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-availability-of-default-models) before changing modes.

## Worked example: a new model

**Hypothetical starting state:** An enterprise wants generally available models reviewed before broad use, but wants generally available features available by default. A new model is proposed for one organization; its product release status has not been established.

The governance team records the model default separately from the feature default, delegates the proposed model only where its current control mode allows it, and asks the organization owner to evaluate the model. The proposed model is **status unverified** until its own documentation establishes a release phase. The enterprise-team model access mode remains **public preview - use with caution**; switching to it is a separate decision.

**Outcome:** The team has a review decision and an accountable owner, but no model has been enabled by writing the record. A selected model in a client is not evidence that the policy is enforced for everyone.

## Practice: build a capability record

**Prerequisites:** Use the hypothetical defaults above and the [model availability guide](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-availability-of-default-models).

1. Record separate defaults for unconfigured generally available models and features.
2. Add the proposed model's audience, owner, release status and decision required.
3. If an authorized sandbox is available, inspect its current control mode and settings without saving changes. Otherwise, use the example and discuss what evidence a real rollout would need.

**Expected result:** A record distinguishes two defaults, an explicit model decision and an unresolved release status; it does not claim configuration.

<details>
<summary>Model answer</summary>

The requested baseline has unconfigured generally available models disabled and features enabled. The organization owner reviews the proposed model under the applicable delegated mode; its release phase is **status unverified** until sourced. An administrator must inspect actual settings and an eligible test user's experience to verify any later change.

</details>
