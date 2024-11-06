import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./config";
import { onAuthStateChanged } from "firebase/auth";
import { login, logout } from "./store/slices/userSlice";
import Navigation from "./src/navigation/StackNavigation";
import { ActivityIndicator, View } from "react-native";
import { Provider } from "react-redux";
import store from "./store/store";
import { useFonts } from "expo-font";

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState("Login");
  const dispatch = useDispatch();

  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          login({
            uid: user.uid,
            displayName: user.displayName || "Користувач",
            email: user.email,
          })
        );
        setInitialRoute("Main");
      } else {
        dispatch(logout());
        setInitialRoute("Login");
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (isLoading || !fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Navigation initialRouteName={initialRoute} />;
}
