import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider, connect } from "react-redux";
import AppWithNavigationState, { middleware } from "./src/containers/AppNavigator";
import rootReducer from "./src/reducers";
import createSagaMiddleware from "redux-saga";
import rootWatchers from "./src/sagas";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    {
        productState: {
            products: [],
            product: {},
            isLoading: false,
            isRefreshing: false,
            page: 1,
            limit: 8
        },
        storeState: { stores: [], isLoading: false }
    },
    applyMiddleware(middleware, sagaMiddleware)
);
sagaMiddleware.run(rootWatchers);

export default class Root extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppWithNavigationState />
            </Provider>
        );
    }
}
