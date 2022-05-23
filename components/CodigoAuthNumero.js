import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput} from "react-native";
import DialogBox from "./layout-components/DialogBox";
import React, { useState } from 'react';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
export default function AuthCodigoScreen(){
    
    const navigation = useNavigation();
    const [currentCodigo, setCurrentCodigo] = useState(''); //Criar validação de campo vazio 
    
    return (
        <View
            style={styles.container}>
            
             <DialogBox width={415} height={330} >
                <Text style={styles.inputTextName}>Informe o Codigo enviado via SMS</Text>
                
                <TextInput
                    value={currentCodigo}
                    onChangeText={(value) => {
                        setCurrentCodigo(value);
                    }}
                    style={styles.input}
                    placeholder="Digite o codigo enviado para você:"
                />                            
                <TouchableOpacity style={styles.botao2}>
                    <Text style={styles.botaoText} onPress={() => {navigation.navigate('AdminScreen');
                }}>Salvar</Text>
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
        marginBottom: 10,
        marginLeft: 40,
        marginRight: 40,
        width: 300,
        fontSize: 18,
        fontWeight: 'bold',
        borderBottomWidth: 2,
        borderBottomColor: '#E9E9E9',
    },
});

// export default PostarAtividade;