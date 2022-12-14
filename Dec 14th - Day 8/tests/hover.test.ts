import { test, expect } from "@playwright/test";
test("Test to check the Hover action", async ({ page }) => {
    await page.goto('https://automatenow.io/sandbox-automation-testing-practice-website/');
    await page.getByRole('link', { name: 'Hover' }).click();
    await page.locator("#mouse_over").hover();
    const changedText = await page.locator('#mouse_over').textContent();
    console.log("HTML content is :" + changedText);
    expect(changedText).toBe('You did it!');
});