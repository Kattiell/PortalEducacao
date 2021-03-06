import { View, Text, StyleSheet, TextInput, Dimensions, TouchableOpacity, Alert } from "react-native";
import axios from 'axios';
import { Icon } from 'react-native-elements';
import { useNavigation, useRoute } from "@react-navigation/native";
import Select from "../layout-components/Select/Select";
import { useEffect, useState } from "react";
import ipv4 from 'PortalEducacaoBack/ipv4.json';
import React from "react";



export default function CadastrarTurma(props) {

    useEffect(() => {

        if (route.params?.selectedValue && route.params?.label) {
            switch (route.params.label) {
                case 'ensino':
                    setCurrentValueEnsino(route.params.selectedValue);
                    break;

                case 'escola':
                    setCurrentValueEscola(route.params.selectedValue)
                    break;

                default:
                    break;
            }
        }

    });

    useEffect(() => {
        listEscola();
    }, []);

    const listEscola = async () => {
        var baseUrl = "http://" + ipv4.ip + ":3000/escola";
        await axios.get(baseUrl).then((response) => {
            setListEscolas(response.data);
        });
        return listEscolas;
    }


    const showAlert = () =>
        Alert.alert(
            "Sucesso!",
            "Turma Cadastrada com Sucesso",
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

    const postTurmaData = async () => {
        // Envia requisição POST
        await axios.post(baseUrl, {
            numeroTurma: currentNome,
            ensino: currentValueEnsino,
            horarios: horariosInfo,
            escola: currentValueEscola,
        })
            .then(function (response) {
                showAlert();
                setCurrentValueEnsino('Escolha uma opção: ')
                setCurrentNome(''),
                    console.log(response.data);
            })
            .catch(function (error) {
                showAlertErro()
                console.log(error)
            });

    }


    const baseUrl = "http://" + ipv4.ip + ":3000/turmas";
    const [currentNome, setCurrentNome] = useState('');
    const [currentValueEnsino, setCurrentValueEnsino] = useState("Escolha uma opção: ");
    const [listEscolas, setListEscolas] = useState('-');
    const [currentValueEscola, setCurrentValueEscola] = useState('Selecione uma escola:')
    const navigation = useNavigation();
    const route = useRoute();
    let horariosInfo = {
        segunda: ['', '', '', '', ''],
        terca: ['', '', '', '', ''],
        quarta: ['', '', '', '', ''],
        quinta: ['', '', '', '', ''],
        sexta: ['', '', '', '', ''],
    };



    return (
        <View>
            <Icon
                containerStyle={{ alignSelf: 'flex-start', marginLeft: 30 }}
                name="arrow-back"
                type="material"
                size={40}
                color='#B088F7'
                onPress={() => {
                    navigation.goBack();
                }}
            ></Icon>

            <Text style={{ color: '#2A3A4E', fontWeight: 'bold', fontSize: 30, marginBottom: 15, marginTop: 20, marginLeft: 30 }}>Cadastrar Turma</Text>

            <Text style={styles.inputTextName}>Nome Turma:</Text>
            <TextInput
                value={currentNome}
                onChangeText={(value) => {
                    setCurrentNome(value);
                }}
                style={styles.input}
                placeholder="Digite o nome da turma"
            />


            <Text style={styles.inputTextName}>Ensino:</Text>
            <Select
                currentValue={currentValueEnsino}
                items={['Ensino Fundamental', 'Ensino Médio',]}
                return={'Cadastrar Turma'}
                boxWidth={Dimensions.get('screen').width * 0.9}
                boxHeight={200}
                label={'ensino'}
            >
            </Select>

            <Text style={styles.inputTextName}>Escola:</Text>
            <Select
                currentValue={currentValueEscola}
                items={listEscolas == null ? listEscolas() : listEscolas}
                return={'Cadastrar Turma'}
                boxWidth={Dimensions.get('screen').width * 0.9}
                boxHeight={350}
                label={'escola'}
            >
            </Select>


            <TouchableOpacity style={styles.botao} title="Show alert" onPress={postTurmaData}>
                <Text style={styles.textoBotao}> Cadastrar Turma</Text>
            </TouchableOpacity>

        </View>
    )
}



const styles = StyleSheet.create({
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
});