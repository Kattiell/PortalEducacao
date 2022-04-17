import { StyleSheet, View } from "react-native";


const GradeHorarios = (props) =>{

    return(
        <View>
            <View>Horário</View>
            <View>Seg</View>
            <View>Ter</View>
            <View>Qua</View>
            <View>Qui</View>
            <View>Sex</View>
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