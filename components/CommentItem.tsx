import { StyleSheet, Text, View } from "react-native";
import Photo from "./Photo";
import DefaultProfileIcon from "../assets/images/icons/DefaultProfileIcon";
import { scale, verticalScale } from "../utils/scaling";
import { colors } from "../styles/colors";

const CommentItem = ({ imageSource, text, date }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        {imageSource ? (
          <Photo
            imageSource={imageSource}
            outerStylesPhoto={styles.commentPhoto}
          />
        ) : (
          <DefaultProfileIcon></DefaultProfileIcon>
        )}
      </View>

      <View style={styles.commentTimeWrapper}>
        <Text style={styles.commentText}>{text}</Text>
        <Text style={styles.commentTime}>{date}</Text>
      </View>
    </View>
  );
};

export default CommentItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg_main_light,
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: verticalScale(32),
  },
  imageWrapper: {
    marginRight: scale(32),
    width: scale(28),
    height: verticalScale(28),
  },
  commentPhoto: {
    borderRadius: 100,
  },
  commentTimeWrapper: {
    flex: 1,
    backgroundColor: colors.comment_bg,
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(16),
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  commentText: {
    fontSize: 16,
    color: "#333",
    marginBottom: verticalScale(8),
  },
  commentTime: {
    fontSize: 12,
    color: "#aaa",
    alignSelf: "flex-end",
  },
});
