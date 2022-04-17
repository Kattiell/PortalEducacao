import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Alert, Image, } from 'react-native';
import Login from './components/Login';
import Esqueceu_Senha from './components/Esqueceu_Senha';
import { NavigationContainer, useNavigation, } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminScreen from './components/Admin';
import { createDrawerNavigator, DefaultTheme, DrawerItemList, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Acesso from './components/Acesso';
import CadastrarEscola from './components/Admin/CadastroEscola';
import CadastroProfessor from './components/Admin/CadastroProfessor';
import CadastroAluno from './components/Admin/CadastroAluno';
import { YellowBox } from 'react-native';
import LoginAluno from './components/LoginAluno';
import { LogBox } from 'react-native';
import AlunoScreen from './components/Aluno';
import LoginProf from './components/LoginProf';
import ProfScreen from './components/Professor';
import ipv4 from './../PortalEducacaoBack/ipv4.json';
import CriarAtividade from './components/Professor/CriarAtividade';
import SelectionScreen from './components/layout-components/Select/SelectionScreen';


LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
YellowBox.ignoreWarnings(['Warning: Async Storage has been extracted from react-native core']);


const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

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

        <Stack.Screen name="loginaluno">
          {(props) => <LoginAluno {...props} logo={require('./assets/logo.png')} />}
        </Stack.Screen>

        <Stack.Screen name="AlunoScreen" component={DrawerRoutesAluno} />

        <Stack.Screen name="loginprof">
          {(props) => <LoginProf {...props} logo={require('./assets/logo.png')} />}
        </Stack.Screen>

        <Stack.Screen name="profscreen" component={DrawerRoutesProfessor} />

        <Stack.Screen name="CriarAtividade" component={DrawerRoutesProfessor}/>

        {/* Rota para tela da página inicial do aplicativo*/}
        <Stack.Screen name="Acesso">
          {(props) => <Acesso {...props} logo={require('./assets/logo.png')} />}
        </Stack.Screen>

        {/* Rota para tela do Select (com fundo transparente) */}
        <Stack.Screen name="SelectionScreen" component={SelectionScreen} options={{presentation: 'transparentModal'}}/>

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
      {/* Rota para tela de cadastro de uma professor (Com Drawer)*/}
      <Drawer.Screen name="Cadastrar Professor" component={CadastroProfessor} options={{ headerTitle: '' }} />
      {/* Rota para tela de cadastro de uma aluno (Com Drawer)*/}
      <Drawer.Screen name="Cadastrar Aluno" component={CadastroAluno} options={{ headerTitle: '' }} />

    </Drawer.Navigator>

  );
}

function DrawerRoutesAluno({navigation}){
  return(
      <Drawer.Navigator  initialRouteName="Menu Aluno" drawerContent={(props) => <DrawerList {...props} />} >

         {/* Rota das funções do login aluno (Com Drawer)*/}
         <Drawer.Screen name="Menu Aluno"  component={AlunoScreen}   options={{ headerTitle: '' }}  />

      </Drawer.Navigator>
         
  )
}

function DrawerRoutesProfessor({navigation}){
  return(
      <Drawer.Navigator  initialRouteName="Menu Professor" drawerContent={(props) => <DrawerList {...props} />} >

         {/* Rota das funções do login aluno (Com Drawer)*/}
         <Drawer.Screen name="Menu Professor"  component={ProfScreen}   options={{ headerTitle: '' }}  />

         <Drawer.Screen name="CriarAtividade"  component={CriarAtividade}   options={{ headerTitle: '' }}  />

      </Drawer.Navigator>
         
  )
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


//DrawerALuno
//DrawerProf



/* Tema do drawer */
const DrawerTheme = {
  ...DefaultTheme,
  colors: {
    primary: 'rgb(148, 84, 243)',
    card: 'rgb(255,255,255)',
    text: 'rgb(43,58,78)',
    border: 'rgb(255,255,255)',
  },

};