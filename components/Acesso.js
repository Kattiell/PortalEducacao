import React, { Component, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions, KeyboardAvoidingView } from 'react-native';
import { Icon } from 'react-native-elements';
import Esqueceu_Senha from './Esqueceu_Senha';
import RedirectButton from './layout-components/RedirectButton';
import * as Animatable from 'react-native-animatable';



export default function Acesso(props) {


    return (

        <View style={styles.container}>
            <Animatable.Image
                animation="fadeInUp"
                source={props.logo}
                style={styles.logo}
            />
            <Animatable.View delay={800} animation="fadeInUp">
                <Text style={{
                    fontSize: 22,
                    marginLeft: 34,
                    marginRight: 32,  justifyContent: 'center', bottom: 25, fontWeight: 'bold', color: '#28353E',
                }}>
                    Escolha seu tipo de acesso
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
            </Animatable.View>


            <View style={styles.final}>
                <Text style={{ color: '#FFFFFF', fontWeight: '700', }}>© 2022 - Portal Educação</Text>
            </View>

        </View>

    );


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        padding: 60,
    },
    logo: {
        width: 220,
        height: 180,
        marginBottom: 90,
    },
    final: {
        width: Dimensions.get('screen').width,
        alignItems: 'center',
        backgroundColor: '#B58AF8',
        position: 'absolute',
        bottom: 0,
    }
});