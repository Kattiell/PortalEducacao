
import { Icon } from 'react-native-elements';
import { useNavigation, useRoute } from "@react-navigation/native";
import { Alert, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import axios from 'axios';
import Select from '../layout-components/Select/Select';
import { useState, useEffect } from 'react';
import ipv4 from 'PortalEducacaoBack/ipv4.json';
import GradeHorarios from '../layout-components/GradeHorarios';


const HorariosProfessor = (props) =>{

     
    const [currentValue, setCurrentValue] = useState('Selecione o professor: ');
    const navigation = useNavigation();
    const route = useRoute();
    const [listProf, setListProf] = useState(null);
    const [listTurmas, setListTurmas] = useState(null);

    let horariosProf = { // Objeto a ser cadastrado no db, contém referência aos professores
        segunda: ['-','-','-','-','-'],
        terca: ['-','-','-','-','-'],
        quarta: ['-','-','-','-','-'],
        quinta:['-','-','-','-','-'],
        sexta: ['-','-','-','-','-'],
    }

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
        let currentHorarios = [];
        let turmas = [];
        for(const t in listTurmas) turmas = t;

        listTurma();
        if(currentValue && currentValue != 'Selecione o professor: '){
            for(const dia in horariosProf){
                currentHorarios[dia] = horariosProf[dia].map(()=>{
                    console.log(turmas);
                });
            }
        } else {
            Alert.alert("Professor não selecionado!","Por favor, selecione um professor para cadastrar seus horários.",[{text: "Fechar",},],)
        }
        
        
        
    }

    function isAvailable(){

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

                    <TouchableOpacity 
                        style={styles.botao}
                        onPress={() =>{
                            generateValues()
                        }}>
                        <Text style={styles.botaoText}>Gerar Horários</Text>
                    </TouchableOpacity>

                    <GradeHorarios horarios={horariosProf}/>
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
        width: 200,
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


export default HorariosProfessor;