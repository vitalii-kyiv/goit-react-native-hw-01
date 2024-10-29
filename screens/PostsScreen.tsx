import {
  FlatList,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import UserPhoto from "../components/Photo";
import { scale, verticalScale } from "../utils/scaling";
import { colors } from "../styles/colors";
import postsData from "../src/data/posts.json";
import PostItem from "../components/PostItem";

const userPhoto = require("../assets/images/profile-photo-small.jpg");

const imageMap: { [key: string]: any } = {
  "../assets/images/forest.jpg": require("../assets/images/forest.jpg"),
  "../assets/images/sunset.jpg": require("../assets/images/sunset.jpg"),
  "../assets/images/house.jpg": require("../assets/images/house.jpg"),
};

export default function PostsScreen() {
  const posts = postsData.map((post) => ({
    ...post,
    image: imageMap[post.image],
  }));
  console.log("posts", posts);

  type Post = {
    id: string;
    title: string;
    location: string;
    image: ImageSourcePropType;
  };

  const renderItem = ({ item }: { item: Post }) => (
    <PostItem
      title={item.title}
      location={item.location}
      imageSource={item.image}
      country={item.country}
      isLikesVisible={false}
    />
  );
  return (
    <View style={styles.container}>
      <View style={styles.photoNameWrapper}>
        <UserPhoto outerStyles={styles.userPhoto} imageSource={userPhoto} />
        <View style={styles.textWrapper}>
          <Text>Natali Romanova</Text>
          <Text>email@example.com</Text>
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
