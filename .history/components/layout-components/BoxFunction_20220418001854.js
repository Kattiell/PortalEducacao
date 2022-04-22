import React, {Component} from 'react';
import { Alert, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

export default function BoxFunction(props){

    const Drawer = createDrawerNavigator();
    const navigation = useNavigation();

    return(
    <TouchableOpacity onPress={()=>{navigation.navigate(props.onPress)}}>
            <View style={styles.box}>
                <Icon
                    name={props.nameIcon}
                    type='material'
                    size={40}
                    color='#FEFEFE'
                ></Icon>
                <Text style={styles.title}>{props.functionBox}</Text>
            </View>
    </TouchableOpacity>
    );

}

const styles = StyleSheet.create({
    box: {
        marginTop:25,
        marginBottom:10,
        flexDirection: 'column',
        width:120,
        height:130,
        backgroundColor:'#B38DF7',
        justifyContent: 'space-evenly',
    }, 
    title: {
        textAlign:'center',
        fontSize: 20,
        color: '#FEFEFE',
        fontWeight:'bold',
        
    }
}
);