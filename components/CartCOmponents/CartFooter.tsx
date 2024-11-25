
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '@/constants';
import { AntDesign } from '@expo/vector-icons';
import CustomButton from '../ui/CustomButton';

export const CartFooter = ({ subtotal }: { subtotal: number }) => {
  return (
    <View style={{ flexDirection: 'row', gap: 20 }}>
      <TouchableOpacity style={styles.iconContainer}>
        <AntDesign name="phone" size={30} color={colors.yellow} />
      </TouchableOpacity>
      <CustomButton
        buttonTitle={`Checkout (₦${subtotal})`}
        onPress={() => {}}
        color="white"
        style={{ flex: 1 }}
      />
    </View>
  );
};



const styles = StyleSheet.create({
  subtotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subtotalAmount: {
    fontWeight: 'bold',
  },
  summary: { fontWeight: '300', color: 'grey' },
  title: { fontSize: 25, fontWeight: 'bold', color: 'black', textAlign: 'center' },
  iconContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.yellow,
    padding: 10,
  },
});
