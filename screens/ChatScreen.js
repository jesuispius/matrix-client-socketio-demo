import React, {
	useEffect, 
	useState 
} from "react";
import {
	StyleSheet,
	View,
} from 'react-native';
import { 
	NativeBaseProvider, 
	Text 
} from "native-base";
import SwipeView from "../components/SwipeView";
import io from "socket.io-client";

// Replace this URL with your own socket-io host, or start the backend locally
import { SOCKET_ENDPOINT } from '../endpoint';
//const socketEndpoint = "http://f415-75-164-56-170.ngrok.io";

global.key = 0;

export const ChatScreen = () => {
	const [hasConnection, setConnection] = useState(false);
	const [time, setTime] = useState(null);
	const [message, setMessage] = useState(null);
	const [listImages, setImages] = useState([]);
	useEffect(function didMount() {
		const socket = io(SOCKET_ENDPOINT, {
			transports: ["websocket"],
		});

		socket.io.on("open", () => setConnection(true));
		socket.io.on("close", () => setConnection(false));

		socket.on("motion-detect", (data) => {
			//Setting image here...
			console.log("Receiving image...")
				var myImage = '../backend/motionDetect/OgbfiPTtxfeXBVUMdpUjVOVh.png'
				
				if (data.fileName != null) {
				//myImage =  '../backend/motionDetect/' + data.fileName
				//console.log("MYIMAGE: " + myImage)
				const dataImage = {
					key: global.key,
					id : 1,
					description: data.body,
					time: time,
					image: '/Users/minhnguyen/Documents/OpenSourceCamera/Matrix-surveillance-camera-software/backend/motionDetect/' + data.fileName
				}
				global.key++;
				console.log(dataImage)
				console.log("Ending Receive image...")
				setImages(listImages => [...listImages, dataImage]);
				setMessage(data.fileName);
			}
		});

		socket.on("time-msg", (data) => {
			setTime(new Date(data.time).toString());
		});

		return function didUnmount() {
			socket.disconnect();
			socket.removeAllListeners();
		};
	}, [listImages]);

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: '#ffffff',
		}
	})

	return (
		<View style={styles.container}>
			{!hasConnection && (
				<>
					<Text style={styles.paragraph}>
						Connecting to {SOCKET_ENDPOINT}...
					</Text>
					<Text style={styles.footnote}>
						Make sure the backend is started and reachable
					</Text>
				</>
			)}

			{hasConnection && (
				<>
					<Text style={[styles.paragraph, { fontWeight: "bold" }]}>
						Server time - Waiting the motion detect
					</Text>
					<Text style={styles.paragraph}>{time}</Text>
					<Text style={styles.paragraph}>{message}</Text>
					<SwipeView imageMotionDetect={listImages}/>
				</>
			)}
		</View>
	);
}
