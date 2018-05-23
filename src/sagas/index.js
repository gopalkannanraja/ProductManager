import { fork } from 'redux-saga/effects';
import { productWatchers } from "./product";
import { productSearchWatchers } from "./search";

export default function* rootWatchers() {
    yield* [
        fork(productWatchers),
        fork(productSearchWatchers)
    ]
}