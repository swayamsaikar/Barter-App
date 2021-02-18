import React, { Component } from "react";
import { View, Text } from "react-native";
import { Header } from "react-native-elements";

export default class MyHeader extends Component {
  render() {
    return (
      <View>
        <Header
          backgroundColor="#ff8a65"
          centerComponent={{
            text: this.props.title,
            style: { fontWeight: "bold", fontSize: 20, color: "#fff" },
          }}
          leftComponent={this.props.leftComponent}
        />
      </View>
    );
  }
}
