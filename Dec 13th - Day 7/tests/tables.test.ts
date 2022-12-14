import { expect, Locator, test } from "@playwright/test";

test("Test to check for filtered table contents", async ({ page }) => {
    await page.goto('https://automatenow.io/sandbox-automation-testing-practice-website/');
    await page.getByRole('link', { name: 'Tables' }).click();
    await page.getByLabel('Search:').click();
    await page.getByLabel('Search:').fill('ind');
    //const resultCountries = await page.locator(".//td[@class='column-2']").textContent();
    const tableRows = await page.$$('tr:has-text("Ind")');

    for await (const tableRow of tableRows) {
        let rowText = await tableRow.innerText();
        expect(rowText).toContain("Ind");
    }
});