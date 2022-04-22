import React, { Component, useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimension, Picker } from 'react-native';
import axios from 'axios';
import { Icon } from 'react-native-elements';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { ScrollView } from 'react-native-gesture-handler';
import ipv4 from 'PortalEducacaoBack/ipv4.json';
import Select from '../layout-components/Select/Select';


export default function CadastroProfessor() {

    const navigation = useNavigation();
    const baseUrl = "http://"+ipv4.ip+":3000/professor";
    const [currentNome, setCurrentNome] = useState('');
    const [currentEmail, setCurrentEmail] = useState('');
    const [currentTelefone, setCurrentTelefone] = useState('');
    const [currentEndereco, setCurrentEndereco] = useState('');//Criar validação de campo vazio 
    const [currentFormacao, setCurrentFormacao] = useState('');
    const [currentNascimento, setCurrentNascimento] = useState('');

    const [selectedEnsino, setSelectedEnsino] = useState("");
    const [selectedSexo, setSelectedSexo] = useState("");
    const [selectedDisciplina, setSelectedDisciplina] = useState("");

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
                // Limpa campos após cadastro
                setCurrentNome('');
                setCurrentEmail('');
                setCurrentNascimento('');
                setCurrentTelefone('');
                setCurrentFormacao('');
                setCurrentEndereco('');

                console.log(response.data);
            })
            .catch(function (error) {
                showAlertErro()
                console.log(error)
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

            <Select
                currentValue={currentValue}
                items={['Ensino Fundamental', 'Ensino Médio']}
                return={'Cadastrar Escola'}
                boxWidth={Dimensions.get('screen').width*0.9}
                boxHeight={200}
            >
            </Select>

            <Text style={styles.inputTextName}>Sexo</Text>
            <Picker
                selectedValue={selectedSexo}
                style={{ height: 50, width: 300, marginLeft: 35, color: "#696969", fontSize: 40 }}
                onValueChange={(itemValue, itemIndex) => setSelectedSexo(itemValue)}

            >
                <Picker.Item key={0} label="Feminino" value="Feminino"></Picker.Item>
                <Picker.Item key={1} label="Masculino" value="Masculino"></Picker.Item>
            </Picker>

            <Text style={styles.inputTextName}>Disciplina a trabalhar</Text>
            <Picker
                selectedValue={selectedDisciplina}
                style={{ height: 50, width: 300, marginLeft: 35, color: "#696969", fontSize: 40 }}
                onValueChange={(itemValue, itemIndex) => setSelectedDisciplina(itemValue)}

            >
                <Picker.Item key={0} label="Artes" value="Artes"></Picker.Item>
                <Picker.Item key={1} label="Biologia" value="Biologia"></Picker.Item>
                <Picker.Item key={2} label="Educação Fisica" value="Educação Fisica"></Picker.Item>
                <Picker.Item key={3} label="Geográfia" value="Geografia"></Picker.Item>
                <Picker.Item key={4} label="História" value="Historia"></Picker.Item>
                <Picker.Item key={5} label="Inglês" value="Ingles"></Picker.Item>
                <Picker.Item key={6} label="Língua Portuguesa" value="Lingua Portuguesa"></Picker.Item>
                <Picker.Item key={7} label="Matemática" value="Matematica"></Picker.Item>
                <Picker.Item key={8} label="Quimica" value="Quimica"></Picker.Item>
                <Picker.Item key={9} label="Fisica" value="Fisica"></Picker.Item>

            </Picker>

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
            <Picker
                selectedValue={selectedEnsino}
                style={{ height: 50, width: 300, marginLeft: 35, color: "#696969", fontSize: 40 }}
                onValueChange={(itemValue, itemIndex) => setSelectedEnsino(itemValue)}

            >
                <Picker.Item key={0} label="Ensino Fundamental" value="Ensino Fundamental"></Picker.Item>
                <Picker.Item key={1} label="Ensino Médio" value="Ensino Medio"></Picker.Item>
            </Picker>

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