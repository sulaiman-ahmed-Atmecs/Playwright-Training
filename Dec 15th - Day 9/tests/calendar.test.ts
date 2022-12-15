import { expect, test } from "@playwright/test";
import moment from "moment";
import { CONSTANTS } from "./Constants";

const inputDateToBeSelected: string = moment().add(1, 'day').format("MMMM DD, YYYY");

test("Check for a valid date of a calendar", async ({ page }) => {
    console.log(inputDateToBeSelected);
    // //input[@class='date jp-contact-form-date hasDatepicker']
    await page.goto(CONSTANTS.BASE_URL);
    await page.click("//input[@class='date jp-contact-form-date hasDatepicker']");
    const datePicker = page.locator("//input[@class='date jp-contact-form-date hasDatepicker']");
    await datePicker.type(inputDateToBeSelected);
    await datePicker.press("Tab");
    await page.getByRole('button', { name: 'Submit' }).click();
    const result = await page.locator("//div[@class='field-value']").innerText();
    expect(result).toContain(inputDateToBeSelected);
});