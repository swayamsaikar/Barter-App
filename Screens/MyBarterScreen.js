import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import firebase from "firebase";
import db from "../config/firebaseConfig";
import MyHeader from "../components/MyHeader";
import { ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/Entypo";
export default class MyBarterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserEmail: firebase.auth().currentUser.email,
      NotificationsData: [],
    };
  }
  getAllNotificationsData = () => {
    var notificationsData = [];
    db.collection("all_notifications")
      .where("targetUserId", "==", this.state.currentUserEmail)
      .where("notification_status", "==", "unread")
      .get()
      .then((collection) =>
        collection.docs.map(
          (docs) => (
            notificationsData.push(docs.data()),
            this.setState({ NotificationsData: notificationsData })
          )
        )
      );
  };

  changeTheNotificationStatusToRead = () => {
    // I will do this in the "Barter System App - 10" project
  };
  componentDidMount() {
    this.getAllNotificationsData();
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.9 }}>
          {!this.state.NotificationsData.length ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 25 }}>You have no notifications</Text>
            </View>
          ) : (
            <View>
              <MyHeader
                title="Product Notifications"
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

              <FlatList
                data={this.state.NotificationsData}
                renderItem={({ item, index }) => (
                  <ListItem key={index} bottomDivider>
                    <Icon name="shopping-bag" size={40} color="#000" />
                    <ListItem.Content>
                      <ListItem.Title>
                        Product Name : {item.ProductName}
                      </ListItem.Title>
                      <ListItem.Subtitle>
                        Order Message : Seller {item.message}
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
                        this.changeTheNotificationStatusToRead();
                      }}
                    >
                      <Text style={{ fontSize: 17, color: "#fff" }}>OK</Text>
                    </TouchableOpacity>
                  </ListItem>
                )}
                keyExtractor={(item) => item.order_id}
              />
            </View>
          )}
        </View>
      </View>
    );
  }
}
