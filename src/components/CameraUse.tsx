import React, { useState, useRef, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Camera, CameraView, useCameraPermissions } from "expo-camera";
import CameraIcon from "../../assets/images/icons/CameraIcon";
import { colors } from "../../styles/colors";

export default function CameraUse({ onPhotoTaken }) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [facing, setFacing] = useState<"back" | "front">("back");
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      if (onPhotoTaken) onPhotoTaken(photo);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              setFacing((prev) => (prev === "back" ? "front" : "back"))
            }
          >
            <Text style={styles.text}>flip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonPhoto} onPress={takePhoto}>
            <CameraIcon></CameraIcon>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 343,
    height: 240,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonPhoto: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    backgroundColor: colors.bg_main_light,
    borderRadius: 100,
  },
  button: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: colors.bg_main_light,
    borderRadius: 100,
    width: 60,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.text_main_dark,
    fontSize: 17,
    fontWeight: "500",
    fontFamily: "Roboto-Regular",
  },
});
