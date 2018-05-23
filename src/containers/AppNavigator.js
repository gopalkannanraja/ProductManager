import { createStackNavigator, createBottomTabNavigator } from "react-navigation";
import { createReduxBoundAddListener, createReactNavigationReduxMiddleware } from "react-navigation-redux-helpers";
import { connect } from "react-redux";
import React from "react";
import ProductDetail from "./ProductDetail";
import AddProduct from "./AddProduct";
import StoreMap from "./StoreMap";
import { Ionicons, MaterialIcons } from "@expo/vector-icons"
import ProductListWithFlatList from "./ProductListWithFlatList";
import AdminView from "./AdminView";
import Search from "./Search";

const ListStack = createStackNavigator(
    {
        List: {
            screen: ProductListWithFlatList
        },
        Detail: {
            screen: ProductDetail
        }
    },
    {
        initialRouteName: "List",
        navigationOptions: {
            title: "Product Manager",
            headerStyle: {
                backgroundColor: "#ef87ab"
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                fontWeight: "bold",
                textAlign: "center"
            }
        }
    }
);

const AdminStack = createStackNavigator(
    {
        Admin: {
            screen: AdminView
        },
        Detail: {
            screen: ProductDetail
        }
    },
    {
        initialRouteName: "Admin",
        navigationOptions: {
            title: "Admin",
            headerStyle: {
                backgroundColor: "#ef87ab"
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                fontWeight: "bold",
                textAlign: "center"
            }
        }
    }
);

const SearchStack = createStackNavigator(
    {
        Search: {
            screen: Search
        },
        Detail: {
            screen: ProductDetail
        }
    },
    {
        initialRouteName: "Search",
        navigationOptions: {
            title: "Search",
            headerStyle: {
                backgroundColor: "#ef87ab"
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                fontWeight: "bold",
                textAlign: "center"
            }
        }
    }
);


const AddStack = createStackNavigator(
    {
        Add: {
            screen: AddProduct
        }
    },
    {
        initialRouteName: "Add",
        navigationOptions: {
            title: "Manage",
            headerStyle: {
                backgroundColor: "#ef87ab"
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                fontWeight: "bold",
                textAlign: "center"
            }
        }
    }
);

export const AppNavigator = createBottomTabNavigator(
    {
        List: ListStack,
        Add: AddStack,
        Stores: StoreMap,
        Admin: AdminStack,
        Search: SearchStack
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === "List") {
                    iconName = `ios-list-box${focused ? "" : "-outline"}`;
                } else if (routeName === "Add") {
                    iconName = `ios-add-circle${focused ? "" : "-outline"}`;
                } else if (routeName === "Stores") {
                    return (
                        <MaterialIcons
                            name="local-grocery-store"
                            size={25}
                            color={tintColor}
                        />
                    );
                } else if (routeName === "Admin") {
                    return (
                        <MaterialIcons
                            name="account-circle"
                            size={25}
                            color={tintColor}
                        />
                    );
                } else if (routeName === "Search") {
                    return (
                        <MaterialIcons
                            name="search"
                            size={25}
                            color={tintColor}
                        />
                    );
                }

                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return <Ionicons name={iconName} size={25} color={tintColor} />;
            }
        }),
        tabBarOptions: {
            activeTintColor: "#ef87ab",
            inactiveTintColor: "gray"
        }
    }
);

export const middleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.navState
);
const addListener = createReduxBoundAddListener("root");

class App extends React.Component {
    render() {
        return (
            <AppNavigator
                navigation={{
                    dispatch: this.props.dispatch,
                    state: this.props.navState,
                    addListener
                }}
            />
        );
    }
}

const mapStateToProps = state => ({
    navState: state.navState
});

const AppWithNavigationState = connect(mapStateToProps)(App);

export default AppWithNavigationState;
