import React from 'react'
import {StyleSheet, Text} from 'react-native'

type props = {
    title: string
}


export const Title = ({title}: props) => {
  return <Text style={styles.title}>{title}</Text>
}

const styles = StyleSheet.create({
  title: {  
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
  }
})