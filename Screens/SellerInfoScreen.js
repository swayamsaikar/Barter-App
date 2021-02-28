import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import db from "../config/firebaseConfig";
import firebase from "firebase";
import { Linking } from "react-native";

export default class SellerInfoScreen extends Component {
  constructor() {
    super();
    this.state = {
      SpecifiedProductData: "",
      SellerEmail: "",
      SellerName: "",
      SellerAddress: "",
      SellerContactNumber: "",
      BuyerEmail: firebase.auth().currentUser.email,
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

    db.collection("Users")
      .where("Email", "==", this.props.route.params.item["UserId"])
      .get()
      .then((collection) => {
        collection.docs.map((doc) => {
          this.setState({
            SellerName: doc.data().Name,
            SellerEmail: doc.data().Email,
            SellerAddress: doc.data().address,
            SellerContactNumber: doc.data().PhoneNumber,
          });
        });
      });
  };

  componentDidMount = () => {
    this.getProductDataWithIndex();
  };

  CheckOut = () => {
    db.collection("all_Barters")
      .add({
        BuyerEmail: this.state.BuyerEmail,
        SellerEmail: this.state.SellerEmail,
        SellerName: this.state.SellerName,
      })
      .then(() => {
        alert("Product Ordered Successfully");
      });
  };

  render() {
    return (
      <View>
        <View style={{ width: "100%", marginLeft: "10%", marginTop: "10%" }}>
          <Text style={[styles.Heading, { width: "100%" }]}>
            Product Info -
          </Text>
        </View>
        <View style={{ marginLeft: "14%", marginVertical: "5%" }}>
          <Text style={styles.PlainText}>
            Product Name : {this.state.SpecifiedProductData.Title}
          </Text>
          <Text style={styles.PlainText}>
            Product Category : {this.state.SpecifiedProductData.Category}
          </Text>
          <Text style={styles.PlainText}>
            Product Price : ${this.state.SpecifiedProductData.Price}
          </Text>
        </View>
        <View style={{ width: "100%", marginLeft: "10%", marginTop: "10%" }}>
          <Text style={[styles.Heading, { width: "100%" }]}>Seller Info -</Text>
        </View>
        <View style={{ marginLeft: "14%", marginVertical: "5%" }}>
          <Text style={styles.PlainText}>
            Seller Name : {this.state.SellerName}
          </Text>
          <Text style={styles.PlainText}>
            Seller Number : {this.state.SellerContactNumber}
          </Text>
          <Text style={styles.PlainText}>
            Seller Email : {this.state.SellerEmail}
          </Text>
        </View>

        {/* Below Code for button  */}

        {this.state.BuyerEmail !== this.state.SellerEmail ? (
          <View style={{ alignItems: "center", marginTop: "10%" }}>
            <TouchableOpacity
              style={styles.Button}
              onPress={() => {
                Linking.openURL(`tel:${this.state.SellerContactNumber}`);
              }}
            >
              <Text style={styles.ButtonText}>Contact Seller</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.Button}
              onPress={() => {
                this.CheckOut();
              }}
            >
              <Text style={styles.ButtonText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  Heading: {
    fontSize: 30,
    fontWeight: "bold",
  },
  PlainText: {
    fontSize: 18,
  },
  Button: {
    width: 300,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "#ff9800",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: 10,
  },
  ButtonText: {
    color: "white",
    fontSize: 20,
  },
});
