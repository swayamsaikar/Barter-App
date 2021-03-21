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
import { SwipeListView } from "react-native-swipe-list-view";
import { Dimensions } from "react-native";

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

  changeNotificationStatusAsRead = (data) => {
    // Mam This function is not working
    db.collection("all_notifications").doc(data.docId).update({
      notification_status: "read",
    });
  };

  deleteRow = (data, rowMap) => {
    var arr = [...this.state.NotificationsData];
    arr.splice(rowMap, 1);
    this.setState({ NotificationsData: arr });
    // this.changeNotificationStatusAsRead(this.state.NotificationsData[rowMap]);
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
              <SwipeListView
                data={this.state.NotificationsData}
                renderItem={(data, rowMap) => (
                  <ListItem key={rowMap} bottomDivider>
                    <Icon name="shopping-bag" size={40} color="#000" />
                    <ListItem.Content>
                      <ListItem.Title>
                        Product Name : {data.item.ProductName}
                      </ListItem.Title>
                      <ListItem.Subtitle>
                        Order Message : Seller {data.item.message}
                      </ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>
                )}
                renderHiddenItem={(data, rowMap) => <Text>Mark As Read</Text>}
                disableRightSwipe
                rightOpenValue={-Dimensions.get("window").width}
                previewRowKey="0"
                previewOpenValue={-40}
                onSwipeValueChange={(data, rowMap) => {
                  this.deleteRow(data, rowMap);
                }}
              />
            </View>
          )}
        </View>
      </View>
    );
  }
}
