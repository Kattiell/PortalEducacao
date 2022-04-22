import { StyleSheet, View, Text } from "react-native";


const GradeHorarios = (props) =>{
    const horarios = props.horarios;
    return(
        <View style={styles.container}>
            <View style={styles.row}>
                {/* Índice 'Horários' + Dias da Semana */}
                <View style={styles.block}>
                    <Text style={{fontSize:16, fontWeight:'bold'}}>Horário</Text>
                </View>
                <View style={styles.block}>
                    <Text style={{fontSize:16, fontWeight:'bold'}}>Seg</Text>
                </View>
                <View style={styles.block}>
                    <Text style={{fontSize:16, fontWeight:'bold'}}>Ter</Text>
                </View>
                <View style={styles.block}>
                     <Text style={{fontSize:16, fontWeight:'bold'}}>Qua</Text>
                </View>
                <View style={styles.block}>
                    <Text style={{fontSize:16, fontWeight:'bold'}}>Qui</Text>
                </View>
                <View style={[styles.block,styles.lastBlock]}>
                     <Text style={{fontSize:16, fontWeight:'bold'}}>Sex</Text>
                </View>



            </View>

            


        </View>
    );

}

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:'#FFFFFF',
        marginTop:50,
    },
    row:{
        flexDirection: "row",
        justifyContent:'center'
    },
    block:{
        width:60,
        height:65,
        backgroundColor:'#C3BBF6',
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#7C55E7',
        borderLeftWidth:2,
        borderTopWidth:2,
        borderBottomWidth:2,
    },
    lastBlock:{
        borderRightWidth:2,
    }
    

});

export default GradeHorarios;