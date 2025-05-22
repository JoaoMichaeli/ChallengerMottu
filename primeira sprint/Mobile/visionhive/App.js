import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

// Importações corretas das telas
import Dashboard from './screens/Dashboard';
import ComoUsar from './screens/ComoUsar';
import SelecionarFilial from './screens/SelecionarFilial';
import MenuPrincipal from './screens/MenuPrincipal';
import GerenciarPatio from './screens/GerenciarPatio';
import CadastrarMoto from './screens/CadastrarMoto';
import MoverMoto from './screens/MoverMoto';
import VoltarPraRua from './screens/VoltarPraRua';
import ListaMotos from './screens/ListaMotos';
import MapaPatio from './screens/MapaPatio';
import TrocarFilial from './screens/TrocarFilial';
import SideMenu from './components/SideMenu';

import { FilialProvider } from './context/FilialContext';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <SideMenu {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#111',
          width: 240,
        },
      }}
    >
      <Drawer.Screen name="MenuPrincipal" component={MenuPrincipal} />
      <Drawer.Screen name="GerenciarPatio" component={GerenciarPatio} />
      <Drawer.Screen name="ListaMotos" component={ListaMotos} />
      <Drawer.Screen name="MapaPatio" component={MapaPatio} />
      <Drawer.Screen name="CadastrarMoto" component={CadastrarMoto} />
      <Drawer.Screen name="MoverMoto" component={MoverMoto} />
      <Drawer.Screen name="VoltarPraRua" component={VoltarPraRua} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <FilialProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Dashboard"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="ComoUsar" component={ComoUsar} />
          <Stack.Screen name="SelecionarFilial" component={SelecionarFilial} />
          <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
          <Stack.Screen name="TrocarFilial" component={TrocarFilial} />
        </Stack.Navigator>
      </NavigationContainer>
    </FilialProvider>
  );
}
