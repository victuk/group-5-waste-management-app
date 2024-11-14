import { IProduct } from "@/interfaces/productType";
import { trimText } from "@/utils";
import { Link, useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface IProductCard {
  index: number;
  product: IProduct;
}

export function ProductCard({ index, product }: IProductCard): JSX.Element {
  const router = useRouter();

  return (
    <Pressable
    style={[
        styles.card,
        { marginLeft: index % 1 === 0 ? 10 : 0, marginBottom: 15 },
      ]}
      onPress={() => {
        router.push({ pathname: `/singleproduct/${product.id}` as any });
      }}
    >
      <View>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.images[0] }}
            resizeMode="cover"
            style={styles.image}
          />
        </View>
        <View>
          <Text style={styles.title}>{trimText(product.title)}</Text>
          <Text>{product.category.name}</Text>
          <Text>${product.price}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    flex: 1,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    borderRadius: 5,
    height: 240,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "gray",
    paddingHorizontal: 10,
    paddingVertical: 10,
    paddingBottom: 20,
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
