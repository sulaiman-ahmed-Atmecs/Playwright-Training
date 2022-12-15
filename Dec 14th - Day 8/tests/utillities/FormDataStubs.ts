import { formDataType } from "./FormDataType";
export const validFormData: formDataType = {
    formName: "sulaiman",
    FavoriteDrink: "Water",
    FavoriteColour: "Blue",
    sibling: true,
    email: "sulaiman@gmail.com",
};
export const requiredValidFormData: formDataType = {
    formName: "sulaiman",
    FavoriteDrink: null,
    FavoriteColour: null,
    sibling: null,
    email: null,
};

export const invalidFormData: formDataType = {
    formName: "",
    FavoriteDrink: null,
    FavoriteColour: null,
    sibling: null,
    email: null,
};

export { }