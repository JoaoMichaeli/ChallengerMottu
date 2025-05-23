import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FilialContext } from '../context/FilialContext';
import { Picker } from '@react-native-picker/picker';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function MoverMoto({ navigation }) {
  const { filial } = useContext(FilialContext);

  const [busca, setBusca] = useState('');
  const [novaLocalizacao, setNovaLocalizacao] = useState('Pátio');
  const [motos, setMotos] = useState([]);

  useEffect(() => {
    const carregarMotos = async () => {
      try {
        const chave = `@motos_filial_${filial}`;
        const dados = await AsyncStorage.getItem(chave);
        const lista = dados ? JSON.parse(dados) : [];
        setMotos(lista);
      } catch (e) {
        console.error('Erro ao carregar motos:', e);
      }
    };
    carregarMotos();
  }, [filial]);

  const mover = async () => {
    if (!busca) {
      Alert.alert('Erro', 'Informe chassi, placa ou motor.');
      return;
    }

    const index = motos.findIndex(
      (m) =>
        m.chassi === busca ||
        m.placa === busca ||
        m.motor === busca
    );

    if (index === -1) {
      Alert.alert('Não encontrada', 'Nenhuma moto com esse identificador.');
      return;
    }

    const motosAtualizadas = [...motos];
    motosAtualizadas[index].local = novaLocalizacao;

    try {
      const chave = `@motos_filial_${filial}`;
      await AsyncStorage.setItem(chave, JSON.stringify(motosAtualizadas));
      setMotos(motosAtualizadas);
      Alert.alert('Sucesso', 'Local da moto atualizado.');
      setBusca('');
    } catch (e) {
      console.error('Erro ao atualizar moto:', e);
      Alert.alert('Erro', 'Falha ao salvar nova localização.');
    }
  };

  return (
    <View style={styles.container}>
      <Header
        onMenuPress={() => navigation.openDrawer()}
        showBackButton={true}
        onBackPress={() => navigation.navigate('MenuPrincipal')}
      />
      <Text style={styles.filial}>Filial: {filial}</Text>

      <View style={styles.content}>
        <Text style={styles.label}>Buscar por Chassi, Placa ou Motor:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: ABC1234 ou 9CHASSI..."
          placeholderTextColor="#888"
          value={busca}
          onChangeText={setBusca}
        />

        <Text style={styles.label}>Novo Local:</Text>
        <Picker
          selectedValue={novaLocalizacao}
          style={styles.picker}
          onValueChange={(itemValue) => setNovaLocalizacao(itemValue)}
        >
          <Picker.Item label="Pátio" value="Pátio" />
          <Picker.Item label="Revisão" value="Revisão" />
          <Picker.Item label="Oficina" value="Oficina" />
          <Picker.Item label="Qualidade" value="Qualidade" />
        </Picker>

        <Button title="Mover Moto" onPress={mover} color="#0088ff" />
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
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 10,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    color: '#fff',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    color: '#fff',
    marginBottom: 20,
    padding: 10,
    borderRadius: 4,
  },
  picker: {
    color: '#fff',
    backgroundColor: '#111',
    marginBottom: 20,
  },
});
