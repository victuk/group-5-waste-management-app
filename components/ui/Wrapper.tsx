import { colors } from "@/constants";
import React, {PropsWithChildren} from "react";
import { StyleSheet, Text, View } from "react-native"

const Wrapper = ({children}: PropsWithChildren) => {
    return(
        <View style={styles.container}>
       {children}
        </View>
    )
};
export default Wrapper

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.white,
        flex:1,
        paddingHorizontal: 15,
    }
});