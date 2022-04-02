import React, {Component,useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import Esqueceu_Senha from './Esqueceu_Senha';
import RedirectButton from './layout-components/RedirectButton';

export default function Acesso(props){


    return (
        <View style={styles.container}>
            <Image
                source={props.logo}   
                style={styles.logo}
            />

            <Text style={{fontSize:18, bottom:35, fontWeight:'bold',color:'#28353E'}}>
            Escolha o botão de acordo com a sua função para efetuar o seu acesso
            </Text>

            <RedirectButton 
                destiny="loginaluno"
                text="Acessar como Aluno"
            ></RedirectButton>

            <RedirectButton 
                destiny="loginprof"
                text="Acessar como Professor"
            ></RedirectButton>


            <RedirectButton 
                destiny="login"
                text="Acessar como Admin"
            ></RedirectButton>

            <View style={styles.final}>
                <Text style={{color:'#FFFFFF', fontWeight:'700',}}>© 2022 - Portal Educação</Text>
            </View>

        </View>
    );


}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#FFFFFF',
        alignItems:'center',
        padding:50,
    },
    logo:{
        width: 220,
        height: 180,
        marginBottom:90,
    },
    final:{
        width: Dimensions.get('screen').width,
        alignItems:'center',
        backgroundColor:'#B58AF8',
        position:'absolute',
        bottom:0,
    }
});