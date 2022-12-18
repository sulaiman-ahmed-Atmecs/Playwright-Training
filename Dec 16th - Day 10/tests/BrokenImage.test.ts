import { test } from "@playwright/test";
import { CONSTANTS } from "./util/Constants";

test.only("Test to check for broken images", async ({ page }) => {
    await page.goto(CONSTANTS.BASE_URL + CONSTANTS.BROKEN_IMAGE_URL);
});