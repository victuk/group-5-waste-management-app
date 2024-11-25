import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Divider } from '../Divider'
import { colors } from '@/constants';

type HeaderProp = {
  totalItems: number;
  subTotal: number;
};

export default function CartHeader({ totalItems, subTotal }: HeaderProp) {
  return (
    <View style={{ marginTop: 20, gap: 10 }}>
      <Text style={styles.summary}>CART SUMMARY</Text>
      <Divider />
      <View style={styles.subtotal}>
        <Text>Subtotal</Text>
        <Text style={styles.subtotalAmount}>₦{subTotal}</Text>
      </View>
      <Text style={styles.summary}>Cart ({totalItems})</Text>
      <Divider />
    </View>
  )
}


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
