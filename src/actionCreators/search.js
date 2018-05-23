import { SEARCH_PRODUCTS, SEARCH_PRODUCTS_SUCCESS, SEARCH_PRODUCTS_FAILURE } from "../actionTypes/search";

export function searchProducts(text) {
    return {
        type: SEARCH_PRODUCTS,
        text
    }
}

export function searchProductsSuccess(text, products) {
    return {
        type: SEARCH_PRODUCTS_SUCCESS,
        text,
        products
    }
}

export function searchProductsFailure(text, error) {
    return {
        type: SEARCH_PRODUCTS_FAILURE,
        text,
        error
    }
}
