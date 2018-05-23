import { put, takeLatest } from "redux-saga/effects";
import * as actionCreators from "../actionCreators/product"
import { GET_PRODUCTS, ADD_PRODUCT } from "../actionTypes/product";
import Constants from '../common';


function* getProducts(action) {
    try {
        let products = yield fetch(`${Constants.baseUrl}/?_page=${action.page}&_limit=${action.limit}`).then(r => r.json());
        yield put(actionCreators.getProductsSuccess(products))
    } catch (error) {
        yield put(actionCreators.getProductsFailure(error))
    }
}

export function* productWatchers() {
    yield takeLatest(GET_PRODUCTS, getProducts)
}