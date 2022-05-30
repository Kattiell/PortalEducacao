import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Atividade from '../layout-components/Atividade';

export default function CriarAtividade() {
    const Drawer = createDrawerNavigator();
    const navigation = useNavigation();
 

    return (
        <View style={styles.container} >
            <Icon
                containerStyle={{ alignSelf: 'flex-start', marginLeft: 2 }}
                name="arrow-back"
                type="material"
                size={40}
                color='#B088F7'
                onPress={() => {
                    navigation.navigate('Menu Professor');
                }}
            ></Icon>
            <TouchableOpacity style={styles.Button} onPress={() => {navigation.navigate('PostarAtividade');}}>
                <Icon name="create-new-folder" size={26} color="white" />
            </TouchableOpacity>

            <View style={styles.container}>
                <Text style={{ color: '#2A3A4E', fontWeight: 'bold', fontSize: 30, marginBottom: 15, marginTop: 20 }}>Criar Atividade</Text>
            </View>
            <Atividade nomeAtividade="ablublubleh"/>

        </View>

    );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 30,
    },
    body: {
        flex: 1,
        marginTop: -86

    },
    Input: {
        flex: 1,
        height: 40,
        backgroundColor: "#eee",
        borderRadius: 4,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#eee"
    },
    Button: {
        height: 40,
        width: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1c6cce",
        borderRadius: 4,
        alignSelf: 'flex-end',
        position: 'absolute',
        top:1,
        zIndex: 10,
        right: 22,
        backgroundColor: '#8A4AF5',
    },
    FlatList: {
        flex: 1,
        marginTop: 55
    },
    Texto: {
        fontSize: 14,
        color: "#333",
        fontWeight: "bold",
        marginTop: 4,
        textAlign: "center"
    },
    ContainerView: {
        marginBottom: 15,
        padding: 15,
        borderRadius: 4,
        backgroundColor: "#eee",

        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "#eee"
    }
});