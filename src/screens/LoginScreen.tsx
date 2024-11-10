import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { auth } from "../../config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { login } from "../../store/slices/userSlice";
import Input from "../components/Input";
import MainTitle from "../components/MainTitle";
import Button from "../components/Button";
import Background from "../components/Background";
import { colors } from "../../styles/colors";
import { scale, verticalScale } from "../../utils/scaling";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onLoginPress = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      dispatch(
        login({
          uid: user.uid,
          displayName: user.displayName || "Користувач",
          email: user.email,
        })
      );

      navigation.navigate("Main");

      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Помилка входу:", error.message);
      Alert.alert("Помилка входу", error.message);
    }
  };

  const onShowButtonPress = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const imageBackground = require("../../assets/images/background.png");

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Background imageSource={imageBackground}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.formContainer}>
            <View style={styles.userPhotoTitleWrapper}>
              <MainTitle text="Увійти" />
            </View>

            <View style={styles.inputContainer}>
              <Input
                value={email}
                placeholder="Адреса електронної пошти"
                onTextChange={setEmail}
                keyboardType="email-address"
              />
              <View style={styles.wrapperInputPassword}>
                <Input
                  value={password}
                  placeholder="Пароль"
                  onTextChange={setPassword}
                  secureTextEntry={!isPasswordVisible}
                  additionalElement={
                    <Button onPress={onShowButtonPress}>
                      <Text style={styles.buttonClearText}>Показати</Text>
                    </Button>
                  }
                />
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                outerStyles={styles.buttonRegister}
                onPress={onLoginPress}
              >
                <Text style={styles.buttonText}>Увійти</Text>
              </Button>
              <View style={styles.textButtonWrapper}>
                <Text style={styles.enterAskText}>Немає акаунта?</Text>
                <Button onPress={() => navigation.navigate("Registration")}>
                  <Text style={styles.buttonEnterText}>Зареєструватися</Text>
                </Button>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Background>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  formContainer: {
    width: "100%",
    height: "60%",
    backgroundColor: colors.bg_main_light,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(32),
  },
  userPhotoTitleWrapper: {
    alignItems: "center",
    justifyContent: "center",
    gap: verticalScale(32),
  },
  buttonContainer: {},
  buttonRegister: {
    width: scale(343),
    paddingHorizontal: scale(32),
    paddingVertical: verticalScale(16),
    backgroundColor: colors.button_main,
    marginBottom: verticalScale(16),
  },
  buttonText: {
    color: colors.text_main_light,
    fontWeight: "400",
    fontSize: scale(16),
    fontFamily: "Roboto-Regular",
    textAlign: "center",
  },
  inputContainer: {
    gap: verticalScale(16),
    marginBottom: verticalScale(43),
  },
  buttonClearText: {
    color: colors.text_link,
    fontWeight: "400",
    fontSize: scale(16),
    fontFamily: "Roboto-Regular",
  },
  textButtonWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  enterAskText: {
    color: colors.text_link,
    fontWeight: "400",
    fontSize: scale(16),
    fontFamily: "Roboto-Regular",
  },
  buttonEnterText: {
    color: colors.text_link,
    fontWeight: "400",
    fontSize: scale(16),
    fontFamily: "Roboto-Regular",
    textDecorationLine: "underline",
    marginLeft: scale(4),
  },
});
