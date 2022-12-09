import { chromium, FileChooser } from "@playwright/test";

const sleepFunction: Function = () => new Promise(r => setTimeout(() => { }, 110000));
describe("Visit Udemy and Login", () => {
    test("Launch Chromium Google Chrome Browser", async () => {
        const browser = await chromium.launch({ headless: false, args: ["--start-maximized"] });
        const context = await browser.newContext({ viewport: null });
        const page = await context.newPage();
        await page.goto("file:///C:/Users/Sulaiman.Zameer/Playwright/Playwright-Training/Dec%208th%20-%20Day%204/tests/index.html");

        // One way to set files is to use the event listener.
        // await page.on("filechooser", async (filechooser: FileChooser) => {
        //     if (await filechooser.isMultiple()) {

        //     }
        // });

        // Another way is to use the setInputFiles method on the page 
        let filePath: string = "";
        // await page.setInputFiles("input[name='fileChooser']", filePath)

        await page.fill("input[name='email']", "sulaiman24998@gmail.com");

        await page.fill("input[name='password']", "Shakeel@786");

        await page.click('button:text("Login")');
        // await sleepFunction();
        await page.close();
        await browser.close()
    });
});