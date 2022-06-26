import React, { Component, useEffect } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";
import BoxFunction from "../layout-components/BoxFunction";
import { Icon } from "react-native-elements";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native";
import ipv4 from "PortalEducacaoBack/ipv4.json";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import axios from "axios";
import { auth } from "../../firebase/index";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import GradeHorarios from "../layout-components/GradeHorarios";

export default function CronogramaDeAula() {
  const [horarioProf, setHorarioProf] = useState({
    segunda: ["", "", "", "", ""],
    terca: ["", "", "", "", ""],
    quarta: ["", "", "", "", ""],
    quinta: ["", "", "", "", ""],
    sexta: ["", "", "", "", ""],
  });
  const baseUrl = "http://" + ipv4.ip + ":3000/";
  const [modalVisible, setModalVisible] = useState(true);
  const [thisProfessor, setThisProfessor] = useState("vazio");
  const Drawer = createDrawerNavigator();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    let profId = await getId();
    let data = await axios.get(baseUrl + "professor" + profId);
    setThisProfessor(data["data"]["nome"]["stringValue"]);
  });

  useEffect(async () => {
    if (!loading) {
      const h = await GetHProf();
      console.log(h);
      setHorarioProf(h);
    }
  });

  useEffect(() => {});

  const GetHProf = async () => {
    let i;
    try {
      i = await axios.post("http://" + ipv4.ip + ":3000/professor-horario", {
        nome: thisProfessor,
      });
      setModalVisible(false)
    } catch (error) {
      alert(error);
    }
    setLoading(true);
    return i.data;
  };

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

  return (
    <SafeAreaView style={styles.container}>
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
      <ScrollView>
        <Icon
          containerStyle={{ alignSelf: "flex-start" }}
          name="arrow-back"
          type="material"
          size={40}
          color="#B088F7"
          onPress={() => {
            navigation.navigate("Menu Professor");
          }}
        ></Icon>

        <Text
          style={{
            color: "#2A3A4E",
            fontWeight: "bold",
            fontSize: 30,
            marginBottom: 15,
            marginTop: 20,
            marginLeft: 30,
          }}
        >
          Portal Do Professor
        </Text>

        <Text style={styles.title}>Cronograma de Aula</Text>

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
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 30,
    marginTop: 10,
    marginBottom: 20,
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
    backgroundColor: "rgba(255,255,255,0.7)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
});
