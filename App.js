import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./Screens/LoginScreen";
import SellerInfoScreen from "./Screens/SellerInfoScreen";
import DrawerNavigator from "./components/DrawerNavigator";
import MyBarterScreen from "./Screens/MyBarterScreen";
import NotificationsScreen from "./Screens/NotificationsScreen";

const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#ff8a65",
            },
            headerTintColor: "#fff",
          }}
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerTitleStyle: {
                textAlign: "center",
              },
            }}
          />

          <Stack.Screen
            name="DrawerNavigator"
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="SellerInfo" component={SellerInfoScreen} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
          <Stack.Screen name="MyBarters" component={MyBarterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
