import { StyleSheet, View, Text } from "react-native";


const GradeHorarios = (props) =>{

    return(
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.block}>
                    <Text style={{fontSize:20}}>Horário</Text>
                </View>
                <View style={styles.block}>
                    <Text style={{fontSize:20}}>Segunda</Text>
                </View>
                <View style={styles.block}>
                    <Text style={{fontSize:20}}>Terça</Text>
                </View>
                <View style={styles.block}>
                     <Text style={{fontSize:20}}>Quarta</Text>
                </View>
                <View style={styles.block}>
                    <Text style={{fontSize:20}}>Quinta</Text>
                </View>
                <View style={styles.block}>
                     <Text style={{fontSize:20}}>Sexta</Text>
                </View>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:'#FFFFFF'
    },
    row:{
        flexDirection: "row",
        justifyContent:'center'
    },
    block:{
        width:65,
        height:65,
        backgroundColor:'#C3BBF6',
    },
    

});

export default GradeHorarios;