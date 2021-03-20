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
import Icon from "react-native-vector-icons/Entypo";

export default class AddProductScreen extends Component {
  constructor() {
    super();
    this.state = {
      userEmail: firebase.auth().currentUser.email,
      Title: "",
      Price: null,
      Category: "",
      Description: "",
      id: "",

      product_status: "",
      docId: "",
      isProductSellerActive: "",
      addedProductName: "",
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
      product_status: "added",
      time: firebase.firestore.FieldValue.serverTimestamp(),
    });

    await db
      .collection("Users")
      .where("Email", "==", this.state.userEmail)
      .get()
      .then((collection) => {
        collection.docs.map((doc) => {
          db.collection("Users").doc(doc.id).update({
            isProductSellerActive: true,
          });
        });
      });

    await this.getProduct();
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

  getIsProductSellerActive = () => {
    db.collection("Users")
      .where("Email", "==", this.state.userEmail)
      .get()
      .then((collection) => {
        collection.docs.map((doc) => {
          this.setState({
            isProductSellerActive: doc.data().isProductSellerActive,
          });
        });
      });
  };

  getProduct = () => {
    db.collection("Products")
      .where("UserId", "==", this.state.userEmail)
      .get()
      .then((collection) => {
        collection.docs.map((doc) => {
          if (doc.data().product_status !== "sold") {
            this.setState({
              addedProductName: doc.data().Title,
              docId: doc.id,
              product_status: doc.data().product_status,
            });
          }
        });
      });
  };

  updateProductStatus = () => {
    db.collection("Products")
      .doc(this.state.docId)
      .update({
        product_status: "sold",
      })
      .then(() => {
        db.collection("Users")
          .where("Email", "==", this.state.userEmail)
          .get()
          .then((collection) => {
            collection.docs.map((doc) => {
              db.collection("Users").doc(doc.id).update({
                isProductSellerActive: false,
              });
            });
          });
      });
  };

  createANewReceivedBooksCollection = (ProductName) => {
    db.collection("SoldProducts").add({
      ProductName: ProductName,
      productStatus: this.state.product_status,
      ProductSeller: this.state.userEmail,
      date: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  sendNotification = () => {
    db.collection("all_notifications")
      .where("SellerEmail", "==", this.state.userEmail)
      .get()
      .then((collection) => {
        collection.docs.map((doc) => {
          var BuyerEmail = doc.data().targetUserId;
          db.collection("all_notifications")
            .where("order_id", "==", this.state.id)
            .get()
            .then((collection) => {
              collection.docs.map((doc) => {
                var SellerEmail = doc.data().SellerEmail;
                var ProductName = doc.data().ProductName;

                db.collection("all_notifications").add({
                  BuyerId: SellerEmail,
                  message: `${BuyerEmail} got The Product Called ${ProductName}`,
                });
              });
            });
        });
      });

    // all_notifications collection is not there for now create a news gmail id and sign up and sell a product in a gmail id and buy a product in another gmail id to create a collection called "all_notifications"
    // Thankyou mam
  };

  componentDidMount() {
    this.getProduct();
    this.getIsProductSellerActive();
  }

  render() {
    if (this.state.isProductSellerActive === true) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              borderColor: "orange",
              borderWidth: 2,
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              margin: 10,
            }}
          >
            <Text>Product Name</Text>
            <Text>{this.state.addedProductName}</Text>
          </View>
          <View
            style={{
              borderColor: "orange",
              borderWidth: 2,
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              margin: 10,
            }}
          >
            <Text> Product Status </Text>
            <Text>{this.state.product_status}</Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              this.sendNotification();
              this.updateProductStatus();
              this.createANewReceivedBooksCollection(
                this.state.addedProductName
              );
              alert(
                "OK ! Product Status has changed to 'sold' and refresh this app to see the ' Product ADD Screen ' "
              );
            }}
            style={styles.addButton}
          >
            <Text
              style={{ fontSize: 15, fontWeight: "bold", color: "#343a40" }}
            >
              I Have Sold The Product
            </Text>
          </TouchableOpacity>

          <Text style={{ fontSize: 15, textAlign: "center" }}>
            You Have To Refresh The app to see the Product ADD Screen
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <MyHeader
            title="Add a Product"
            leftComponent={
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.toggleDrawer();
                }}
              >
                <Icon name="menu" size={30} />
              </TouchableOpacity>
            }
          />

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
            <Text
              style={{ fontSize: 15, fontWeight: "bold", color: "#343a40" }}
            >
              Add Product
            </Text>
          </TouchableOpacity>

          <Text style={{ fontSize: 15, textAlign: "center" }}>
            You Have To click on I have recieved button and refresh the app to
            see the Product ADD Screen
          </Text>
        </View>
      );
    }
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
    borderColor: "#CCCECF",
    borderRadius: 10,
    padding: 20,
    backgroundColor: "#F4E58B",
    marginTop: 20,
  },
});
