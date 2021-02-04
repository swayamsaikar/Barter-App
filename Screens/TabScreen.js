// Inside The Home Tab Screen There will be Three Screens :-
// 1. Home Screen
// 2. Add Product Screen
// 3  Accounts Screen

import React, { Component } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from "./HomeScreen";
import AddProductScreen from "./AddProductScreen";
import AccountsScreen from "./AccountsScreen";

const Tab = createMaterialBottomTabNavigator();

export default class TabScreen extends Component {
  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Add Product" component={AddProductScreen} />
        <Tab.Screen name="Accounts" component={AccountsScreen} />
      </Tab.Navigator>
    );
  }
}
