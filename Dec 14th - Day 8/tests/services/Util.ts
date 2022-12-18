import { ElementHandle, expect } from "@playwright/test";

export async function getTheRowsResult(tableRows: ElementHandle<HTMLElement | SVGElement>[], stringToCheck: string): Promise<boolean | undefined> {
    let result: boolean = false;
    for await (const tableRow of tableRows) {
        let rowText = await tableRow.innerText();
        if (rowText.includes(stringToCheck)) {
            result = true
        } else {
            false
        }
    }
    return result;
}