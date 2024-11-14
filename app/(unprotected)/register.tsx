import { Registerform } from "@/components/form/Registerform";
import { Title } from "@/components/ui/Title";
import Wrapper from "@/components/ui/Wrapper";
import { Text, View } from "react-native";

export default function register() {
    return (
        <Wrapper>
            <Title title="Register" />
            {/* <Text>Welcome</Text> */}
            <Registerform />
        </Wrapper>
    );
}