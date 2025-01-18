import { colors } from "@/constants";
import { useUserStore } from "@/store/authStore"
import { Image } from "expo-image";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native"

const account = () => {

    const user = useUserStore(state => state.user);
    const removeUser = useUserStore(state => state.removeUser);

    const setOnboard = useUserStore(state => state.setOnboard);

    return (
        <View style={{flex: 1}}>
            <Text>Profile</Text>
            <Pressable onPress={() => {setOnboard(false)}} style={{marginVertical: 40}}>
              <Text>Go to Onboard Onboard</Text>
            </Pressable>
            <Pressable onPress={() => {router.push("/login");}}>
              <Text>Go to login</Text>
            </Pressable>
        </View>
    )
}


const styles = StyleSheet.create({
    logoutButton: {
      paddingHorizontal: 20,
      paddingVertical: 5,
      backgroundColor: colors.yellow,
      borderRadius: 10,
      alignItems: "center",
      width: 180
    },
    logoutTextButton: {
      color: "white",
      fontWeight: "bold",
      fontSize: 20,
    }
  });

export default account