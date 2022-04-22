
import { Icon } from 'react-native-elements';
import { useNavigation, useRoute } from "@react-navigation/native";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import axios from 'axios';
import Select from '../layout-components/Select/Select';
import { useState, useEffect } from 'react';
import ipv4 from 'PortalEducacaoBack/ipv4.json';
import GradeHorarios from '../layout-components/GradeHorarios';


const HorariosProfessor = (props) =>{

    const baseUrl = "http://"+ipv4.ip+":3000/professores"; 
    const [currentValue, setCurrentValue] = useState('Selecione o professor: ');
    const navigation = useNavigation();
    const route = useRoute();
    const [listProf, setListProf] = useState(['vazio']);
    

    const listProfessores = async () =>{
        await axios.get(baseUrl).then((response)=>{
            setListProf(response.data)
            console.log(response.data)
        });
    }
   
    useEffect(()=>{
        
        if(route.params?.selectedValue){
            setCurrentValue(route.params.selectedValue);
        }
    });

    return(
        <View style={styles.container}>
            <Icon
                    containerStyle={{ alignSelf: 'flex-start', marginLeft: 30 }}
                    name="arrow-back"
                    type="material"
                    size={40}
                    color='#B088F7'
                    onPress={()=>{
                        navigation.navigate('Menu Administrador');
                    }}
                ></Icon>

                <Text style={{ color: '#2A3A4E', fontWeight: 'bold', fontSize: 30, marginBottom: 15, marginTop: 20, marginLeft: 30 }}>Cadastro de Horário - Professor</Text>

                <Select
                    currentValue={currentValue}
                    items={listProf == false ? listProfessores : listProf}
                    //items={['Zaroldo','Ziraldo','Genoveva','Godofredo','Virgulino','Virgilata']}
                    return={'Cadastrar Horario Professor'}
                    boxWidth={Dimensions.get('screen').width*0.9}
                    boxHeight={400}
                >
                </Select>

                <GradeHorarios></GradeHorarios>


        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffFFF',
    },

  
});


export default HorariosProfessor;