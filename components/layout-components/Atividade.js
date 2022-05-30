import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from 'react';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

export default function Atividade(props) {

    const navigation = useNavigation();
    const [currentCodigo, setCurrentCodigo] = useState(''); //Criar validação de campo vazio 
    const [nomeAtividade, setnomeAtividade] = useState('');


    return (
        <View style={styles.container}>
            <Text style={styles.atividades}>
                {props.nomeAtividade}
            </Text>
            <View style={styles.buttonSection}>
                <TouchableOpacity style={styles.bt}>
                    <Icon
                        name="edit"
                        type="material"
                        size={30}
                        color='#FFFFFF'
                    ></Icon>
                </TouchableOpacity>

                <TouchableOpacity style={styles.bt}>
                    <Icon
                        name="delete"
                        type="material"
                        size={30}
                        color='#FFFFFF'
                    ></Icon>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {

        backgroundColor: 'white',
        borderColor: '#D3D3D3',
        borderWidth: 2,
        width: 330,
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    atividades: {
        color: '#975EF6',
        fontSize: 18,
        paddingLeft: 15
        // fontFamily: '',
    },
   buttonSection: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        width: 124,

    },
    bt: {
        backgroundColor: '#B38DF7', 
        height: 60,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',

    }
});
