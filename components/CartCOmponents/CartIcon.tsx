import { colors } from "@/constants";
import { useCartStore } from "@/store/cartStore";
import { AntDesign } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export const CartIcon = () => {

    const router = useRouter();

    const pathname = usePathname()

    const cartItemLength = useCartStore((state) => state.items.length);
    const onPress = () => {
        if(pathname != "/cart") {
            router.push("/cart" as any);
        }
    }
    return (
        <Pressable
            onPress={onPress}
            style={({pressed}) => [styles.press, {opacity: pressed ? 0.5 : 1}]}
        >
            <AntDesign name="shoppingcart" color="white" size={23} />
            <View style={styles.abs}>
                <Text style={{color: colors.white, fontSize: 10}}>{cartItemLength}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    press: {
        backgroundColor: colors.gray,
        height: 40,
        width: 40,
        padding: 5,
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10
    },
    abs: {
        position: "absolute",
        top: -5,
        right: -5,
        backgroundColor: colors.yellow,
        height: 15,
        width: 15,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center"
    }
});