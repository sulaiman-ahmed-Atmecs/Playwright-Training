import test from "@playwright/test";

test.only("Test to check for mock APIs", async ({ page }) => {
    await page.route('https://dog.ceo/api/breeds/list/all', async route => {
        const json = {
            message: { 'test_breed': [] }
        };
        await route.fulfill({ json });
    });

    await page.route('https://dog.ceo/api/breeds/list/all', async route => {
        const response = await route.fetch();
        const json = await response.json();
        json.message['big_red_dog'] = [];
        // Fullfill using the original response, while patching the response body
        // with the given JSON object.
        await route.fulfill({ response, json });
    });
});