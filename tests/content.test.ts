import { expect, test } from 'bun:test';
import { readdir, readFile } from 'node:fs/promises';
import { chapters, parts } from '../src/course';
import diagrams from '../src/diagrams.json';
import { quizzes, quizReviewLessons } from '../src/quizzes';

test('course pages have sources, checks and editable lesson diagrams', async () => {
  const files = await readdir('src/content/guide');
  const registry = await readFile('src/content/guide/sources.md', 'utf8');
  expect(files.filter(file => file.endsWith('.md')).sort()).toEqual(
    ['start.md', 'sources.md', ...chapters.map(chapter => `${chapter.id}.md`)].sort(),
  );
  expect(parts).toHaveLength(6);
  for (const chapter of chapters) {
    const text = await readFile(`src/content/guide/${chapter.id}.md`, 'utf8');
    expect(text).toMatch(/verified: "\d{4}-\d{2}-\d{2}"/);
    const sources = [...text.matchAll(/^  - (https:\/\/.+)$/gm)].map(match => match[1]);
    expect(sources.length).toBeGreaterThan(0);
    for (const source of sources) expect(registry).toContain(`](${source})`);
    if (chapter.kind === 'lesson') {
      expect(text).toContain('## What you will learn');
      expect(text).toMatch(/\*\*Hypothetical starting state:\*\*/);
      expect(text).toMatch(/^## Practice:/m);
      expect(text).toContain('**Prerequisites:**');
      expect(text).toContain('**Expected result:**');
      expect(text).toContain('<summary>Model answer</summary>');
      expect(text.match(/  - question:/g)?.length).toBeGreaterThanOrEqual(2);
      expect(text.match(/  - question:/g)?.length).toBeLessThanOrEqual(3);
      const primary = text.match(/^diagram: (.+)$/m)?.[1];
      expect(primary).toBeTruthy();
      const scenario = text.match(/^scenarioDiagram: (.+)$/m)?.[1];
      for (const slug of [primary!, ...(scenario ? [scenario] : [])]) {
        expect(Object.keys(diagrams)).toContain(slug);
      }
    }
  }
});

test('diagram sources and exports have accessible, offline metadata', async () => {
  const escapeXml = (value: string) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  for (const [slug, metadata] of Object.entries(diagrams)) {
    for (const theme of ['light', 'dark']) {
      const source = await readFile(`public/diagrams/${slug}.${theme}.html`, 'utf8');
      const svg = await readFile(`public/diagrams/${slug}.${theme}.svg`, 'utf8');
      expect(source).toContain('<svg ');
      expect(svg).toMatch(/<svg\b[^>]*role="img"[^>]*>\s*<title\b/);
      expect(svg).toMatch(/viewBox="0 0 704 \d+"/);
      const ids = [...svg.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
      expect(new Set(ids).size).toBe(ids.length);
      const titleId = `${slug}-${theme}-title`;
      const descId = `${slug}-${theme}-desc`;
      expect(svg).toContain(`aria-labelledby="${titleId} ${descId}"`);
      expect(svg).toContain(`<title id="${titleId}">${escapeXml(metadata.title)}</title>`);
      expect(svg).toContain(`<desc id="${descId}">${escapeXml(metadata.description)}</desc>`);
      expect(svg).not.toMatch(/<script\b|@import|<\s*(?:image|foreignObject)\b|(?:href|src)\s*=\s*["'](?:https?:)?\/\//i);
      expect(svg.replace('http://www.w3.org/2000/svg', '')).not.toMatch(/https?:\/\/|@font-face/i);
      expect(source).not.toMatch(/<script\b|@import|(?:href|src)\s*=\s*["'](?:https?:)?\/\//i);
      expect(source.replace('http://www.w3.org/2000/svg', '')).not.toMatch(/https?:\/\/|@font-face/i);
    }
  }
});

test('each part has a complete scored quiz', () => {
  expect(quizzes).toHaveLength(parts.length);
  const answerCounts = [0, 0, 0];
  for (const [partIndex, quiz] of quizzes.entries()) {
    expect(quiz).toHaveLength(5);
    expect(quizReviewLessons[partIndex]).toHaveLength(quiz.length);
    const answers = quiz.map(question => question.answer);
    for (const direction of [1, 2]) {
      expect(answers.slice(1).every((answer, index) => answer === (answers[index] + direction) % 3)).toBe(false);
    }
    for (const [index, question] of quiz.entries()) {
      answerCounts[question.answer]++;
      if (index >= 2) {
        expect(answers[index] === answers[index - 1] && answers[index] === answers[index - 2]).toBe(false);
      }
      expect(question.prompt.length).toBeGreaterThan(0);
      expect(question.options).toHaveLength(3);
      expect(question.answer).toBeGreaterThanOrEqual(0);
      expect(question.answer).toBeLessThan(question.options.length);
      expect(question.explanation.length).toBeGreaterThan(0);
      expect(chapters.find(chapter => chapter.id === quizReviewLessons[partIndex][index])).toMatchObject({
        kind: 'lesson', part: partIndex + 1,
      });
    }
  }
  for (const count of answerCounts) {
    expect(count).toBeGreaterThanOrEqual(8);
    expect(count).toBeLessThanOrEqual(12);
  }
});
