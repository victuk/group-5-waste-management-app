import { Text, View } from "react-native";
import CustomButton from "./CustomButton";

interface Props {
    onRefresh: () => void;
}

export const ErrorComponent = ({onRefresh}: Props): JSX.Element => {
    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text
            style={{
                color: "red",
                fontSize: 40,
                textAlign: "center",
                marginBottom: 18,
                fontWeight: "bold"
            }}
            >Something went wrong</Text>
            <CustomButton style={{paddingHorizontal: 20, backgroundColor: "white", borderWidth: 2, borderColor: "black"}} buttonTitle="Retry" onPress={onRefresh} />
        </View>
    );
}