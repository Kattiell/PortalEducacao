import { React, Component, useState } from 'react';
import { Image, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Ionicons} from '@expo/vector-icons';
import { Icon } from 'react-native-elements';
import { clickProps } from 'react-native-web/dist/cjs/modules/forwardedProps';
let logo = require('./../assets/logo.png');

export default function Esqueceu_Senha({ navigation }) {
    return (
        <View style={styles.container}>          
                <Icon
                    containerStyle={{alignSelf:'flex-start',marginTop:50 ,marginLeft:20, }}
                    name="arrow-back"
                    type="material"
                    size={40}
                    color='#B088F7'
                    onPress={()=>{
                    
                        navigation.navigate('login');
                    }}
                ></Icon>

            <Text style={{alignSelf: 'flex-start' ,color:'#2A3A4E', fontWeight:'bold', fontSize:30, marginLeft: 25, marginBottom: 100,paddingTop: 20,}}>Recuperar Senha</Text>

            <Image
                source={logo}
                style={styles.logo}
            />
            <Text style={styles.title}>Digite abaixo o e-mail de recuperação:</Text>
            <View style={styles.inputArea}>
                <TextInput
                    style={styles.input}
                    placeholder='Email'
                />
               
            </View>
            
            <View>
                <TouchableOpacity
                    style={styles.botaorec}
                    title="Show alert" onPress={showAlertEmail}>
                    <Text style={styles.botaoText} >Enviar E-mail</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: 'bold',
        fontSize: 19,
        padding: 15,
        width: 377,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },

    inputArea: {
        flexDirection: 'row',
        width: '85.5%',
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        height: 50,
        alignItems: 'center',
        margin: 15,
        borderBottomWidth:2,
        borderBottomColor:'#E9E9E9',
    },
    input: {
        width: '85%',
        height: 100,
        color: '#000',
        padding: 8,
        fontSize: 18

    },
    
    logo: {
        width: 220,
        height: 180,
        marginBottom:50,
        
      },
    botaorec:{
        width: 300,
        height: 52,
        backgroundColor: '#B38DF7',
        marginTop: 20,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },

    botaoText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff'
    },
});