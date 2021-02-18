import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import db from "../config/firebaseConfig";
import firebase from "firebase";
export default class RecieverInfoScreen extends Component {
  constructor() {
    super();
    this.state = {
      SpecifiedProductData: "",
    };
  }
  getProductDataWithIndex = () => {
    db.collection("Products")
      .get()
      .then((collection) => {
        this.setState({
          SpecifiedProductData: collection.docs[
            this.props.route.params.index
          ].data(),
        });
      });
  };

  componentDidMount = () => {
    this.getProductDataWithIndex();
  };

  render() {
    return (
      <View style={styles.container}>
        <Text> Product Title : {this.state.SpecifiedProductData.Title}</Text>
        <Text> Product Price : {this.state.SpecifiedProductData.Price}</Text>
        <Text>
          Product Category : {this.state.SpecifiedProductData.Category}
        </Text>
        <Text>Mam Later I will Give the styles to this seller Info Screen</Text>
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
