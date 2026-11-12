import { test, expect } from '@playwright/test';
import { chapters, parts } from '../../src/course';
import { quizzes } from '../../src/quizzes';
import type { Page } from '@playwright/test';

async function passQuiz(page: Page, part: number) {
  const form = page.locator('[data-quiz]');
  for (const [index, question] of quizzes[part - 1].entries()) {
    await form.locator('fieldset').nth(index).locator(`input[value="${question.answer}"]`).check();
  }
  await form.getByRole('button', { name: 'Check score' }).click();
  await expect(form.locator('[role=status]')).toContainText(
    part === 6 ? 'Course complete' : `Part ${part + 1} is unlocked`,
  );
}

test('reading sequence, self-checks, themes and lesson diagrams', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  const base = '/copilot-governance-guide/';
  await page.goto('./');
  await expect(page.getByRole('navigation', { name: 'Guide chapters' }).locator('.course-part')).toHaveCount(parts.length);
  let previousPath = base;
  for (const chapter of chapters) {
    const next = page.locator('.pagination a[rel="next"]');
    await expect(next).toHaveAttribute('href', `${base}${chapter.path}/`);
    await next.click();
    await expect(page.locator('h1')).toContainText(`${chapter.number} `);
    await expect(page.locator('.pagination a[rel="prev"]')).toHaveAttribute('href', previousPath);
    if (chapter.kind === 'lesson') {
      await expect(page.getByRole('heading', { name: /^Practice:/ })).toBeVisible();
      const answer = page.locator('.prose details').filter({ has: page.getByText('Model answer', { exact: true }) });
      await answer.locator('summary').click();
      await expect(answer.locator('p').first()).toBeVisible();
      const checks = page.locator('.self-check details');
      expect(await checks.count()).toBeGreaterThanOrEqual(2);
      for (const check of await checks.all()) {
        await check.locator('summary').click();
        await expect(check.locator('p')).toBeVisible();
      }
      for (const theme of ['light', 'dark']) {
        await page.getByLabel('Color theme').selectOption(theme);
        for (const image of await page.locator(`.diagram-${theme}`).all()) {
          await expect(image).toBeVisible();
          await expect.poll(() => image.evaluate(img => (img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
        }
        for (const link of await page.locator('[data-diagram-link]').all()) {
          await expect(link).toHaveAttribute('href', new RegExp(`\\.${theme}\\.html$`));
        }
      }
      const source = page.locator('.diagram-links a[download]').first();
      const response = await page.request.get((await source.getAttribute('href'))!);
      expect(await response.text()).toContain('<svg ');
    }
    if (chapter.kind === 'summary') await passQuiz(page, chapter.part);
    previousPath = `${base}${chapter.path}/`;
  }
  await expect(page.locator('.pagination a[rel="next"]')).toHaveCount(0);
  await page.goto('sources/');
  await expect(page.locator('.pagination a[rel]')).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('mobile exercises, navigation and diagram scrolling stay inside the page', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 });
  for (const chapter of chapters) {
    await page.goto(`${chapter.path}/`);
    if (chapter.kind === 'lesson') {
      const answer = page.locator('.prose details').filter({ has: page.getByText('Model answer', { exact: true }) });
      await answer.locator('summary').click();
      await expect(answer.locator('p').first()).toBeVisible();
      for (const theme of ['light', 'dark']) {
        await page.getByLabel('Color theme').selectOption(theme);
        for (const region of await page.locator('.diagram-scroll').all()) {
          expect(await region.evaluate(element => element.scrollWidth > element.clientWidth), chapter.id).toBe(true);
          await region.focus();
          await expect(region).toBeFocused();
          await page.keyboard.press('ArrowRight');
          await expect.poll(() => region.evaluate(element => element.scrollLeft)).toBeGreaterThan(0);
          await expect(region.locator(`.diagram-${theme}`)).toBeVisible();
        }
      }
    }
    if (chapter.kind === 'summary') {
      const card = page.locator('.quiz-card').first();
      const bounds = await card.boundingBox();
      const legend = await card.locator('legend').boundingBox();
      expect(bounds && legend && legend.y >= bounds.y && legend.y + legend.height <= bounds.y + bounds.height).toBe(true);
      await passQuiz(page, chapter.part);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), chapter.id).toBe(true);
  }
  await page.goto(`${chapters.find(chapter => chapter.kind === 'lesson')!.path}/`);
  const nav = page.locator('.chapter-nav');
  await expect(nav).not.toHaveAttribute('open', '');
  await nav.locator('summary').click();
  await expect(nav.locator('.chapter-pages a')).toHaveCount(chapters.length);
  const region = page.locator('.diagram-scroll').first();
  expect(await region.evaluate(element => element.scrollWidth > element.clientWidth)).toBe(true);
  await region.focus();
  await expect(region).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await expect.poll(() => region.evaluate(element => element.scrollLeft)).toBeGreaterThan(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('quiz gates links and direct visits until a perfect score, and saves progress', async ({ page }) => {
  const firstSummary = chapters.find(chapter => chapter.part === 1 && chapter.kind === 'summary')!;
  const secondOverview = chapters.find(chapter => chapter.part === 2 && chapter.kind === 'overview')!;
  await page.goto('./');
  const locked = page.getByRole('navigation', { name: 'Guide chapters' }).locator(`a[href$="${secondOverview.path}/"]`);
  await expect(locked).toHaveAttribute('aria-disabled', 'true');
  await locked.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#progress-notice')).toContainText('Part 2 is locked');
  await page.goto(`${secondOverview.path}/`);
  await expect(page).toHaveURL(new RegExp(`${firstSummary.path}/\\?locked=1`));
  const form = page.locator('[data-quiz]');
  await form.getByRole('button', { name: 'Check score' }).click();
  await expect(form.locator('[role=status]')).toContainText('Answer every question');
  await expect(form.locator('fieldset').first().locator('input').first()).toBeFocused();
  for (const [index, question] of quizzes[0].entries()) {
    const value = index === 0 ? (question.answer + 1) % question.options.length : question.answer;
    await form.locator('fieldset').nth(index).locator(`input[value="${value}"]`).check();
  }
  await form.getByRole('button', { name: 'Check score' }).click();
  await expect(form.locator('[role=status]')).toContainText('Score: 4 of 5');
  const incorrect = form.locator('.quiz-feedback').first();
  await expect(incorrect).toContainText('Incorrect.');
  await expect(incorrect).not.toContainText(quizzes[0][0].options[quizzes[0][0].answer]);
  await expect(incorrect).not.toContainText(quizzes[0][0].explanation);
  const review = incorrect.getByRole('link', { name: 'Review the lesson' });
  await expect(review).toHaveAttribute('href', /part-1\/2-access-assignment\/$/);
  await expect(form.locator('.quiz-feedback').nth(1)).toContainText(quizzes[0][1].explanation);
  await expect(page.locator('.pagination a[rel=next]')).toHaveAttribute('aria-disabled', 'true');
  await form.getByRole('button', { name: 'Retry quiz' }).click();
  await expect(incorrect).toBeHidden();
  await passQuiz(page, 1);
  await expect(incorrect).toContainText(quizzes[0][0].explanation);
  await expect(page.locator('.pagination a[rel=next]')).not.toHaveAttribute('aria-disabled', 'true');
  await page.reload();
  await page.locator('.pagination a[rel=next]').click();
  await expect(page).toHaveURL(new RegExp(`${secondOverview.path}/$`));
  await expect(page.locator('.course-part').nth(2).locator('a').first()).toHaveAttribute('aria-disabled', 'true');
});

test('invalid saved progress is rejected and can be reset', async ({ page }) => {
  await page.goto('./');
  await page.evaluate(() => localStorage.setItem('copilot-governance-guide:quiz-progress:v2', '{"version":2,"passed":[2]}'));
  await page.reload();
  await expect(page.locator('#progress-notice')).toContainText('invalid');
  await expect(page.locator('.course-part').nth(1).locator('a').first()).toHaveAttribute('aria-disabled', 'true');
  await page.getByRole('button', { name: 'Reset invalid progress' }).click();
  await expect(page.locator('#progress-notice')).toContainText('was reset');
  expect(await page.evaluate(() => localStorage.getItem('copilot-governance-guide:quiz-progress:v2'))).toBeNull();
});

test('older quiz progress does not unlock the revised quiz', async ({ page }) => {
  await page.goto('./');
  await page.evaluate(() => localStorage.setItem('copilot-governance-guide:quiz-progress:v1', '{"version":1,"passed":[1]}'));
  await page.reload();
  await expect(page.locator('#progress-notice')).toContainText('Previous quiz progress does not carry over');
  await expect(page.locator('.course-part').nth(1).locator('a').first()).toHaveAttribute('aria-disabled', 'true');
});

test('unavailable storage is reported and cannot unlock progress', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('Denied', 'SecurityError'); } });
  });
  const firstSummary = chapters.find(chapter => chapter.part === 1 && chapter.kind === 'summary')!;
  await page.goto(`${firstSummary.path}/`);
  await expect(page.locator('#progress-notice')).toContainText('storage is unavailable');
  const form = page.locator('[data-quiz]');
  for (const [index, question] of quizzes[0].entries()) {
    await form.locator('fieldset').nth(index).locator(`input[value="${question.answer}"]`).check();
  }
  await form.getByRole('button', { name: 'Check score' }).click();
  await expect(form.locator('[role=status]')).toContainText('Progress was not saved');
  await expect(page.locator('.pagination a[rel=next]')).toHaveAttribute('aria-disabled', 'true');
});
