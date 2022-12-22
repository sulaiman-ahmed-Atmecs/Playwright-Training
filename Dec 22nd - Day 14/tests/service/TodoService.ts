import { APIResponse } from "@playwright/test";
import { Todo } from "../models/Todo";

export default class TodoService {
    constructor() { }
    async parseTodosFromResponse(jsonResponse: APIResponse): Promise<Todo[]> {
        let result: Todo[] = JSON.parse(await jsonResponse.text());
        if (result !== null) {
            return result;
        }
        else {
            return new Array<Todo>();
        }
    }
}