import { useGetProductById, useSimilarProducts } from "@/app/tanstack/queries";
import CustomButton from "@/components/ui/CustomButton";
import { ErrorComponent } from "@/components/ui/ErrorComponent";
import { Loading } from "@/components/ui/Loading";
import Wrapper from "@/components/ui/Wrapper";
import { colors } from "@/constants";
import { AntDesign } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";

import { IProduct, IReview } from "@/interfaces/productType";
import moment from "moment";
import { trimText } from "@/utils";
import { useCartStore } from "@/store/cartStore";

export default function Singleproduct() {
  const { id }: { id?: number } = useLocalSearchParams();

  const addToCartFromStore = useCartStore((state) => state.addItem);
  const removeFromCartUsingStore = useCartStore((state) => state.removeItem);

  const quantityInCart = useCartStore(
    (state) => state.items.find((i) => i.id == id)?.quantity || 0
  );

  const navigation = useNavigation();

  const { data, isLoading, isError, refetch } = useGetProductById(id as number);

  const [image, setImage] = useState(data?.images[0]);


  // useEffect(() => {
  //   navigation.setOptions({ title: data?.title ? (data?.title.length < 20 ? data?.title : data?.title.slice(0, 20) + "...") : "Loading..." });
  // }, [navigation]);




  useEffect(() => {
    if (isLoading == false) {
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
    addToCartFromStore({
      id: data!!.id,
      price: data!!.price,
      quantity: 1,
      title: data!!.title,
      img: data!!.thumbnail,
      brand: data!!.brand,
      stock: data!!.stock
    });
    ToastAndroid.show("Added", ToastAndroid.SHORT);
  };

  const removeFromCart = () => {
    removeFromCartUsingStore(data!!.id);
    ToastAndroid.show("Removed", ToastAndroid.SHORT);
  };

  // console.log("product id", id);
  // console.log(data);

  return (
    <Wrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Image
            style={{
              width: "100%",
              height: 360,
              borderRadius: 10,
              marginTop: 20,
            }}
            source={{ uri: image }}
          />
        </View>

        <ScrollView
          horizontal
          style={{ gap: 20, marginTop: 10 }}
          contentContainerStyle={{ columnGap: 10 }}
        >
          {data?.images.map((img: string, index: number) => (
            <Pressable
              onPress={() => {
                setImage(img);
              }}
              key={index}
            >
              <Image
                source={{ uri: img }}
                loadingIndicatorSource={{
                  uri: "../..assets/images/loading.svg",
                }}
                resizeMode="cover"
                style={[
                  styles.image,
                  {
                    borderRadius: 5,
                    borderWidth: image == img ? 2 : 0,
                    borderColor: image == img ? colors.yellow : "white",
                  },
                ]}
              />
            </Pressable>
          ))}
        </ScrollView>
        <View style={styles.details}>
          <Text style={[styles.title, { fontSize: 10, color: colors.yellow }]}>
            {data?.category.toLocaleUpperCase()}
          </Text>
          <Text style={[styles.title, { fontSize: 25 }]}>{data?.title}</Text>
          <Text style={[styles.title, { fontSize: 18 }]}>
            Cost: ${data?.price}{" "}
            <Text style={{ color: colors.gray, fontSize: 10 }}>
              -{data?.discountPercentage}%
            </Text>
          </Text>
          <Text>{data?.availabilityStatus}</Text>

          <Text>Total Quantity: {data?.stock}</Text>

          <View style={{ marginTop: 10, marginBottom: 10 }}>
            {quantityInCart == 0 ? (
              <CustomButton
                buttonTitle={`Add to cart`}
                icon={
                  <AntDesign name="shoppingcart" style={{ fontSize: 20 }} />
                }
                onPress={addToCart}
                color="white"
              />
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <CustomButton
                  buttonTitle={``}
                  style={{ width: "45%" }}
                  icon={<AntDesign name="minus" style={{ fontSize: 20 }} />}
                  onPress={removeFromCart}
                  color="white"
                />
                <Text>{quantityInCart}</Text>
                <CustomButton
                  buttonTitle={``}
                  style={{ width: "45%" }}
                  icon={<AntDesign name="plus" style={{ fontSize: 20 }} />}
                  onPress={addToCart}
                  color="white"
                  disabled={quantityInCart >= data!!.stock}
                />
              </View>
            )}
          </View>

          <View style={{ marginVertical: 10, gap: 6 }}>
            <Text>{data?.warrantyInformation}</Text>
            <Text>{data?.shippingInformation}</Text>
          </View>
        </View>
        <View>
          <Text style={[styles.title, { fontSize: 18 }]}>Description</Text>
          <Text>{data?.description}</Text>
        </View>

        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 5,
            backgroundColor: "#EEEEEE",
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            marginVertical: 20,
          }}
        >
          <Text style={{ color: colors.yellow, fontSize: 25 }}>
            {data?.rating}/5
          </Text>
          <Stars num={data!!.rating} />
          <Text style={{ textAlign: "center" }}>Verified rating</Text>
        </View>

        <View style={{ marginVertical: 10 }}>
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>Reviews</Text>
          </View>
          <View>
            {data?.reviews.map((review: IReview, index: number) => {
              return (
                <View style={{ marginVertical: 5 }} key={index}>
                  {/* <Text style={{fontWeight: "bold"}}>{review.reviewerName}</Text>
                  <Text style={{color: colors.gray, fontSize: 10}}>{review.reviewerEmail}</Text> */}
                  <Text>
                    <Stars num={review.rating} />
                  </Text>
                  <Text>{review.comment}</Text>
                  <Text style={{ color: colors.gray, fontSize: 12 }}>
                    {moment(review.date).format("Do MMMM, YYYY")} by{" "}
                    {review.reviewerName}
                  </Text>
                  <Text style={{ color: colors.gray, fontSize: 12 }}>
                    {review.reviewerEmail}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        <View>
          <Image
            source={{ uri: data?.meta.qrCode }}
            style={{ height: 80, width: 80 }}
          />
        </View>

        <SimilarProducts category={data!!.category} limit={5} />

        {/* <Text>
            {JSON.stringify(data as any).toString()}
          </Text> */}
      </ScrollView>
    </Wrapper>
  );
}

const SimilarProducts = ({
  category,
  limit,
}: {
  category: string;
  limit: number;
}) => {
  const { data, isLoading, isError, refetch } = useSimilarProducts(
    category,
    limit
  );

  const router = useRouter();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    <ErrorComponent onRefresh={refetch} />;
  }

  return (
    <View style={{ marginTop: 20, marginBottom: 40 }}>
      <View style={{ marginBottom: 5 }}>
        <Text style={[styles.title, { fontSize: 20 }]}>Similar Products</Text>
      </View>

      <ScrollView horizontal contentContainerStyle={{ columnGap: 20 }}>
        {data?.products.map((product: IProduct, index: number) => {
          return (
            <Pressable
              onPress={() => {
                router.push({
                  pathname: `/singleproduct/${product.id}` as any,
                });
              }}
              key={index}
            >
              <View
                style={{
                  padding: 10,
                  marginVertical: 10,
                  borderWidth: 1,
                  borderColor: colors.yellow,
                  borderRadius: 5,
                  width: 180,
                }}
              >
                <View style={{ alignItems: "center" }}>
                  <Image
                    source={{ uri: product.thumbnail }}
                    height={160}
                    width={160}
                  />
                </View>
                <View>
                  <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                    {trimText(product.title, 12)}
                  </Text>
                  <Text>{product.price}</Text>
                </View>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

const Stars = ({ num }: { num: number }) => {
  let star = [];

  num = Math.round(num);

  for (let i = 0; i < 5; i++) {
    if (i < num) {
      star.push(<AntDesign name="star" color={colors.yellow} key={i} />);
    } else {
      star.push(<AntDesign name="staro" color={colors.yellow} key={i} />);
    }
  }

  return <View style={{ flexDirection: "row" }}>{star}</View>;
};

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
    gap: 10,
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
    gap: 4,
    marginTop: 20,
  },
  title: {
    fontWeight: "bold",
  },
});
