import { Registerform } from "@/components/form/Registerform";
import { Title } from "@/components/ui/Title";
import Wrapper from "@/components/ui/Wrapper";
import { Image } from "expo-image";
import { ScrollView, Text, View } from "react-native";

export default function register() {
    return (
        <ScrollView contentContainerStyle={{justifyContent: "center", paddingVertical: 20, paddingHorizontal: 10 }}>
            <View style={{ alignItems: "center", marginBottom: 40 }}>
                    <Image
                      source={require("@/assets/images/2.png")}
                      style={{ height: 280, width: 280 }}
                    />
                  </View>
                  <View style={{paddingVertical: 10}}>
                    <Text style={{textAlign: "center", fontWeight: "bold"}}>SIGN UP</Text>
                  </View>
            <Registerform />
        </ScrollView>
    );
}