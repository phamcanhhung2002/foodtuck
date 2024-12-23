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

export interface HeaderResponse<T> {
	items: Array<T>;
	pagesCount: number;
	totalElements: number;
}

export interface FilterParamsType {
	categories?: Array<string>;
	prices: Array<number>;
	currentPage?: number;
    pageSize?: number;
	sortByPrice?: boolean;	
}

export interface FoodsSearchRequest {
    text: string;
    currentPage: number;
    pageSize: number;
}

export interface Food {
    id: string,
    name: string,
    price: number,
    originalPrice: number,
    reviews: [],
    rate: number,
    qtyReview: number,
    images: Array<string>,
    qtyRemain: number,

    quickIntro: string
    desc: Array<string>,
}