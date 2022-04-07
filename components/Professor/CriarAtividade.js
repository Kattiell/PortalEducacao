import React, { Component, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions, FlatList, Button} from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';

export default function CriarAtividade(){
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
                navigation.navigate('profscreen');
            }}
        ></Icon>
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
});