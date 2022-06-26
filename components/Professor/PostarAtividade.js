import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
  } from "react-native";
  import DialogBox from "../layout-components/DialogBox";
  import { createDrawerNavigator } from "@react-navigation/drawer";
  import {
    NavigationContainer,
    useNavigation,
    useRoute,
  } from "@react-navigation/native";
  import Select from "../layout-components/Select/Select";
  import React, { useState, useEffect } from "react";
  import * as DocumentPicker from "expo-document-picker";
  import { app } from "../../firebase";
  import axios from "axios";
  import ipv4 from "PortalEducacaoBack/ipv4.json";
  import {
    ref,
    getDownloadURL,
    uploadBytesResumable,
    getStorage,
    deleteObject
  } from "firebase/storage";
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import { signInWithEmailAndPassword, auth } from "../../firebase";
  import { Modal } from "react-native";
  
  const PostarAtividade = (props) => {
    const Drawer = createDrawerNavigator();
    const route = useRoute();
    const navigation = useNavigation();
    const [selectedDisciplina, setSelectedDisciplina] = useState(
      "Selecione a disciplina"
    );
    const [SelectedTurma, setSelectedTurma] = useState("Selecione a Turma");
    const [currentNome, setCurrentNome] = useState(""); //Criar validação de campo vazio
    const [currentNomeDesc, setCurrentNomeDesc] = useState({});
    const [numeroTurma, setNumeroTurma] = useState("Selecione uma turma");
    const [listTurmas, setListTurmas] = useState([""]);
    const baseUrl = "http://" + ipv4.ip + ":3000/file";
    const [fileName, setFileName] = useState(undefined);
    const [blobFile, setBlobFile] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [escola, setEscolaName] = useState(null);
    const [oldFilePath,setOldFilePath] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [edit, setEdit] = useState(false);
  
    useEffect(() => {});

    useEffect(() => {
      if (route.params?.edit) {
        setFileName(route.params.nomeAtividade);
        setNumeroTurma(route.params.turma);
        setSelectedDisciplina(route.params.disciplina);
        setEdit(route.params.edit);
        setOldFilePath(route.params.filePath);
      }
    });
  
    useEffect(() => {
      if (!loading) {
        listTurma();
      }
    });
  
    useEffect(async () => {
      const url = "http://" + ipv4.ip + ":3000/";
      if (!loading2) {
        let profId = await getId();
        try {
          let data = await axios.get(url + "professor" + profId);
          setEscolaName(data["data"]["escola"]["stringValue"]);
          setLoading2(true);
        } catch (error) {
          alert(error);
        }
      }
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
  
    useEffect(() => {
      if (route.params?.selectedValue && route.params?.label) {
        switch (route.params.label) {
          case "Disciplina":
            setSelectedDisciplina(route.params.selectedValue);
            break;
  
          case "Turma":
            setNumeroTurma(route.params.selectedValue.slice(0, 3));
            break;
  
          default:
            break;
        }
      }
    });
  
    const storage = getStorage();
    const _pickDocument = async () => {
      let result = await DocumentPicker.getDocumentAsync({});
      const r = await fetch(result.uri);
      const b = await r.blob();
      setFileName(result.name);
      setBlobFile(b);
    };
  
    const listTurma = async () => {
      const baseUrl = "http://" + ipv4.ip + ":3000/";
      let profId = await getId();
      try {
        let data = await axios.get(baseUrl + "professor" + profId);
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
      setLoading(true);
    };
  
    return (
      <View style={styles.container}>
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
        <DialogBox width={415} height={415}>
          <View style={styles.contentbx}>
            <Text style={styles.inputTextName}>Postar atividades</Text>
  
            <Select
              label={"Disciplina"}
              currentValue={selectedDisciplina}
              items={[
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
              ]}
              return={"PostarAtividade"}
              boxWidth={Dimensions.get("screen").width * 0.78}
              boxHeight={400}
            ></Select>
            <Select
              label={"Turma"}
              currentValue={numeroTurma}
              items={listTurmas}
              return={"PostarAtividade"}
              boxWidth={Dimensions.get("screen").width * 0.75}
              boxHeight={400}
            ></Select>
  
            <TouchableOpacity style={styles.botao} onPress={_pickDocument}>
              <Text style={styles.botaoText}>Importar Arquivo</Text>
            </TouchableOpacity>
            {fileName != undefined ? (
              <Text style={styles.fileName}>x. {fileName}</Text>
            ) : (
              () => {}
            )}
            <TouchableOpacity
              style={styles.botao2}
              onPress={() => {
                if (edit == false) {
                  if (
                    !blobFile ||
                    numeroTurma == "Selecione uma turma" ||
                    selectedDisciplina == "Selecione a disciplina"
                  )
                    return;
                  setModalVisible(true);
                  const sotrageRef = ref(
                    storage,
                    `Atividades/${escola}/${numeroTurma}/${selectedDisciplina}/${fileName}`
                  );
                  const uploadTask = uploadBytesResumable(sotrageRef, blobFile); //LINE B
                  uploadTask.on(
                    "state_changed",
                    null,
                    (error) => console.log(error),
                    () => {
                      getDownloadURL(uploadTask.snapshot.ref).then(
                        (downloadURL) => {
                          console.log("File available at", downloadURL);
                          navigation.navigate("Criar Atividade", {
                            canUpdate: true,
                          });
                          setModalVisible(false);
                          return downloadURL;
                        }
                      );
                    }
                  );
                } else {
                  if (
                    !blobFile
                  ) return;
                  setModalVisible(true);
                  const sotrageRef = ref(
                    storage,
                    `Atividades/${escola}/${numeroTurma}/${selectedDisciplina}/${fileName}`
                  );
                  const uploadTask = uploadBytesResumable(sotrageRef, blobFile);
                  uploadTask.on(
                    "state_changed",
                    null,
                    (error) =>{
                      console.log(error)
                      alert(error.message);
                    },
                    () => {
                      getDownloadURL(uploadTask.snapshot.ref).then(
                        (downloadURL) => {
                          console.log("File available at", downloadURL);
                          navigation.navigate("Criar Atividade", {
                            canUpdate: true,
                          });
                          const refPath = ref(storage, oldFilePath);
                          deleteObject(refPath)
                          setModalVisible(false);
                          return downloadURL;
                        }
                      );
                    }
                  );
                }
              }}
            >
              <Text style={styles.botaoText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </DialogBox>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "rgba(240, 232, 245, 0.8)",
      justifyContent: "center",
      alignItems: "center",
    },
    botao: {
      width: 174,
      height: 36,
      backgroundColor: "#B38DF7",
      marginTop: 10,
      marginBottom: 18,
      marginLeft: 50,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
    },
    botao2: {
      width: 100,
      height: 36,
      backgroundColor: "#B38DF7",
      marginBottom: 0,
      marginLeft: 423,
      borderRadius: 5,
      marginLeft: 10,
      marginRight: 30,
      top: -6,
      left: 0,
      alignSelf: "flex-end",
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
    },
    botaoText: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#fff",
    },
    inputTextName: {
      width: 250,
      color: "#914FF7",
      fontSize: 18,
      fontWeight: "bold",
      marginLeft: 40,
      marginRight: 40,
      alignItems: "center",
    },
    fileName: {
      color: "#914FF7",
      fontSize: 15,
      fontWeight: "bold",
      marginLeft: 50,
      paddingBottom: 15,
    },
    centeredView: {
      backgroundColor: "rgba(255,255,255,0.7)",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },
    contentbx:{
      marginTop:30,
      marginBottom:30
    },
    input: {
      paddingTop: 10,
      paddingBottom: 5,
      marginBottom: 30,
      marginLeft: 40,
      marginRight: 40,
      width: 300,
      fontSize: 18,
      fontWeight: "bold",
      borderBottomWidth: 2,
      borderBottomColor: "#E9E9E9",
    },
  });
  
  export default PostarAtividade;
  