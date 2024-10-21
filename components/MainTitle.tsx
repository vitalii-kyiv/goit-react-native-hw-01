import { StyleSheet, Text } from "react-native";
import { colors } from "../styles/colors";
import { scale, verticalScale } from "../utils/scaling";
import { FC } from "react";

type MainTitleProps = {
  text: string;
};

const MainTitle: FC<MainTitleProps> = ({ text }) => {
  return <Text style={styles.mainTitle}>{text}</Text>;
};

const styles = StyleSheet.create({
  mainTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: scale(30),
    textAlign: "center",
    letterSpacing: scale(0.01 * 30),
    color: colors.text_main_dark,
    marginBottom: verticalScale(32),
  },
});

export default MainTitle;
