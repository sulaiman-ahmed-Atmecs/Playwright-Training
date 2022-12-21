import { APIResponse } from "@playwright/test";
import { Comment } from "../models/Comments";
export default class CommentsService {
    constructor() { }
    async parseCommentFromResponse(jsonResponse: APIResponse): Promise<Comment[]> {
        let result: Comment[] = JSON.parse(await jsonResponse.text());
        if (result !== null) {
            return result;
        }
        else {
            return new Array<Comment>();
        }
    }
}