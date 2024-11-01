import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Alert,
} from "react-native";
import { scale, verticalScale } from "../utils/scaling";
import { colors } from "../styles/colors";
import Photo from "../components/Photo";
import Input from "../components/Input";
import Button from "../components/Button";
import { useState } from "react";
import CameraIcon from "../assets/images/icons/CameraIcon";
import BasketIcon from "../assets/images/icons/BasketIcon";
import CameraUse from "../components/CameraUse";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";

export default function CreatePostsScreen() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [photo, setPhoto] = useState("");
  const [geoLocation, setGeoLocation] = useState(null);
  console.log("geoLocation", geoLocation);

  const navigation = useNavigation();
  const userPhoto = photo ? { uri: photo.uri } : null;

  const handleNameChange = (value: string) => {
    setName(value);
  };

  const handleLocationChange = (value: string) => {
    setLocation(value);
  };

  const onButtonPostPress = async () => {
    if (name && location && photo) {
      const coords = await fetchGeoLocation();
      if (coords) {
        Alert.alert(
          "Пост створено",
          `Координати: ${coords.latitude}, ${coords.longitude}`
        );
        navigation.navigate("Home");
        handleClearForm();
      }
    } else {
      Alert.alert("Помилка", "Будь ласка, заповніть всі поля та додайте фото.");
    }
  };

  const fetchGeoLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Помилка", "Доступ до геолокації відхилено");
      return null;
    }

    let location = await Location.getCurrentPositionAsync({});
    setGeoLocation(location.coords);
    return location.coords;
  };

  const handlePhotoTaken = (photo) => {
    setPhoto(photo);
    console.log("Знімок зроблено:", photo);
  };

  const handleClearForm = () => {
    setName("");
    setLocation("");
    setPhoto("");
    setGeoLocation(null);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
        >
          <View style={styles.formContainer}>
            <Photo imageSource={userPhoto} outerStyles={styles.userUploadPhoto}>
              <CameraUse onPhotoTaken={handlePhotoTaken}></CameraUse>
            </Photo>
            <TouchableOpacity
              onPress={() => {
                if (photo) {
                  setPhoto("");
                }
              }}
            >
              <Text style={styles.userUploadPhotoText}>
                {photo ? "Редагувати фото" : "Завантажте фото"}
              </Text>
            </TouchableOpacity>

            <Input
              value={name}
              placeholder="Назва..."
              onTextChange={handleNameChange}
              outerStyles={styles.inputName}
            />
            <Input
              value={location}
              placeholder="Місцевість..."
              onTextChange={handleLocationChange}
              outerStyles={styles.inputLocation}
            />
            <Button onPress={onButtonPostPress} outerStyles={styles.buttonPost}>
              <Text style={styles.buttonPostText}>Опубліковати</Text>
            </Button>
          </View>
        </KeyboardAvoidingView>
        <Button onPress={handleClearForm}>
          <BasketIcon style={styles.basketIcon}></BasketIcon>
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: colors.bg_main_light,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingTop: verticalScale(32),
    paddingHorizontal: scale(16),
    backgroundColor: colors.bg_main_light,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  userUploadPhoto: {
    paddingHorizontal: scale(16),
    height: verticalScale(240),
    width: "100%",
    borderRadius: scale(8),
    backgroundColor: colors.input_bg_main,
    borderWidth: 1,
    borderColor: colors.border_gray,
    marginBottom: verticalScale(8),
  },
  cameraIconContainer: {
    width: 60,
    height: 60,
    backgroundColor: colors.bg_main_light,
    borderRadius: 100,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  userUploadPhotoText: {
    fontWeight: "400",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: colors.icon_main,
    marginBottom: verticalScale(32),
  },
  inputName: {
    backgroundColor: colors.bg_main_light,
    borderWidth: 0,
    borderBottomColor: colors.icon_main,
    borderBottomWidth: 1,
    borderRadius: 0,
    paddingLeft: 0,
    fontWeight: "500",
    fontSize: 16,
    fontFamily: "Roboto-Medium",
    color: colors.text_main_dark,
    marginBottom: verticalScale(16),
  },
  inputLocation: {
    backgroundColor: colors.bg_main_light,
    borderWidth: 0,
    borderBottomColor: colors.icon_main,
    borderBottomWidth: 1,
    borderRadius: 0,
    paddingLeft: 0,
    fontWeight: "400",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: colors.text_main_dark,
    marginBottom: verticalScale(32),
  },
  buttonPost: {
    width: "100%",
    height: verticalScale(51),
    backgroundColor: colors.icon_accent,
  },
  buttonPostText: {
    color: colors.bg_main_light,
    fontWeight: "400",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  basketIcon: {
    position: "absolute",
    bottom: 32,
    justifyContent: "flex-end",
    alignSelf: "center",
  },
});
