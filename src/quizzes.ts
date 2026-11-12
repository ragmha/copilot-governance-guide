interface Question {
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const quizzes: Question[][] = [
  [
    { prompt: 'A pilot member has a Copilot seat but cannot access the target repository. What follows?', options: ['The seat grants repository access automatically.', 'Repository access requires a separate decision.', 'An organization-level Copilot assignment grants repository access.'], answer: 1, explanation: 'A Copilot assignment and repository permissions are separate controls.' },
    { prompt: 'Which setting supplies delegated-policy defaults for directly enterprise-assigned users?', options: ['Policies for enterprise-assigned users', 'The most restrictive organization policy', 'The least restrictive organization policy'], answer: 0, explanation: 'Enterprise-assigned users have a separate policy default when decisions are delegated to organizations.' },
    { prompt: 'What does an inactive-user report establish on its own?', options: ['The person has no legitimate need for a seat.', 'The person performed poorly.', 'The report observed no activity within its scope.'], answer: 2, explanation: 'Investigate the reporting scope, onboarding and support needs before deciding what to do.' },
    { prompt: 'Before removing access granted by a team, what else should the owner check?', options: ['Other assignment paths and the plan’s removal timing', 'Only whether the user appears inactive in one report', 'Only whether the team membership has changed'], answer: 0, explanation: 'Another assignment may remain, and removal timing depends on the plan.' },
    { prompt: 'What proves a written assignment proposal has taken effect?', options: ['A named owner in the proposal', 'Evidence from the actual assignment and applicable access checks', 'An estimated cost'], answer: 1, explanation: 'A proposal alone neither assigns a seat nor verifies effective access.' },
  ],
  [
    { prompt: 'Two licensing organizations in one enterprise disagree on IDE Chat. Which rule does the conflict reference list?', options: ['Always use the latest change.', 'Most restrictive wins.', 'Least restrictive wins.'], answer: 2, explanation: 'IDE Chat is a documented least-restrictive example; other policies have different rules.' },
    { prompt: 'What happens for suggestions matching public code when two licensing organizations disagree?', options: ['The least restrictive setting always applies.', 'The most restrictive setting applies.', 'The most recently changed organization policy applies.'], answer: 1, explanation: 'GitHub lists this as a most-restrictive exception within an enterprise.' },
    { prompt: 'What does default model availability control?', options: ['The session’s preselected model', 'Availability of eligible unconfigured models', 'Availability of all preview models'], answer: 1, explanation: 'Availability and the default selected model in a session are different decisions.' },
    { prompt: 'Do preview models automatically follow the default availability policy for generally available models?', options: ['No; preview models are outside that default.', 'Yes, if the default for new features is enabled.', 'Yes, without exception.'], answer: 0, explanation: 'Pre-GA models do not follow the GA model default. Check current model-specific rules.' },
    { prompt: 'What must be considered before enabling enterprise-team model access?', options: ['Organization and enterprise-team controls always both remain active.', 'It applies only to new models and leaves existing organization controls unchanged.', 'It is an opt-in preview that changes the granular control mode.'], answer: 2, explanation: 'Enterprise-team model access is an opt-in public preview with an exclusive team-based mode.' },
  ],
  [
    { prompt: 'What does an alert-only metered threshold do?', options: ['Notifies an owner while charges may continue.', 'Always stops all credit consumption.', 'Automatically approves new spending.'], answer: 0, explanation: 'An alert is not an enforced stop or spending authorization.' },
    { prompt: 'A user has individual, cost-center and universal user-level budgets. Which has priority?', options: ['The smallest amount', 'The universal value', 'The individual value'], answer: 2, explanation: 'User-level budget precedence follows specificity: individual, then cost center, then universal.' },
    { prompt: 'Can remaining cost-center metered budget override an exhausted user-level budget?', options: ['No; the user-level budget hard stop still applies.', 'Yes, if the cost-center metered budget has headroom.', 'Yes, if the shared included pool has headroom.'], answer: 0, explanation: 'A user-level budget limits total user consumption independently of metered-budget headroom.' },
    { prompt: 'What does an included-usage control govern?', options: ['Only metered charges after the shared pool is exhausted', 'A cost center’s draw on the shared included pool', 'An individual user’s total credit consumption'], answer: 1, explanation: 'Included-usage controls and metered-spend controls address different phases of usage.' },
    { prompt: 'Who can authorize extra spending in the worked scenario?', options: ['The seat owner, solely by assigning a seat', 'The organization’s designated spending approver', 'An alert alone'], answer: 1, explanation: 'A forecast or alert is not authorization; follow the organization’s approval process.' },
  ],
  [
    { prompt: 'A user has read-only access to the pilot repository. What does the lesson predict for their cloud session?', options: ['It can propose changes whenever the cloud policy is enabled.', 'It automatically grants repository write access.', 'It is read-only.'], answer: 2, explanation: 'Feature policy does not grant repository write access.' },
    { prompt: 'What is needed in addition to allowing an agent to propose a change?', options: ['The applicable repository review and checks', 'Nothing; generated changes bypass review.', 'Only a review of the cloud policy, not the change'], answer: 0, explanation: 'Agent-generated changes remain subject to the repository’s applicable checks and review.' },
    { prompt: 'An MCP server matches both an allowlist and a deny rule. What is the result?', options: ['Allowed because the allowlist matches', 'Denied', 'Allowed if it is configured in repository settings'], answer: 1, explanation: 'Deny rules take precedence in the documented evaluation.' },
    { prompt: 'Which MCP definitions are outside the documented managed allowlist scope?', options: ['All supported cloud sandbox definitions', 'Repository custom-agent-profile definitions', 'All repository settings'], answer: 1, explanation: 'Managed lists cover supported client and cloud configurations, but not repository custom-agent-profile MCP definitions.' },
    { prompt: 'What does the cloud agent firewall directly cover?', options: ['Processes started by the agent through Bash', 'Every possible data route, including all MCP processes', 'All configured setup-step and MCP server processes'], answer: 0, explanation: 'MCP and setup-step processes are not directly covered; the firewall is not comprehensive exfiltration protection.' },
  ],
  [
    { prompt: 'What is a custom instruction?', options: ['An enforceable repository permission', 'Guidance supplied to supported Copilot experiences', 'A replacement for access controls'], answer: 1, explanation: 'Instructions guide responses, but adherence can vary and they do not enforce permissions.' },
    { prompt: 'A response says “run tests” but provides no execution result. What has been established?', options: ['The tests passed.', 'The instruction is always followed.', 'A test was suggested, not shown to have run.'], answer: 2, explanation: 'Inspect actual execution evidence before claiming the tests ran or passed.' },
    { prompt: 'What is a content exclusion?', options: ['A guarantee that every external tool is blocked', 'A filesystem permission change', 'A control to prevent Copilot from accessing specified content on supported surfaces'], answer: 2, explanation: 'Exclusions have supported surfaces and documented limitations; they do not replace filesystem security.' },
    { prompt: 'What should the team use for an exclusion exercise?', options: ['A non-sensitive canary in an authorized sandbox, if testing is approved', 'A non-sensitive canary in a production repository without approval', 'An offline proposal treated as a verified live exclusion'], answer: 0, explanation: 'Use non-sensitive fixtures and obtain approval before modifying or testing a sandbox.' },
    { prompt: 'What remains important after proposing an exclusion?', options: ['Client support, independent permissions and external-tool access', 'Only repository permissions, because exclusions govern all external tools', 'Nothing; the proposal proves enforcement.'], answer: 0, explanation: 'Review supported clients, indirect access and third-party tools separately; a proposal is not proof of enforcement.' },
  ],
  [
    { prompt: 'Why should organization active-user totals not simply be summed?', options: ['Each organization total is already an enterprise-wide unique count.', 'The sum always excludes directly assigned users.', 'The same user can appear in more than one organization.'], answer: 2, explanation: 'Overlapping membership can count one person more than once.' },
    { prompt: 'A team has 20 assigned users and 12 distinct active users. What is the illustrative adoption rate?', options: ['12%', '60%', '120%'], answer: 1, explanation: '12 divided by 20 is 60% for that stated population and reporting period.' },
    { prompt: 'Throughput increased during a Copilot pilot. What does this prove?', options: ['A change coincided with the pilot; causation is not established.', 'Every developer improved equally.', 'Copilot caused the increase.'], answer: 0, explanation: 'Other changes can explain the association; investigate before attributing an outcome.' },
    { prompt: 'What should be considered before enabling agent telemetry?', options: ['Whether to collect all content by default', 'Only whether the enterprise is eligible for audit streaming', 'The question, coverage, privacy, access and retention'], answer: 2, explanation: 'Capture only what is justified and approved, and verify surface and client coverage.' },
    { prompt: 'Does identity capture avoid collecting identifying information?', options: ['Yes, it contains no account or machine data.', 'Yes, unless prompt and tool-content capture are also enabled.', 'No; it can include account, OS user and machine identifiers.'], answer: 2, explanation: 'Identity capture includes identifiers even without prompt or tool-content capture.' },
  ],
];

export const quizReviewLessons = [
  ['access-assignment', 'access-assignment', 'access-lifecycle', 'access-lifecycle', 'access-assignment'],
  ['policy-scope', 'policy-scope', 'model-feature-baseline', 'model-feature-baseline', 'model-feature-baseline'],
  ['billing-ownership', 'consumption-controls', 'consumption-controls', 'consumption-controls', 'billing-ownership'],
  ['agent-operating-scope', 'agent-operating-scope', 'agent-tools-network', 'agent-tools-network', 'agent-tools-network'],
  ['instructions-context', 'instructions-context', 'sensitive-content', 'sensitive-content', 'sensitive-content'],
  ['adoption-measurement', 'adoption-measurement', 'adoption-measurement', 'agent-activity', 'agent-activity'],
];
