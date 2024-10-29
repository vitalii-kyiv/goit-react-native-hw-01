import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

import PostsScreen from "../screens/PostsScreen";
import CreatePostsScreen from "../screens/CreatePostsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { scale, verticalScale } from "../utils/scaling";
import { colors } from "../styles/colors";
import ProfileIcon from "../assets/images/icons/ProfileIcon";
import PostsIcon from "../assets/images/icons/PostsIcon";
import LogOutIcon from "../assets/images/icons/LogOutIcon";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: styles.tabNav,
      })}
    >
      <Tab.Screen
        name="Home"
        component={PostsScreen}
        options={{
          headerTitle: "Публікації",
          headerTitleAlign: "center",
          headerRight: () => (
            <LogOutIcon
              style={{ marginRight: scale(10) }}
              onPress={() => navigation.navigate("Login")}
            />
          ),
          tabBarIcon: ({ focused }) => <PostsIcon />,
          headerStyle: {
            height: verticalScale(88),
            shadowColor: "rgba(0, 0, 0, 0.3)",
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.3,
            shadowRadius: 0,
            elevation: 2,
          },
          headerTitleStyle: styles.homeHeaderTitleStile,
        }}
      />
      <Tab.Screen
        name="CreateScreen"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="add" size={14} color={colors.text_main_light} />
          ),
          tabBarItemStyle: styles.tabCreatePost,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => <ProfileIcon />,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabNav: {
    position: "absolute",
    paddingTop: verticalScale(9),
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
    paddingLeft: 82,
    paddingRight: 82,
    width: scale(375),
    height: verticalScale(83),
    bottom: 0,
    left: 0,
    backgroundColor: colors.bg_main_light,
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 0,
    elevation: 2,
  },
  tabCreatePost: {
    borderRadius: 20,
    width: scale(70),
    height: scale(40),
    backgroundColor: colors.button_main,
  },
  homeHeaderTitleStile: {
    color: colors.text_main_dark,
    fontWeight: "500",
    fontSize: scale(17),
    lineHeight: 16 * 1.29,
    letterSpacing: 16 * -0.02,
    fontFamily: "Roboto-Regular",
  },
});

export default BottomTabNavigator;
