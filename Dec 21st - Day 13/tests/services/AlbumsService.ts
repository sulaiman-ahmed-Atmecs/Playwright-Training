import { APIResponse } from "@playwright/test";
import { Album } from "../models/Album";

export default class AlbumsService {
    constructor() { }
    async parseAlbumFromResponse(jsonResponse: APIResponse): Promise<Album[]> {
        let result: Album[] = JSON.parse(await jsonResponse.text());
        if (result !== null) {
            return result;
        }
        else {
            return new Array<Album>();
        }
    }
}