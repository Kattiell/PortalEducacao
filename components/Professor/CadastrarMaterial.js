import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput,  KeyboardAvoidingView } from "react-native";
import DialogBox from "../layout-components/DialogBox";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import Select from "../layout-components/Select/Select";
import React, { useState, useEffect } from 'react';

const CadastrarMaterial = (props) => {

    useEffect(() => {
        if (route.params?.selectedValue && route.params?.label) {
            switch (route.params.label) {
                case 'Disciplina':
                    setSelectedDisciplina(route.params.selectedValue)
                    break;

                case 'Turma':
                    setSelectedTurma(route.params.selectedValue)
                    break;

                default:
                    break;
            }
        }
    });

    const Drawer = createDrawerNavigator();
    const route = useRoute();
    const navigation = useNavigation();
    const [selectedDisciplina, setSelectedDisciplina] = useState('Selecione a disciplina');
    const [SelectedTurma, setSelectedTurma] = useState('Selecione a Turma');
    const [currentNome, setCurrentNome] = useState(''); //Criar validação de campo vazio 
    const [currentNomeDesc, setCurrentNomeDesc] = useState('');
    return (
        <View
            style={styles.container}>
            

  
            <DialogBox width={415} height={530} >
                <Text style={styles.inputTextName}>Nomeie o Material e de sua Descrição</Text>
                <TextInput
                    value={currentNome}
                    onChangeText={(value) => {
                        setCurrentNome(value);
                    }}
                    style={styles.input}
                    placeholder="Digite o nome da Materia:"
                />
                <TextInput
                    value={currentNomeDesc}
                    onChangeText={(value) => {
                        setCurrentNomeDesc(value);
                    }}
                    style={styles.input}
                    placeholder="Digite a descrição do Material:"
                />
                <Select
                    label={'Disciplina'}
                    currentValue={selectedDisciplina}
                    items={['Artes', 'Biologia', 'Educação Física', 'Geografia', 'História', 'Inglês', 'Língua Portuguesa', 'Matemática', 'Química', 'Física', 'Ciências']}
                    return={'Cadastrar Material'}
                    boxWidth={Dimensions.get('screen').width * 0.5}
                    boxHeight={400}
                >
                </Select>
                <Select
                    label={'Turma'}
                    currentValue={SelectedTurma}
                    items={['101', '201', '301']}
                    return={'Cadastrar Material'}
                    boxWidth={Dimensions.get('screen').width * 0.9}
                    boxHeight={400}
                >
                </Select>
                <TouchableOpacity style={styles.botao} >
                    <Text style={styles.botaoText}>Importar Arquivo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botao2} >
                    <Text style={styles.botaoText}>Salvar</Text>
                </TouchableOpacity>

            </DialogBox>
          
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(240, 232, 245, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    botao: {
        width: 174,
        height: 36,
        backgroundColor: '#B38DF7',
        marginBottom: 18,
        marginLeft: 43,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    botao2:{
        width: 100,
        height: 36,
        backgroundColor: '#B38DF7',
        marginBottom: 0,
        marginLeft: 423,
        borderRadius: 5,
        marginLeft: 10,       
        marginRight: 30,
        top: -6,
        left: 0,
        alignSelf: "flex-end",
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    botaoText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff'
    },
    inputTextName: {
        width: 250,
        color: '#914FF7',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 40,
        marginRight: 40,
        alignItems: "center"
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

export default CadastrarMaterial;