import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import Constants from '../common';


class ProductDetail extends React.Component {
    //static navigationOptions = { title: "Product Detail" };
    static navigationOptions = ({ navigation }) => ({
        title: `Product Detail for ${navigation.state.params.id}`
    });

    constructor(props) {
        super(props);
        this.state = { product: {}, isLoading: false };
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        let { id } = this.props.navigation.state.params;
        console.log(id);
        fetch(`${Constants.baseUrl}/?id=${id}`)
            .then(r => r.json())
            .then(product =>
                this.setState({ product: product[0], isLoading: false })
            );
    }

    renderProduct() {
        const { navigation } = this.props;
        const { product } = this.state;
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

        return (
            <View style={styles.container}>
                {this.state.isLoading ? (
                    <ActivityIndicator size="large" color="#ef87ab" />
                ) : (
                        this.renderProduct()
                    )}
            </View>
        );
    }
}

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

export default ProductDetail;
