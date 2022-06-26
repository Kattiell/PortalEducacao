import React, { Component } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  PermissionsAndroid,
  Platform,
} from "react-native";
import BoxFunction from "../layout-components/BoxFunction";
import { Icon } from "react-native-elements";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import axios from "axios";
import ipv4 from "PortalEducacaoBack/ipv4.json";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  getStorage,
  listAll,
  list,
  deleteObject,
  getStream,
} from "firebase/storage";
import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import { Modal } from "react-native";

export default function AcessoAtividades() {
  const storage = getStorage();
  const Drawer = createDrawerNavigator();
  const navigation = useNavigation();
  const baseUrl = "http://" + ipv4.ip + ":3000/";
  const [loading, setLoading] = useState(false);
  const [alunoData, setAlunoData] = useState(undefined);
  const [items, setItems] = useState(undefined);
  const [modalVisible, setModalVisible] = useState(true);
  const [loading2, setLoading2] = useState(false);
  var disciplina = [
    "Português",
    "Matemática",
    "Geografia",
    "História",
    "Biologia",
    "Física",
    "Educação Física",
    "Química",
    "Inglês",
    "Artes",
    "Filosofia",
    "Sociologia",
  ];
  var dataAluno;
  var id;

  useEffect(async () => {
    if (!loading2) {
      id = await getId();
      console.log(id);
      axios
        .get(baseUrl + "aluno" + id)
        .then(async (response) => {
          dataAluno = response.data;
          setAlunoData(response.data);
          if (!loading){
            await listItems();
            setModalVisible(false);
          } 
          setLoading2(true);
        })
        .catch((error) => {
          alert(error + baseUrl);
        });
    }
  });

  useEffect(() => {});

  useEffect(() => {});

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

  const listItems = async () => {
    var realList = [];
    disciplina.forEach(async (element) => {
      try {
        let listRef = ref(
          storage,
          `gs://portaeducacao.appspot.com/Atividades/${dataAluno["escola"]["stringValue"]}/${dataAluno["turma"]["stringValue"]}/${element}`
        );
        const result = await (await list(listRef, { maxResults: 100 })).items;
        for (let i in result) {
          realList.push("" + result[i]);
          console.log("" + result[i]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setItems(realList);
        setLoading(true);
      }
    });
  };

  const downloadNow = async (uri, filename) => {
    const fileUri = `${FileSystem.documentDirectory}${filename}`;
    const downloadedFile = await FileSystem.downloadAsync(uri, fileUri);

    if (downloadedFile.status != 200) {
      alert("Houve um erro ao efetuar o download do arquivo, tente novamente.");
    } else
      Alert.alert(
        "Download bem sucedido.",
        "Arquivo " + filename + " foi baixado com sucesso."
      );

    const perm = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    if (perm.status != "granted") {
      return;
    }

    try {
      const asset = await MediaLibrary.createAssetAsync(downloadedFile.uri);
      const album = await MediaLibrary.getAlbumAsync("Download");
      if (album == null) {
        await MediaLibrary.createAlbumAsync("Download", asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }
    } catch (e) {
      alert(e);
    }
  };

  const permission = async (downloadedFile) => {};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
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
            Atividades Escolares
          </Text>

          <View style={styles.tick}>
            {items != undefined
              ? items.map((value) => {
                  return (
                    <AtividadeAluno
                      key={value + "_"}
                      titulo={sliceTituloValue(value)}
                      disciplina={sliceDisciplinaValue(value)}
                      onPress={async () => {
                        downloadNow(
                          await getDownloadURL(ref(storage, value)),
                          sliceTituloValue(value)
                        );
                      }}
                    ></AtividadeAluno>
                  );
                })
              : () => {}}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const AtividadeAluno = (props) => {
  return (
    <View style={styles.body}>
      <View style={styles.columns}>
        <View style={styles.rows}>
          <Text style={styles.label}>Título: </Text>
          <Text numberOfLines={1} style={styles.content}>
            {props.titulo}
          </Text>
        </View>

        <View style={styles.rows}>
          <Text style={styles.label}>Disciplina: </Text>
          <Text style={styles.content}>{props.disciplina}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.iconBack} onPress={props.onPress}>
        <Icon
          name="file-download"
          type="material"
          size={30}
          color="#FFFFFF"
        ></Icon>
      </TouchableOpacity>
    </View>
  );
};

const sliceTituloValue = (value) => {
  let idx = 0;
  let ocurrence = 0;
  while (ocurrence < 7) {
    idx = value.indexOf("/", idx + 1);
    if (idx != -1) ocurrence++;
  }
  let newvalue = value.slice(idx + 1, value.length);
  return newvalue;
};

const sliceDisciplinaValue = (value) => {
  let idx = 0;
  let ocurrence = 0;
  while (ocurrence < 6) {
    idx = value.indexOf("/", idx + 1);
    if (idx != -1) ocurrence++;
  }
  let newvalue = value.slice(idx + 1, value.indexOf("/", idx + 1));
  return newvalue;
};

const styles = StyleSheet.create({
  label: {
    color: "#8A4AF5",
    fontWeight: "bold",
    fontSize: 16,
  },
  content: {
    color: "#2B3B4F",
    fontWeight: "bold",
    fontSize: 16,
    overflow: "hidden",
  },
  rows: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    textAlign: "center",
    width: Dimensions.get("screen").width * 0.68,
    overflow: "hidden",
  },
  columns: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  body: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 20,
    marginTop: 40,
    height: 80,
    borderColor: "#636460",
    borderRadius: 8,
    borderWidth: 1,
  },
  iconBack: {
    width: 60,
    height: 80,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: "#8A4AF5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
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
    backgroundColor: "rgba(255,255,255,0.7)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
});
