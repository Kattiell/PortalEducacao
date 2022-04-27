import React, { Component, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import { ListItem, SearchBar } from "react-native-elements";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {FlatList } from "react-native";



export default function PostarConteudo() 
{
    const Drawer = createDrawerNavigator();
    const navigation = useNavigation();


    const DATA = [
        {
            id: "1",
            title: "Data Structures",
        },
        {
            id: "2",
            title: "STL",
        },
        {
            id: "3",
            title: "C++",
        },
        {
            id: "4",
            title: "Java",
        },
        {
            id: "5",
            title: "Python",
        },
        {
            id: "6",
            title: "CP",
        },
        {
            id: "7",
            title: "ReactJs",
        },
        {
            id: "8",
            title: "NodeJs",
        },
        {
            id: "9",
            title: "MongoDb",
        },
        {
            id: "10",
            title: "ExpressJs",
        },
        {
            id: "11",
            title: "PHP",
        },
        {
            id: "12",
            title: "MySql",
        },
    ];

    const Item = ({ title }) => {
        return (
            <View style={styles.item}>
                <Text>{title}</Text>
            </View>
        );
    };
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(DATA);
    const [error, setError] = useState(null);
    const [searchValue, setSearchValue] = useState("");
    
    const renderItem = ({ item }) => <Item title={item.title} />;
    const Search = (props) => {
        arrayholder = DATA;
        searchFunction = (text) => {
            const updatedData = arrayholder.filter((item) => {
                const item_data = `${item.title.toUpperCase()})`;
                const text_data = text.toUpperCase();
                return item_data.indexOf(text_data) > -1;
            });
            setData(updatedData);
            setSearchValue(text);
        };
    }
         
            return (
                <View style={styles.container} >
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
                    <View style={styles.container}>
                        <Text style={{ color: '#2A3A4E', fontWeight: 'bold', fontSize: 30, marginBottom: 15, marginTop: 20, marginLeft: 30 }}>Postar Conteudo</Text>
                    </View>

                    <SearchBar
                    
                        placeholder="Search Here..."
                        lightTheme
                        round
                        value={searchValue}
                        onChangeText={(text) => setSearchValue(text)}
                        autoCorrect={false}
                    />
                    <FlatList
                    style={styles.title}
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                    />

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
            backgroundColor: '#fffFFF',
        },
    });

