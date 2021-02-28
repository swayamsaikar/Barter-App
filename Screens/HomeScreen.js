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

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      productsData: [],
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

  componentDidMount() {
    this.fetchProductDetails();
  }

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
              <Icon name="menu" size={30} />
            </TouchableOpacity>
          }
        />

        <FlatList
          data={this.state.productsData}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("SellerInfo", {
                  index: index,
                  item: item,
                });
              }}
            >
              <View
                style={{
                  padding: 20,
                  backgroundColor: "#fff",
                  width: "90%",
                  alignSelf: "center",
                  marginBottom: 20,
                  marginTop: 20,
                  borderRadius: 20,
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <View style={{ width: "70%" }}>
                  <Text style={{ fontSize: 18 }} numberOfLines={1}>
                    {item.Title}
                  </Text>
                  <Text numberOfLines={1}>Category : {item.Category}</Text>
                </View>

                <View>
                  <Icon name="chevron-right" color="#000" size={40} />
                </View>
              </View>
            </TouchableOpacity>
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
