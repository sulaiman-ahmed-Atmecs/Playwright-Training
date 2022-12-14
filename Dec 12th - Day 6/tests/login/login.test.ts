import { Browser, BrowserContext, chromium, Dialog, Locator, Page } from "playwright"

describe("Login", () => {
    let browser: Browser;
    let browserContext: BrowserContext;
    let page: Page

    const loginData = {
        username: "standard_user",
        password: "secret_sauce"
    };
    beforeAll(async () => {
        browser = await chromium.launch(//{
            //     headless: false,
            //     args: ["--start-maximized"]
            // }
        );
        browserContext = await browser.newContext();
        page = await browserContext.newPage();

    });

    test("Login using JSON Data", async () => {
        await page.goto("https://www.saucedemo.com/");
        let inputTextElement_Username: Locator = page.getByPlaceholder("Username");
        let inputTextElement_Password: Locator = page.getByPlaceholder("Password");
        await inputTextElement_Username.fill(loginData.username);
        await inputTextElement_Password.fill(loginData.password);
        await page.click("//input[@id='login-button']");
    });

    test("Login using hardcoded credentials", async () => {
        await page.goto("https://www.saucedemo.com/");
        let inputTextElement_Username: Locator = page.getByPlaceholder("Username");
        let inputTextElement_Password: Locator = page.getByPlaceholder("Password");
        await inputTextElement_Username.fill("standard_user");
        await inputTextElement_Password.fill("secret_sauce");
        await page.click("//input[@id='login-button']");

    });

    test("Login using hardcoded credentials", async () => {
        await page.goto("https://www.saucedemo.com/");
        let inputTextElement_Username: Locator = page.getByPlaceholder("Username");
        let inputTextElement_Password: Locator = page.getByPlaceholder("Password");
        await inputTextElement_Username.fill("performance_glitch_user");
        await inputTextElement_Password.fill("secret_sauce");
        await page.click("//input[@id='login-button']");

        const heroes = await page.$eval<string, HTMLSelectElement>("#superheroes", ele => ele.value);

    });
    afterAll(async () => {
        await page.close();
        await browserContext.close();
        await browser.close();
    });
});