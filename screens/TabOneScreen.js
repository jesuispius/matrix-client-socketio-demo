import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { ChatScreen } from "./ChatScreen";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      {/*<EditScreenInfo path="/screens/TabOneScreen.tsx" />*/}
      <ChatScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  }
});
