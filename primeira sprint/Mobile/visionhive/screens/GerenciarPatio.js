import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { FilialContext } from '../context/FilialContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function GerenciarPatio({ navigation }) {
  const { filial } = useContext(FilialContext);

  return (
    <View style={styles.container}>
      <Header onMenuPress={() => navigation.openDrawer()} />

      <View style={styles.content}>
        <Text style={styles.filial}>Filial: {filial}</Text>
        <Text style={styles.titulo}>Gerenciar Pátio</Text>

        <View style={styles.botoes}>
          <Button
            title="Cadastrar Moto"
            onPress={() => navigation.navigate('CadastrarMoto')}
          />
          <View style={styles.espaco} />
          <Button
            title="Mover Moto"
            onPress={() => navigation.navigate('MoverMoto')}
          />
          <View style={styles.espaco} />
          <Button
            title="Voltar pra Rua"
            onPress={() => navigation.navigate('VoltarPraRua')}
          />
        </View>
      </View>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  filial: {
    color: '#0f0',
    fontSize: 18,
    position: 'absolute',
    top: 60, // para ficar logo abaixo do Header
    right: 15,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20, // garante distância do Header
    paddingBottom: 30, // espaço para o Footer
  },
  titulo: {
    color: '#fff',
    fontSize: 22,
    marginBottom: 20,
  },
  botoes: {
    width: '80%',
    gap: 15,
  },
  espaco: {
    height: 15,
  },
});
