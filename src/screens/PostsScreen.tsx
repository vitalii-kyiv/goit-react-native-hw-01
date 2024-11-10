import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, selectPosts } from "../../store/slices/postsSlice";
import { FlatList, StyleSheet, Text, View } from "react-native";
import PostItem from "../components/PostItem";
import { scale, verticalScale } from "../../utils/scaling";
import { colors } from "../../styles/colors";
import { selectAllPosts } from "../../store/selectors/postsSelector";
import { selectCurrentUser } from "../../store/slices/userSlice";
import DefaultProfileIcon from "../../assets/images/icons/DefaultProfileIcon";

export default function PostsScreen() {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const renderItem = ({ item }) => (
    <PostItem
      title={item.title}
      postId={item.id}
      location={item.location}
      country={item.country}
      imageSource={{ uri: item.image }}
      isLikesVisible={false}
      latitude={item.latitude}
      longitude={item.longitude}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.photoNameWrapper}>
        <DefaultProfileIcon outerStyles={styles.userPhoto} />
        <View style={styles.textWrapper}>
          <Text>{currentUser.displayName}</Text>
          <Text>{currentUser.email}</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingTop: verticalScale(32),
    paddingHorizontal: scale(16),
    backgroundColor: colors.bg_main_light,
    paddingBottom: verticalScale(83),
  },
  photoNameWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: scale(8),
    marginBottom: verticalScale(32),
  },
  userPhoto: {
    width: scale(60),
    height: verticalScale(60),
  },
  textWrapper: {},
  listContainer: {
    marginBottom: verticalScale(32),
  },
});
