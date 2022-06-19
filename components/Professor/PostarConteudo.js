import React, { Component, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "react-native-gesture-handler";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { signInWithEmailAndPassword, auth } from "../../firebase";
import axios from "axios";
import ipv4 from "PortalEducacaoBack/ipv4.json";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useRoute } from "@react-navigation/native";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  getStorage,
  listAll,
  list,
  deleteObject,
} from "firebase/storage";
import Atividade from "../layout-components/Atividade";
import { Modal } from "react-native";
import { SafeAreaView, ScrollView } from "react-native";

export default function PostarConteudo() {
  var route = useRoute();
  const Drawer = createDrawerNavigator();
  const navigation = useNavigation();
  const storage = getStorage();
  const baseUrl = "http://" + ipv4.ip + ":3000/";
  const [modalVisible,setModalVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadItem, setLoadItem] = useState(false);
  const [loadingTurma, setLoadingTurma] = useState(false);
  const [dataProf, setDataProf] = useState(false);
  const [disciplina, setDisciplina] = useState(false);
  const [escola, setEscola] = useState(false);
  const [listTurma, setListTurmas] = useState(false);
  const [items, setItems] = useState(false);
  const [value, setValue] = useState(0);
  const [needUptade, setNeedUpdate] = useState(false);

  useEffect(() => {});

  useEffect(async () => {
    if (!loading) {
      let profId = await getId();
      try {
        let data = await axios.get(baseUrl + "professor" + profId);
        setDataProf(data["data"]);
        setEscola(data["data"]["escola"]["stringValue"]);
        setDisciplina(data["data"]["disciplinaatrabalhar"]["stringValue"]);
        setLoading(true);
        var r1 = data["data"]["horarios"]["mapValue"]["fields"];
        var r2 = new Set();
        for (let value in r1) {
          for (let value2 in r1[value]["arrayValue"]["values"]) {
            r2.add(r1[value]["arrayValue"]["values"][value2]["stringValue"]);
          }
        }
        const arrayR2 = Array.from(r2);
        setListTurmas(arrayR2);
      } catch (error) {
        alert(error);
      }
    }
  });

  useEffect(() => {
    if (route.params?.canUpdate) {
      route.params = null;
      listItems();
    }
    if (!loadItem) listItems();
  });

  const listItems = async () => {
    if (listTurma != false) {
      console.log(listTurma);
      var realList = [];
      try {
        for (let value in listTurma) {
          let listRef = ref(
            storage,
            `gs://portaeducacao.appspot.com/Materiais de estudo/${escola}/${listTurma[value]}/${disciplina}`
          );
          const result = await (await list(listRef, { maxResults: 100 })).items;
          for (let i in result) {
            realList.push("" + result[i]);
          }
        }
        setLoadItem(true);
        setItems(realList);
      } catch (error) {
        alert(error);
      }
      setModalVisible(false)
    }
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

  const deleteFile = (value) => {
    const refPath = ref(storage, value);
    deleteObject(refPath)
      .then(() => {
        let newItems = [];
        items.forEach((element) => {
          if (element != value) {
            newItems.push(element);
          }
        });
        setItems(newItems);
      })
      .catch((error) => {
        alert("deu ruim em" + error);
      });
  };

  return (
    <SafeAreaView>
      <ScrollView>
      <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
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
        containerStyle={{ alignSelf: "flex-start", marginLeft: 2 }}
        name="arrow-back"
        type="material"
        size={40}
        color="#B088F7"
        onPress={() => {
          navigation.navigate("Menu Professor");
        }}
      ></Icon>
      <TouchableOpacity
        style={styles.Button}
        onPress={() => {
          navigation.navigate("CadastrarMaterial");
        }}
      >
        <Icon name="create-new-folder" size={26} color="white" />
      </TouchableOpacity>

      <View style={styles.container}>
        <Text
          style={{
            color: "#2A3A4E",
            fontWeight: "bold",
            fontSize: 30,
            marginBottom: 15,
            marginTop: 20,
          }}
        >
          Postar Conteudo
        </Text>
      </View>

      <View style={styles.tick}>
        {items != false
          ? items?.map((value) => {
              if (value != undefined) {
                return (
                  <Atividade
                    key={value + "_"}
                    turma={sliceTurmaValue(value)}
                    nomeAtividade={sliceFileName(value)}
                    onDeletePress={() => {
                      Alert.alert(
                        "Atenção",
                        "Você tem certeza que deseja excluir o arquivo?",
                        [
                          {
                            text: "Cancelar",
                            onPress: () => {},
                          },
                          {
                            text: "Sim, excluir agora",
                            onPress: () => deleteFile(value),
                          },
                        ]
                      );
                    }}
                    onEditPress={()=>{
                      alert("Ok auqi")
                    }}
                  />
                );
              }
            })
          : () => {}}
      </View>
    </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const sliceTurmaValue = (value) => {
  let idx = 0;
  let ocurrence = 0;
  while (ocurrence < 5) {
    idx = value.indexOf("/", idx + 1);
    if (idx != -1) ocurrence++;
  }
  let newvalue = value.slice(idx + 1, value.indexOf("/", idx + 1));
  return newvalue;
};

const sliceFileName = (value) => {
  if (value != undefined) {
    let pos = value.lastIndexOf("/");
    let newvalue = value.slice(pos + 1, value.length);
    return newvalue;
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#FFFFFF",
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 30,
  },
  body: {
    flex: 1,
    marginTop: -86,
  },
  Input: {
    flex: 1,
    height: 40,
    backgroundColor: "#eee",
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  centeredView: {
    backgroundColor: "rgba(255,255,255,0.7)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  Button: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1c6cce",
    borderRadius: 4,
    alignSelf: "flex-end",
    position: "absolute",
    top: 1,
    zIndex: 10,
    right: 22,
    backgroundColor: "#8A4AF5",
  },
  FlatList: {
    flex: 1,
    marginTop: 55,
  },
  Texto: {
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
    marginTop: 4,
    textAlign: "center",
  },
  ContainerView: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 4,
    backgroundColor: "#eee",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#eee",
  },
  tick: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
