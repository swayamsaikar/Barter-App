import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import MyHeader from "../components/MyHeader";
import db from "../config/firebaseConfig";
import firebase from "firebase";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Alert } from "react-native";
import { Avatar } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";

export default class AccountsScreen extends Component {
  constructor() {
    super();
    this.state = {
      Address: "",
      PhoneNumber: null,
      Name: "",
      Email: "",
      id: "",
      imageURI: "#",
      UserId: firebase.auth().currentUser.email,
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
    let email = firebase.auth().currentUser.email;
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

  collectPicture = async () => {
    var email = firebase.auth().currentUser.email;
    var Image = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      allowsEditing: true,
      quality: 1,
    });

    if (!Image.cancelled) {
      this.uploadImage(Image.uri, email);
    }
  };

  uploadImage = async (imageUri, imageName) => {
    var req = await fetch(imageUri);
    var blob = await req.blob();

    return firebase
      .storage()
      .ref()
      .child(`User_profile_Image/${imageName}`)
      .put(blob)
      .then(() => {
        this.fetchImageFromCloud(imageName);
      })
      .catch((err) => {
        console.error(err);
        alert(err);
      });
  };

  fetchImageFromCloud = async (imageName) => {
    firebase
      .storage()
      .ref()
      .child(`User_profile_Image/${imageName}`)
      .getDownloadURL()
      .then((URL) => {
        this.setState({ imageURI: URL });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ imageURI: "#" });
      });
  };

  componentDidMount() {
    this.fetchUsersData();
    this.fetchImageFromCloud(this.state.UserId);
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
            rightComponent={
              <TouchableOpacity
                onPress={() => {
                  Alert.alert("Verify!", "Are you sure you want to Logout ? ", [
                    { text: "Cancel" },
                    {
                      text: "OK",
                      onPress: () => {
                        firebase.auth().signOut();
                        this.props.navigation.navigate("Login");
                      },
                    },
                  ]);
                }}
              >
                <Icon name="logout" size={30} color="#fff" />
              </TouchableOpacity>
            }
          />
        </View>
        <View style={styles.container}>
          <View
            style={{
              width: "90%",
              backgroundColor: "orange",
              height: "30%",
              marginTop: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              rounded
              source={{ uri: this.state.imageURI }}
              size="xlarge"
              rounded={true}
              onPress={() => {
                this.collectPicture();
              }}
              activeOpacity={0.7}
              icon={{ name: "user", type: "font-awesome" }}
              showEditingButton={true}
            >
              <Avatar.Accessory size={50} />
            </Avatar>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
              {this.state.Name}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#fff",
              width: "90%",
              padding: 20,
              marginTop: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20, marginBottom: 20 }}>Email</Text>
              <TextInput
                value={this.state.Email ? this.state.Email : "null"}
                onChangeText={(Email) => {
                  this.setState({ Email: Email });
                }}
                style={styles.Input}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20, marginBottom: 20 }}>Name</Text>

              <TextInput
                value={this.state.Name ? this.state.Name : "null"}
                onChangeText={(Name) => {
                  this.setState({ Name: Name });
                }}
                style={styles.Input}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20, marginBottom: 20 }}>Phone</Text>
              <TextInput
                value={this.state.PhoneNumber ? this.state.PhoneNumber : "null"}
                keyboardType="number-pad"
                onChangeText={(PhoneNumber) => {
                  this.setState({ PhoneNumber: PhoneNumber });
                }}
                style={styles.Input}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20, marginBottom: 20 }}>Address</Text>

              <TextInput
                value={this.state.Address ? this.state.Address : "null"}
                onChangeText={(Address) => {
                  this.setState({ Address: Address });
                }}
                style={styles.Input}
              />
            </View>

            <TouchableOpacity
              style={{
                padding: 10,

                borderRadius: 15,
                width: "50%",
                alignSelf: "center",
                backgroundColor: "#fdcb6e",
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
    width: "80%",
    borderColor: "#000",
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 10,
    fontSize: 20,
    padding: 10,
  },
});
