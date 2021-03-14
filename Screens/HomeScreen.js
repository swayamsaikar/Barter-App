import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import firebase from "firebase";
import db from "../config/firebaseConfig";
import { FlatList } from "react-native-gesture-handler";
import MyHeader from "../components/MyHeader";
import Icon from "react-native-vector-icons/Entypo";
import { Badge, ListItem } from "react-native-elements";
import { Image } from "react-native";
import { List } from "react-native-paper";

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      productsData: [],
      currentUserEmail: firebase.auth().currentUser.email,
      notificationsDataLength: null,
    };
  }
  fetchProductDetails = () => {
    var arr = [];
    db.collection("Products").onSnapshot((collection) => {
      collection.docs.map((docs) => {
        arr.push(docs.data());
        this.setState({ productsData: arr });
      });
    });
  };

  getTheNumberOfUnreadNotifications = () => {
    var arr = [];
    db.collection("all_notifications")
      .where("SellerEmail", "==", this.state.currentUserEmail)
      .where("notification_status", "==", "unread")
      .get()
      .then((collection) => {
        collection.docs.map((doc) => {
          arr.push(doc.data());
          this.setState({ notificationsDataLength: arr.length });
        });
      });
  };

  componentDidMount() {
    this.fetchProductDetails();
    this.getTheNumberOfUnreadNotifications();
  }

  BellIconWithBadge = () => (
    <View>
      {this.state.notificationsDataLength ? (
        <View>
          <Icon
            name="bell"
            color="#000"
            size={30}
            onPress={() => {
              this.props.navigation.navigate("Notifications");
            }}
          />
          <Badge
            value={this.state.notificationsDataLength}
            containerStyle={{ position: "absolute", top: -4, right: -4 }}
          />
        </View>
      ) : (
        <Icon
          name="bell"
          color="#000"
          size={30}
          onPress={() => {
            this.props.navigation.navigate("Notifications");
          }}
        />
      )}
    </View>
  );

  render() {
    return (
      <View>
        <MyHeader
          title="Products"
          leftComponent={
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.toggleDrawer();
              }}
            >
              <Icon name="menu" size={30} color="#Fff" />
            </TouchableOpacity>
          }
          rightComponent={this.BellIconWithBadge()}
        />

        <FlatList
          data={this.state.productsData}
          renderItem={({ item, index }) => (
            <ListItem style={{ borderRadius: 40 }}>
              <Image
                source={require("../assets/shipping.png")}
                style={{ width: 40, height: 40 }}
              />
              <ListItem.Content>
                <ListItem.Title>Product Name : {item.Title}</ListItem.Title>
                <ListItem.Subtitle>
                  Category : {item.Category}
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
                  this.props.navigation.navigate("SellerInfo", {
                    index: index,
                    item: item,
                  });
                }}
              >
                <Text style={{ fontSize: 17, color: "#fff" }}>Buy</Text>
              </TouchableOpacity>
            </ListItem>
          )}
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
