import { colors } from "@/constants";
import { useUserStore } from "@/store/authStore";
import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";

const account = () => {
  const user = useUserStore((state) => state.user);
  const removeUser = useUserStore((state) => state.removeUser);

  return (
    <View style={{ flex: 1 }}>
      <Text>Post</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: colors.yellow,
    borderRadius: 10,
    alignItems: "center",
    width: 180,
  },
  logoutTextButton: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default account;
