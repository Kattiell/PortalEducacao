import { View } from "react-native";
import { Icon } from 'react-native-elements';
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";

const HorariosProfessor = (props) =>{

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

<Text style={{ color: '#2A3A4E', fontWeight: 'bold', fontSize: 30, marginBottom: 15, marginTop: 20, marginLeft: 30 }}>Cadastrar Escola</Text>

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