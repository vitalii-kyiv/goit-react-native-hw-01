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
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { login } from "../../store/slices/userSlice";
import MainTitle from "../components/MainTitle";
import Input from "../components/Input";
import Button from "../components/Button";
import Background from "../components/Background";
import UserPhoto from "../components/Photo";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import { scale, verticalScale } from "../../utils/scaling";

export default function RegistrationScreen() {
  const [email, setEmail] = useState("");
  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onRegisterPress = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      try {
        await updateProfile(user, { displayName: loginName });
        console.log("Профіль оновлено успішно");
      } catch (error) {
        console.error("Помилка оновлення профілю:", error.message);
      }

      dispatch(
        login({
          uid: user.uid,
          displayName: loginName,
          email: user.email,
        })
      );

      navigation.navigate("Main");

      setEmail("");
      setLoginName("");
      setPassword("");
    } catch (error) {
      console.error("Помилка реєстрації:", error.message);
      Alert.alert("Помилка реєстрації", error.message);
    }
  };

  const onShowButtonPress = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const imageBackground = require("../../assets/images/background.png");
  const imageAvatar = require("../../assets/images/profile-photo.jpg");

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Background imageSource={imageBackground}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.formContainer}>
            <View style={styles.userPhotoTitleWrapper}>
              <UserPhoto
                imageSource={imageAvatar}
                showAddButton={true}
                outerStyles={styles.userPhoto}
              >
                <Button outerStyles={styles.buttonClose}>
                  <AntDesign name="close" size={13} color={colors.icon_main} />
                </Button>
              </UserPhoto>
              <MainTitle text="Реєстрація" />
            </View>
            <View style={styles.inputContainer}>
              <Input
                value={loginName}
                autofocus={true}
                placeholder="Логін"
                onTextChange={setLoginName}
              />
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
                onPress={onRegisterPress}
              >
                <Text style={styles.buttonText}>Зареєструватися</Text>
              </Button>
              <View style={styles.textButtonWrapper}>
                <Text style={styles.enterAskText}>Вже є акаунт?</Text>
                <Button onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.buttonEnterText}>Увійти</Text>
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
    textAlign: "center",
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
  buttonClose: {
    position: "absolute",
    width: scale(25),
    height: scale(25),
    right: verticalScale(-12),
    bottom: scale(14),
    backgroundColor: colors.bg_main_light,
    borderColor: colors.icon_main,
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
