import { put, takeLatest } from "redux-saga/effects";
import * as actionCreators from "../actionCreators/product"
import { GET_PRODUCT } from "../actionTypes/product";
import Constants from '../common';

function* getSingleProduct(action) {
    try {
        let product = yield fetch(`${Constants.baseUrl}/?id=${action.id}`).then(r => r.json());
        yield put(actionCreators.getProductSuccess(product))
    } catch (error) {
        yield put(actionCreators.getProductFailure(error))
    }
}


export function* singleProductWatchers() {
    yield takeLatest(GET_PRODUCT, getSingleProduct)
}

