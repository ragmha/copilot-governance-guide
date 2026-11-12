---
title: Govern tools and network access
section: Agent Governance
order: 3
description: Review agent tools, approvals and firewall limitations as separate controls.
verified: "2026-11-12"
diagram: agent-tools-network
checks:
  - question: Does the agent firewall directly govern MCP server processes?
    answer: No. It applies to processes started by the agent via its Bash tool, not directly to MCP server or setup-step processes.
  - question: Is a firewall a complete defense against data exfiltration?
    answer: No. GitHub documents bypass potential and other coverage limitations; use complementary controls.
sources:
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-the-firewall
  - https://docs.github.com/en/copilot/concepts/enterprise/mcp-management
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-enterprise-allowlist
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/manage-copilot-in-the-cloud
---

## What you will learn

- Distinguish tool approval, MCP restrictions and network filtering.
- Identify where a control does not apply.

## Layer controls by execution path

The [cloud management guide](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/manage-copilot-in-the-cloud) describes tool-approval controls. [MCP management](https://docs.github.com/en/copilot/concepts/enterprise/mcp-management) recommends an enterprise `managed-settings.json` allowlist on supported clients. A custom MCP registry is **public preview - use with caution** and has weaker matching enforcement.

The [firewall](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-the-firewall) has separate settings for cloud agent and code review. It applies to processes the agent starts through Bash, not directly to MCP server or configured setup-step processes. GitHub warns that bypasses are possible; it is not comprehensive exfiltration protection.

The [managed allowlist guide](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-enterprise-allowlist) covers supported clients and cloud sandboxes, including servers in user and repository settings, but not MCP definitions in repository custom-agent profiles. Built-in default servers are allowed first; deny rules then take precedence, and each deployed allowlist must match. Unresolved variables are blocked, and malformed lists block non-built-in servers. A permitted server can still have credentials with excessive access.

## Worked example: a documentation tool

**Hypothetical starting state:** MCP is enabled on a supported client. A single valid managed allowlist matches a fictional documentation server in user settings; no deny rule matches it. The same server also appears in a repository custom-agent profile, and its credential permissions are unknown.

The user-settings entry matches the allowlist and is not denied, so the policy evaluation predicts it is permitted on this client. The profile entry is outside the documented managed-list scope. The team therefore reviews its separate execution and network controls and asks the service owner about credential scope. The cloud firewall does not directly cover MCP server processes.

**Outcome:** The first server is predicted permitted under the stated assumptions; the profile entry and credentials remain unresolved. Neither result proves the real server is safe or that any control is configured.

## Practice: evaluate server entries offline

**Prerequisites:** A local note, the [allowlist evaluation rules](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-enterprise-allowlist), and these fictional facts: MCP is enabled; one valid allowlist permits server A and B; a deny rule matches B; C is a built-in default. No other policy layers are present.

1. Predict whether A, B and C are allowed and write the rule for each.
2. Add a fourth entry in a repository custom-agent profile. Identify what the managed allowlist does **not** establish about that entry or its credentials.
3. With authorized read-only sandbox access, compare the policy with existing server definitions without running them. Otherwise, discuss the fictional entries. Do not install a server, connect credentials or change policy.

**Expected result:** An evaluation record says A is allowed, B is denied and C is allowed under these assumptions; it separately flags the profile and credential gaps. It is not a test of a deployed policy.

<details>
<summary>Model answer</summary>

A matches the allowlist and no deny rule. B matches a deny rule, which wins. C is a built-in default, evaluated first. Managed allowlists do not govern repository custom-agent-profile definitions; review their configuration, execution path and credentials separately. Check every deployment layer and supported client in a real environment.

</details>
