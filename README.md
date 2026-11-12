# Copilot Governance Learning Guide

An independent, source-backed course for enterprise administrators and their
security, finance and engineering partners. Six parts cover access, user
policies, cost, agents, context and observability.

The course adapts ideas from
[Copilot governance at scale](https://github.com/octodemo/copilot-governance-at-scale)
and uses the visual and technical scaffold of
[AI Credits Learning Guide](https://github.com/ragmha/ai-credits-guide).
Examples are hypothetical. Review the content and current official sources
before applying changes to your organization.

## Run locally

Requires Bun 1.3.5+ and Node.js 22.12+.

```sh
bun install --frozen-lockfile
bun run dev
```

Open <http://127.0.0.1:4321/copilot-governance-guide/>. The project base is
intentional and matches the configured GitHub Pages path.

```sh
bun run check
bun run test
bun run build
bun run test:browser
```

The browser checks use installed Google Chrome by default. To use
Playwright Chromium, install it with `bunx playwright install chromium` and set
`BROWSER_CHANNEL=chromium`.

## Content and diagrams

`src/course.ts` defines the reading sequence. Pages live in
`src/content/guide/`; the sources and release-status register is outside the
sequence. Each lesson has a diagram, a worked hypothetical example, an exercise
and self-checks. Each part summary has a five-question quiz; 100% unlocks the
next part. Progress is stored in browser local storage with a quiz version.
JavaScript and storage are required; the gate is a learning aid, not a
tamper-proof assessment or certification. If quiz content changes materially,
increment the progress key and record version in `GuideLayout.astro`.
Review material claims against current primary sources before updating a
page's `verified` date. Each source also belongs in the register.

Editable light and dark HTML sources and their SVG exports live in
`public/diagrams/`. They use the MIT-licensed
[diagram-design](https://github.com/cathrynlavery/diagram-design) templates.
Edit the matching sources and export each with the skill's
`scripts/export_svg.py`; for example, with the skill installed under
`~/.agents/skills/diagram-design`:

```sh
python3 ~/.agents/skills/diagram-design/scripts/export_svg.py public/diagrams/access-assignment.light.html public/diagrams/access-assignment.light.svg --system-fonts
python3 ~/.agents/skills/diagram-design/scripts/export_svg.py public/diagrams/access-assignment.dark.html public/diagrams/access-assignment.dark.svg --system-fonts
```

Keep titles and descriptions aligned with `src/diagrams.json`. Dark variants use
the same geometry and substitute theme colors. Each figure retains its 704px
canvas inside a horizontal scroll region so the labels do not shrink on narrow
screens.

### Diagram color roles

The diagrams use local course tokens and system fonts; no remote assets.
Swap the following roles together when retheming:

| Role | Light | Dark |
| --- | --- | --- |
| Paper | `#f3f5f7` | `#07090d` |
| Node surface | `#ffffff` | `#0d1117` |
| Text | `#1f2328` | `#f0f6fc` |
| Secondary text and connectors | `#59636e` | `#9198a1` |
| Accent | `#1a7f37` | `#3fb950` |
| Accent surface | `#eaf6ed` | `#102219` |
| Decorative rule | `#d1d9e0` | `#3d444d` |

Minimum role contrasts across paper, node surface and accent surface are
14.22:1/15.25:1 for text, 5.50:1/5.70:1 for secondary text and connectors,
and 4.57:1/6.54:1 for the accent, light/dark respectively. Decorative rules
are not used as essential boundaries. No diagram-only colors were needed.

## Deployment

The static output is `dist/`. The Pages workflow builds pull requests and
deploys pushes to `master`; configure GitHub Pages to use GitHub Actions only
after reviewing the course for publication.

The [Octodemo MIT notice](public/licenses/octodemo-MIT.txt) and
[Octicons MIT notice](public/licenses/octicons-MIT.txt) are retained.
The [diagram-design MIT notice](public/licenses/diagram-design-MIT.txt) is also retained.
GitHub and Copilot are trademarks of GitHub, Inc. This guide is not affiliated
with or endorsed by GitHub.
