import { colors } from "@/constants";
import { ActivityIndicator, View } from "react-native";

export const Loading = (): JSX.Element => {
    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <ActivityIndicator size="large" color={colors.yellow} />
        </View>
    );
} 