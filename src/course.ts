export const parts = [
  { title: 'Access Management', pages: ['part-1-overview', 'access-assignment', 'access-lifecycle', 'part-1-summary'] },
  { title: 'User Governance', pages: ['part-2-overview', 'policy-scope', 'model-feature-baseline', 'part-2-summary'] },
  { title: 'Billing & Cost Control', pages: ['part-3-overview', 'billing-ownership', 'consumption-controls', 'part-3-summary'] },
  { title: 'Agent Governance', pages: ['part-4-overview', 'agent-operating-scope', 'agent-tools-network', 'part-4-summary'] },
  { title: 'Context Management', pages: ['part-5-overview', 'instructions-context', 'sensitive-content', 'part-5-summary'] },
  { title: 'Observability', pages: ['part-6-overview', 'adoption-measurement', 'agent-activity', 'part-6-summary'] },
];

export const chapters = parts.flatMap((part, partIndex) => part.pages.map((id, index) => {
  const kind = id.endsWith('-overview') ? 'overview' : id.endsWith('-summary') ? 'summary' : 'lesson';
  return {
    id, kind, part: partIndex + 1, partTitle: part.title,
    number: `${partIndex + 1}.${index + 1}`,
    path: `part-${partIndex + 1}/${index + 1}-${kind === 'lesson' ? id : kind}`,
  };
}));

export function coursePath(id: string) {
  if (id === 'start') return '';
  if (id === 'sources') return 'sources';
  const chapter = chapters.find(entry => entry.id === id);
  if (!chapter) throw new Error(`Unknown course page: ${id}`);
  return chapter.path;
}
