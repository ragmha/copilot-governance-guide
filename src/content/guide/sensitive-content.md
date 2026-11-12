---
title: Protect sensitive context
section: Context Management
order: 3
description: Combine access control with supported exclusions and understand their limits.
verified: "2026-11-12"
diagram: sensitive-content
checks:
  - question: Do content exclusions replace repository access permissions?
    answer: No. Exclusions affect supported Copilot use cases but are not a filesystem security boundary.
  - question: Can an administrator assume exclusions cover every possible path to sensitive data?
    answer: No. Review the current support matrix and limitations, including indirect access and third-party tools.
sources:
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/content-exclusion
  - https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/exclude-content-from-copilot
---

## What you will learn

- Distinguish repository permissions from content exclusions.
- Check surface-specific support and limitations.

## Use multiple layers

[Content exclusion](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/content-exclusion) can exclude files from supported Copilot experiences. The current matrix includes support for Copilot CLI, the Copilot app, supported IDE agents and cloud experiences; check the matrix for the actual client and mode.

Exclusions are not a filesystem security boundary. GitHub documents limitations including indirect access, third-party MCP servers, symlinks and remote filesystems. Restrict who and what can access sensitive material independently, and inspect the source before depending on an exclusion.

## Worked example: an internal file

**Hypothetical starting state:** A team has a sample repository containing a non-sensitive file named `training/canary.txt`. It wants to learn how an exclusion would be specified before evaluating its real sensitive data.

The [configuration guide](https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/exclude-content-from-copilot) describes repository **Settings → Copilot → Content exclusion** and a YAML list of paths. For this fictional repository, the proposed entry is:

```yaml
- "/training/canary.txt"
```

The team checks the target client against the support matrix, reviews repository and operating-system access separately, and records the third-party MCP and indirect-access gaps. The entry is a proposal, not proof the exclusion has been saved or enforced.

**Outcome:** The team can explain a narrow rule and its limits without exposing real sensitive data. It still needs an authorized sandbox and an appropriate test before claiming the rule works.

## Practice: map the protection boundary

**Prerequisites:** The fictional path above and the [support and limitations matrix](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/content-exclusion). Use no sensitive file.

1. Write the proposed YAML entry in a local note and identify the intended repository and client.
2. List who can read the sample file independently of Copilot and whether an external tool could have its own access.
3. If you have an authorized sandbox, inspect its existing exclusion and access settings read-only. Otherwise, discuss what evidence a controlled canary test would require. Do not save an exclusion or submit the canary to a model without explicit sandbox approval.

**Expected result:** A boundary note lists the proposed path, client, access controls and at least one uncovered route. It does not assert enforcement.

<details>
<summary>Model answer</summary>

The proposed entry targets `/training/canary.txt` in the sample repository. Check repository and filesystem permissions and third-party tool access separately. An exclusion is not a filesystem security boundary; indirect access, symlinks and remote filesystems have documented limitations.

</details>
