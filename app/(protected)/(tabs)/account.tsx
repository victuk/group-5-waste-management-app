import { colors } from "@/constants";
import { useUserStore } from "@/store/authStore"
import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native"

const account = () => {

    const user = useUserStore(state => state.user);
    const removeUser = useUserStore(state => state.removeUser);

    return (
        <View style={{padding: 10}}>
            <View style={{justifyContent: "center", alignItems: "center", gap: 10, paddingTop: 40, padding: 20, backgroundColor: "white"}}>
            <Image source={require('../../../assets/avatar.png')} style={{borderRadius: 50, height: 100, width: 100}} />
                <Text>{user?.fullName}</Text>
                <Text>{user?.email}</Text>
            <Pressable onPress={removeUser} style={styles.logoutButton}><Text style={styles.logoutTextButton}>Log Out</Text></Pressable>
            </View>
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