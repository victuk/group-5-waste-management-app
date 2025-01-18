import { KeyboardTypeOptions, StyleProp, StyleSheet, Text, TextInput, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import { colors } from '@/constants';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

type props = {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    keyboardType?: KeyboardTypeOptions;
    label?: string;
    secureTextEntry?: boolean;
    error?: string;
    password?: boolean;
    toggleSecure?: () => void
    style?: StyleProp<ViewStyle>
}


export const CustomInput = ({
    placeholder,
    value,
    onChangeText,
    label,
    keyboardType = 'default',
    secureTextEntry,
    error,
    password,
    toggleSecure,
    style
}: props) => {
    return(
       <View style={{flex: 1}}>
        {label && <Text style={styles.label}>{label}</Text>}
         <View style={[styles.container, style]}>
            <TextInput
            style={styles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry} />
            {password &&(
            <TouchableOpacity onPress={toggleSecure}>
                {secureTextEntry ? <AntDesign name="eye" size={30}/> :
                <FontAwesome name="eye-slash" size={30}/>}
            </TouchableOpacity>)}
            </View>
            {error && <Text style={styles.error}>{error}</Text>}
       </View>
    );
};
const styles = StyleSheet.create({
    container:{
        width: '100%',
        borderWidth: 1,
        borderColor: colors.gray,
        borderRadius: 5,
        padding:10,
        height:60,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    input:{
        backgroundColor: 'transparent',
        borderWidth: 0,
        color: colors.dark,
        flex: 1,
    },
    label:{
        color: colors.dark,
        fontSize:15,
        marginBottom:5,
        fontWeight: 'bold',
    },
    error:{
        color:'red',
        marginTop: 5,
        fontSize: 15,
        fontWeight: 'bold',
    }
})

export default CustomInput

