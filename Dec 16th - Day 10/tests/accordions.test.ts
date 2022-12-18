import { expect, test } from "@playwright/test";
import { CONSTANTS } from "./util/Constants";

test("should show the text inside the accordion when expanded", async ({ page }) => {
    await page.goto(CONSTANTS.BASE_URL + CONSTANTS.ACCORDIONS_URL);

    // Clicking to expand the accordion
    await page.getByText('Click to see more').click();
    let actualAccordionText = page.getByText('This is an accordion item.');
    expect(actualAccordionText).not.toBeFalsy();
});

test("should not show the text inside the accordion when contracted", async ({ page }) => {
    await page.goto(CONSTANTS.BASE_URL + CONSTANTS.ACCORDIONS_URL);
    await page.getByText('Click to see more').click();
    let actualAccordionText = page.getByText('This is an accordion item.');

    // Clicking to expand the accordion
    expect(actualAccordionText).not.toBeFalsy();
    // click again to contract the accordion
    await page.getByText('Click to see more').click();
    await expect(actualAccordionText).not.toBeVisible();
});