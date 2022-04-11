import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import Profile from "./Profile";

export default function TabThreeScreen() {
  return (
    <View style={styles.container}>
      <Profile/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
