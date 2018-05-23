import { GET_PRODUCTS, GET_PRODUCTS_FAILURE, GET_PRODUCTS_SUCCESS, GET_PRODUCT, GET_PRODUCT_SUCCESS, GET_PRODUCT_FAILURE, ADD_PRODUCT, ADD_PRODUCT_SUCCESS, ADD_PRODUCT_FAILURE } from "../actionTypes/product";

export default (prevState = { products: [], product: {}, isLoading: false, isRefreshing: false, page: 1, limit: 8 }, action) => {
    console.log(action.type);
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...prevState,
                isLoading: prevState.products.length > 0 ? false : true,
                page: action.page
            }
        case GET_PRODUCTS_SUCCESS:
            return {
                ...prevState,
                isLoading: false,
                products: prevState.products.concat(action.products)
            }
        case GET_PRODUCT:
            return {
                isLoading: true
            }
        case GET_PRODUCT_SUCCESS:
            return {
                isLoading: false,
                product: action.product[0]
            }
        case ADD_PRODUCT:
            return {
                isLoading: true,
                payload: action.payload
            }
        case ADD_PRODUCT_SUCCESS:
            return {
                isLoading: false,
                success: action.success
            }
        case GET_PRODUCTS_FAILURE:
        case GET_PRODUCT_FAILURE:
        case ADD_PRODUCT_FAILURE:
            return {
                ...prevState,
                isLoading: false,
                error: action.error
            }
        default:
            return prevState;
    }
}