import React, { Component } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TabScreen from "../Screens/TabScreen";
import AccountsScreen from "../Screens/AccountsScreen";
import MyBarterScreen from "../Screens/MyBarterScreen";
import NotificationsScreen from "../Screens/NotificationsScreen";

const Drawer = createDrawerNavigator();

export default class DrawerNavigator extends Component {
  render() {
    return (
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={TabScreen} />
        <Drawer.Screen name="Accounts" component={AccountsScreen} />
        <Drawer.Screen name="MyBarters" component={MyBarterScreen} />
      </Drawer.Navigator>
    );
  }
}
