import React, { FC } from "react";
import { ImageBackground, StyleSheet, ViewProps } from "react-native";
import { scale, verticalScale } from "../utils/scaling";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

type BackgroundProps = {
  children?: React.ReactNode;
  imageSource: any;
  outerStyles?: ViewProps["style"];
};

const Background: FC<BackgroundProps> = ({
  children,
  imageSource,
  outerStyles,
}) => {
  return (
    <ImageBackground
      source={imageSource}
      style={[styles.background, outerStyles]}
      resizeMode="cover"
    >
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    position: "absolute",
    top: 0,
    bottom: 0,
    maxHeight: verticalScale(812),
    width: scale(375),
    zIndex: -1,
  },
});

export default Background;
