---
title: Measure adoption carefully
section: Observability
order: 2
description: Use adoption and impact data without treating correlation as proof of causation.
verified: "2026-11-12"
diagram: adoption-measurement
checks:
  - question: Can organization active-user totals be summed to get an enterprise total?
    answer: No. The same user can belong to multiple organizations, so the totals can overlap.
  - question: Does a relationship between adoption and pull request throughput prove Copilot caused the change?
    answer: No. The data shows association, and other factors may explain the relationship.
sources:
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/copilot-usage-metrics/copilot-metrics
---

## What you will learn

- Choose the right denominator and time window.
- Interpret coverage and impact responsibly.

## Evidence is not a complete story

[Copilot usage metrics](https://docs.github.com/en/copilot/concepts/billing-and-usage/copilot-usage-metrics/copilot-metrics) describe adoption, engagement and supported workflow signals. Data for a day is available within two full UTC days after that day closes. Coverage depends on the metric and surface. The same user can appear in more than one organization, so summing organization totals can overcount the enterprise.

Impact comparisons show associations rather than proof of causation. Usage metrics measure activity, not license assignments; use the appropriate license information for the denominator.

## Worked example: a pilot review

**Hypothetical starting state:** A pilot has 20 assigned users. In a completed reporting period, a fictional enterprise report shows 12 unique active users. Two organization reports show 8 and 7 active users, with 3 people in both organizations. The team also observes higher pull request throughput than in the preceding period.

The enterprise adoption calculation is 12 / 20 = 60% for that period and population. Adding organization counts gives 15, but subtracting the 3 overlapping people gives 12; summing alone overcounts. The team checks report coverage and waits for the documented data availability window. It asks for voluntary feedback about setup and workflow changes, rather than attributing throughput to Copilot from this comparison.

**Outcome:** The team can report a scoped adoption measure and an observed throughput change, not a causal productivity gain.

## Practice: interpret a pilot report

**Prerequisites:** The fictional figures above and a local note or calculator. If using a real authorized report read-only, use its actual dates, definitions and privacy rules.

1. Calculate the enterprise adoption rate and the deduplicated organization count.
2. Record the period, license denominator, metric coverage and publication delay you would include with the result.
3. Write one conclusion supported by the figures and one question for a follow-up study. Without access to reports, use the fictional figures; do not collect individual data.

**Expected result:** A short report gives 60% and 12 distinct organization users, identifies possible coverage gaps, and avoids a causal claim.

<details>
<summary>Model answer</summary>

Twelve of 20 assigned users were active in the specified period, or 60%. The organization counts overlap: 8 + 7 − 3 = 12 distinct people. Higher throughput coincided with the pilot but might have other causes. Compare similar work and collect voluntary feedback before interpreting impact.

</details>
