import { Dimensions, View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

    /*
        Select

        props (obrigatório):
            - items: recebe um objeto contendo os items a serem selecionados.
            - currentValue: recebe o valor atualmente selecionado.
            - return: recebe a tela para onde as informações devem retornar.

        props (opcionais):
            - label: nome dado ao campo de seleção (essencial para verificar a quem pertence
                o valor selecionado em telas onde mais de um select)
            - width: recebe a largura do select.
            - boxWidth: recebe a largura da caixa de seleção
            - boxHeight: recebe a altura da caixa de seleção

    */

const Select = (props) =>{

    const route = useRoute();
    const navigation = useNavigation();
    const [selectedText, setSelectedText] = useState('Escolha uma opção: ');
    const items = props.items;

    useEffect(()=>{
        
    });

    return(
        <View 
            style={styles.container} 
            width={props.width} 
            height={props.height}
            >
           <Text style={styles.selectedText}>
               {props.currentValue}
            </Text>
           <TouchableOpacity style={styles.arrowDown} 
           
            onPress={()=>{navigation.navigate('SelectionScreen', {
                label: props.label,
                listItems:items,
                return:props.return,
                boxWidth: props.boxWidth,
                boxHeight: props.boxHeight,
              });}}>
               <Icon
                    name="arrow-drop-down"
                    type="material"
                    size={40}
                    color='#874BF5'
               ></Icon>
           </TouchableOpacity>
        </View>
    );

}

const styles = StyleSheet.create({
    container:{
        borderWidth:1,
        borderColor:'#B38DF7',
        borderRadius:6,
        width: Dimensions.get('window').width * 0.7,
        maxWidth: Dimensions.get('window').width,
        maxHeight:40,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        marginTop:15,
        marginBottom:15,
        marginLeft: Dimensions.get('window').width * 0.10,
        marginRight: Dimensions.get('window').width * 0.15,
        justifyContent: "space-between",
    },
    selectedText:{
        textAlignVertical:"center",
        paddingLeft:10,
        fontSize:16,
        color:'#7E60B7',
        maxWidth: Dimensions.get('window').width * 0.55,
    },
    arrowDown:{
        borderTopRightRadius:6,
        borderBottomRightRadius:6,
        borderLeftWidth:1,
        borderColor:'#B38DF7',
        height:38,
        backgroundColor:'#DACAFB',
    }
});

export default Select;