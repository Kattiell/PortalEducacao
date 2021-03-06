import React, { Component, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  LogBox,
} from "react-native";
import { Icon } from "react-native-elements";
import Esqueceu_Senha from "./Esqueceu_Senha";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { YellowBox } from "react-native";
import AlunoScreen from "./Aluno/index";
import { signInWithEmailAndPassword, auth } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ipv4 from "PortalEducacaoBack/ipv4.json";
import axios from "axios";
import { Modal } from "react-native";
LogBox.ignoreLogs([
  "Warning: Async Storage has been extracted from react-native core",
]);

export default function LoginAluno(props) {
  const [id, setId] = useState("");
  const [typeIcon, setTypeIcon] = useState("visibility");
  const [secureState, setSecureState] = useState(true);
  const navigation = useNavigation();
  const [emailState, setemailState] = useState("");
  const [senhaState, setsenhaState] = useState("");
  const [code, setCode] = useState("none");
  const [codeDigitado, setCodeDigitado] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const baseUrl = "http://" + ipv4.ip + ":3000/role";
  var usuario;

  //Visibilidade da senha
  function changeIcon(iconName) {
    if (iconName == "visibility") {
      setTypeIcon("visibility-off");
      changeSecure();
    } else {
      setTypeIcon("visibility");
      changeSecure();
    }
  }

  function verifyCode() {
    if (codeDigitado == code) {
      setModalVisible(false);
      navigation.navigate("AlunoScreen");
    } else {
      alert("Código incorreto, verifique o código digitado.");
    }
  }

  async function login() {
    let codeAuth;
    let signIn = false;
    if ((emailState, senhaState) !== "") {
      await signInWithEmailAndPassword(auth, emailState, senhaState)
        .then(async (userCredential) => {
          const user = userCredential.user;
          signIn = true;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
        });

      if (signIn) {
       //navigation.navigate("AlunoScreen");
        let willNavigate = false;
        try {
          willNavigate = await verifyUser();
        } catch (error) {
          alert(error);
        } finally {
          if (willNavigate) {
            try {
              await axios
                .post("http://" + ipv4.ip + ":3000/code", {
                  authid: usuario,
                })
                .then((response) => {
                  codeAuth = response.data.code;
                  setCode(codeAuth);
                  setModalVisible(true);
                })
                .catch((err) => {
                  alert(err);
                });
            } catch (error) {
              alert(error);
            }
          }
         }
      }
    }
  }

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

  const verifyUser = async () => {
    const auth = getAuth();
    let role = "";
    usuario = await getId();
    setId(usuario);
    console.log(usuario);

    await axios
      .post(baseUrl, {
        userid: usuario,
      })
      .then(async function (response) {
        console.log(response.data);
        role = await response.data;
      })
      .catch(function (response) {
        console.log(response.data);
      });

    if (role == "aluno") return true;
    else return false;
  };

  function valueSenha(valueSenha) {
    setsenhaState(valueSenha);
  }
  function valueEmail(valueEmail) {
    setemailState(valueEmail);
  }

  function changeSecure() {
    if (secureState == true) setSecureState(false);
    else setSecureState(true);
  }

  return (
    <View style={styles.container}>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.internalCard}>
            <Text style={styles.codeInfo}>
              Enviamos um código de verificação via SMS para seu telefone
              cadastrado, por favor digite o código no campo abaixo para
              prosseguir com o login.
            </Text>
            <View style={styles.inputCode}>
              <TextInput
                style={styles.input}
                placeholder="Digite o código recebido"
                onChangeText={(value) => {
                  setCodeDigitado(value);
                }}
              ></TextInput>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => verifyCode()}
            >
              <Text style={styles.botaoText}>Verificar Código</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Image source={props.logo} style={styles.logo} />

      <Text style={styles.title}>Faça o seu Login como Aluno</Text>

      <Text style={styles.inputTextName}>E-mail</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu E-mail"
        onChangeText={(value) => {
          valueEmail(value);
        }}
        // onChangeText={(value) => {valueEmail(value)}}
      />

      <View>
        <Text style={styles.inputTextName}>Senha</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={secureState}
          placeholder="Digite sua senha"
          onChangeText={(value) => {
            valueSenha(value);
          }}
        />
        <View style={{ position: "absolute", top: 35, right: 15 }}>
          <Icon
            name={typeIcon}
            type="material"
            size={28}
            color="#D1D6DB"
            onPress={() => changeIcon(typeIcon)}
          ></Icon>
        </View>
      </View>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => {
          login();
        }}
      >
        <Text style={styles.botaoText}>Login</Text>
      </TouchableOpacity>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          width: 300,
          paddingTop: 30,
        }}
      >
        <Text
          style={styles.forgetPass}
          onPress={() => navigation.navigate("Esqueceu_senha")}
        >
          Esqueceu sua senha?{" "}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 220,
    height: 180,
    marginBottom: 30,
  },
  input: {
    paddingTop: 10,
    paddingBottom: 5,
    marginBottom: 30,
    width: 300,
    fontSize: 16,
    fontWeight: "bold",
    borderBottomWidth: 2,
    borderBottomColor: "#E9E9E9",
  },
  inputCode: {
    top: 25,
  },
  inputTextName: {
    width: 300,
    color: "#914FF7",
    fontSize: 16,
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    backgroundColor: "rgba(62,61,50,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  internalCard: {
    width: Dimensions.get("screen").width * 0.92,
    height: 280,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  codeInfo: {
    marginTop: 30,
    textAlign: "center",
    color: "#9455F4",
    fontWeight: "bold",
    fontSize: 16,
  },
  title: {
    textAlign: "center",
    marginBottom: 50,
    color: "#28353E",
    fontSize: 32,
    width: 300,
    fontWeight: "600",
  },
  botao: {
    width: 300,
    height: 52,
    backgroundColor: "#B38DF7",
    marginTop: 10,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    top: 20,
    width: Dimensions.get("screen").width * 0.3,
    height: 35,
    backgroundColor: "#B38DF7",
    marginTop: 10,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
  botaoText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },

  forgetPass: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ACA6B2",
  },
});
