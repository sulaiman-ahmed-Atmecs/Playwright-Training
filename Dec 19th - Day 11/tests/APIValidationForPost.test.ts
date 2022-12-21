import { test, APIResponse, APIRequestContext, expect } from "@playwright/test";
import Post from "./shared/Posts";
import PostService from "./shared/PostsService";

import { CONSTANTS } from "./utils/Constants";
test.describe("Test suites for Posts", async () => {
    let postService: PostService = new PostService();

    test("should get all the posts", async ({ request }) => {

        let apiResponse = await test.step<APIResponse>("Make a http Get request", async () => {
            const blogPostAPIResponse: APIResponse = await request.get(CONSTANTS.POSTS_URL, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            return blogPostAPIResponse;
        });

        expect(apiResponse.status()).toBe(200);
        let convertedAPIResponse = await test.step<Post[] | null>("Convert api response to Blog Post objects", async () => {
            const blogPosts: Post[] | null = await postService.getBlogPostsFromResponse(apiResponse);
            return blogPosts;
        });

        expect(convertedAPIResponse?.length).toBeGreaterThan(1);

    });

    test("should create a blog post", async ({ request }) => {
        let blogPostCreationAPIResponse = await test.step<APIResponse>("Make a http Post request", async () => {
            const blogPostAPIResponse: APIResponse = await request.post(CONSTANTS.POSTS_URL, {
                headers: {
                    "Content-Type": "application/json"
                },
                data: {
                    userId: 1,
                    title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
                }
            });
            return blogPostAPIResponse;
        });

        const createdBlogPost: Post = JSON.parse(await blogPostCreationAPIResponse.text());
        expect(blogPostCreationAPIResponse.status()).toBe(201);
        expect(createdBlogPost.userId).toEqual(1);
        expect(createdBlogPost.title).toEqual("sunt aut facere repellat provident occaecati excepturi optio reprehenderit");
        expect(createdBlogPost.body).toEqual("quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto");

    });
    test("should update a blog post", async ({ request }) => {
        let blogPostUpdationAPIResponse = await test.step<APIResponse>("Make a http Put request", async () => {
            const blogPostAPIResponse: APIResponse = await request.put(CONSTANTS.POSTS_URL + "/100", {
                headers: {
                    "Content-Type": "application/json"
                },
                data: {
                    userId: 10,
                    title: "at nam consequatur ea labore ea harum",
                    body: "no update here quo est a modi nesciunt soluta\nipsa voluptas error itaque dicta in\nautem qui minus magnam et distinctio eum\naccusamus ratione error aut"
                }
            });
            return blogPostAPIResponse;
        });

        const createdBlogPost: Post = JSON.parse(await blogPostUpdationAPIResponse.text());
        expect(blogPostUpdationAPIResponse.status()).toBe(200);
        expect(createdBlogPost.body).toEqual("no update here quo est a modi nesciunt soluta\nipsa voluptas error itaque dicta in\nautem qui minus magnam et distinctio eum\naccusamus ratione error aut");

    });

    test("should delete a blog post", async ({ request }) => {
        let blogPostDeletionAPIResponse = await test.step<APIResponse>("Make a http Put request", async () => {
            const blogPostAPIResponse: APIResponse = await request.delete(CONSTANTS.POSTS_URL + "/100");
            return blogPostAPIResponse;
        });
        expect(blogPostDeletionAPIResponse.status()).toBe(200);
        console.log(await blogPostDeletionAPIResponse.text())
    });

});