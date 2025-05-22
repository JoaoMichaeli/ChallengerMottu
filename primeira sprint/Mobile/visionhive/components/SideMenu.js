import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function SideMenu({ navigation }) {

  const goTo = (screen) => {
    navigation.navigate(screen);
    navigation.closeDrawer();
  };

  return (
    <View style={styles.menu}>
      <TouchableOpacity onPress={() => goTo('MenuPrincipal')} style={styles.item}>
        <Text style={styles.text}>Menu Principal</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => goTo('MapaPatio')} style={styles.item}>
        <Text style={styles.text}>Mapa do Pátio</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => goTo('ListaMotos')} style={styles.item}>
        <Text style={styles.text}>Lista de Motos</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => goTo('GerenciarPatio')} style={styles.item}>
        <Text style={styles.text}>Gerenciar Pátio</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => goTo('CadastrarMoto')} style={styles.item}>
        <Text style={styles.text}>Cadastrar Moto</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => goTo('MoverMoto')} style={styles.item}>
        <Text style={styles.text}>Mover Moto</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => goTo('VoltarPraRua')} style={styles.item}>
        <Text style={styles.text}>Voltar pra Rua</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => goTo('SelecionarFilial')} style={styles.item}>
        <Text style={styles.text}>Trocar Filial</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    backgroundColor: '#222',
    padding: 20,
    flex: 1,
  },
  item: {
    marginBottom: 15,
    paddingVertical: 8,
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});
