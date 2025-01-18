import { useGetAllProducts } from "@/app/tanstack/queries";
import CustomInput from "@/components/form/CustomInput";
import { SearchInput } from "@/components/SearchInput";
import CustomButton from "@/components/ui/CustomButton";
import { ErrorComponent } from "@/components/ui/ErrorComponent";
import { Loading } from "@/components/ui/Loading";
import { Products } from "@/components/ui/Products";
import Wrapper from "@/components/ui/Wrapper";
import { colors } from "@/constants";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { isLoading } from "expo-font";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function Home() {
  //   const [value, setValue] = useState('');
  // const { data, isPending, isError, refetch } = useGetAllProducts();
  // const onClear = () => setValue('');

  // const filteredProduct = useMemo(() => {
  //   if (!value) return data?.products || [];
  //   return (
  //     data?.products.filter((product) =>
  //       product.title.toLowerCase().includes(value.toLowerCase())
  //     ) || []
  //   );
  // }, [data?.products, value]);
  // const onChange = (value: string) => setValue(value);
  // if (isError) {
  //   return <ErrorComponent onRefresh={refetch} />;
  // }

  // if (isPending) return <Loading />;

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: "rgba(25, 148, 6, 1)",
          height: 240,
          paddingTop: 20,
          paddingBottom: 45,
          paddingHorizontal: 15,
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <Image
              source={require("@/assets/images/7ebbf5216334db17ee5d543d365444df.jpg")}
              style={{ width: 50, height: 50, borderRadius: 50 }}
            />
            <View>
              <Text style={{ fontWeight: "bold", color: "white" }}>
                Welcome
              </Text>
              <Text style={{ fontWeight: "bold", color: "white" }}>Rose</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Pressable>
              <MaterialIcons name="shopping-cart" size={25} color={"white"} />
            </Pressable>
            <Pressable>
              <Ionicons name="notifications" size={25} color={"white"} />
            </Pressable>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "white",
            alignItems: "center",
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 10,
          }}
        >
          <TextInput
            style={{ width: "90%" }}
            placeholder="Search your waste..."
          />
          <AntDesign name="search1" size={20} />
        </View>
      </View>

      <ScrollView
        style={{
          // flex: 1,
          backgroundColor: "white",
          marginTop: -35,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          padding: 10,
          borderWidth: 5,
          borderColor: "white"
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            borderWidth: 2,
            borderColor: "rgba(35, 240, 2, 0.65)",
            borderRadius: 25,
            padding: 10,
          }}
        >
          <View style={{alignItems: "center", width: "33.3%",}}>
          <Image source={require("@/assets/images/stash_circle-dot-solid.png")} style={{width: 35, height: 35}} />
            <Text style={{fontWeight: "bold"}}>Points</Text>
            <Text style={{fontWeight: "bold"}}>3000</Text>
          </View>
          <View style={{alignItems: "center", width: "33.3%", borderLeftWidth: 4, borderRightWidth: 4, borderColor: "rgba(35, 240, 2, 0.65)"}}>
          <Image source={require("@/assets/images/noto_evergreen-tree.png")} style={{width: 35, height: 35}} />
            <Text style={{fontWeight: "bold"}}>Tree saved</Text>
            <Text style={{fontWeight: "bold"}}>12</Text>
          </View>
          <View style={{alignItems: "center", width: "33.3%"}}>
            <Image source={require("@/assets/images/685bc8e61a624de410081dd827d80df1.png")} style={{width: 35, height: 35}} />
            <Text style={{fontWeight: "bold"}}>Pickups</Text>
            <Text style={{fontWeight: "bold"}}>07</Text>
          </View>
        </View>

          <View style={{marginTop: 20, padding: 10}}>
            <Text style={{fontWeight: "bold", fontSize: 25, marginBottom: 10}}>Category</Text>
            <View style={{flexDirection: "row", justifyContent: "center", gap: 10}}>
              <View style={{width: "33.3%", backgroundColor: "rgba(185, 249, 199, 1)", alignItems: "center", padding: 10, borderRadius: 10}}>
                <Text style={{textAlign: "center", marginBottom: 10, fontWeight: "bold"}}>Paper</Text>
                <Image source={require("@/assets/images/1a9aa6715dd91bfde4615e2742ea03f0.png")} style={{width: 80, height: 60}} />
              </View>
              <View style={{width: "33.3%", backgroundColor: "rgba(185, 249, 199, 1)", alignItems: "center", padding: 10, borderRadius: 10}}>
                <Text style={{textAlign: "center", marginBottom: 10, fontWeight: "bold"}}>Plastic</Text>
                <Image source={require("@/assets/images/8b451fd24ab7845e5a1270000859a751.png")} style={{width: 50, height: 70}} />
              </View>
              <View style={{width: "33.3%", backgroundColor: "rgba(185, 249, 199, 1)", alignItems: "center", padding: 10, borderRadius: 10}}>
                <Text style={{textAlign: "center", marginBottom: 10, fontWeight: "bold"}}>Metal</Text>
                <Image source={require("@/assets/images/1024d6bf6e00a5c51002fe0fffe1a1e7.png")} style={{width: 70, height: 60}} />
              </View>
            </View>
          </View>

          <View style={{marginTop: 20, marginBottom: 80, borderWidth: 2, borderColor: "rgba(22, 187, 2, 1)", borderRadius: 5, padding: 10}}>
            <View style={{flexDirection: "row", alignItems: "center", gap: 10}}>
              <Image source={require("@/assets/images/noto-v1_biohazard.png")} style={{width: 40, height: 40}} />
              <View style={{flexShrink: 1}}>
                <Text style={{fontSize: 16, fontWeight: "600"}}>Bio-Medical Waste</Text>
                <Text style={{fontSize: 12, fontWeight: "500"}}>
                Infectious Waste, Adult Diapers, Domestic Biomedical Waste, General Waste.
                </Text>
              </View>
            </View>
            <CustomButton
              buttonTitle="Raise Bio-Pickup"
              onPress={() => {}}
              color="white"
              style={{borderRadius: 20, marginTop: 20, marginHorizontal: 20}}
            />
          </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  firstBoxContent: {},
});
