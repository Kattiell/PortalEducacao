import React, {Component} from 'react';
import { Alert, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import BoxFunction from '../layout-components/BoxFunction';
import { Icon } from 'react-native-elements';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CadastroEscola from './CadastroEscola';
import { createDrawerNavigator } from '@react-navigation/drawer';

export default function AdminScreen(){

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
                        navigation.navigate('login');
                    }}
                ></Icon>

                <Text style={{color:'#2A3A4E', fontWeight:'bold', fontSize:30, marginBottom:15, marginTop:20,}}>Portal Administrador</Text>

                <Text style={styles.title}>Escola</Text>

                <View style={styles.containerFunctions}>
                    <BoxFunction onPress="Cadastrar Escola" nameIcon="school" functionBox="Cadastrar Escola"/>
                </View>

                <Text style={styles.title}>Professores</Text>

                <View  style={styles.containerFunctions}>
                    <BoxFunction onPress="Cadastrar Professor" nameIcon="app-registration" functionBox="Cadastro Professores"/>
                    <BoxFunction onPress={""} nameIcon="alarm" functionBox="Horário"/>
                </View>

                <Text style={styles.title}>Alunos</Text>

                <View  style={styles.containerFunctions}>
                    <BoxFunction onPress="Cadastrar Aluno" nameIcon="contacts" functionBox="Cadastro Alunos"/>
                    <BoxFunction onPress={()=>{}} nameIcon="alarm" functionBox="Horário"/>
                </View>
       </ScrollView>
    </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
       flex: 1,
       flexDirection:'column',
       backgroundColor:'#FFFFFF',
       paddingLeft:30,
       paddingRight:30,
       paddingBottom:30,
    },
    title:{
        fontSize:20,
        fontWeight:'bold',
        marginLeft:15,
        marginTop:35,
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