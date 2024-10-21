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
  uri?: string;
  onPress?: () => void;
  showAddButton?: boolean;
  children?: React.ReactNode;
};

const UserPhoto: FC<UserPhotoProps> = ({
  uri,
  onPress,
  children,
  outerStyles,
}) => {
  return (
    <View style={[styles.container, outerStyles]}>
      {uri ? (
        <Image source={{ uri }} style={styles.photo} resizeMode="cover" />
      ) : null}
      {children}
    </View>
  );
};

export default UserPhoto;

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
