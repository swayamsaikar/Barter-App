import React, { Component } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TabScreen from "../Screens/TabScreen";

const Drawer = createDrawerNavigator();

export default class DrawerNavigator extends Component {
  render() {
    return (
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={TabScreen} />
      </Drawer.Navigator>
    );
  }
}
