import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Button, TextInput, Picker, Alert, Text, Platform } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addProduct } from "../actionCreators/product";
import Constants from '../common';


class AddProduct extends Component {
    static navigationOptions = {
        title: "Add",
        headerStyle: {
            backgroundColor: "#ef87ab"
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
            fontWeight: "bold",
            textAlign: "center"
        },
    }

    static defaultProps = {
        alert: {},
    };

    constructor(props) {
        super(props);
        this.state = {
            categories: ['Mobiles', 'Laptops', 'Desktops', 'Others'],
            titleError: null,
            category: false,
            title: '',
            additionalInfo: '',
            price: '',
        };
    }

    handleSubmit = () => {
        let { title, category, additionalInfo, price } = this.state;
        if (!title) {
            this.setState({ titleError: 'Title is required' })
            return;
        }
        let payload = JSON.stringify({ title, category, additionalInfo, price });
        this.props.addProduct(payload);
        let { message } = this.props.alert;
        if (message !== undefined) {
            Alert.alert('Success', message);
        }
    }

    renderCategories = () => {
        return this.state.categories.map(c => <Picker.Item key={c} label={c} value={c} />)
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.control}
                    onChangeText={(title) => {
                        this.setState({ title, titleError: null })
                        if (title.length == 0) {
                            this.setState({ titleError: 'Title is required' })
                        }
                    }}
                    value={this.state.title}
                    placeholder="Product Name"
                    placeholderTextColor="grey"
                />
                {this.state.titleError && <Text style={{ color: 'red' }}>Title is required</Text>}
                <TextInput
                    numberOfLines={5}
                    onChangeText={(additionalInfo) => this.setState({ additionalInfo })}
                    multiline={true}
                    value={this.state.additionalInfo}
                    placeholder="Additional Info"
                    placeholderTextColor="grey"
                    style={styles.additionalInfo}
                />
                <TextInput
                    style={styles.control}
                    onChangeText={(price) => this.setState({ price })}
                    value={this.state.price}
                    placeholder="Product Price"
                    placeholderTextColor="grey"
                    keyboardType="number-pad"
                />
                <Picker
                    selectedValue={this.state.category}
                    onValueChange={(itemValue, itemIndex) => this.setState({ category: itemValue })}>
                    {this.renderCategories()}
                </Picker>
                <Button
                    title="Add"
                    onPress={this.handleSubmit}
                />
            </View>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addProduct: bindActionCreators(addProduct, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(AddProduct);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: "stretch",
        backgroundColor: '#ffffff',
    },
    control: {
        ...Platform.select({
            android: {
                height: 40
            },
            ios: {
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: 'grey',
                marginTop: 20,
                marginBottom: 20
            }
        })
    },
    additionalInfo: {
        ...Platform.select({
            ios: {
                height: 80
            }
        })
    }
});
