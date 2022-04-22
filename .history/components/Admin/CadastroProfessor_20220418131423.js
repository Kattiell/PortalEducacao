import React, { Component, useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimension, Picker, Dimensions } from 'react-native';
import axios from 'axios';
import { Icon } from 'react-native-elements';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { ScrollView } from 'react-native-gesture-handler';
import ipv4 from 'PortalEducacaoBack/ipv4.json';
import Select from '../layout-components/Select/Select';
import {DialogBox} from './../layout-components/DialogBox';


export default function CadastroProfessor() {

    const navigation = useNavigation();
    const route = useRoute();
    const baseUrl = "http://"+ipv4.ip+":3000/professores";
    const [currentNome, setCurrentNome] = useState('');
    const [currentEmail, setCurrentEmail] = useState('');
    const [currentTelefone, setCurrentTelefone] = useState('');
    const [currentEndereco, setCurrentEndereco] = useState('');//Criar validação de campo vazio 
    const [currentFormacao, setCurrentFormacao] = useState('');
    const [currentNascimento, setCurrentNascimento] = useState('');
    const [selectedEnsino, setSelectedEnsino] = useState('Selecione o ensino');
    const [selectedSexo, setSelectedSexo] = useState("Selecione o sexo");
    const [selectedDisciplina, setSelectedDisciplina] = useState('Selecione a disciplina');

    useEffect(()=>{
        if(route.params?.selectedValue && route.params?.label){
           switch (route.params.label) {
               case 'Sexo':
                   setSelectedSexo(route.params.selectedValue)
                   break;

                case 'Disciplina':
                    setSelectedDisciplina(route.params.selectedValue)
                    break;
           
                case 'Ensino':
                    setSelectedEnsino(route.params.selectedValue)
                    break;

               default:
                   break;
           }
        }
    });


    // Informe da cadastro bem sucedido
    const showAlert = () =>
        Alert.alert(
            "Sucesso!",
            "Professor Cadastrado com Sucesso",
            [
                {
                    text: "Fechar",
                    style: "Fechar",
                },
            ],
        );

    // Informe de erro nos dados
    function showAlertErro(listErrors){
        let erros = "Erro com os Dados\n\n";
        listErrors['error'].map((err)=>{
            erros += "\n->" + err;
        });

        Alert.alert(    
            "Ocorreu um Erro!",
            erros,
            [
                {
                    text: "Fechar",
                    style: "color:'#FFFFFF'",
                },
            ],
        );
    }
    const postProfessorData = async () => {

        // Envia requisição POST
        await axios.post(baseUrl, {
            nome: currentNome,
            telefone: currentTelefone,
            datadenascimento: currentNascimento, 
            formacao: currentFormacao,
            endereco: currentEndereco,
            sexo: selectedSexo,
            disciplinaatrabalhar: selectedDisciplina,
            ensinotrabalhado: selectedEnsino,
            email: currentEmail,
        })
            .then(function (response) {
                showAlert();
                setCurrentNome('');
                setCurrentEmail('');
                setCurrentNascimento('');
                setCurrentTelefone('');
                setCurrentFormacao('');
                setCurrentEndereco('');
                setSelectedDisciplina('Selecione a disciplina');
                setSelectedEnsino('Selecione o ensino');
                setSelectedSexo('Selecione o sexo');

                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error)
                console.log(error.response.data)
                showAlertErro(error.response.data)
            });

    }


    return (

        <ScrollView>
            
             <Icon
                containerStyle={{ alignSelf: 'flex-start', marginLeft: 30 }}
                name="arrow-back"
                type="material"
                size={40}
                color='#B088F7'
                onPress={() => {
                    setCurrentNome('');
                    setCurrentEmail('');
                    setCurrentNascimento('');
                    setCurrentTelefone('');
                    setCurrentFormacao('');
                    setCurrentEndereco('');
                    setSelectedDisciplina('Selecione a disciplina');
                    setSelectedEnsino('Selecione o ensino');
                    setSelectedSexo('Selecione o sexo');
                    navigation.navigate('Menu Administrador');
                }}
            ></Icon>

            <View style={styles.container}>
            <Text style={{ color: '#2A3A4E', fontWeight: 'bold', fontSize: 30, marginBottom: 15, marginTop: 20, marginLeft: 30 }}>Cadastrar Professor</Text>

            <Text style={styles.inputTextName}>Nome completo:</Text>
            <TextInput
                value={currentNome}
                onChangeText={(value) => {
                    setCurrentNome(value);
                }}
                style={styles.input}
                placeholder="Digite o nome do professor"
            />

            <Text style={styles.inputTextName}>E-mail:</Text>
            <TextInput
                value={currentEmail}
                onChangeText={(value) => {
                    setCurrentEmail(value);
                }}
                style={styles.input}
                placeholder="Digite o seu e-mail"
            />

            <Text style={styles.inputTextName}>Telefone:</Text>
            <TextInput
                value={currentTelefone}
                onChangeText={(value) => {
                   setCurrentTelefone(value);
                }}
                style={styles.input}
                keyboardType="phone-pad"
                placeholder="Digite o numero de Telefone    "
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


            <Text style={styles.inputTextName}>Data de nascimento:</Text>
            <TextInput
                value={currentNascimento}
                onChangeText={(value) => {
                    setCurrentNascimento(value);
                }}
                style={styles.input}
                placeholder="Data de nascimento"
            />

            <Text style={styles.inputTextName}>Sexo:</Text>
            <Select
                label={'Sexo'}
                currentValue={selectedSexo}
                items={['Masculino', 'Feminino']}
                return={'Cadastrar Professor'}
                boxWidth={Dimensions.get('screen').width*0.9}
                boxHeight={200}
            >
            </Select>

            <Text style={styles.inputTextName}>Disciplina a trabalhar</Text>
            
            <Select
                label={'Disciplina'}
                currentValue={selectedDisciplina}
                items={['Artes', 'Biologia','Educação Física','Geografia','História','Inglês','Língua Portuguesa','Matemática','Química','Física','Ciências']}
                return={'Cadastrar Professor'}
                boxWidth={Dimensions.get('screen').width*0.9}
                boxHeight={400}
            >
            </Select>

            <Text style={styles.inputTextName}>Formação Acadêmica:</Text>
            <TextInput
                value={currentFormacao}
                onChangeText={(value) => {
                    setCurrentFormacao(value);
                }}
                style={styles.input}
                placeholder="Digite a sua formação"
            />

            <Text style={styles.inputTextName}>Ensino a trabalhar</Text>
            <Select
                label={'Ensino'}
                currentValue={selectedEnsino}
                items={['Ensino Fundamental','Ensino Médio']}
                return={'Cadastrar Professor'}
                boxWidth={Dimensions.get('screen').width*0.9}
                boxHeight={200}
            >
            </Select>

            <TouchableOpacity style={styles.botao} title="Show alert" onPress={postProfessorData}>
                <Text style={styles.textoBotao}> Cadastrar Professor</Text>
            </TouchableOpacity>

        </View>
        </ScrollView>
        
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
        marginBottom: 15,
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
        marginBottom: 15,
        marginLeft: 40,
        marginRight: 40,
        width: 300,
        fontSize: 18,
        fontWeight: 'bold',
        borderBottomWidth: 2,
        borderBottomColor: '#E9E9E9',
    },
});