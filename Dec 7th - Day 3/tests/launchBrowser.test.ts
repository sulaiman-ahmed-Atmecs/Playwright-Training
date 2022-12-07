import { Browser, chromium } from "playwright";

describe("Sample run", () => {
    test("Open playwright", async () => {
       const browserrrr =   await chromium.launch({
        headless: false, 
       });
       const context = await browserrrr.newContext();
       const page = await context.newPage();
       await page.goto("https://www.google.com");
       await browserrrr.close();
    });
});