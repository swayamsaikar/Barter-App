import React, { Component } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from "./HomeScreen";
import AddProductScreen from "./AddProductScreen";
import AccountsScreen from "./AccountsScreen";
import HomeIcon from "react-native-vector-icons/FontAwesome";
import AddIcon from "react-native-vector-icons/MaterialIcons";
import AccountsIcon from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createMaterialBottomTabNavigator();

export default class TabScreen extends Component {
  render() {
    return (
      <Tab.Navigator initialRouteName="Home" shifting={true}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarColor: "#473F97",
            tabBarIcon: ({ color }) => (
              <HomeIcon name="home" size={29} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Add Product"
          component={AddProductScreen}
          options={{
            tabBarColor: "#0984e3",
            tabBarIcon: ({ color }) => (
              <AddIcon name="add-shopping-cart" size={29} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Accounts"
          component={AccountsScreen}
          options={{
            tabBarColor: "#00b894",
            tabBarIcon: ({ color }) => (
              <AccountsIcon name="shield-account" size={27} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}
