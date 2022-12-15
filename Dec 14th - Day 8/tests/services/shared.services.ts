import { formDataType } from "../utillities/FormDataType";

export class FormDataService {
    constructor(){
        
    }

    validFormData: formDataType = {
        formName: "sulaiman",
        FavoriteDrink: "Water",
        FavoriteColour: "Blue",
        sibling: true,
        email: "sulaiman@gmail.com",
    };
    requiredValidFormData: formDataType = {
        formName: "sulaiman",
        FavoriteDrink: null,
        FavoriteColour: null,
        sibling: null,
        email: null,
    };

    invalidFormData: formDataType = {
        formName: "",
        FavoriteDrink: null,
        FavoriteColour: null,
        sibling: null,
        email: null,
    };

    public getValidFormData(): formDataType {
        return this.validFormData;
    }

    public getRequiredValidFormData(): formDataType {
        return this.requiredValidFormData;
    }

    public getinValidFormData(): formDataType {
        return this.invalidFormData;
    }
}
