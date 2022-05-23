import React, { Component, useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions, Picker } from 'react-native';
import axios from 'axios';
import { Icon } from 'react-native-elements';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { ScrollView } from 'react-native-gesture-handler';
import ipv4 from 'PortalEducacaoBack/ipv4.json';
import Select from '../layout-components/Select/Select';
import TermoResponsabilidade from './TermoResponsabilidade';

export default function CadastroAluno() {

    const navigation = useNavigation();
    const route = useRoute();
    const baseUrl = "http://" + ipv4.ip + ":3000/alunos";
    const [currentNome, setCurrentNome] = useState('');
    const [currentNomeReponsavel, setCurrentNomeResponsavel] = useState('');
    const [currentCPF, setCurrentCPF] = useState('');
    const [currentTelefone, setCurrentTelefone] = useState('');
    const [currentEndereco, setCurrentEndereco] = useState('');
    const [currentNascimento, setCurrentNascimento] = useState('');
    const [currentEmail, setCurrentEmail] = useState('');
    const [currentGeneratP, setCurrentGenerateP] = useState('');
    const [selectedSexo, setSelectedSexo] = useState("Selecione seu genêro");
    const [selectedTurma, setSelectedTurma] = useState("Selecione a sua Turma");


    useEffect(() => {
        if (route.params?.selectedValue && route.params?.label) {
            switch (route.params.label) {
                case 'Sexo':
                    setSelectedSexo(route.params.selectedValue)
                    break;

                case 'Turma':
                    setSelectedTurma(route.params.selectedValue)
                    break;

                default:
                    break;
            }
        }
        if (route.params?.agree != undefined) {
            postAlunoData();
            route.params.agree = undefined;
        } else () => { }
    });

    const showAlert = () =>
        Alert.alert(
            "Sucesso!",
            "Aluno Cadastrado com Sucesso",
            [
                {
                    text: "Fechar",
                    style: "Fechar",
                },
            ],
        );

    function showAlertErro(listErrors) {
        let erros = "Erro com os Dados\n\n";
        listErrors['error'].map((err) => {
            erros += "\n->  " + err + ".";
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

    function generateP() {
        var pass = '';
        var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
            'abcdefghijklmnopqrstuvwxyz0123456789@#$';

        for (let i = 1; i <= 8; i++) {
            var char = Math.floor(Math.random()
                * str.length + 1);

            pass += str.charAt(char)
        }
        return pass;
    }


    const postAlunoData = async () => {

        // Envia requisição POST
        await axios.post(baseUrl, {
            nomedoaluno: currentNome,
            endereco: currentEndereco,
            email: currentEmail,
            telefone: currentTelefone,
            datadenascimento: currentNascimento,
            nomedoresponsavel: currentNomeReponsavel,
            cpfresponsavel: currentCPF,
            sexo: selectedSexo,
            turma: selectedTurma,
        }).then(function (response) {
            showAlert();
            // Limpa campos após cadastro
            setCurrentNome('');
            setCurrentNomeResponsavel('');
            setCurrentTelefone('');
            setCurrentEndereco('');
            setCurrentNascimento('');
            setCurrentCPF('');
            setCurrentEmail('');
            setSelectedSexo('Selecione seu genêro');
            setSelectedTurma('Seleciona a sua Turma');

            console.log(response.data);
        }).catch(function (error) {
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
                    setCurrentNomeResponsavel('');
                    setCurrentTelefone('');
                    setCurrentEndereco('');
                    setCurrentNascimento('');
                    setCurrentCPF('');
                    setCurrentEmail('');
                    setCurrentGenerateP('');
                    setSelectedSexo('Selecione seu genêro');
                    setSelectedTurma('Seleciona a sua Turma');
                    navigation.navigate('Menu Administrador');
                }}
            ></Icon>

            <View style={styles.container}>
                <Text style={{ color: '#2A3A4E', fontWeight: 'bold', fontSize: 30, marginBottom: 15, marginTop: 20, marginLeft: 30 }}>Cadastrar Aluno</Text>

                <Text style={styles.inputTextName}>Nome completo:</Text>
                <TextInput
                    value={currentNome}
                    onChangeText={(value) => {
                        setCurrentNome(value);
                    }}
                    style={styles.input}
                    placeholder="Digite o nome do aluno"
                />
                <Text style={styles.inputTextName}>Telefone:</Text>
                <TextInput
                    value={currentTelefone}
                    onChangeText={(value) => {
                        setCurrentTelefone(value);
                    }}
                    style={styles.input}
                    keyboardType="phone-pad"
                    placeholder="Digite o numero de Telefone"
                />

                <Text style={styles.inputTextName}>Endereço:</Text>
                <TextInput
                    value={currentEndereco}
                    onChangeText={(value) => {
                        setCurrentEndereco(value);
                    }}
                    style={styles.input}
                    placeholder="Endereço completo"
                />

                <Text style={styles.inputTextName}>E-mail do Aluno:</Text>
                <TextInput
                    value={currentEmail}
                    onChangeText={(value) => {
                        setCurrentEmail(value);
                    }}
                    style={styles.input}
                    placeholder="Digite o e-mail do Aluno"
                />

                <Text style={styles.inputTextName}>Data de nascimento:</Text>
                <TextInput
                    value={currentNascimento}
                    onChangeText={(value) => {
                        setCurrentNascimento(value);
                    }}
                    style={styles.input}
                    placeholder="Data de nascimento do Aluno"
                />

                <Text style={styles.inputTextName}>Nome Do Resposanvel:</Text>
                <TextInput
                    value={currentNomeReponsavel}
                    onChangeText={(value) => {
                        setCurrentNomeResponsavel(value);
                    }}
                    style={styles.input}
                    placeholder="Digite o nome do responsavel"
                />

                <Text style={styles.inputTextName}>CPF Do Resposanvel:</Text>
                <TextInput
                    value={currentCPF}
                    onChangeText={(value) => {
                        setCurrentCPF(value);
                    }}
                    style={styles.input}
                    keyboardType="phone-pad"
                    placeholder="Digite o CPF"
                />


                <Text style={styles.inputTextName}>Gênero:</Text>
                <Select
                    label={'Sexo'}
                    currentValue={selectedSexo}
                    items={['Masculino', 'Feminino']}
                    return={'Cadastrar Aluno'}
                    boxWidth={Dimensions.get('screen').width * 0.9}
                    boxHeight={200}
                >
                </Select>

                <Text style={styles.inputTextName}>Turma:</Text>
                <Select
                    label={'Turma'}
                    currentValue={selectedTurma}
                    items={['101', '201', '301', '401', '501']}
                    return={'Cadastrar Aluno'}
                    boxWidth={Dimensions.get('screen').width * 0.9}
                    boxHeight={300}
                >
                </Select>

                <TouchableOpacity style={styles.botao} title="Show alert" onPress={() => {
                    navigation.navigate('TermoDeDados', {
                        nomeDoResponsavel: currentNomeReponsavel,
                        cpfResponsavel: currentCPF,
                        nomeAluno: currentNome,
                    })
                }}>
                    <Text style={styles.textoBotao}> Cadastrar Aluno </Text>

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