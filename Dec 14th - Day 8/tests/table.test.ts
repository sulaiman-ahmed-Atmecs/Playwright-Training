import { test, expect } from "@playwright/test";
import { getTheRowsResult } from "./services/Util";
import { CONSTANTS } from "./utillities/Constants";

test("Test to check the filtered table contents", async ({ page }) => {
    await page.goto(CONSTANTS.BASE_URL);
    await page.getByRole('link', { name: 'Tables' }).click();
    await page.getByLabel('Search:').click();
    await page.getByLabel('Search:').fill('ind');
    const tableRows = await page.$$('tr:has-text("Ind")');
    const stringToBeChecked = 'Ind';

    // Loop through the results and check if the string is present in the rows or not
    // Return true if the expected string is present otherwise it returns false
    expect(await getTheRowsResult(tableRows, stringToBeChecked)).toBe(true);
});