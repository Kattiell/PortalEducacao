import React, { Component, useEffect } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import BoxFunction from "../layout-components/BoxFunction";
import { Icon } from "react-native-elements";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { Modal } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { signInWithEmailAndPassword, auth } from "./../../firebase/index";
import { createDrawerNavigator } from "@react-navigation/drawer";
import GradeHorarios from "../../components/layout-components/GradeHorarios";
import axios from "axios";
import ipv4 from "PortalEducacaoBack/ipv4.json";
import { useState } from "react";

export default function HorariosAula() {
  const baseUrl = "http://" + ipv4.ip + ":3000/";
  var turmaAluno;
  var horario;
  const [loading, setLoading] = useState(false);
  const [horarioProf, setHorarioProf] = useState({
    segunda: ["", "", "", "", ""],
    terca: ["", "", "", "", ""],
    quarta: ["", "", "", "", ""],
    quinta: ["", "", "", "", ""],
    sexta: ["", "", "", "", ""],
  });

  async function getId() {
    let usuario = "";
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        usuario = user.uid;
      }
    }).bind(() => {
      console.log("deu");
    });
    return usuario;
  }

  useEffect(async () => {
    if (!loading) {
      var id = await getId();
      try {
        await axios.get(baseUrl + "aluno" + id).then(async (response) => {
          turmaAluno = response.data["turma"]["stringValue"];
        });
      } catch (error) {
        alert(error);
      } finally {
        axios
          .post(baseUrl + "turma", {
            nTurma: turmaAluno,
          })
          .then((response) => {
            setLoading(true);
            setModalVisible(false);
            horario = response.data;
            setHorarioProf(horario);
            console.log(horario);
          });
      }
    }
  });

  const [modalVisible, setModalVisible] = useState(true);
  const Drawer = createDrawerNavigator();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {}}
        >
          <View style={styles.centeredView}>
            <Image
              width={200}
              height={200}
              source={require("../../assets/anime.gif")}
            ></Image>
          </View>
        </Modal>
        <Icon
          containerStyle={{ alignSelf: "flex-start" }}
          name="arrow-back"
          type="material"
          size={40}
          color="#B088F7"
          onPress={() => {
            navigation.navigate("Menu do Aluno");
          }}
        ></Icon>

        <Text
          style={{
            color: "#2A3A4E",
            fontWeight: "bold",
            fontSize: 30,
            marginBottom: 15,
            marginTop: 20,
          }}
        >
          Horarios de Aula
        </Text>

        <GradeHorarios horarios={horarioProf} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 15,
    marginTop: 35,
    color: "#8A4AF5",
  },
  containerFunctions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginLeft: 15,
    marginRight: 15,
  },
  centeredView: {
    flex: 1,
    backgroundColor: "rgba(62,61,50,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
