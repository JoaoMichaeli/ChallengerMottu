import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import SelecionarFilial from './screens/SelecionarFilial';
import MapaPatio from './screens/MapaPatio';
import ListaMotos from './screens/ListaMotos';
import GerenciarPatio from './screens/GerenciarPatio';
import CadastrarMoto from './screens/CadastrarMoto';
import MoverMoto from './screens/MoverMoto';
import VoltarPraRua from './screens/VoltarPraRua';
import TrocarFilial from './screens/TrocarFilial';

import { FilialProvider } from './context/FilialContext';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function MenuPrincipal() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="MapaPatio" component={MapaPatio} options={{ title: 'Mapa do Pátio' }} />
      <Drawer.Screen name="ListaMotos" component={ListaMotos} options={{ title: 'Lista de Motos' }} />
      <Drawer.Screen name="GerenciarPatio" component={GerenciarPatio} options={{ title: 'Gerenciar Pátio' }} />
      <Drawer.Screen name="CadastrarMoto" component={CadastrarMoto} options={{ title: 'Cadastrar Moto' }} />
      <Drawer.Screen name="MoverMoto" component={MoverMoto} options={{ title: 'Mover Moto' }} />
      <Drawer.Screen name="VoltarPraRua" component={VoltarPraRua} options={{ title: 'Voltar pra Rua' }} />
      <Drawer.Screen name="TrocarFilial" component={TrocarFilial} options={{ title: 'Trocar Filial' }} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <FilialProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="SelecionarFilial">
          <Stack.Screen name="SelecionarFilial" component={SelecionarFilial} />
          <Stack.Screen name="MenuPrincipal" component={MenuPrincipal} />
        </Stack.Navigator>
      </NavigationContainer>
    </FilialProvider>
  );
}
