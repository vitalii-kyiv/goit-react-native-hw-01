import { StyleSheet, TextInput, View, ViewProps } from "react-native";
import { colors } from "../styles/colors";
import { scale, verticalScale } from "../utils/scaling";
import { FC, useState } from "react";

type InputProps = {
  value: string;
  placeholder?: string;
  outerStyles?: ViewProps["style"];
  additionalElement?: React.ReactNode;
  onTextChange: (value: string) => void;
  secureTextEntry?: boolean;
  autofocus?: boolean;
};

const Input: FC<InputProps> = ({
  value,
  keyboardType,
  onTextChange,
  placeholder,
  outerStyles,
  additionalElement,
  autofocus = false,
  secureTextEntry = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  return (
    <View
      style={[styles.inputWrapper, isFocused && styles.focused, outerStyles]}
    >
      <TextInput
        value={value}
        autoFocus={autofocus}
        onChangeText={onTextChange}
        placeholder={placeholder}
        placeholderTextColor={colors.text_placeholder}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        onFocus={onFocus}
        onBlur={onBlur}
        style={styles.textInput}
        keyboardType={keyboardType}
      />
      {additionalElement && (
        <View style={styles.additionalElement}>{additionalElement}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: scale(343),
    height: verticalScale(50),
    paddingHorizontal: scale(16),
    backgroundColor: colors.input_bg_main,
    borderRadius: scale(8),
    borderWidth: scale(1),
    borderColor: colors.icon_main,
  },
  textInput: {
    flex: 1,
    color: colors.text_main_dark,
    fontWeight: "400",
    fontFamily: "Roboto-Regular",
    fontSize: scale(16),
  },
  additionalElement: {
    marginLeft: scale(8),
  },
  focused: {
    borderColor: colors.icon_accent,
    backgroundColor: colors.bg_main_light,
  },
});

export default Input;
