import { APIResponse, expect, test } from "@playwright/test";
import AlbumsService from "./services/AlbumsService";
import { CONSTANTS } from "./util/Constants";

test.describe("Test suite to validate albums api responses", async () => {
    let albumService: AlbumsService = new AlbumsService();

    test("should get all the comments", async ({ request }) => {
        let albumsAPIResponse = await test.step<APIResponse>("make a http Get call to albums api", async () => {
            const response = await request.get(CONSTANTS.ALBUM_URL);
            return response;
        });

        expect(albumsAPIResponse.status()).toBe(200);

        let albumsParsedFromResponse = await albumService.parseAlbumFromResponse(albumsAPIResponse);

        expect(albumsParsedFromResponse?.length).toBeGreaterThanOrEqual(1)
    });

    test.only("should post a album", async ({ request }) => {
        let albumsAPIResponse = await test.step<APIResponse>("make a http post call to comments api", async () => {
            const albumsPostAPIResponse = await request.post(CONSTANTS.ALBUM_URL, {
                headers: {
                    "Content-Type": "application/json"
                },
                data: {
                    userId: 1,
                    id: 1,
                    title: "quidem molestiae enim"
                }
            });
            return albumsPostAPIResponse;
        });

        expect(albumsAPIResponse.status()).toBe(201);
        expect(await albumsAPIResponse.text()).toBeTruthy();
    });

    test("should update a comment", async ({ request }) => {
        let albumsUpdationAPIResponse = await test.step<APIResponse>("Make a http Put request", async () => {
            const albumsAPIResponse: APIResponse = await request.put(CONSTANTS.ALBUM_URL + "/100", {
                headers: {
                    "Content-Type": "application/json"
                },
                data: {
                    userId: 1,
                    id: 1,
                    title: "updated quidem molestiae enim"
                }
            });
            return albumsAPIResponse;
        });
        expect(albumsUpdationAPIResponse.status()).toBe(200);

    });

    test("should delete a album", async ({ request }) => {
        let albumsDeletionAPIResponse = await test.step<APIResponse>("Make a http Put request", async () => {
            const commentAPIResponse: APIResponse = await request.delete(CONSTANTS.ALBUM_URL + "/100");
            return commentAPIResponse;
        });
        expect(albumsDeletionAPIResponse.status()).toBe(200);
    });
});