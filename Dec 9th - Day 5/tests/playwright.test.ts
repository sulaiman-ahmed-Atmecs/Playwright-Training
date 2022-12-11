import { chromium, Browser, FileChooser } from "@playwright/test";
// to run this test open index.html file inside the browser first and then run.


describe("Suite to add a todo list", () => {
    test("Add the task in to do lists", async () => {
        const pageURL: string = __dirname + "\\index.html";
        const browser = await chromium.launch({ headless: false, args: ["--start-maximized"] });
        const context = await browser.newContext({ viewport: null });
        const page = await context.newPage();
        await page.goto(pageURL);
        var file1 = "C:\\Users\\Sulaiman.Zameer\\Downloads" + "\\bulb.jpeg";
        var file2 = "C:\\Users\\Sulaiman.Zameer\\Download" + "\\elephant.jpeg";
        page.on("filechooser", async (filechooser: FileChooser) => {
            await filechooser.setFiles([file1, file2]);
        });
        await page.click("#fileSelector", { force: true });
        await page.close();
        await context.close();
        await browser.close();

    });
});