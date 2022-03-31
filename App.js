import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, Image, } from 'react-native';
import Login from './components/Login';
import Esqueceu_Senha from './components/Esqueceu_Senha';
import { NavigationContainer, useNavigation, } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminScreen from './components/Admin';
import { Icon } from 'react-native-elements';
import { createDrawerNavigator, DefaultTheme, DrawerItemList, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Acesso from './components/Acesso';
import CadastrarEscola from './components/Admin/CadastroEscola';
import {YellowBox} from 'react-native';
//import { Picker } from 'react-native-web';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications


const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

YellowBox.ignoreWarnings(['Warning: Async Storage has been extracted from react-native core']);
//Picker.ignoreWarnings(['Warning:  Picker has been extracted from react-native core and will be removed in a future release'])

export default function App() {
  
  return (
    <NavigationContainer theme={DrawerTheme}>
      <Stack.Navigator initialRouteName='Acesso' screenOptions={{ headerShown: false, }}>

        {/* Rota para tela de login do usuário*/}
        <Stack.Screen name="login">
          {(props) => <Login {...props} logo={require('./assets/logo.png')} />}
        </Stack.Screen>

        {/* Rota para tela de reset de senha*/}
        <Stack.Screen name="Esqueceu_senha" component={Esqueceu_Senha} />

        {/* Rota para tela inicial do administrador (Com Drawer)*/}
        <Stack.Screen name="AdminScreen" component={DrawerRoutes} />






        {/* Rota para tela da página inicial do aplicativo*/}
        <Stack.Screen name="Acesso">
          {(props) => <Acesso {...props} logo={require('./assets/logo.png')} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


{/* Rotas de telas com drawer */ }
function DrawerRoutes({ navigation }) {


  return (
    <Drawer.Navigator initialRouteName='Menu Administrador' drawerContent={(props) => <DrawerList {...props} />}>


      {/* Rota para tela inicial do administrador (Com Drawer)*/}
      <Drawer.Screen name="Menu Administrador" component={AdminScreen} options={{ headerTitle: '' }} />
      {/* Rota para tela de cadastro de uma escola (Com Drawer)*/}
      <Drawer.Screen name="Cadastrar Escola" component={CadastrarEscola} options={{ headerTitle: '' }} />


    </Drawer.Navigator>
  );
}

{/* Botões customizados no Drawer */ }
function DrawerList(props, { navigation }) {

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem label="Nome do Usuário"
        icon={() => <Image style={{ width: 70, height: 70, borderRadius: 50 }} source={require('./assets/user-image.png')} />}
        onPress={() => { props.navigation.navigate('login') }}
      />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

{/* Tema do drawer */ }
const DrawerTheme = {
  ...DefaultTheme,
  colors: {
    primary: 'rgb(148, 84, 243)',
    card: 'rgb(255,255,255)',
    text: 'rgb(43,58,78)',
    border: 'rgb(255,255,255)',
  },
};