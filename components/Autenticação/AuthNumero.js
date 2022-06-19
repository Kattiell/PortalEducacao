// import React, { Component, useState, useEffect } from 'react';
// import { Alert, StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
// import axios from 'axios';
// import { Icon } from 'react-native-elements';
// import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
// import 'react-native-gesture-handler';
// import { ScrollView } from 'react-native-gesture-handler';



// export default function PhoneScreen() {

//     const navigation = useNavigation();
//     const [currentTelefone, setCurrentTelefone] = useState('');

//     return (
//         <View style={styles.container}>
//             <Icon
//                 containerStyle={{ alignSelf: 'flex-start', marginTop: 50, marginLeft: 20, }}
//                 name="arrow-back"
//                 type="material"
//                 size={40}
//                 color='#B088F7'
//                 onPress={() => {
//                     navigation.navigate('login');
//                 }}
//             ></Icon>
//             <Text style={{ alignSelf: 'flex-start', color: '#2A3A4E', fontWeight: 'bold', fontSize: 30, marginLeft: 25, marginBottom: 70, paddingTop: 20, }}>Autenticar Numero de Telefone</Text>
//             <Text style={styles.inputTextName}>Informe o seu numero de Telefone:</Text>
//             <TextInput
//                 value={currentTelefone}
//                 onChangeText={(value) => {
//                     setCurrentTelefone(value);
//                 }}
//                 style={styles.input}
//                 keyboardType="phone-pad"
//                 placeholder="Digite o numero de Telefone"
//             />


//             <TouchableOpacity style={styles.botao}
//                 onPress={() => {
//                     //AutenticaSMS()
//                     navigation.navigate('AuthCodigoScreen')
//                 }}>
//                 <Text style={styles.textoBotao}> Enviar Solicitação</Text>
//             </TouchableOpacity>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fffFFF',
//     },
//     botao: {
//         alignSelf: 'center',
//         marginTop: 80,
//         width: 320,
//         height: 52,
//         backgroundColor: '#B38DF7',
//         marginTop: 10,
//         marginBottom: 15,
//         borderRadius: 4,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     textoBotao: {
//         color: "#FFFFFF",
//         fontSize: 18,
//     },
//     inputTextName: {
//         width: 250,
//         color: '#914FF7',
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginLeft: 40,

//     },
//     input: {
//         paddingTop: 10,
//         paddingBottom: 5,
//         marginBottom: 15,
//         marginLeft: 40,
//         marginRight: 40,
//         width: 300,
//         fontSize: 18,
//         fontWeight: 'bold',
//         borderBottomWidth: 2,
//         borderBottomColor: '#E9E9E9',
//     },
//     botaoText: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: '#fff'
//     },
//     forgetPass: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: '#ACA6B2',
//     }
// });