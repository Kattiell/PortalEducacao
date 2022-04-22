import React, { Component, useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimension, Picker, Dimensions } from 'react-native';
import axios from 'axios';
import { Icon } from 'react-native-elements';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import 'react-native-gesture-handler';
import ipv4 from 'PortalEducacaoBack/ipv4.json'; //Acessar IP back-End
import Select from '../layout-components/Select/Select.js';

export default function CadastrarEscola() {

    const route = useRoute();
    const navigation = useNavigation();
    const baseUrl = "http://"+ipv4.ip+":3000/escola"; 

    const [currentNome, setCurrentNome] = useState(''); //Criar validação de campo vazio 
    const [currentTelefone, setCurrentTelefone] = useState('');//Criar validação de campo vazio 
    const [currentEndereco, setCurrentEndereco] = useState('');//Criar validação de campo vazio 
    const [currentValue, setCurrentValue] = useState("Escolha uma opção: ");//Criar validação de campo vazio 

    // useEffect para receber o valor selecionado na outra tela
    useEffect(()=>{
        if(route.params?.selectedValue){
            setCurrentValue(route.params.selectedValue);
        }
    });

    
    const showAlert = () => 
        Alert.alert(
            "Sucesso!",
            "Escola Cadastrada com Sucesso",
            [
                {
                    text: "Fechar",
                    style: "Fechar",
                },
            ],
        );
    const showAlertErro = () =>
        Alert.alert(    
            "Ocorreu um Erro!",
            "Erro com os Dados",
            [
                {
                    text: "Fechar",
                    style: "Fechar",
                },
            ],
        );
 
    const postEscolaData = async () => {
        // Envia requisição POST
        await axios.post(baseUrl, {
            endereco: currentEndereco,
            ensinotrabalhado: currentValue,
            nome: currentNome,
            telefone: currentTelefone,
        })
            .then(function (response) {
                showAlert();
                setCurrentEndereco('');
                setCurrentNome('');
                setCurrentTelefone('');
                setCurrentValue('Escolha uma opção: ')

                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error)
                console.log(error.response.data)
                showAlertErro(error.response.data)
            });

    }

    return (

        <View style={styles.container}>

            <Icon
                containerStyle={{ alignSelf: 'flex-start', marginLeft: 30 }}
                name="arrow-back"
                type="material"
                size={40}
                color='#B088F7'
                onPress={() => {
                    navigation.navigate('Menu Administrador');
                }}
            ></Icon>

            <Text style={{ color: '#2A3A4E', fontWeight: 'bold', fontSize: 30, marginBottom: 15, marginTop: 20, marginLeft: 30 }}>Cadastrar Escola</Text>

            <Text style={styles.inputTextName}>Nome:</Text>
            <TextInput
                value={currentNome}
                onChangeText={(value) => {
                    setCurrentNome(value);
                }}
                style={styles.input}
                placeholder="Digite o nome da instituição"
            />

            <Text style={styles.inputTextName}>Telefone:</Text>
            <TextInput
                value={currentTelefone}
                onChangeText={(value) => {
                    setCurrentTelefone(value);
                }}
                style={styles.input}
                keyboardType="phone-pad"
                placeholder="Digite o telefone"
            />

            <Text style={styles.inputTextName}>Endereço</Text>
            <TextInput
                value={currentEndereco}
                onChangeText={(value) => {
                    setCurrentEndereco(value);
                }}
                style={styles.input}
                placeholder="Endereço completo"
            />

            <Text style={styles.inputTextName}>Ensino trabalhado</Text>
            
            <Select
                currentValue={currentValue}
                items={['Ensino Fundamental', 'Ensino Médio']}
                return={'Cadastrar Escola'}
                boxWidth={Dimensions.get('screen').width*0.9}
                boxHeight={200}
            >
            </Select>


            <TouchableOpacity style={styles.botao} title="Show alert" onPress={postEscolaData}>
                <Text style={styles.textoBotao}> Cadastrar Escola</Text>

            </TouchableOpacity>


        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffFFF',
    },
    botao: {
        alignSelf: 'center',
        marginTop: 80,
        width: 320,
        height: 52,
        backgroundColor: '#B38DF7',
        marginTop: 10,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textoBotao: {
        color: "#FFFFFF",
        fontSize: 18,
    },
    inputTextName: {
        width: 250,
        color: '#914FF7',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 40,
        marginRight: 40,
    },
    input: {
        paddingTop: 10,
        paddingBottom: 5,
        marginBottom: 30,
        marginLeft: 40,
        marginRight: 40,
        width: 300,
        fontSize: 18,
        fontWeight: 'bold',
        borderBottomWidth: 2,
        borderBottomColor: '#E9E9E9',
    },
});