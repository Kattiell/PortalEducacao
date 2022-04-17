import { StyleSheet, View } from "react-native";


const GradeHorarios = (props) =>{

    return(
        <View style={styles.container}>
            <View>
                <Text>Horário</Text>
            </View>
            <View>
                <Text>Seg</Text>
            </View>
            <View>
                <Text>Ter</Text>
            </View>
            <View>
                <Text>Qua</Text>
            </View>
            <View>
                <Text>Qui</Text>
            </View>
            <View>
                <Text>Sex</Text>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:'#FFFFFF'
    },

});

export default GradeHorarios;