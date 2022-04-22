import { Dimensions, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView} from "react-native-gesture-handler";
import React, { useState } from "react";
import DialogBox from "../DialogBox";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { render } from "react-dom";


const SelectionScreen = (props)=>{

    const navigation = useNavigation();
    const route = useRoute();
    const { listItems } = route.params ? route.params: null;
    const { boxWidth, boxHeight } = route.params;
    const Listed = listItems? listItems.map((element,i)=>{    
        return(
            <TouchableOpacity 
                key={i}
                onPress={()=>{
                    navigation.navigate(route.params.return,{
                        selectedValue:element,
                        label:route.params.label
                    })
                }
            }
            >
                <Text style={styles.itemList}>{element}</Text>
            </TouchableOpacity>
        )
    });

    return(
        <View style={styles.container}>
            <DialogBox style={styles.dialogBox} 
                 width={boxWidth}
                 height={boxHeight}  
            >
                <ScrollView>
                {Listed}
                </ScrollView>

            </DialogBox>
        </View>
    );

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'rgba(240, 232, 245, 0.8)',
        justifyContent:'center',
        alignItems:'center',
    },
    itemList:{
        padding:10,
        fontSize:22,
        marginLeft:25,
        marginRight:25,
        borderBottomWidth:0.8,
        borderColor:'#D6D6D6',
    }
});

export default SelectionScreen;