import { View } from "react-native";
import { Icon } from 'react-native-elements';
import { useNavigation } from "@react-navigation/native";


const HorariosProfessor = (props) =>{

    const navigation = useNavigation();

    return(
        <View>
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


export default HorariosProfessor;