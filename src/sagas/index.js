import { fork } from 'redux-saga/effects';
import { productWatchers } from "./product";
import { singleProductWatchers } from "./singleProduct";
import { productSearchWatchers } from "./search";
import { addProductWatchers } from './addProduct';

export default function* rootWatchers() {
    yield* [
        fork(productWatchers),
        fork(singleProductWatchers),
        fork(addProductWatchers),
        fork(productSearchWatchers),
    ]
}