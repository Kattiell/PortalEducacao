import { StyleSheet, View, Text } from "react-native";


const GradeHorarios = (props) =>{

    return(
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.block}>
                    <Text>Horário</Text>
                </View>
                <View style={styles.block}>
                    <Text>Seg</Text>
                </View>
                <View style={styles.block}>
                    <Text>Ter</Text>
                </View>
                <View style={styles.block}>
                    <Text>Qua</Text>
                </View>
                <View style={styles.block}>
                    <Text>Qui</Text>
                </View>
                <View style={styles.block}>
                    <Text>Sex</Text>
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
        width:50,
        height:50,
    },
    row:{
        flexDirection: "row",
    }

});

export default GradeHorarios;