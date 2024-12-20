export enum LoadingStatus {
    LOADED = "LOADED",
    LOADING = "LOADING",
    ERROR = "ERROR",
    NEVER = "NEVER",
    SUCCESS = "SUCCESS"
}

export interface AuthErrors {
    emailError: string;
    firstNameError: string;
    lastNameError: string;
    passwordError: string;
    password2Error: string;
}

export interface Food {
    id: string,
    name: string,
    price: number,
    salePrice: number | null,
    reviews: [],
    rate: number,
    qtyReview: number,
    images: Array<string>,
    qtyRemain: number,

    quickIntro: string
    desc: Array<string>,
}