import FavouriteItem from "@/components/FavouriteItem";
import Wrapper from "@/components/ui/Wrapper";
import { useFavouriteStoreStore } from "@/store/favouriteStore";
import { AntDesign } from "@expo/vector-icons";
import { FlatList, StyleSheet, Text, View } from "react-native";

const FavouritePage = () => {

    const favouriteItems = useFavouriteStoreStore(state => state.favourites);
  
    return (
      <View style={{flex: 1}}>
            <Text>Price List</Text>
        </View>
    );
  };

  const styles = StyleSheet.create({
    noProductContainer: {
      height: 200,
      justifyContent: "center",
      alignItems: "center"
      // backgroundColor: "black"
    }
  });

  export default FavouritePage;