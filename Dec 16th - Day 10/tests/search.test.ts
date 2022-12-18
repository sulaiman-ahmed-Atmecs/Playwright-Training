import { expect, test } from "@playwright/test";
import { CONSTANTS } from "./util/Constants";

test("should display the searched content in the result when enter is hit for searching", async ({ page }) => {
    await page.goto(CONSTANTS.BASE_URL + CONSTANTS.SEARCH_URL);
    const searchBox = page.locator("#wp-block-search__input-1");
    await searchBox.fill("cypress");
    await page.press("#wp-block-search__input-1", "Enter");
    const searchResults = await page.locator("//h2[@class='entry-title'] //a").innerText();
    expect(searchResults).toContain("Cypress");
});

test("should display the searched content when the search button is clicked", async ({ page }) => {
    await page.goto(CONSTANTS.BASE_URL + CONSTANTS.SEARCH_URL);
    const searchBox = page.locator("#wp-block-search__input-1");
    await searchBox.fill("cypress");
    await page.click("//button[@class='wp-block-search__button wp-element-button']");
    const searchResults = await page.locator("//h2[@class='entry-title'] //a").innerText();
    expect(searchResults).toContain("Cypress");
});