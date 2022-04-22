
import { Icon } from 'react-native-elements';
import { useNavigation, useRoute } from "@react-navigation/native";
import { Alert, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import axios from 'axios';
import Select from '../layout-components/Select/Select';
import { useState, useEffect } from 'react';
import ipv4 from 'PortalEducacaoBack/ipv4.json';
import GradeHorarios from '../layout-components/GradeHorarios';
import { collection, addDoc } from "firebase/firestore";
import { auth,db } from './../../firebase/index';

const HorariosProfessor = (props) =>{

     
    const [currentValue, setCurrentValue] = useState('Selecione o professor: ');
    const navigation = useNavigation();
    const route = useRoute();
    const [listProf, setListProf] = useState(null);
    const [listTurmas, setListTurmas] = useState(null);
    const [horariosProf, setHorariosProf] = useState(
        {
            segunda: ['-','-','-','-','-'],
            terca: ['-','-','-','-','-'],
            quarta: ['-','-','-','-','-'],
            quinta:['-','-','-','-','-'],
            sexta: ['-','-','-','-','-'],
        }
    );
   
   

    const listProfessor = async () =>{
        var baseUrl = "http://"+ipv4.ip+":3000/professores";
        await axios.get(baseUrl).then((response)=>{
            setListProf(response.data)
        });
        return listProf;
    }

    const listTurma = async() =>{
        var baseUrl = "http://"+ipv4.ip+":3000/turmas";
        await axios.get(baseUrl).then((response)=>{
            setListTurmas(response.data);
        });
    }

    function generateValues(){

        let currentHorarios = {
            segunda: ['-','-','-','-','-'],
            terca: ['-','-','-','-','-'],
            quarta: ['-','-','-','-','-'],
            quinta:['-','-','-','-','-'],
            sexta: ['-','-','-','-','-'],
        };     

        if(currentValue && currentValue != 'Selecione o professor: '){     

            for(const dia in currentHorarios){
                for(const horario in currentHorarios[dia]){ 
                    currentHorarios[dia][horario] = whoIsAvailable(dia,horario)
                }
            }
            
        } else {
            Alert.alert("Professor não selecionado!","Por favor, selecione um professor para cadastrar seus horários.",[{text: "Fechar",},],)
        }
        
        setHorariosProf(currentHorarios);
        
    }

    function whoIsAvailable(dia,horario){
       listTurma();
       let n = listTurmas.length;
       var turmas = [];
       for(let i = 0; i < n; i++) turmas.push(listTurmas[i]["numeroTurma"]);
       let randomTurma = getRandomIntInclusive(0,n-1);
       if(listTurmas[randomTurma]["horarios"][dia][horario] == '') return turmas[randomTurma];
       
    }

    const putTurmaData = async() =>{
        listTurma();
       
    }
   
    useEffect(()=>{
        
        if(route.params?.selectedValue){
            setCurrentValue(route.params.selectedValue);
        }
        
    });

    return(
        <ScrollView>
            <View style={styles.container}>
                <Icon
                        containerStyle={{ alignSelf: 'flex-start', marginLeft: 30 }}
                        name="arrow-back"
                        type="material"
                        size={40}
                        color='#B088F7'
                        onPress={()=>{
                            setListProf(null);
                            route.params = null;
                            setCurrentValue('Selecione o professor: ');
                            navigation.navigate('Menu Administrador');
                        }}
                    ></Icon>

                    <Text style={{ color: '#2A3A4E', fontWeight: 'bold', fontSize: 30, marginBottom: 15, marginTop: 20, marginLeft: 30 }}>Cadastro de Horário - Professor</Text>


                    <Select
                        currentValue={currentValue}
                        items={listProf == null ? listProfessor() : listProf}
                        return={'Cadastrar Horario Professor'}
                        boxWidth={Dimensions.get('screen').width*0.9}
                        boxHeight={350}
                    >
                    </Select>

                    <View style={{'flexDirection':'row','justifyContent':'space-evenly'}}>
                        <TouchableOpacity 
                            style={styles.botao}
                            onPress={() =>{
                                generateValues()
                            }}>
                            <Text style={styles.botaoText}>Gerar Horários</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.botao}
                            onPress={() =>{
                                
                            }}>
                            <Text style={styles.botaoText}>Editar Horários</Text>
                        </TouchableOpacity>
                    </View>

                    <GradeHorarios horarios={horariosProf}/>

                    <TouchableOpacity 
                            style={styles.botao}
                            onPress={() =>{
                                putTurmaData()
                            }}>
                            <Text style={styles.botaoText}>Salvar Horários</Text>
                    </TouchableOpacity>
            </View>
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffFFF',
    },
    botao:{
        width: 180,
        height: 42,
        backgroundColor: '#B38DF7',
        marginTop: 10,
        marginBottom:20,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf:'center'
      },
      botaoText:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff'
      },

  
});

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default HorariosProfessor;