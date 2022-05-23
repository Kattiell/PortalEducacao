import React, {Component, useEffect} from 'react';
import { Alert, Button, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import BoxFunction from '../layout-components/BoxFunction';
import { Icon } from 'react-native-elements';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native';
import ipv4 from 'PortalEducacaoBack/ipv4.json';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import axios from 'axios';
import GradeHorarios from '../layout-components/GradeHorarios';



export default function CronogramaDeAula(){

    useEffect(async ()=>{
        // Nome do professor setado para demonstração enquanto
        // não temos login de professor
        setThisProfessor('Lucas Vinícius');
        const h = await GetHProf();
        setHorarioProf(h);
    },[]);

    const GetHProf = async () => {
        let h;
        await axios.post('http://'+ipv4.ip+':3000/professor-horario',{
            nome: thisProfessor,
        }).then(function(response){
            return response.data
        }).then(function(response){
            h = response;
            console.log(h);
        }).catch(function (error) {
            console.log(error)
            console.log(error.response.data)
        });
        return h;
    }
    

    const [horarioProf, setHorarioProf] = useState('');
    const [thisProfessor, setThisProfessor] = useState('vazio');
    const Drawer = createDrawerNavigator();
    const navigation = useNavigation();
    return(
    <SafeAreaView style={styles.container}>
        <ScrollView>
                <Icon
                    containerStyle={{alignSelf:'flex-start'}}
                    name="arrow-back"
                    type="material"
                    size={40}
                    color='#B088F7'
                    onPress={()=>{
                        navigation.navigate('Menu Professor');
                    }}
                ></Icon>

                <Text style={{color:'#2A3A4E', fontWeight:'bold', fontSize:30, marginBottom:15, marginTop:20, marginLeft:30}}>Portal Do Professor</Text>

                <Text style={styles.title}>Cronograma de Aula</Text>
                
                <GradeHorarios horarios={horarioProf}/>
            
              
                
                
               
       </ScrollView>
    </SafeAreaView>
    );

}



const styles = StyleSheet.create({
    container: {
       flex: 1,
       flexDirection:'column',
       backgroundColor:'#FFFFFF',
       paddingLeft:10,
       paddingRight:10,
       paddingBottom:30,
    },
    title:{
        fontSize:20,
        fontWeight:'bold',
        marginLeft:30,
        marginTop:10,
        marginBottom:20,
        color:'#8A4AF5',
    },
    containerFunctions: {
        flexDirection: 'row',
        flexWrap:'wrap',
        justifyContent:'space-between',
        marginLeft:15,
        marginRight:15,
    },
}
);