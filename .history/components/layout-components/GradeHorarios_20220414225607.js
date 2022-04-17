import { StyleSheet, View, Text } from "react-native";


const GradeHorarios = (props) =>{

    return(
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.block}>
                    <Text style={{fontSize:16}}>Horário</Text>
                </View>
                <View style={styles.block}>
                    <Text style={{fontSize:16}}>Seg</Text>
                </View>
                <View style={styles.block}>
                    <Text style={{fontSize:16}}>Ter</Text>
                </View>
                <View style={styles.block}>
                     <Text style={{fontSize:16}}>Qua</Text>
                </View>
                <View style={styles.block}>
                    <Text style={{fontSize:16}}>Qui</Text>
                </View>
                <View style={styles.block}>
                     <Text style={{fontSize:16, borderRightWidth:3}}>Sex</Text>
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
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#7C55E7',
        borderLeftWidth:3,
        borderTopWidth:3,
        borderBottomWidth:3,
    },
    

});

export default GradeHorarios;