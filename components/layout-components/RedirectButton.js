import React, {Component} from 'react';
import { Alert, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import login from './../Login';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function RedirectButton(props){

    const navigation = useNavigation();

    return (
       
            <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate(props.destiny)}}>
                <Text style={styles.text}>{props.text}</Text>
            </TouchableOpacity>
     
    );
}

const styles = StyleSheet.create({
    button:{
        backgroundColor:'#9555F5',
        width: Dimensions.get('screen').width-50,
        height:60,
        marginBottom:20,
        justifyContent:'center',
        borderRadius:15,
    },
    text:{
        color:'#FFFFFF',
        fontWeight:'bold',
        fontSize:24,
        alignSelf:'center',
       
    }
});