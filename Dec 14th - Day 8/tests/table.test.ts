import { test, expect } from "@playwright/test";
import { CONSTANTS } from "./utillities/Constants";

test("Test to check the filtered table contents", async ({ page }) => {
    await page.goto(CONSTANTS.BASE_URL);
    await page.getByRole('link', { name: 'Tables' }).click();
    await page.getByLabel('Search:').click();
    await page.getByLabel('Search:').fill('ind');
    //const resultCountries = await page.locator(".//td[@class='column-2']").textContent();
    const tableRows = await page.$$('tr:has-text("Ind")');

    let rowText;
    for await (const tableRow of tableRows) {
        rowText = await tableRow.innerText();
        console.log(rowText);
        expect(rowText).toContain("Ind");
    }
});