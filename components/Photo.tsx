import { FC } from "react";
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  ViewProps,
} from "react-native";
import { scale } from "../utils/scaling";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../styles/colors";

type UserPhotoProps = {
  outerStyles?: ViewProps["style"];
  imageSource?: any;
  onPress?: () => void;
  showAddButton?: boolean;
  children?: React.ReactNode;
};

const Photo: FC<UserPhotoProps> = ({
  imageSource,
  onPress,
  children,
  outerStyles,
}) => {
  return (
    <View style={[styles.container, outerStyles]}>
      {imageSource ? (
        <Image source={imageSource} style={styles.photo} resizeMode="cover" />
      ) : null}
      {children}
    </View>
  );
};

export default Photo;

const styles = StyleSheet.create({
  container: {
    borderRadius: scale(16),

    backgroundColor: colors.input_bg_main,
    alignItems: "center",
    justifyContent: "center",
  },
  photo: {
    width: "100%",
    height: "100%",
  },
});
