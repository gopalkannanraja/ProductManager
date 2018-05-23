import React, { Component } from "react";
import ProductListItem from "../components/ProductListItem";
import { ActivityIndicator, FlatList, RefreshControl, Alert, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as productActionCreators from "../actionCreators/product";
import Constants from '../common';

class AdminView extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.getProducts(this.props.page, this.props.limit);
    }

    onWishTapped = id => {
        
    };

    _getProducts = (page = 1, limit = 8) => {
        this.props.actions.getProducts(page, limit);
    };

    _getMore = () => {
        this._getProducts(++this.props.page, this.props.limit);
    };

    _renderItem = ({ index, item }) => {
        return (
            <ProductListItem
                {...this.props}
                id={item.id}
                title={`${item.id} - ${item.title}`}
                image={item.image ? `${Constants.baseUrl}/images/${item.image}` : null}
                rating={item.rating}
                price={item.price}
                wish={item.wish || false}
                onWishTapped={this.onWishTapped}
                type="admin"
            />
        );
    };

    _keyExtractor = (item, index) => {
        return `${index}`;
    };

    _onRefresh = () => {
        this._getProducts();
    };

    _renderRefreshControl() {
        return (
            <RefreshControl
                onRefresh={this._onRefresh}
                refreshing={this.props.isRefreshing}
                tintColor={"#ef87ab"}
                title={"Refreshing..."}
                titleColor={"#ef87ab"}
            />
        );
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                {this.props.isLoading ? (
                    <ActivityIndicator size="large" color="#ef87ab" />
                ) : (
                    <FlatList
                        data={this.props.products}
                        renderItem={this._renderItem}
                        keyExtractor={this._keyExtractor}
                        onEndReachedThreshold={0.5}
                        onEndReached={this._getMore}
                        refreshControl={this._renderRefreshControl()}
                    />
                )}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        products: state.productState.products,
        isLoading: state.productState.isLoading,
        isRefreshing: state.productState.isRefreshing,
        page: state.productState.page,
        limit: state.productState.limit
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(productActionCreators, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(
    AdminView
);
