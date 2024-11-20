import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from 'expo-router';
import { FlatList } from 'react-native-gesture-handler';
import { useCartStore } from '@/store/cartStore';
import CartHeader from '@/components/CartCOmponents/CartHeader';
import CartBody from '@/components/CartCOmponents/CartBody';
import CartFooter from '@/components/CartCOmponents/CartFooter';

export default function Cart() {

    const navigation = useNavigation();

    const cartItems = useCartStore((state) => state.items);

    useEffect(() => {
        navigation.setOptions({ title: "Cart" });
    }, [navigation]);

  return (
    <View>
        {cartItems.length > 0 ? (
            <FlatList
            ListHeaderComponent={() => <CartHeader />}
            ListFooterComponent={() => <CartFooter/>}
            data={cartItems}
            renderItem={({item, index}) => <CartBody item={item} index={index} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{gap: 10}}
        />
        ) : (
            <View>
                <Text>No cart item</Text>
            </View>
        )}
        
    </View>
  )
}