import { StatusBar } from 'expo-status-bar';
import React, {
	useEffect, 
	useState 
} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Input, NativeBaseProvider, Button, Icon, Box, Image, AspectRatio, Center } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAssets } from 'expo-asset';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Socket } from 'socket.io-client';
import { ProgressBar} from 'react-native-paper';
import io from "socket.io-client";

import { SOCKET_ENDPOINT } from '../endpoint';

//const socketEndpoint = "http://f415-75-164-56-170.ngrok.io";

function Login() {
    const navigation = useNavigation();
    // // const [hasConnection, setConnection] = useState(false);
    const  [server, setServer] = useState(null);
     const [username, setUsername] = useState(null);
     const [password, setPassword] = useState(null);
    // // useEffect(function didMount() {
    // //   const socket = io(socketEndpoint, {
    // //     transports: ["websocket"],
    // //   });
    // //   socket.io.on("open", () => setConnection(true));
    // //   socket.io.on("close", () => setConnection(false));

    // });

  return (
    <KeyboardAwareScrollView style={styles.container}>
    <View style={styles.container}>
      
      <View style={styles.boxStyle}>
        <Box 
          onPress={() => navigation.navigate("#")}  // for navigation 
          style={{
            height:100, 
            width:100,
            borderRadius: 50
          }}
        >
        <AspectRatio ratio={1 / 1}>
          <Image
            roundedTop="lg"
            source={require('../assets/images/security-camera.png')}
            width={95}
            height={92}
            alt="image"
          />
        </AspectRatio>
        </Box>
      </View>

      <View style={styles.Middle}>
        <Text style={styles.NameText}>OpenCamera</Text>
      </View>

      <View style={styles.Middle}>
        <Text style={styles.LoginText}>Sign-in</Text>
      </View>
      
      {/* Homeserver Input Field */}
      <View style={styles.buttonStyleX}>
      <Text style={styles.text4}>Home Server</Text>
        <View style={styles.emailInput}>
          <Input 
            InputLeftElement={
              <Icon
                as={<FontAwesome5 name="home" />}
                size="sm"
                m={2}
                _light={{
                  color: "black",
                }}
                _dark={{
                  color: "gray.300",
                }}
              />
            }
            variant="outline"
            placeholder="Home server"
            _light={{
              placeholderTextColor: "blueGray.400",
            }}
            _dark={{
              placeholderTextColor: "blueGray.50",
            }}
            onChangeText={(text) => setServer(text)}

          />
        </View>
      </View>

      {/* Username or Email Input Field */}
      <View style={styles.buttonStyleX}>
      <Text style={styles.text4}>Username</Text>
        <View style={styles.emailInput}>
          <Input 
            InputLeftElement={
              <Icon
                as={<FontAwesome5 name="user" />}
                size="sm"
                m={2}
                _light={{
                  color: "black",
                }}
                _dark={{
                  color: "gray.300",
                }}
              />
            }
            variant="outline"
            placeholder="Username"
            _light={{
              placeholderTextColor: "blueGray.400",
            }}
            _dark={{
              placeholderTextColor: "blueGray.50",
            }}
            onChangeText={(text) => setUsername(text)}

          />
        </View>
      </View>

      {/* Password Input Field */}
      <View style={styles.buttonStyleX}>
      <Text style={styles.text4}>Password</Text>
        <View style={styles.emailInput}>
          <Input
            InputLeftElement={
              <Icon
                as={<FontAwesome5 name="key" />}
                size="sm"
                m={2}
                _light={{
                  color: "black",
                }}
                _dark={{
                  color: "gray.300",
                }}
              />
            }
            variant="outline"
            secureTextEntry={true}
            placeholder="Password"
            _light={{
              placeholderTextColor: "blueGray.400",
            }}
            _dark={{
              placeholderTextColor: "blueGray.50",
            }}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
      </View>

      {/* Button */}
      <View style={styles.buttonStyle2}>
        {/* <Button onPress={() => navigation.navigate("Root")} style={styles.buttonDesign}> */}
        <Button onPress={() => {
            const socket = io(SOCKET_ENDPOINT, {
              transports: ["websocket"],
            });
            socket.emit('login', username, password, server);
            socket.on("wrongServer", (Iswrong) => {
              if(Iswrong == "Wrong"){
                alert("Wrong home server! Please try again!");
              }else if(Iswrong == "Right"){
                socket.on("result", (result) => {
                  if(result == "fail"){
                      alert("The username or password is incorrect. Please try again !!!");
                  }
                  else{
                    <ProgressBar style={{ marginTop:200}} progress={0.5} color="#00BCD4" />
                    navigation.navigate("Root");
                    
                  }
                })
              }
            })
           
          }} style={styles.buttonDesign}> 
            Sign in
        </Button>
      </View>

      <View style={styles.text2}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")} >
          <Text style={styles.signupText}> Sign-up!</Text>
        </TouchableOpacity>
      </View>
     
      <StatusBar style="auto" />
    </View>
    </KeyboardAwareScrollView>
  );
}

export default () => {
  return (
    <NativeBaseProvider>
      
        <Login />
      
    </NativeBaseProvider>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C2E91C',
  },
  LoginText: {
    marginTop:30,
    fontSize:30,
    fontWeight:'bold',
  },
  
  NameText: {
    marginTop:10,
    fontSize:20,
    fontWeight:'bold',
    alignItems:'center',
    color: "#332D37"
  },
  Middle:{
    alignItems:'center',
    justifyContent:'center',
  },
  text2:{
    flexDirection:'row',
    justifyContent:'center',
    paddingTop:20,
  },
  text3:{
    flexDirection:'row',
    marginLeft:15,
    paddingTop:20,
    fontWeight:'bold',
    color:"#332D37",
  },

  text4:{
    flexDirection:'row',
    marginLeft:5,
    fontWeight:'bold',
    color:"black",
  },

  signupText:{
    fontWeight:'bold',
    color:"red"
  },
  emailField:{
    marginTop:30,
    marginLeft:15
  },
  emailInput:{
    marginTop:10,
    marginRight:5,
    backgroundColor:'white',
  },
  buttonStyle:{
    marginTop:30,
    marginLeft:15,
    marginRight:15
  },
  buttonStyleX:{
    marginTop:12,
    marginLeft:15,
    marginRight:15
  },
  buttonStyle2:{
    marginTop:30,
    alignItems:'center',
    justifyContent:'center',
    fontWeight:'bold',
  },
  buttonDesign:{
    flexDirection:'row',
    backgroundColor:"#332D37",
    width: 100,
    height: 40,
    borderRadius: 20,   
    alignContent: "center",
    alignItems: 'center',
    justifyContent:'center',
    fontWeight:'bold',
  
    
  },
  lineStyle:{
    flexDirection:'row',
    marginTop:30,
    marginLeft:15,
    marginRight:15,
    alignItems:'center'
  },
  imageStyle:{
    width:80,
    height:80,
    marginLeft:20,
  },
  boxStyle:{
    flexDirection:'row',
    marginTop:30,
    marginLeft:15,
    marginRight:15,
    justifyContent:'space-around',
    
  },
});