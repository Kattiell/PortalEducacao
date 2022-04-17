
import { Icon } from 'react-native-elements';
import { useNavigation } from "@react-navigation/native";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Select from '../layout-components/Select/Select';
import { useState } from 'react';


const HorariosProfessor = (props) =>{

    const [currentValue, setCurrentValue] = useState('Selecione o professor: ');
    const navigation = useNavigation();

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
                    items={['Zaroldo','Ziraldo','Genoveva','Godofredo','Virgulino','Virgilata']}
                    return={'Cadastrar Horario Professor'}
                    boxWidth={Dimensions.get('screen').width*0.9}
                    boxHeight={200}
                >
                </Select>

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