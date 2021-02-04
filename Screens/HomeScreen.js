import React, { Component } from "react";
import { Text, StyleSheet, View, Button } from "react-native";

export default class HomeScreen extends Component {
  render() {
    return (
      <View>
        <Text> HomeScreen </Text>
        <Button
          title="reciever Info"
          onPress={() => {
            this.props.navigation.navigate("RecieverInfoScreen");
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", 
    alignItems: "center",
  },
});
