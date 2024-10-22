import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../styles/colors";

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Button onPress={() => navigation.navigate("Registration")}>
        <Text style={styles.buttonText}>Rigistratioon</Text>
      </Button>
      <Button onPress={() => navigation.navigate("Login")}>
        <Text style={styles.buttonText}>Login</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: colors.text_main_dark,
    fontWeight: "400",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    textDecorationLine: "underline",
  },
});
