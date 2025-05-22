import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MenuPrincipal = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header onMenuPress={() => navigation.openDrawer()} />
      <View style={styles.content}>
        <Text style={styles.title}>Menu Principal</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('GerenciarPatio')}
        >
          <Text style={styles.buttonText}>Gerenciar Pátio</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ListaMotos')}
        >
          <Text style={styles.buttonText}>Lista de Motos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('MapaPatio')}
        >
          <Text style={styles.buttonText}>Mapa do Pátio</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('CadastrarMoto')}
        >
          <Text style={styles.buttonText}>Cadastrar Moto</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('MoverMoto')}
        >
          <Text style={styles.buttonText}>Mover Moto</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('VoltarPraRua')}
        >
          <Text style={styles.buttonText}>Voltar para Rua</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('TrocarFilial')}
        >
          <Text style={styles.buttonText}>Trocar Filial</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#fff',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MenuPrincipal;
