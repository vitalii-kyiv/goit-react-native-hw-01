import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments, addComment } from "../../store/slices/commentsSlice";
import { FlatList, StyleSheet, View, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import CommentItem from "../components/CommentItem";
import Input from "../components/Input";
import Button from "../components/Button";
import ArrowTop from "../../assets/images/icons/ArrowTop";
import { colors } from "../../styles/colors";
import { scale, verticalScale } from "../../utils/scaling";
import { selectCommentsForPost } from "../../store/selectors/commentsSecector";

const CommentScreen = () => {
  const [commentText, setCommentText] = useState("");
  const route = useRoute();
  const dispatch = useDispatch();
  const { postId } = route.params;

  const comments = useSelector((state) => selectCommentsForPost(state, postId));

  useEffect(() => {
    if (postId) {
      dispatch(fetchComments(postId));
    }
  }, [dispatch, postId]);

  const handleCommentChange = (value) => {
    setCommentText(value);
  };

  const onCommentButtonPress = () => {
    if (commentText.trim()) {
      const newComment = {
        text: commentText,
        date: new Date().toISOString(),
      };
      dispatch(addComment({ postId, comment: newComment }))
        .unwrap()
        .then(() => {
          setCommentText("");
        })
        .catch((error) => {
          Alert.alert("Error", "Failed to add comment.");
          console.error("Error adding comment:", error);
        });
    } else {
      Alert.alert("Error", "Comment text cannot be empty.");
    }
  };

  const renderItem = ({ item }) => (
    <CommentItem text={item.text} date={item.date} imageSource={item.image} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={comments}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Input
        outerStyles={styles.inputComment}
        placeholder="Коментувати..."
        value={commentText}
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
