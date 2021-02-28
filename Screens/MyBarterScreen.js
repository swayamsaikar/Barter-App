import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import MyHeader from "../components/MyHeader";
import db from "../config/firebaseConfig";
import firebase from "firebase";

export default class MyBarterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allBartersData: [],
    };
  }

  getBarters = () => {
    var allBartersData = [];
    db.collection("all_Barters")
      .get()
      .then((collection) => {
        collection.docs.map((doc) => {
          allBartersData.push(doc.data());
          this.setState({ allBartersData: allBartersData });
        });
      });
  };

  componentDidMount() {
    this.getBarters();
  }

  render() {
    return (
      <View>
        <MyHeader
          title="My Barters"
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
        {this.state.allBartersData.map((item) => (
          <Text>{item.SellerEmail}</Text>
        ))}
      </View>
    );
  }
}
