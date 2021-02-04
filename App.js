import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./Screens/LoginScreen";
import TabScreen from "./Screens/TabScreen";
import RecieverInfoScreen from "./Screens/SellerInfoScreen";

const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#ff8a65",
            },
            headerTintColor: "#fff",
          }}
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerTitleStyle: {
                textAlign: "center",
              },
            }}
          />

          <Stack.Screen
            name="HomeTab"
            component={TabScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RecieverInfoScreen"
            component={RecieverInfoScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

// * MY APP IDEA WITH FULL EXPLANATION

/*
* In The AddProduct Screen when The user will add -
* the details of their product in The Text Inputs and click the post Button
* Then we will automatically create a collection in cloud firestore
* Called Products and Store all The Posted Product details with  Their unique id (called Docs) 
* then , In The HomeScreen we will get all The data in the collection - Products
* and create a FOR IN LOOP which will iterate through all the elements of the Docs array In The collection  Products

database.collection('Products').get().then((collection)=>{
  (for(i in collection.docs){

    * From This we can get The Values of The elements in this docs array 
    console.log(collection.docs[i].data())

    * then we will store the array in the state

    var array = [];
    array.push(collection.docs[i].data());
    this.setState({state:array})
  }) 
})

************************************************** -------------------- ********** ----------------

Then In The Render Function we will map through all The elements in the state array 
and create a card UI 


ex - 
this.state.dataArray.map((item,index)=>(
  * this dataArray is our state
  <TouchableOpacity onPress={()=>{
    * onPress we will be navigated to the SellerInfoScreen
    When navigating To The SellerInfoScreen i will pass the index as a navigation param
    ex - this.props.navigation.navigate('SellerInfoScreen', { * I will pass index here })

    * In The SellerInfoScreen I will get the data of a specific index in the Products collection
    
    ex :-
    
    database.collection('Products').get().then((collection)=>{
      console.log(collection.docs[this.props.navigation.getParam('index')].data())
    })
   
  }}>
    * Here We will create a card UI

    * Product Image (item.ProductImage)
    * Product Name  (item.ProductName)
    * Product Price (item.ProductPrice)
  </TouchableOpacity>

))

*/
