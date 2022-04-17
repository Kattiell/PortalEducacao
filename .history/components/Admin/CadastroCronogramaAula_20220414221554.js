import { View } from "react-native";
import { Icon } from 'react-native-elements';
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";

const HorariosProfessor = (props) =>{

    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            <Icon
                    containerStyle={{alignSelf:'flex-start'}}
                    name="arrow-back"
                    type="material"
                    size={40}
                    color='#B088F7'
                    onPress={()=>{
                        navigation.navigate('Menu Administrador');
                    }}
                ></Icon>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffFFF',
    },
    botao: {
        alignSelf: 'center',
        marginTop: 80,
        width: 320,
        height: 52,
        backgroundColor: '#B38DF7',
        marginTop: 10,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textoBotao: {
        color: "#FFFFFF",
        fontSize: 18,
    },
  
});


export default HorariosProfessor;