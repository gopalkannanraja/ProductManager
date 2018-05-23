import React from "react";
import PropTypes from 'prop-types';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getProduct } from "../actionCreators/product";
import Constants from '../common';


class ProductDetail extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: `Product Detail for ${navigation.state.params.id}`
    });

    static defaultProps = {
        product: {},
        isLoading: false,
        refreshing: false,
    };

    static propTypes = {
        product: PropTypes.object,
        isLoading: PropTypes.bool,
    };

    componentDidMount() {
        let { id } = this.props.navigation.state.params;
        this.props.getProduct(id);
    }

    renderProduct() {
        const { navigation, product } = this.props;
        return (<View>
            <Image
                source={product.image ? { uri: `${Constants.baseUrl}/images/${product.image}` } : require("../assets/barcode.png")}
                style={{ height: 200, marginTop: 20 }}
                resizeMode="contain"
            />
            <Text style={styles.title}>{product.id} - {product.title}</Text>
            <Text style={[styles.title, { fontSize: 16 }]}>
                {product.additionalInfo && `(${product.additionalInfo})`}
            </Text>
        </View>)
    }

    render() {
        const { isLoading } = this.props;
        return (
            <View style={styles.container}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#ef87ab" />
                ) : (
                        this.renderProduct()
                    )}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        product: state.productState.product,
        isLoading: state.productState.isLoading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getProduct: bindActionCreators(getProduct, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "stretch",
        padding: 10
    },
    title: {
        fontSize: 24,
        padding: 10
    }
});