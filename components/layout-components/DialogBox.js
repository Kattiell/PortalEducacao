import { Dimensions, View, Text, StyleSheet, Touchable } from "react-native";
import { Button, Icon } from 'react-native-elements';
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

/*
    DialogBox: cria uma caixa de diálogo genérica.

    props (opcionais):

        - width & height: define largura e altura da caixa respectivamente.

        - textButton: define o texto para um botão genérico, se não definido
        o botão não é renderizado.

        - onPress: define o comportamento do botão ao ser clicado.

        - children: elementos filhos a serem renderizados.


*/



const DialogBox = (props)=>{

    const navigation = useNavigation();

    return(
        <View style={props.style ? props.style : styles.container} width={props.width} height={props.height}>
            <TouchableOpacity onPress={()=>{navigation.goBack()}} style={styles.close}>
                <Icon
                    iconStyle={styles.backButton}       
                    name='close'
                    type="material"
                    size={40}
                    color='#874BF5'    
                ></Icon>
            </TouchableOpacity>

            {props.children}


            {props.textButton
                ? <TouchableOpacity style={styles.button} onPress={props.onPress}> 
                    <Text style={styles.buttonText}>{props.textButton}</Text>  
                  </TouchableOpacity>
                : <View></View>
            }
                
            
        </View>
    
    );

}

const styles = StyleSheet.create({
    container:{ 
        backgroundColor:'#FFFFFF',
        flexDirection:'column',
        justifyContent:'center',
    },
    backButton:{
        alignSelf:'flex-start',
        paddingTop:15,
        paddingLeft:25,
        paddingBottom:5,
    },
    button:{
        height:40,
        paddingLeft:40,
        paddingRight:40,
        marginRight:30,
        marginBottom:30,
        alignSelf:'flex-end',
        backgroundColor:'#B38DF7',
        borderRadius:5,
        flexDirection:'column',
        justifyContent:'center',
    },
    buttonText:{
        color:'#FFFFFF',
        fontSize:20,
    },
});

export default DialogBox;