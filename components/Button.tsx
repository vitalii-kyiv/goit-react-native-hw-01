import { FC } from "react";
import { StyleSheet, TouchableOpacity, ViewProps } from "react-native";

import { colors } from "../styles/colors";
import { scale, verticalScale } from "../utils/scaling";

type ButtonProps = {
  children: React.ReactNode;
  onPress: () => void;
  outerStyles?: ViewProps["style"];
};

const Button: FC<ButtonProps> = ({ children, onPress, outerStyles }) => {
  return (
    <TouchableOpacity style={[styles.button, outerStyles]} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: scale(100),
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Button;
