import { put, takeLatest } from "redux-saga/effects";
import * as actionCreators from "../actionCreators/search"
import { SEARCH_PRODUCTS } from "../actionTypes/search";
import Constants from '../common';


function* getProducts(action) {
    try {
        let products = yield fetch(`${Constants.baseUrl}/?q=${action.text}`).then(r => r.json());
        yield put(actionCreators.searchProductsSuccess(action.text, products))
    } catch (error) {
        yield put(actionCreators.searchProductsFailure(action.text, error))
    }
}

export function* productSearchWatchers() {
    yield takeLatest(SEARCH_PRODUCTS, getProducts)
}