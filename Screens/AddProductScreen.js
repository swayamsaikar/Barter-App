import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import MyHeader from "../components/MyHeader";
import firebase from "firebase";
import db from "../config/firebaseConfig";

export default class AddProductScreen extends Component {
  constructor() {
    super();
    this.state = {
      userEmail: firebase.auth().currentUser.email,
      Title: "",
      Price: null,
      Category: "",
      Description: "",
    };
  }

  addProduct = async (Title, Price, Category, Description) => {
    await db.collection("Products").add({
      Title: Title,
      UserId: this.state.userEmail,
      Price: Price,
      Category: Category,
      Description: Description,
      id: Math.random().toString(36).substring(7),
    });
    return Alert.alert("Product Added Successfully", "", [
      {
        text: "Ok",
        onPress: () => {
          this.setState({
            Title: "",
            Price: "",
            Category: "",
            Description: "",
          });
        },
      },
    ]);
  };

  render() {
    return (
      <View style={styles.container}>
        <MyHeader title="Add a Product" />

        <KeyboardAvoidingView
          behavior="padding"
          style={{ width: "90%", marginTop: "10%" }}
        >
          <TextInput
            placeholder="Title"
            style={[styles.Input, { fontSize: 20 }]}
            value={this.state.Title}
            onChangeText={(Title) => {
              this.setState({ Title: Title });
            }}
          />

          <TextInput
            placeholder="Price"
            style={[styles.Input, { fontSize: 20 }]}
            keyboardType="number-pad"
            value={this.state.Price}
            onChangeText={(Price) => {
              this.setState({ Price: Price });
            }}
          />

          <TextInput
            placeholder="Category"
            style={[styles.Input, { fontSize: 20 }]}
            value={this.state.Category}
            onChangeText={(Category) => {
              this.setState({ Category: Category });
            }}
          />

          <TextInput
            placeholder="Description"
            multiline={true}
            numberOfLines={6}
            style={[styles.Input, { fontSize: 20, textAlign: "center" }]}
            value={this.state.Description}
            onChangeText={(Description) => {
              this.setState({ Description: Description });
            }}
          />
        </KeyboardAvoidingView>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            this.addProduct(
              this.state.Title,
              this.state.Price,
              this.state.Category,
              this.state.Description
            );
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "#343a40" }}>
            Add Product
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },

  Input: {
    borderWidth: 3,
    borderColor: "#CCCECF",
    borderRadius: 10,
    padding: 8,
    marginBottom: 20,
    backgroundColor: "#fff",
  },

  addButton: {
    borderWidth: 1,
    borderColor: "#CCCECF",
    borderRadius: 10,
    padding: 20,
    backgroundColor: "#F4E58B",
    marginTop: 20,
  },
});
