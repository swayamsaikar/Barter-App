import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import MyHeader from "../components/MyHeader";
import db from "../config/firebaseConfig";
import firebase from "firebase";
import Icon from "react-native-vector-icons/Entypo";

export default class AccountsScreen extends Component {
  constructor() {
    super();
    this.state = {
      Address: "",
      PhoneNumber: null,
      Name: "",
      Email: "",
      id: "",
    };
  }

  fetchUsersData = () => {
    var email = firebase.auth().currentUser.email;
    db.collection("Users")
      .where("Email", "==", email)
      .get()
      .then((collection) => {
        collection.docs.map((docs) => {
          this.setState({
            Address: docs.data().address,
            PhoneNumber: docs.data().PhoneNumber,
            Name: docs.data().Name,
            Email: docs.data().Email,
            id: docs.id,
          });
        });
      });
  };

  updateUserData = () => {
    db.collection("Users")
      .doc(this.state.id)
      .update({
        address: this.state.Address,
        PhoneNumber: this.state.PhoneNumber,
        Name: this.state.Name,
        Email: this.state.Email,
      })
      .then(() => {
        alert("Account Updated Successfully");
      });
  };

  componentDidMount() {
    this.fetchUsersData();
  }

  render() {
    return (
      <View>
        <View>
          <MyHeader
            title="Accounts"
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
        </View>
        <View style={styles.container}>
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>Edit Profile</Text>
          <View
            style={{
              backgroundColor: "#fff",
              width: "90%",
              padding: 20,
              marginTop: 20,
            }}
          >
            <TextInput
              value={
                this.state.Email
                  ? "Email : " + this.state.Email
                  : "Email : null"
              }
              onChangeText={(Email) => {
                this.setState({ Email: Email });
              }}
              style={styles.Input}
            />

            <TextInput
              value={
                this.state.Name ? "Name : " + this.state.Name : "Name : null"
              }
              onChangeText={(Name) => {
                this.setState({ Name: Name });
              }}
              style={styles.Input}
            />
            <TextInput
              value={
                this.state.PhoneNumber
                  ? "Contact : " + this.state.PhoneNumber
                  : "Contact : null"
              }
              keyboardType="number-pad"
              onChangeText={(PhoneNumber) => {
                this.setState({ PhoneNumber: PhoneNumber });
              }}
              style={styles.Input}
            />

            <TextInput
              value={
                this.state.Address
                  ? "Address : " + this.state.Address
                  : "Address : null"
              }
              onChangeText={(Address) => {
                this.setState({ Address: Address });
              }}
              style={styles.Input}
            />

            <TouchableOpacity
              style={{
                padding: 10,
                borderWidth: 1,
                borderColor: "#000",
                borderRadius: 15,
                width: "50%",
                alignSelf: "center",
                backgroundColor: "#ff8a65",
              }}
              onPress={() => this.updateUserData()}
            >
              <Text
                style={{ textAlign: "center", color: "white", fontSize: 20 }}
              >
                Update
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: "90%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  Input: {
    width: "100%",
    borderColor: "#000",
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 10,
    fontSize: 20,
    padding: 10,
  },
});
