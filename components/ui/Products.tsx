import React from 'react'
import { FlashList } from '@shopify/flash-list'
import { IProduct, ProductPaginated } from '@/interfaces/productType'
import { Text, View } from 'react-native'
import { ProductCard } from './ProductCard'


export function Products({data}: {data: IProduct[]}) {
  return (
    <View style={{flex: 1, marginTop: 20}}>
        <FlashList
        showsVerticalScrollIndicator={false}
        // numColumns={2}
            data={data}
            estimatedItemSize={200}
            renderItem={({item, index}) => <ProductCard product={item} index={index} key={index} />}
        />
    </View>
  )
}
