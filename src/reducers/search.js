import { SEARCH_PRODUCTS, SEARCH_PRODUCTS_FAILURE, SEARCH_PRODUCTS_SUCCESS } from "../actionTypes/search";

export default (state = {}, action) => {
    console.log(action.type);
    switch (action.type) {
        case SEARCH_PRODUCTS:
            return { text: action.text, isLoading: true };
        case SEARCH_PRODUCTS_SUCCESS:
            return { text: action.text, isLoading: false, products: action.products };
        case SEARCH_PRODUCTS_FAILURE:
            return { text: action.text, isLoading: false, error: action.error };
        default:
            return state;

    }
}