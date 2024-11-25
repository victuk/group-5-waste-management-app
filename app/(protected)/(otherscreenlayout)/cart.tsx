import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router';
import { FlatList } from 'react-native-gesture-handler';
import { useCartStore } from '@/store/cartStore';
import CartHeader from '@/components/CartCOmponents/CartHeader';
import {CartItem as CartBody} from '@/components/CartCOmponents/CartBody';
import { CartFooter } from '@/components/CartCOmponents/CartFooter';
import CustomButton from '@/components/ui/CustomButton';

export default function Cart() {

    const navigation = useNavigation();

    const cartItems = useCartStore((state) => state.items);

    const router = useRouter();

    
    useEffect(() => {
        navigation.setOptions({ title: "Cart" });
    }, [navigation]);
    
    const totalItems = cartItems.length;
    const subtotal = cartItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  return (
    <View style={{ flex: 1 }}>
            <FlatList
            style={{ flex: 1 }}
            ListHeaderComponent={() => <CartHeader totalItems={totalItems} subTotal={subtotal} />}
            ListFooterComponent={() => <CartFooter subtotal={subtotal} />}
            data={cartItems}
            renderItem={({item}) => <CartBody item={item} />}
            contentContainerStyle={{ gap: 10, flexGrow: 1, paddingHorizontal: 10 }}
            ListFooterComponentStyle={{ marginTop: 'auto', marginBottom: 30 }}
            showsVerticalScrollIndicator={false}


        ListEmptyComponent={() => (
            <View style={{ gap: 10 }}>
      <Text style={styles.title}>No items in cart</Text>
      <CustomButton buttonTitle="Continue shopping" color="white" onPress={() => {router.push('/')}} />
    </View>
        )}
        />
      
        
    </View>
  )
}

const styles = StyleSheet.create({
    title: { fontSize: 25, fontWeight: 'bold', color: 'black', textAlign: 'center' },
});
