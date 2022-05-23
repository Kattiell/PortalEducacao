import React, {Component,useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import Esqueceu_Senha from './Esqueceu_Senha';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { signInWithEmailAndPassword, auth } from '../firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {YellowBox} from 'react-native';
import ProfScreen from './Professor/index';
import ipv4 from 'PortalEducacaoBack/ipv4.json'; 
import axios from 'axios';

export default function LoginProf(props) {

  const [typeIcon, setTypeIcon] = useState('visibility');
  const [secureState, setSecureState] = useState(true);
  const navigation = useNavigation();
  const [emailState, setemailState] = useState('');
  const [senhaState, setsenhaState] = useState('');
  const baseUrl = "http://" + ipv4.ip + ":3000/role";

  //Visibilidade da senha
  function changeIcon(iconName){
    if(iconName == 'visibility'){
      setTypeIcon('visibility-off');
      changeSecure();
    } 
    else{
      setTypeIcon('visibility');
      changeSecure();
    }
    
  }

  function valueSenha(valueSenha){
    setsenhaState(valueSenha)
  }
  function valueEmail(valueEmail){
    setemailState(valueEmail)
  }


  async function login(){
    let signIn = false;
    if((emailState, senhaState) !== '')
    await signInWithEmailAndPassword(auth, emailState, senhaState)
      .then((userCredential) => {
        const user = userCredential.user;
        signIn = true;
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });  

      if(signIn){
        const willNavigate = await verifyUser();
        if(willNavigate) navigation.navigate('profscreen');
      }

  }

  async function getId(){
    let usuario = '';
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        usuario = user.uid;
      }
    }).bind(()=>{
      console.log('deu');
    })
    return usuario;
    
  }

  const verifyUser = async () =>{
    const auth = getAuth();
    let role = '';
    let usuario = await getId();

    console.log(usuario);


    const r = await axios.post(baseUrl,{
        userid:usuario
    }).then(function(response){
        return response.data;
    }).then(function(response){
        role = response;
    }).catch(function(err){
        console.log(err);
    })
    
    if(role == 'prof') return true
    else return false;
    
  }

  function changeSecure(){
    if(secureState == true) setSecureState(false)
    else setSecureState(true);
  }
  YellowBox.ignoreWarnings(['Warning: Async Storage has been extracted from react-native core']);
  
  return (
    
    <View style={styles.container}>
        
      <Image
       source={props.logo}   
       style={styles.logo}
      />


   <Text style={styles.title}>Faça o seu Login como Professor</Text>    
      
      <Text style={styles.inputTextName}>E-mail</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu E-mail"
         onChangeText={(value) => {valueEmail(value)}}
      />
    
    
      <View>
        <Text style={styles.inputTextName}>Senha</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={secureState}
            placeholder="Digite sua senha"
            onChangeText={(value) => {valueSenha(value)}}
          />
          <View style={{position: 'absolute', top:35, right:15,}}>
            <Icon
              name={typeIcon}
              type='material'
              size={28}
              color='#D1D6DB'
              onPress={() => changeIcon(typeIcon)}  

              >
            </Icon>
          </View> 

      </View>
     

      <TouchableOpacity 
        style={styles.botao}
        // Onpress() temporário para teste
        onPress={() =>{
            login();
        }}>
        <Text style={styles.botaoText}>Login</Text>
      </TouchableOpacity>
   
      <View style={{flexDirection:'row', justifyContent:'flex-start', width:300, paddingTop:30}}>
        <Text style={styles.forgetPass} onPress={() => navigation.navigate('Esqueceu_senha')}>Esqueceu sua senha? </Text>

      </View>

  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    width: 220,
    height: 180,
    marginBottom:30,
  },
  input: {
    paddingTop: 10,
    paddingBottom:5,
    marginBottom:30,
    width: 300,
    fontSize: 16,
    fontWeight: 'bold',
    borderBottomWidth:2,
    borderBottomColor:'#E9E9E9',
  },
  inputTextName:{
    width: 300,
    color:'#914FF7',
    fontSize:16,
    fontWeight:'bold',
  },
  title: {
    textAlign:'center',
    marginBottom:50,
    color:'#28353E',
    fontSize:32,
    width: 300,
    fontWeight:'600',
  },
  botao:{
    width: 300,
    height: 52,
    backgroundColor: '#B38DF7',
    marginTop: 10,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  botaoText:{
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  },
  forgetPass: {
    fontSize:16,
    fontWeight: 'bold',
    color:'#ACA6B2',
  }
});