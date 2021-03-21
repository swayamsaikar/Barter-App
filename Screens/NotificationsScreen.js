import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import MyHeader from "../components/MyHeader";
import db from "../config/firebaseConfig";
import firebase from "firebase";
import { ListItem } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import { List } from "react-native-paper";

export default class NotificationsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allBartersData: [],
      BuyerName: "",
      currentSellerEmail: firebase.auth().currentUser.email,
    };
  }

  getBarters = () => {
    var allBartersData = [];
    db.collection("all_Barters")
      .where("SellerEmail", "==", this.state.currentSellerEmail)
      .get()
      .then((collection) => {
        collection.docs.map((doc) => {
          allBartersData.push(doc.data());
          this.setState({ allBartersData: allBartersData });
        });
      });
  };

  sendProduct = (productDetails) => {
    var orderId = [];
    if (productDetails.Order_status === "Buyer Interested") {
      var Order_status = "Product Sent";
      //Mam This is not working
      db.collection("all_Barters")
        .doc(productDetails.docId)
        .update({ Order_status: Order_status });
      this.sendProductNotification(productDetails, Order_status);
    }
  };

  sendProductNotification = (ProductDetails, Order_status) => {
    db.collection("all_notifications")
      .where("SellerEmail", "==", ProductDetails.SellerEmail)
      .where("order_id", "==", ProductDetails.order_id)
      .get()
      .then((collections) => {
        var message = "";
        collections.docs.map((doc) => {
          if (Order_status === "Product Sent") {
            message = `${ProductDetails.SellerName} has sent you the Product`;
          } else {
            message =
              this.state.BuyerName +
              " has shown interest in Buying This Product";
          }

          db.collection("all_notifications").doc(doc.id).update({
            message: message,
            notification_status: "unread",
            date: firebase.firestore.FieldValue.serverTimestamp(),
          });
        });
      });
  };

  deleteItem = (index) => {
    var arr = [...this.state.allBartersData];
    arr.splice(index, 1);
    console.log(arr);
    this.setState({ allBartersData: arr });
    alert("Product Sent");
  };

  componentDidMount() {
    this.getBarters();
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.allBartersData}
          renderItem={({ item, index }) => (
            <ListItem key={index} bottomDivider>
              <Icon name="shopping-bag" size={40} color="#000" />
              <ListItem.Content>
                <ListItem.Title>
                  Product Name : {item.ProductName}
                </ListItem.Title>
                <ListItem.Subtitle>
                  Order Status : {item.Order_status}
                </ListItem.Subtitle>
              </ListItem.Content>
              <TouchableOpacity
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  backgroundColor: "#00cec9",
                  borderRadius: 20,
                }}
                onPress={() => {
                  this.sendProduct(item);
                  this.deleteItem(index);
                }}
              >
                <Text style={{ fontSize: 17, color: "#fff" }}>Send</Text>
              </TouchableOpacity>
            </ListItem>
          )}
        />
      </View>
    );
  }
}
