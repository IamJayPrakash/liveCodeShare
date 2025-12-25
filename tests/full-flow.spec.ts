import { test, expect } from '@playwright/test';

test.describe('LiveCodeShare E2E Flow', () => {
    test('Homepage loads with critical elements', async ({ page }) => {
        try {
            await page.goto('/');

            // Wait for loading shimmer/page to disappear
            await expect(page.getByText('Loading LiveCodeShare...')).not.toBeVisible({ timeout: 15000 });

            // Check Document Title
            await expect(page).toHaveTitle(/LiveCodeShare/);
        } catch (e) {
            console.log('PAGE CONTENT ON FAILURE:', await page.content());
            throw e;
        }

        // Check Hero Section
        await expect(page.getByRole('heading', { name: 'LiveCodeShare' })).toBeVisible();
        await expect(page.getByText('Collaborate in real-time with others')).toBeVisible();

        // Check "Create a New Room" button
        const createBtn = page.getByRole('button', { name: 'Create a new collaboration room' });
        await expect(createBtn).toBeVisible();

        // Check Features Section
        await expect(page.getByText('Why Choose LiveCodeShare?')).toBeVisible();

        // Check FAQ Section
        await expect(page.getByText('Frequently Asked Questions')).toBeVisible();
    });

    test('Navigation to Help page works', async ({ page }) => {
        await page.goto('/');

        // Click on "How to use?" link in header
        await page.getByRole('link', { name: 'Learn how to use LiveCodeShare' }).click();

        // Verify URL
        await expect(page).toHaveURL(/.*\/help/);

        // Verify Help Page Content
        await expect(page.getByRole('heading', { name: 'How to use LiveCodeShare' })).toBeVisible();
    });

    test('Create Room and verify Editor loads', async ({ page }) => {
        await page.goto('/');

        // Click "Create Room"
        await page.getByRole('button', { name: 'Create a new collaboration room' }).click();

        // Verify URL redirected to room
        await expect(page).toHaveURL(/.*\/room\/.+/);

        // Verify Editor Components
        // 1. Language Selector
        await expect(page.getByRole('combobox', { name: 'Select programming language' })).toBeVisible();

        // 2. Run Button
        await expect(page.getByRole('button', { name: 'Run code' })).toBeVisible();

        // 3. Room Details (Sidebar toggle)
        // Note: The sidebar toggle is icon-only, accessible via title "Room Info"
        const infoBtn = page.getByRole('button', { name: 'Room Info' });
        await expect(infoBtn).toBeVisible();

        // Open Sidebar
        await infoBtn.click();
        await expect(page.getByRole('heading', { name: 'Room Details' })).toBeVisible();
        await expect(page.getByText('Session ID')).toBeVisible();
    });

    test('Room Joining via Form', async ({ page }) => {
        await page.goto('/');

        const roomId = 'test-room-123';

        // Fill Room ID
        await page.getByLabel('Room ID').fill(roomId);

        // Click Join
        await page.getByRole('button', { name: 'Join room' }).click();

        // Verify Redirect
        await expect(page).toHaveURL(new RegExp(`/room/${roomId}`));
    });

    test('Check Theme Toggle', async ({ page }) => {
        await page.goto('/');

        // Toggle is in header
        const themeBtn = page.getByRole('button', { name: 'Toggle theme' });
        await expect(themeBtn).toBeVisible();

        // Click to open dropdown
        await themeBtn.click();

        // Check options visible
        await expect(page.getByRole('menuitem', { name: 'Light' })).toBeVisible();
        await expect(page.getByRole('menuitem', { name: 'Dark' })).toBeVisible();
    });
});
