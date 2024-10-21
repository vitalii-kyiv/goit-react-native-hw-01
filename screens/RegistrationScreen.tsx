import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import MainTitle from "../components/MainTitle";
import Input from "../components/Input";
import { useState } from "react";
import Button from "../components/Button";
import { colors } from "../styles/colors";
import { scale, verticalScale } from "../utils/scaling";
import Background from "../components/Background";
import UserPhoto from "../components/UserAvatar";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegistrationScreen() {
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLoginChange = (value: string) => {
    setLogin(value);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const onRegisterPress = () => {
    setEmail("");
    setLogin("");
    setPassword("");
  };

  const onAddButtonPress = () => {};
  const onShowButtonPress = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };
  const onButtonEnterPress = () => {};

  const imageSource = require("../assets/images/background.png");

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Background imageSource={imageSource}></Background>
        <View style={styles.formContainer}>
          <View style={styles.userPhotoTitleWrapper}>
            <UserPhoto showAddButton={true} outerStyles={styles.userPhoto}>
              <Button outerStyles={styles.buttonAdd} onPress={onAddButtonPress}>
                <AntDesign name="plus" size={13} color={colors.icon_accent} />
              </Button>
            </UserPhoto>
            <MainTitle text="Реєстрація"></MainTitle>
          </View>

          <View style={styles.inputContainer}>
            <Input
              value={login}
              autofocus={true}
              placeholder="Логін"
              onTextChange={handleLoginChange}
            ></Input>
            <Input
              value={email}
              placeholder="Адреса електронної пошти"
              onTextChange={handleEmailChange}
              keyboardType="email-address"
            ></Input>
            <View style={styles.wrapperInputPassword}>
              <Input
                value={password}
                placeholder="Пароль"
                onTextChange={handlePasswordChange}
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
              onPress={onRegisterPress}
            >
              <Text style={styles.buttonText}>Зареєструватися</Text>
            </Button>
            <View style={styles.textButtonWrapper}>
              <Text style={styles.enterAskText}>Вже є акаунт?</Text>
              <Button onPress={onButtonEnterPress}>
                <Text style={styles.buttonEnterText}>Увійти</Text>
              </Button>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: colors.bg_main_light,
  },
  formContainer: {
    width: "100%",
    height: "67%",
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
  },
  inputContainer: {
    gap: verticalScale(16),
    marginBottom: verticalScale(43),
  },
  userPhoto: {
    width: scale(120),
    height: scale(120),
    position: "relative",
    marginTop: verticalScale(-90),
  },
  buttonAdd: {
    position: "absolute",
    width: scale(25),
    height: scale(25),
    right: verticalScale(-12),
    bottom: scale(14),
    borderColor: colors.icon_accent,
    borderWidth: 1,
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