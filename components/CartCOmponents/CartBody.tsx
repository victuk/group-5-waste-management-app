import { CartItem } from '@/interfaces/cartInterface'
import React from 'react'
import { Text, View } from 'react-native';

interface Props {
  item: CartItem;
  index: number;
}

export default function CartBody({item, index}: Props) {
  return (
    <View style={{flexDirection: "row", alignItems: "center"}}>
      <View>
        <Text>{item.title}</Text>
        <Text>Unit cost: ${item.price}</Text>
      </View>
      <View>
        <Text>{item.quantity}</Text>
      </View>

    </View>
  )
}
