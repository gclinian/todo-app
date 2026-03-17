import { test, expect } from '/opt/node22/lib/node_modules/playwright/test.mjs';

test.describe('Todo App', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('shows page title', async ({ page }) => {
        await expect(page.locator('h1')).toHaveText('todo list');
    });

    test('renders default todo items on load', async ({ page }) => {
        const items = page.locator('.todo-item');
        await expect(items).toHaveCount(2);
        await expect(items.nth(0).locator('.todo-title')).toHaveText('todo 1');
        await expect(items.nth(1).locator('.todo-title')).toHaveText('todo 2');
    });

    test('adds a new todo', async ({ page }) => {
        await page.fill('#new-todo-input', 'Buy groceries');
        await page.fill('#description-input', 'Milk and eggs');
        await page.click('#add-btn');

        const items = page.locator('.todo-item');
        await expect(items).toHaveCount(3);
        await expect(items.last().locator('.todo-title')).toHaveText('Buy groceries');
    });

    test('adds todo by pressing Enter', async ({ page }) => {
        await page.fill('#new-todo-input', 'Press enter todo');
        await page.press('#new-todo-input', 'Enter');

        await expect(page.locator('.todo-item')).toHaveCount(3);
    });

    test('does not add todo with empty title', async ({ page }) => {
        await page.click('#add-btn');
        await expect(page.locator('.todo-item')).toHaveCount(2);
    });

    test('clears input after adding todo', async ({ page }) => {
        await page.fill('#new-todo-input', 'New item');
        await page.click('#add-btn');

        await expect(page.locator('#new-todo-input')).toHaveValue('');
        await expect(page.locator('#description-input')).toHaveValue('');
    });

    test('deletes a todo', async ({ page }) => {
        await page.locator('.todo-item').first().locator('.delete-btn').click();
        await expect(page.locator('.todo-item')).toHaveCount(1);
        await expect(page.locator('.todo-title')).toHaveText('todo 2');
    });

    test('toggles todo completion via checkbox', async ({ page }) => {
        const checkbox = page.locator('.todo-item').first().locator('.todo-checkbox');
        await expect(checkbox).not.toBeChecked();
        await checkbox.click();
        await expect(checkbox).toBeChecked();
    });

    test('expands description on header click', async ({ page }) => {
        const item = page.locator('.todo-item').first();
        const description = item.locator('.todo-description');

        await expect(description).not.toHaveClass(/expanded/);
        await item.locator('.todo-item-header').click();
        await expect(description).toHaveClass(/expanded/);
    });

    test('collapses description on second header click', async ({ page }) => {
        const item = page.locator('.todo-item').first();
        const header = item.locator('.todo-item-header');
        const description = item.locator('.todo-description');

        await header.click();
        await expect(description).toHaveClass(/expanded/);
        await header.click();
        await expect(description).not.toHaveClass(/expanded/);
    });

    test('shows correct description text', async ({ page }) => {
        const item = page.locator('.todo-item').first();
        await item.locator('.todo-item-header').click();
        await expect(item.locator('.todo-description p')).toHaveText('This is the description for todo 1.');
    });

    test('uses default description when none provided', async ({ page }) => {
        await page.fill('#new-todo-input', 'No desc todo');
        await page.click('#add-btn');

        const newItem = page.locator('.todo-item').last();
        await newItem.locator('.todo-item-header').click();
        await expect(newItem.locator('.todo-description p')).toHaveText('No description provided.');
    });
});
