import React, { Component, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions, FlatList, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';

export default function CriarAtividade() {
    const Drawer = createDrawerNavigator();
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Icon
                containerStyle={{ alignSelf: 'flex-start', marginLeft: 30 }}
                name="arrow-back"
                type="material"
                size={40}
                color='#B088F7'
                onPress={() => {
                    navigation.navigate('Menu Professor');
                }}
            ></Icon>

            <Text style={{ color: '#2A3A4E', fontWeight: 'bold', fontSize: 30, marginBottom: 15, marginTop: 20, }}>Portal Do Professor</Text>

            <Text style={styles.title}>Publicar Uma Atividade</Text>


        </View>

    );
}

const styles = StyleSheet.create({
    container: {
       flex: 1,
       flexDirection:'column',
       backgroundColor:'#FFFFFF',
       paddingLeft:30,
       paddingRight:30,
       paddingBottom:30,
    },
    title:{
        fontSize:20,
        fontWeight:'bold',
        marginLeft:15,
        marginTop:35,
        color:'#8A4AF5',
    },
    containerFunctions: {
        flexDirection: 'row',
        flexWrap:'wrap',
        justifyContent:'space-between',
        marginLeft:15,
        marginRight:15,
    },
}
);