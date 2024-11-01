import React from "react";
import { FlatList, ImageSourcePropType, StyleSheet, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import commentsData from "../src/data/comments.json";
import CommentItem from "../components/CommentItem";
import Photo from "../components/Photo";
import { colors } from "../styles/colors";
import { scale, verticalScale } from "../utils/scaling";
import Input from "../components/Input";
import { useState } from "react";
import Button from "../components/Button";
import ArrowTop from "../assets/images/icons/ArrowTop";

const imageMap: { [key: string]: ImageSourcePropType } = {
  "../assets/images/profile-photo-small.jpg": require("../assets/images/profile-photo-small.jpg"),
};

const CommentScreen = () => {
  const [comment, setComment] = useState("");
  const route = useRoute();
  const { imageSource } = route.params;

  const comments = commentsData.map((comment) => ({
    ...comment,
    image: imageMap[comment.image] || null,
  }));

  type Comment = {
    id: number;
    text: string;
    date: string;
    image: ImageSourcePropType | null;
  };

  const renderItem = ({ item }: { item: Comment }) => (
    <CommentItem text={item.text} date={item.date} imageSource={item.image} />
  );

  const handleCommentChange = (value) => {
    setComment(value);
  };
  const onCommentButtonPress = () => {};

  return (
    <View style={styles.container}>
      <Photo
        imageSource={imageSource}
        outerStyles={styles.commentPhotoContainer}
        outerStylesPhoto={styles.commentPhoto}
      />
      <FlatList
        style={styles.list}
        data={comments}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <Input
        outerStyles={styles.inputComment}
        placeholder="Коментувати..."
        value={comment}
        onTextChange={handleCommentChange}
        additionalElement={
          <Button
            onPress={onCommentButtonPress}
            outerStyles={styles.commentButton}
          >
            <ArrowTop />
          </Button>
        }
      />
    </View>
  );
};

export default CommentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg_main_light,
    paddingHorizontal: scale(16),
    justifyContent: "center",
  },
  commentPhotoContainer: {
    width: scale(343),
    height: verticalScale(240),
    marginVertical: verticalScale(32),
  },
  commentPhoto: {
    borderRadius: 8,
  },
  inputComment: {
    marginBottom: verticalScale(16),
    borderWidth: 1,
    borderColor: colors.border_gray,
    borderRadius: 100,
  },
  commentButton: {
    width: scale(34),
    height: verticalScale(34),
    backgroundColor: colors.icon_accent,
  },
});
