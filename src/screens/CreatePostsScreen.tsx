import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import * as Location from "expo-location";
import { scale, verticalScale } from "../../utils/scaling";
import { colors } from "../../styles/colors";
import Photo from "../components/Photo";
import Input from "../components/Input";
import Button from "../components/Button";
import CameraUse from "../components/CameraUse";
import BasketIcon from "../../assets/images/icons/BasketIcon";
import { addNewPost } from "../../store/slices/postsSlice"; 

export default function CreatePostsScreen() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [photo, setPhoto] = useState(null);
  const [geoLocation, setGeoLocation] = useState(null);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const postStatus = useSelector((state) => state.posts.status);

  const handleNameChange = (value: string) => setName(value);
  const handleLocationChange = (value: string) => setLocation(value);

  const handlePhotoTaken = (newPhoto) => {
    setPhoto(newPhoto);
    console.log("Photo captured:", newPhoto);
  };

  const handleClearForm = () => {
    setName("");
    setLocation("");
    setPhoto(null);
    setGeoLocation(null);
  };

  const fetchGeoLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Error", "Permission to access location was denied");
      return null;
    }
    const location = await Location.getCurrentPositionAsync({});
    setGeoLocation(location.coords);
    return location.coords;
  };

  const onButtonPostPress = async () => {
    if (name && location && photo) {
      const coords = await fetchGeoLocation();
      if (coords) {
        const newPost = {
          content: name,
          location,
          photo: photo.uri,
          comments: [],
          geoLocation: {
            latitude: coords.latitude,
            longitude: coords.longitude,
          },
        };

        dispatch(addNewPost(newPost))
          .unwrap()
          .then(() => {
            Alert.alert(
              "Post Created",
              "Your post has been successfully created!"
            );
            navigation.navigate("Home");
            handleClearForm();
          })
          .catch((error) => {
            Alert.alert("Error", "Failed to create post: " + error.message);
          });
      }
    } else {
      Alert.alert("Error", "Please fill all fields and upload a photo.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
        >
          <View style={styles.formContainer}>
            <Photo
              imageSource={photo ? { uri: photo.uri } : null}
              outerStyles={styles.userUploadPhoto}
            >
              <CameraUse onPhotoTaken={handlePhotoTaken} />
            </Photo>
            <TouchableOpacity onPress={() => setPhoto(null)}>
              <Text style={styles.userUploadPhotoText}>
                {photo ? "Edit Photo" : "Upload Photo"}
              </Text>
            </TouchableOpacity>

            <Input
              value={name}
              placeholder="Title..."
              onTextChange={handleNameChange}
              outerStyles={styles.inputName}
            />
            <Input
              value={location}
              placeholder="Location..."
              onTextChange={handleLocationChange}
              outerStyles={styles.inputLocation}
            />
            <Button onPress={onButtonPostPress} outerStyles={styles.buttonPost}>
              <Text style={styles.buttonPostText}>
                {postStatus === "loading" ? "Posting..." : "Publish"}
              </Text>
            </Button>
          </View>
        </KeyboardAvoidingView>
        <Button onPress={handleClearForm}>
          <BasketIcon style={styles.basketIcon} />
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
    alignSelf: "center",
  },
});
