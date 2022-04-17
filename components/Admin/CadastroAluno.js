import React, { Component, useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimension, Picker } from 'react-native';
import axios from 'axios';
import { Icon } from 'react-native-elements';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { ScrollView } from 'react-native-gesture-handler';
import ipv4 from 'PortalEducacaoBack/ipv4.json';

export default function CadastroAluno() {

    const navigation = useNavigation();
    const baseUrl = "http://"+ipv4.ip+":3000/aluno";
    const [currentNome, setCurrentNome] = useState('');
    const [currentCPF, setCurrentCPF] = useState('');
    const [currentRG, setCurrentRG] = useState('');
    const [currentOrgaoEmissor, setCurrentOrgaoEmissor] = useState('');
    const [currentNascimento, setCurrentNascimento] = useState('');

    const [selectedValue, setSelectedValue] = useState("");

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

    const postAlunoData = async () => {

        // Envia requisição POST
        await axios.post(baseUrl, {
            nome: currentNome,
            cpf: currentCPF,
            rg: currentRG,
            orgaoEmissor: currentOrgaoEmissor,
            dataNascimento: currentNascimento, 
            sexo: selectedValue,
            serie: selectedValue,
            turma: selectedValue,
        })
            .then(function (response) {
                showAlert();
                // Limpa campos após cadastro
                setCurrentNome('');
                setCurrentCPF('');
                setCurrentRG('');
                setCurrentOrgaoEmissor('');
                setCurrentNascimento('');
                console.log(response.data);
            })
            .catch(function (e) {
                console.log(e)
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

            <Text style={styles.inputTextName}>CPF:</Text>
            <TextInput
                value={currentCPF}
                onChangeText={(value) => {
                    setCurrentCPF(value);
                }}
                style={styles.input}
                keyboardType="phone-pad"
                placeholder="Digite o CPF"
            />

            <Text style={styles.inputTextName}>RG:</Text>
            <TextInput
                value={currentRG}
                onChangeText={(value) => {
                    setCurrentRG(value);
                }}
                style={styles.input}
                keyboardType="phone-pad"
                placeholder="Digite o RG"
            />

            <Text style={styles.inputTextName}>Orgão emissor:</Text>
            <TextInput
                value={currentOrgaoEmissor}
                onChangeText={(value) => {
                    setCurrentOrgaoEmissor(value);
                }}
                style={styles.input}
                placeholder="Digite o orgão emissor"
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

            <Text style={styles.inputTextName}>Sexo</Text>
            <Picker
                selectedValue={selectedValue}
                style={{ height: 50, width: 300, marginLeft: 35, color: "#696969", fontSize: 40 }}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}

            >
                <Picker.Item key={0} label="Feminino" value="Feminino"></Picker.Item>
                <Picker.Item key={1} label="Masculino" value="Masculino"></Picker.Item>
            </Picker>

            <Text style={styles.inputTextName}>Estado civil</Text>
            <Picker
                selectedValue={selectedValue}
                style={{ height: 50, width: 300, marginLeft: 35, color: "#696969", fontSize: 40 }}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}

            >
                <Picker.Item key={0} label="Solteiro" value="Solteiro"></Picker.Item>
                <Picker.Item key={1} label="Casado" value="Casado"></Picker.Item>
                <Picker.Item key={2} label="Divorciado" value="Divorciado"></Picker.Item>
            </Picker>

            <Text style={styles.inputTextName}>Série</Text>
            <Picker
                selectedValue={selectedValue}
                style={{ height: 50, width: 300, marginLeft: 35, color: "#696969", fontSize: 40 }}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}

            >
                <Picker.Item key={0} label="1° Ano" value="1° Ano"></Picker.Item>
                <Picker.Item key={1} label="2° Ano" value="2° Ano"></Picker.Item>
                <Picker.Item key={2} label="3° Ano" value="3° Ano"></Picker.Item>
                <Picker.Item key={3} label="4° Ano" value="4° Ano"></Picker.Item>
                <Picker.Item key={4} label="5° Ano" value="5° Ano"></Picker.Item>
                <Picker.Item key={5} label="6° Ano" value="6° Ano"></Picker.Item>
            </Picker>

            <Text style={styles.inputTextName}>Turma</Text>
            <Picker
                selectedValue={selectedValue}
                style={{ height: 50, width: 300, marginLeft: 35, color: "#696969", fontSize: 40 }}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}

            >
                <Picker.Item key={0} label="A" value="A"></Picker.Item>
                <Picker.Item key={1} label="B" value="B"></Picker.Item>
                <Picker.Item key={2} label="C" value="C"></Picker.Item>
            </Picker>

            <TouchableOpacity style={styles.botao} title="Show alert" onPress={postAlunoData}>
                <Text style={styles.textoBotao}> Cadastrar Aluno</Text>

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