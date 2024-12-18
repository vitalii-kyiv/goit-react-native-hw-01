import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useDispatch } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { auth } from "../../config";
import { logout } from "../../store/slices/userSlice";
import PostsScreen from "../screens/PostsScreen";
import CreatePostsScreen from "../screens/CreatePostsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { scale, verticalScale } from "../../utils/scaling";
import { colors } from "../../styles/colors";
import ProfileIcon from "../../assets/images/icons/ProfileIcon";
import PostsIcon from "../../assets/images/icons/PostsIcon";
import LogOutIcon from "../../assets/images/icons/LogOutIcon";
import ArrowBackIcon from "../../assets/images/icons/ArrowBackIcon";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      navigation.navigate("Login");
    } catch (error) {
      console.error("Помилка виходу:", error.message);
    }
  };

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
          headerTitleStyle: styles.homeHeaderTitleStile,
          headerRight: () => (
            <LogOutIcon
              style={{ marginRight: scale(10) }}
              onPress={handleLogout}
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
        }}
      />
      <Tab.Screen
        name="CreateScreen"
        component={CreatePostsScreen}
        options={{
          headerTitle: "Створити публікацію",
          headerTitleAlign: "center",
          headerTitleStyle: styles.homeHeaderTitleStile,
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
          tabBarStyle: { display: "none" },
          headerLeft: () => (
            <ArrowBackIcon
              style={{ marginLeft: scale(16) }}
              onPress={() => navigation.navigate("Home")}
            />
          ),
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
