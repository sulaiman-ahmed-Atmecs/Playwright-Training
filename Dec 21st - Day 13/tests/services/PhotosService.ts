import { APIResponse } from "@playwright/test";
import { Photo } from "../models/Photo";

export default class PhotosService {

    constructor() { }
    async parsePhotosFromResponse(jsonResponse: APIResponse): Promise<Photo[]> {
        let result: Photo[] = JSON.parse(await jsonResponse.text());
        if (result !== null) {
            return result;
        }
        else {
            return new Array<Photo>();
        }
    }
}