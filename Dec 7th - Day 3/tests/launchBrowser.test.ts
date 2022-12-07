import { chromium } from "playwright";

describe("Sample run", () => {
    test("Open playwright", async () => {
       const browser =   await chromium.launch({
        headless: false
       });
       const context = await browser.newContext();
       const page = await context.newPage();
       await page.goto("https://www.google.com");
       await browser.close();
    });
});

// command to run this test case "npm run day3" or "npm test"