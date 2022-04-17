import { View } from "react-native";


const HorariosProfessor = (props) =>{

    return(
        <View>
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
        </View>
    );

}


export default HorariosProfessor;