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
  
});


export default HorariosProfessor;