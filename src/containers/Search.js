import React, { Component } from "react";
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TextInput, FlatList, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ProductListItem from "../components/ProductListItem";
import { searchProducts } from "../actionCreators/search";
import Constants from '../common';


class Search extends Component {

    static defaultProps = {
        text: '',
        products: [],
        isLoading: false
    };

    static propTypes = {
        text: PropTypes.string,
        products: PropTypes.arrayOf(PropTypes.object),
        isLoading: PropTypes.bool,
    };

    onTextInputChange = (text) => {
        if (text) {
            this.props.searchAction(text);
        }
    }

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
                type="user"
            />
        );
    };

    _keyExtractor = (item, index) => {
        return `${index}`;
    };

    render() {
        const { text, products, isLoading } = this.props;
        return (
            <View>
                <View style={Styles.searchBoxBG}>
                    <TextInput
                        style={Styles.searchBox}
                        onChangeText={this.onTextInputChange.bind(this)}
                        value={text}
                        placeholder="Search..."
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                </View>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#ef87ab" />
                ) : (
                        <FlatList
                            data={products}
                            renderItem={this._renderItem}
                            keyExtractor={this._keyExtractor}
                            style={{ backgroundColor: "#fff" }}
                        />
                    )}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        products: state.searchState.products,
        isLoading: state.searchState.isLoading,
        text: state.searchState.text
    };
}

function mapDispatchToProps(dispatch) {
    return {
        searchAction: bindActionCreators(searchProducts, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);

const Styles = StyleSheet.create({
    searchBoxBG: {
        padding: 10, backgroundColor: "#c9c8cd"
    },
    searchBox: {
        height: 40, borderRadius: 10, margin: 10, paddingLeft: 15, paddingRight: 15, borderWidth: 1, backgroundColor: "#fff"
    }
});
