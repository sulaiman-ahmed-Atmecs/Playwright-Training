import { APIResponse, expect, test } from "@playwright/test";
import TodoService from "./service/TodoService";
import { CONSTANTS } from "./util/Constants";

test.describe("Test suite to validate todos api responses", async () => {
    let photosService: TodoService = new TodoService();

    test("should get all the todos", async ({ request }) => {
        let todosAPIResponse = await test.step<APIResponse>("make a http Get call to todos api", async () => {
            const response = await request.get(CONSTANTS.TODOS_URL);
            return response;
        });

        expect(todosAPIResponse.status()).toBe(200);

        let photosParsedFromResponse = await photosService.parseTodosFromResponse(todosAPIResponse);
        expect(photosParsedFromResponse?.length).toBeGreaterThanOrEqual(1)
    });

    test("should post a photos", async ({ request }) => {
        let todosAPIResponse = await test.step<APIResponse>("make a http post call to todos api", async () => {
            const todosPostAPIResponse = await request.post(CONSTANTS.TODOS_URL, {
                headers: {
                    "Content-Type": "application/json"
                },
                data: {
                    userId: 1,
                    title: "Created quis ut nam facilis et officia qui",
                    completed: false
                }
            });
            return todosPostAPIResponse;
        });

        expect(todosAPIResponse.status()).toBe(201);
        expect(await todosAPIResponse.text()).toBeTruthy();
    });

    test("should update a todo", async ({ request }) => {
        let todosUpdationAPIResponse = await test.step<APIResponse>("Make a http Put request", async () => {
            const todosAPIResponse: APIResponse = await request.put(CONSTANTS.TODOS_URL + "/100", {
                headers: {
                    "Content-Type": "application/json"
                },
                data: {
                    userId: 1,
                    title: "Updated quis ut nam facilis et officia qui",
                    completed: false
                }
            });
            return todosAPIResponse;
        });
        expect(todosUpdationAPIResponse.status()).toBe(200);

    });

    test("should delete a todo", async ({ request }) => {
        let todosDeletionAPIResponse = await test.step<APIResponse>("Make a http Put request", async () => {
            const commentAPIResponse: APIResponse = await request.delete(CONSTANTS.TODOS_URL + "/100");
            return commentAPIResponse;
        });
        expect(todosDeletionAPIResponse.status()).toBe(200);
    });
});