import { colors } from "@/constants";
import { IProduct } from "@/interfaces/productType";
import { useFavouriteStoreStore } from "@/store/favouriteStore";
import { trimText } from "@/utils";
import { AntDesign } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import React, { useMemo } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface IProductCard {
  index: number;
  product: IProduct;
  width?: number;
  height?: number;
}

export function ProductCard({ index = 0, product, width, height }: IProductCard): JSX.Element {
  const router = useRouter();

  const allFavourites = useFavouriteStoreStore(state => state.favourites);

  const addToFavourite = useFavouriteStoreStore(state => state.addOrRemoveFavoutite);

  const favouriteIcon = useFavouriteStoreStore(state => state.isInFavourite);

  type IconTypes = "heart" | "hearto";

  const icon  = useMemo(() => {
    return favouriteIcon(product.id);
  }, [allFavourites, product.id]);

  return (
    <Pressable
    style={({ pressed }) => [
      styles.card,
      {
        marginHorizontal: index % 1 === 0 ? 10 : 0,
        // marginBottom: 20,
        opacity: pressed ? 0.5 : 1,
        width,
        height: height ? height : 400,
      },
    ]}
      onPress={() => {
        router.push({ pathname: `/singleproduct/${product.id}` as any });
      }}
    >
      <View>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.thumbnail }}
            resizeMode="cover"
            style={styles.image}
          />
        </View>
        <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: "center" }}>
          <Text style={styles.title}>{trimText(product.title, 9)}</Text>
          <Pressable style={{padding: 2}} onPress={() => {addToFavourite({
            id: product.id,
            brand: product.brand,
            img: product.thumbnail,
            price: product.price,
            stock: product.stock,
            title: product.title
          });}}>
            <AntDesign name={icon as IconTypes} size={25} />
          </Pressable>
        </View>
          <Text>{product.category}</Text>
          <Text>${product.price} <Text style={{color: colors.gray, fontSize: 10}}>-{product.discountPercentage}%</Text></Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    flex: 1,
    height: 240,
    // elevation: 6,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 2,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 2,
    // borderRadius: 5,

    // borderWidth: StyleSheet.hairlineWidth,
    // borderColor: 'gray',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  imageContainer: {
    width: "100%",
    height: "70%",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontWeight: "bold",
  },
});
