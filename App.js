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
import HorariosProfessor from './components/Admin/CadastroCronogramaAula';
import CadastrarTurma from './components/Admin/CadastroTurma';
import PostarConteudo from './components/Professor/PostarConteudo';
import AcessoAtividade from './components/Aluno/AcessoAtividades';
import TirarDuvida from './components/Aluno/TirarDuvidas';
import HorariosAula from './components/Aluno/HorariosAula';
import VerConteudo from './components/Aluno/VerConteudos';
import CronogramaDeAula from './components/Professor/CronogramaDeAula';
import AcessarDuvidas from './components/Professor/AcessoDuvidas';
import CadastrarMaterial from './components/Professor/CadastrarMaterial';
import PostarAtividade from './components/Professor/PostarAtividade';
import Text from 'react-native';
import TermoResponsabilidade from './components/Admin/TermoResponsabilidade';
import AuthNumero from '././components/Autenticação/AuthNumero'
import AuthCodigoScreen from '././components/Autenticação/CodigoAuthNumero'
//logs
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
YellowBox.ignoreWarnings(['Warning: Async Storage has been extracted from react-native core']);


const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer theme={DrawerTheme}>
      <Stack.Navigator initialRouteName='Acesso' screenOptions={{ headerShown: false, }} options={{ presentation: 'transparentModal' }}>

        {/* Rota para tela de login do usuário*/}
        <Stack.Screen name="login">
          {(props) => <Login {...props} logo={require('./assets/logo.png')} />}
        </Stack.Screen>

        <Stack.Screen name="loginaluno">
          {(props) => <LoginAluno {...props} logo={require('./assets/logo.png')} />}
        </Stack.Screen>

        <Stack.Screen name="loginprof">
          {(props) => <LoginProf {...props} logo={require('./assets/logo.png')} />}
        </Stack.Screen>

        {/* -------------------------------------------------------------------------- */}

        {/* Rota para tela de reset de senha*/}
        <Stack.Screen name="Esqueceu_senha" component={Esqueceu_Senha} />

        {/* Rota para tela inicial do administrador (Com Drawer)*/}
        <Stack.Screen name="AdminScreen" component={DrawerRoutes} />

        {/* Rota para tela do sms (Com Drawer)*/}
        <Stack.Screen name="PhoneScreen" component={AuthNumero} />

        {/* Rota para tela inicial do Aluno (Com Drawer)*/}

        <Stack.Screen name="AlunoScreen" component={DrawerRoutesAluno} />

        <Stack.Screen name="Visualizar Conteudo" component={DrawerRoutesAluno} />

        <Stack.Screen name="Tirar Duvidas" component={DrawerRoutesAluno} />

        <Stack.Screen name="Horarios de Aula" component={DrawerRoutesAluno} />

        <Stack.Screen name="Acessar Atividades" component={DrawerRoutesAluno} />

        {/* Rota para a tela inicia do professor */}
        <Stack.Screen name="profscreen" component={DrawerRoutesProfessor} />

        <Stack.Screen name="CriarAtividade" component={DrawerRoutesProfessor} />

        <Stack.Screen name="PostarConteudo" component={DrawerRoutesProfessor} />

        <Stack.Screen name="AcessarDuvidas" component={DrawerRoutesProfessor} />

        <Stack.Screen name="CronogramaDeAula" component={DrawerRoutesProfessor} />


        {/* Rota para tela da página inicial do aplicativo*/}
        <Stack.Screen name="Acesso">
          {(props) => <Acesso {...props} logo={require('./assets/logo.png')} />}
        </Stack.Screen>

        {/* Rota para tela do Select (com fundo transparente) */}
        <Stack.Screen name="SelectionScreen" component={SelectionScreen} options={{ presentation: 'transparentModal' }} />
        {/* Rota para tela do Select (com fundo transparente) */}
        <Stack.Screen name="CadastrarMaterial" component={CadastrarMaterial} options={{ presentation: 'transparentModal' }} />
         {/* Rota para tela do Select (com fundo transparente) */}
         <Stack.Screen name="PostarAtividade" component={PostarAtividade} options={{ presentation: 'transparentModal' }} />
         {/* */}
         <Stack.Screen name="TermoDeDados" component={TermoResponsabilidade} options={{ presentation: 'transparentModal' }} />
           {/* */}
         <Stack.Screen name="AuthCodigoScreen" component={AuthCodigoScreen} options={{ presentation: 'transparentModal' }} />
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
      {/* Rota para tela de cadastro de uma turma (Com Drawer)*/}
      <Drawer.Screen name="Cadastrar Turma" component={CadastrarTurma} options={{ headerTitle: '' }} />
      {/* Rota para tela de cadastro de uma professor (Com Drawer)*/}
      <Drawer.Screen name="Cadastrar Professor" component={CadastroProfessor} options={{ headerTitle: '' }} />
      {/* Rota para tela de cadastro de um professor (Com Drawer)*/}
      <Drawer.Screen name="Cadastrar Horario Professor" component={HorariosProfessor} options={{ headerTitle: '' }} />
      {/* Rota para tela de cadastro de uma aluno (Com Drawer)*/}
      <Drawer.Screen name="Cadastrar Aluno" component={CadastroAluno} options={{ headerTitle: '' }} />

    </Drawer.Navigator>

  );
}

function DrawerRoutesAluno({ navigation }) {
  return (
    <Drawer.Navigator initialRouteName="Menu Aluno" drawerContent={(props) => <DrawerList {...props} />} >

      {/* Rota das funções do login aluno (Com Drawer)*/}
      <Drawer.Screen name="Menu do Aluno" component={AlunoScreen} options={{ headerTitle: '' }} />
      {/* Rota das funções de acessar atividade do aluno (Com Drawer)*/}
      <Drawer.Screen name="Acessar Atividades" component={AcessoAtividade} options={{ headerTitle: '' }} />
      {/* Rota das funções de ver material postado para o aluno (Com Drawer)*/}
      <Drawer.Screen name="Visualizar Material" component={VerConteudo} options={{ headerTitle: '' }} />
      {/* Rota das funções de ver o hraroio de aula do aluno (Com Drawer)*/}
      <Drawer.Screen name="Horarios De Aula" component={HorariosAula} options={{ headerTitle: '' }} />
      {/* Rota das funções de tirar duvidas do aluno (Com Drawer)*/}
      <Drawer.Screen name="Forum De Duvidas" component={TirarDuvida} options={{ headerTitle: '' }} />

    </Drawer.Navigator>

  )
}

function DrawerRoutesProfessor({ navigation }) {
  return (
    <Drawer.Navigator initialRouteName="Menu Professor" drawerContent={(props) => <DrawerList {...props} />} >

      {/* Rota das funções do login aluno (Com Drawer)*/}
      <Drawer.Screen name="Menu Professor" component={ProfScreen} options={{ headerTitle: '' }} />
      {/* Rota das funções de criar atividade do professor (Com Drawer)*/}
      <Drawer.Screen name="Criar Atividade" component={CriarAtividade} options={{ headerTitle: '' }} />
      {/* Rota das funções de postar atividade professor(Com Drawer)*/}
      <Drawer.Screen name="Postar Conteudo" component={PostarConteudo} options={{ headerTitle: '' }} />
      {/* Rota das funções acessar duvidas (Com Drawer)*/}
      <Drawer.Screen name="Acesso Duvidas" component={AcessarDuvidas} options={{ headerTitle: '' }} />
      {/* Rota das funções cronograma de aula (Com Drawer)*/}
      <Drawer.Screen name="Cronograma De Aula" component={CronogramaDeAula} options={{ headerTitle: '' }} />

    </Drawer.Navigator>

  )
}


{/* Botões customizados no Drawer */ }
function DrawerList(props, { navigation }) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem label={'Administrador'}
        icon={() => <Image style={{ width: 70, height: 70, borderRadius: 50 }} source={require('./assets/user-image.png')} />}
        onPress={() => { props.navigation.navigate('login') }}

      />
      
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}


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