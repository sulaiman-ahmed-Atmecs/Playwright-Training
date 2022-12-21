import { APIResponse, expect, test } from "@playwright/test"
import CommentsService from "./services/CommentsService";
import { CONSTANTS } from "./util/Constants";

test.describe("Test suite to validate comments api responses", async () => {
    let commentsService: CommentsService = new CommentsService();

    test("should get all the comments", async ({ request }) => {
        let commentsAPIResponse = await test.step<APIResponse>("make a http Get call to comments api", async () => {
            const response = await request.get(CONSTANTS.COMMENTS_URL);
            return response;
        });

        expect(commentsAPIResponse.status()).toBe(200);

        let commentsParsedFromResponse = await commentsService.parseCommentFromResponse(commentsAPIResponse);
        commentsParsedFromResponse.forEach(comment => {
            console.log(comment);
        });

        expect(commentsParsedFromResponse?.length).toBeGreaterThanOrEqual(1)
    });

    test.only("should post a comments", async ({ request }) => {
        let commentsAPIResponse = await test.step<APIResponse>("make a http post call to comments api", async () => {
            const commentsPostAPIResponse = await request.post(CONSTANTS.COMMENTS_URL, {
                headers: {
                    "Content-Type": "application/json"
                },
                data: {

                    postId: 12,
                    name: "id labore ex et quam laborum",
                    email: "Eliseo@gardner.biz",
                    body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"

                }
            });
            return commentsPostAPIResponse;
        });

        expect(commentsAPIResponse.status()).toBe(201);
        const result = await commentsAPIResponse.text();
        console.log(result);
        expect(await commentsAPIResponse.text()).toBeTruthy();
    });

    test("should update a comment", async ({ request }) => {
        let commentUpdationAPIResponse = await test.step<APIResponse>("Make a http Put request", async () => {
            const commentAPIResponse: APIResponse = await request.put(CONSTANTS.COMMENTS_URL + "/100", {
                headers: {
                    "Content-Type": "application/json"
                },
                data: {
                    postId: 12,
                    name: "id labore ex et quam laborum",
                    email: "Eliseo@gardner.biz",
                    body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
                }
            });
            return commentAPIResponse;
        });
        expect(commentUpdationAPIResponse.status()).toBe(200);

    });

    test("should delete a comment", async ({ request }) => {
        let commentDeletionAPIResponse = await test.step<APIResponse>("Make a http Put request", async () => {
            const commentAPIResponse: APIResponse = await request.delete(CONSTANTS.COMMENTS_URL + "/100");
            return commentAPIResponse;
        });
        expect(commentDeletionAPIResponse.status()).toBe(200);
    });
});