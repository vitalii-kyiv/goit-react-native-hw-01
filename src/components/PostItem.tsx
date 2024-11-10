import React, { FC } from "react";
import { View, Text, ImageSourcePropType, StyleSheet } from "react-native";
import UserPhoto from "./Photo";
import { scale, verticalScale } from "../../utils/scaling";
import CommentIcon from "../../assets/images/icons/CommentIcon";
import LocationIcon from "../../assets/images/icons/LocationIcon";
import LikeIcon from "../../assets/images/icons/LikeIcon";
import { colors } from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";

type PostItemProps = {
  postId: string; // Додано postId як пропс
  title: string;
  location?: string;
  country?: string;
  imageSource: ImageSourcePropType;
  isLikesVisible?: boolean;
  latitude?: number;
  longitude?: number;
};

const PostItem: FC<PostItemProps> = ({
  postId,
  title,
  location,
  country,
  imageSource,
  isLikesVisible = true,
  latitude,
  longitude,
}) => {
  const navigation = useNavigation();

  const handleLocationPress = () => {
    if (latitude && longitude) {
      navigation.navigate("MapScreen", { latitude, longitude });
    } else {
      console.log("Координати не знайдено");
    }
  };

  const handleCommentPress = () => {
    navigation.navigate("Comment", { postId, imageSource });
  };

  return (
    <View style={styles.container}>
      <UserPhoto imageSource={imageSource} outerStyles={styles.image} />

      <Text style={styles.title}>{title}</Text>
      <View style={styles.commentLocationWrapper}>
        <View style={styles.commentLikeWrapper}>
          <View style={styles.commentWrapper}>
            <CommentIcon onPress={handleCommentPress} />
            <Text style={styles.comment}>0</Text>
          </View>
          {isLikesVisible && (
            <View style={styles.likeWrapper}>
              <LikeIcon />
              <Text style={styles.like}>0</Text>
            </View>
          )}
        </View>

        <View style={styles.locationWrapper}>
          <LocationIcon onPress={handleLocationPress} />
          <Text style={styles.location}>{`${location || ""}, ${
            country || ""
          }`}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    backgroundColor: "#fff",
    marginBottom: verticalScale(32),
  },
  image: {
    width: scale(343),
    height: verticalScale(240),
    marginBottom: verticalScale(8),
    borderRadius: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: verticalScale(8),
    color: colors.text_main_dark,
    fontFamily: "Roboto-Regular",
  },
  comment: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.icon_main,
    fontFamily: "Roboto-Regular",
  },
  like: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.text_main_dark,
    fontFamily: "Roboto-Regular",
    textDecorationLine: "underline",
  },
  location: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.text_main_dark,
    fontFamily: "Roboto-Regular",
    textDecorationLine: "underline",
  },
  commentLocationWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  commentLikeWrapper: {
    flexDirection: "row",
    gap: scale(24),
  },
  commentWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(6),
  },
  likeWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(6),
  },
  locationWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: scale(6),
  },
});

export default PostItem;
