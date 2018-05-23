import { put, takeLatest } from "redux-saga/effects";
import * as actionCreators from "../actionCreators/search"
import { ADD_PRODUCT } from "../actionTypes/product";
import Constants from '../common';


function* addProduct(action) {
    let data = {
        body: action.payload,
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
    };
    try {
        let success = yield fetch(`${Constants.baseUrl}/`, data).then(p => { message: "Product Saved Successfully" });
        yield put(actionCreators.addProductSuccess(success))
    } catch (error) {
        yield put(actionCreators.addProductFailure(error))
    }
}

export function* addProductWatchers() {
    yield takeLatest(ADD_PRODUCT, addProduct)
}