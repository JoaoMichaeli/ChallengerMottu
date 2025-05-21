import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function SideMenu({ navigation, close }) {
  const goTo = (screen) => {
    navigation.navigate(screen);
    close();
  };

  return (
    <View style={styles.menu}>
      <TouchableOpacity onPress={() => goTo('SelecionarFilial')} style={styles.item}>
        <Text style={styles.text}>Selecionar Filial</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    backgroundColor: '#222',
    padding: 20,
  },
  item: {
    marginBottom: 15,
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});
