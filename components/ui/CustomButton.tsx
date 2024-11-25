import { View, Text, StyleProp, ViewStyle, Pressable, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import { colors } from '@/constants';

type Props = {
    buttonTitle: string
    onPress: () => void;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
    color?: string;
    icon?: JSX.Element;
    isLoading?: boolean;
}


export const CustomButton = ({buttonTitle, onPress, disabled, style, color, icon, isLoading}: Props) =>{
  return (
    <Pressable
    disabled={disabled || isLoading}
    onPress={onPress}
    style={({ pressed}) =>[
        styles.pressable,
        { opacity:pressed || disabled ? 0.5 : 1 },
        style,
    ]}>
        {
            isLoading ? <ActivityIndicator size={20} color={"#000000"} /> : <Text style={[styles.title, {color, alignItems: "center"}]}>{buttonTitle} {icon && icon}</Text>
        }
        
    </Pressable>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    pressable: {
        height: 55,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: colors.yellow,
    },
    title:{
        fontSize: 18,
        fontWeight:'bold',
        color: colors.dark,
    },
});