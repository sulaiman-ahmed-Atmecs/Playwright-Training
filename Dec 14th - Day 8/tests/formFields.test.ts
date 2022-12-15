import { expect, test } from "@playwright/test";
import { FormDataService } from "./services/shared.services";
import { CONSTANTS } from "./utillities/Constants";
import { invalidFormData, requiredValidFormData, validFormData } from "./utillities/FormDataStubs";

var formDataService;

test.beforeAll(async () => {
    console.log("Starting before all");
    formDataService = new FormDataService();
});


test("Test for validating the form with valid data", async ({ page }) => {
    await page.goto(CONSTANTS.BASE_URL)
    await page.getByRole("link", { name: 'Form Fields' }).scrollIntoViewIfNeeded();
    await page.getByRole("link", { name: 'Form Fields' }).click();

    await page.waitForLoadState();
    await expect(page).toHaveURL(/.*form-fields/);
    await page.waitForLoadState();
    const inputTextForName = page.getByLabel('Name(required)');
    await inputTextForName.click();
    const validFormData = formDataService.getValidFormData();
    await inputTextForName.fill(validFormData.formName);
    await page.getByLabel(validFormData.FavoriteDrink).check();
    await page.getByText(validFormData.FavoriteColour).click();
    await page.getByRole('textbox', { name: 'Email' }).fill(validFormData.email);
    await page.getByRole('combobox', { name: 'Do you have any siblings?' }).selectOption('Yes');
    await page.getByRole('button', { name: 'Submit' }).click();

    const result = await page.locator("//h4[@id='contact-form-success-header']").innerText();
    expect(result).toBe('Your message has been sent');

    console.log(result);
});


test("Test for validating the form with required valid data", async ({ page }) => {
    await page.goto(CONSTANTS.BASE_URL)
    await page.getByRole("link", { name: 'Form Fields' }).scrollIntoViewIfNeeded();
    await page.getByRole("link", { name: 'Form Fields' }).click();

    await page.waitForLoadState();
    await expect(page).toHaveURL(/.*form-fields/);
    await page.waitForLoadState();
    const inputTextForName = page.getByLabel('Name(required)');
    await inputTextForName.click();
    const validFormData = formDataService.getRequiredValidFormData()
    await inputTextForName.fill(validFormData.formName);
    await page.getByRole('button', { name: 'Submit' }).click();

    const result = await page.locator("//h4[@id='contact-form-success-header']").innerText();
    expect(result).toBe('Your message has been sent');
});

test("Test for validating the form with invalid data", async ({ page }) => {
    await page.goto(CONSTANTS.BASE_URL)
    await page.getByRole("link", { name: 'Form Fields' }).click();
    await page.waitForLoadState();
    await expect(page).toHaveURL(/.*form-fields/);
    await page.waitForLoadState();
    const inputTextForName = page.locator("//div[@class='wp-block-jetpack-contact-form']//input[@class='name']");
    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page).toHaveURL(/.*form-fields/);
    await expect(inputTextForName).toBeFocused();
});

test.afterAll(async () => {
    formDataService = null;
});