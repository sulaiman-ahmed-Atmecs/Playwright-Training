import { expect, test } from "@playwright/test";
import { CONSTANTS } from "./util/Constants";

test.only("Test to check for broken images", async ({ page, request }) => {
    await page.goto(CONSTANTS.BASE_URL + CONSTANTS.BROKEN_IMAGE_URL);
    const xPathForImageElements: string = "//div[@class='wp-block-columns is-layout-flex wp-container-4']//div[@class='wp-block-column is-layout-flow']//img";
    var images: string[] = await page.$$eval<string[], HTMLImageElement>(xPathForImageElements, async (imageElementsArray) => {
        let imageURLs: string[] = new Array();
        for await (const imageElement of imageElementsArray) {
            imageURLs.push(imageElement.src);
        }
        return imageURLs;
    });
    for await (const image of images) {

        const imageResult = await request.get(image);
        if (imageResult.status() >= 200) {
            expect(imageResult.body).toBeTruthy();
        }
        else {
            console.log(`${image} is invalid.`);
            expect(imageResult.status()).toBeGreaterThanOrEqual(400);
        }
    }
});
