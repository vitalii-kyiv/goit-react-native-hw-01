import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../src/screens/HomeScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import LoginScreen from "../screens/LoginScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import CommentScreen from "../screens/CommentScreen";
import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";
import { scale, verticalScale } from "../../utils/scaling";
import MapScreen from "../screens/MapScreen";

const Stack = createNativeStackNavigator();

export default function Navigation({ initialRouteName }) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteName}>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={RegistrationScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: "Коментарі",
            headerTitleAlign: "center",
            headerTitleStyle: styles.homeHeaderTitleStile,
          }}
          name="Comment"
          component={CommentScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Main"
          component={BottomTabNavigator}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: "Мапа",
            headerTitleAlign: "center",
            headerTitleStyle: styles.homeHeaderTitleStile,
          }}
          name="MapScreen"
          component={MapScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  homeHeaderTitleStile: {
    color: colors.text_main_dark,
    fontWeight: "500",
    fontSize: scale(17),
    lineHeight: 16 * 1.29,
    letterSpacing: 16 * -0.02,
    fontFamily: "Roboto-Regular",
  },
});
