import { StyleSheet, View, Text } from "react-native";


const GradeHorarios = (props) =>{

    return(
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.block}>
                    <Text>Horário</Text>
                </View>
                <View style={styles.block}>
                    <Text>Segunda</Text>
                </View>
                <View style={styles.block}>
                    <Text>Terça</Text>
                </View>
                <View style={styles.block}>
                    <Text>Quarta</Text>
                </View>
                <View style={styles.block}>
                    <Text>Quinta</Text>
                </View>
                <View style={styles.block}>
                    <Text>Sexta</Text>
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
    block:{
        width:65,
        height:65,
    },
    row:{
        flexDirection: "row",
    }

});

export default GradeHorarios;