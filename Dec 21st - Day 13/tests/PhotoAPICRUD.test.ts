import { APIResponse, expect, test } from "@playwright/test"
import PhotosService from "./services/PhotosService";
import { CONSTANTS } from "./util/Constants";

test.describe("Test suite to validate comments api responses", async () => {
    let photosService: PhotosService = new PhotosService();

    test("should get all the photos", async ({ request }) => {
        let photosAPIResponse = await test.step<APIResponse>("make a http Get call to comments api", async () => {
            const response = await request.get(CONSTANTS.PHOTO_URL);
            return response;
        });

        expect(photosAPIResponse.status()).toBe(200);

        let photosParsedFromResponse = await photosService.parsePhotosFromResponse(photosAPIResponse);
        expect(photosParsedFromResponse?.length).toBeGreaterThanOrEqual(1)
    });

    test("should post a photos", async ({ request }) => {
        let photosAPIResponse = await test.step<APIResponse>("make a http post call to photos api", async () => {
            const photosPostAPIResponse = await request.post(CONSTANTS.PHOTO_URL, {
                headers: {
                    "Content-Type": "application/json"
                },
                data: {
                    albumId: 1,
                    title: "reprehenderit est deserunt velit ipsam",
                    url: "https://via.placeholder.com/600/771796",
                    thumbnailUrl: "https://via.placeholder.com/150/771796"

                }
            });
            return photosPostAPIResponse;
        });

        expect(photosAPIResponse.status()).toBe(201);
        expect(await photosAPIResponse.text()).toBeTruthy();
    });

    test("should update a photo", async ({ request }) => {
        let photosUpdationAPIResponse = await test.step<APIResponse>("Make a http Put request", async () => {
            const photosAPIResponse: APIResponse = await request.put(CONSTANTS.PHOTO_URL + "/100", {
                headers: {
                    "Content-Type": "application/json"
                },
                data: {
                    albumId: 1,
                    title: "updatedreprehenderit est deserunt velit ipsam",
                    url: "https://via.placeholder.com/600/771796",
                    thumbnailUrl: "https://via.placeholder.com/150/771796"

                }
            });
            return photosAPIResponse;
        });
        expect(photosUpdationAPIResponse.status()).toBe(200);

    });

    test("should delete a photo", async ({ request }) => {
        let photosDeletionAPIResponse = await test.step<APIResponse>("Make a http Put request", async () => {
            const commentAPIResponse: APIResponse = await request.delete(CONSTANTS.PHOTO_URL + "/100");
            return commentAPIResponse;
        });
        expect(photosDeletionAPIResponse.status()).toBe(200);
    });
});