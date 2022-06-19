import { View, Text, StyleSheet, Dimensions, TextInput } from "react-native";
import React, { useState } from "react";
import {
  NavigationContainer,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Atividade(props) {
  const navigation = useNavigation();
  const [currentCodigo, setCurrentCodigo] = useState(""); //Criar validação de campo vazio
  const [nomeAtividade, setnomeAtividade] = useState("");

  return (
    <View style={styles.container} key={props.key}>
      <View style={styles.atividades}>
        
            <View style={styles.contentAtividade}>
                <View style={styles.itemAtividade}>
                    <Text style={styles.title}>Título:   </Text>
                    <Text style={styles.content}>{props.nomeAtividade}</Text>
                </View>

                <View style={styles.hr}></View>

                <View style={styles.itemAtividade}>
                    <Text style={styles.title}>Turma:   </Text>
                    <Text style={styles.content}>{props.turma}</Text>
                </View>
            </View>

            <View style={styles.buttonSection}>
                <TouchableOpacity style={styles.btEdit} onPress={props.onEditPress}>
                    <Icon name="edit" type="material" size={30} color="#FFFFFF"></Icon>
                </TouchableOpacity>

                <View style={styles.hr2}></View>

                <TouchableOpacity style={styles.btDelete} onPress={props.onDeletePress}>
                    <Icon
                    name="delete"
                    type="material"
                    size={30}
                    color="#FFFFFF"
                    ></Icon>
                </TouchableOpacity>
            </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderColor: "#D3D3D3",
    borderWidth: 2,
    width: 400,
    height: 120,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    borderRadius: 6,
  },
  atividades: {
    color: "#975EF6",
    fontSize: 18,
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    // fontFamily: '',
  },
  btEdit: {
    backgroundColor: "#B38DF7",
    height: 58,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 8,
  },
  btDelete: {
    backgroundColor: "#B38DF7",
    height: 58,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: 8,
  },
  hr:{
    backgroundColor:"rgba(123,123,122,0.5)",
    marginTop:5,
    marginBottom:5,
    width:"90%",
    height:1,
    marginLeft:20,
    alignSelf:"flex-start"
  },
  title:{
    color:"#B38DF7",
    fontWeight:"bold",
    fontSize:16,
  },
  content:{
    display:"flex",
    flexDirection:"row",
    flexWrap:"wrap",
    fontSize:16,
    display:"flex",
    flex:1,
    flexWrap:"wrap"
  },
  contentAtividade:{
    width:338,
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
  },
  itemAtividade:{
    marginRight:20,
    marginLeft:20,
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
  },
  hr2:{
    height:2,
    width:60,
  }
});
