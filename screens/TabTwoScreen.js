import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import Profile from "./Profile";
import { Button } from "native-base";
import { useNavigation } from '@react-navigation/native';
import { useState } from "react";
import io from "socket.io-client";

import { SOCKET_ENDPOINT } from '../endpoint';
//const socketEndpoint = "http://f415-75-164-56-170.ngrok.io";



export default function TabTwoScreen() {
  const  [isLogout, setLogout] = useState(false);
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>                              
        <Button onPress={() => {
            const socket = io(SOCKET_ENDPOINT, {
              transports: ["websocket"],
            });
          setLogout(true);
          socket.emit('logout', isLogout);  
          
          navigation.navigate("Login");

          alert("you have logged out");
          setLogout(false);
          }}style={styles.buttonDesign}>Logout</Button>
        <Profile/>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,  
  },
  
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft:20,
    marginTop:20
  },
  buttonDesign: {
    marginTop:-35,
    marginLeft:300,
    backgroundColor:"#332D37",
    width: 100,
    height: 40,
    borderRadius: 20,
  }
});
