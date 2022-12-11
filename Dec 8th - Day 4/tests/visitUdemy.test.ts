import { chromium, FileChooser } from "@playwright/test";

const sleepFunction: Function = () => new Promise(r => setTimeout(() => { }, 110000));
describe("Visit Udemy and Login", () => {
    test("Launch Chromium Google Chrome Browser", async () => {
        const browser = await chromium.launch({ headless: false, args: ["--start-maximized"] });
        const context = await browser.newContext({ viewport: null });
        const page = await context.newPage();
        const pageURL = __dirname + "\\index.html";
        await page.goto(pageURL);


        // Another way is to use the setInputFiles method on the page 
        //let filePath: string = "";
        // await page.setInputFiles("input[name='fileChooser']", filePath)

        await page.fill("input[name='email']", "sulaiman@gmail.com");

        await page.fill("input[name='password']", "123456789");

        await page.click('button:text("Login")');
        // await sleepFunction();
        await page.close();
        await browser.close()
    });
});