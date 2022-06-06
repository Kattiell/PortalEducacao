import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { WebView } from "react-native-webview";


export default function PostarConteudo() {
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
            <TouchableOpacity style={styles.Button} onPress={() => {navigation.navigate('CadastrarMaterial');}}>
                <Icon name="create-new-folder" size={26} color="white" />
            </TouchableOpacity>

            <View style={styles.container}>
                <Text style={{ color: '#2A3A4E', fontWeight: 'bold', fontSize: 30, marginBottom: 15, marginTop: 20 }}>Postar Conteudo</Text>
            </View>

            <WebView
                source={{html: '<iframe width="100%" height="150%" src="https://firebasestorage.googleapis.com/v0/b/portaeducacao.appspot.com/o/Atividades%2Fjavascript-the-definitive-guide-master-the-worlds-most-used-programming-language-9781491951989-1491951982_compress.pdf?alt=media&token=f9577fb7-16f3-4eee-9d7e-a2d22eec75b0"></iframe>}}'}}
            />

        </View>

    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
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