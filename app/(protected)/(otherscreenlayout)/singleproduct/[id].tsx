import { useGetProductById } from "@/app/tanstack/queries";
import CustomButton from "@/components/ui/CustomButton";
import { ErrorComponent } from "@/components/ui/ErrorComponent";
import { Loading } from "@/components/ui/Loading";
import Wrapper from "@/components/ui/Wrapper";
import { colors } from "@/constants";
import { AntDesign } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";

export default function Singleproduct() {
  const { id } = useLocalSearchParams();

  const navigation = useNavigation();

  const { data, isLoading, isError, refetch } = useGetProductById(id as string);

  const [image, setImage] = useState(data?.images[0]);

  navigation.setOptions({ title: data?.title });

  useEffect(() => {
    if(isLoading == false) {
      setImage(data?.images[0]);
    }
  }, [isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorComponent onRefresh={refetch} />;
  }

  const addToCart = () => {
    Alert.alert(data?.title as string, `"${data?.title}" has been added to cart`, [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  }

  console.log("product id", id);
  console.log(data);

  return (
    <Wrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Image style={{ width: "100%", height: 360, borderRadius: 10, marginTop: 20 }} source={{ uri: image }} />
        </View>

        <ScrollView horizontal style={{ gap: 20, marginTop: 10 }}>
          {data?.images.map((img, index) => (
            <Pressable
              onPress={() => {
                setImage(img);
              }}
              key={index}
            >
              <Image
                source={{ uri: img }}
                resizeMode="cover"
                style={[styles.image, {borderRadius: 10, borderWidth: 4, borderColor: image == img ? "black" : "white"}]}
              />
            </Pressable>
          ))}
        </ScrollView>
        <View style={styles.details}>
          <Text style={[styles.title, {fontSize: 10, color: colors.yellow}]}>{data?.category.name}</Text>
          <Text style={[styles.title, {fontSize: 25}]}>{data?.title}</Text>
          <Text style={[styles.title, {fontSize: 18}]}>Cost: ${data?.price}</Text>
          <View>
            <Text
            style={[styles.title, {fontSize: 18}]}>Description</Text>
            <Text>{data?.description}</Text>
          </View>
        </View>

          <View style={{marginTop: 25, marginBottom: 25}}>
            <CustomButton buttonTitle={`Add to cart`} icon={<AntDesign name="shoppingcart" style={{fontSize: 20}} />} onPress={addToCart} color="white" />
          </View>

      </ScrollView>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 64,
    height: 64,
    gap: 10
  },
  imageContainer: {
    width: "100%",
    height: 240,
    flex: 1,
    borderRadius: 5,
    // justifyContent: "center",
    // alignItems: "center",
    overflow: "hidden",
    marginBottom: 10,
  },
  details: {
    gap: 10,
    marginTop: 20
  },
  title: {
    fontWeight: "bold",
  },
});
