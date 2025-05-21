import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert
} from 'react-native';
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

    const motoEncontrada = motos[index];

    Alert.alert(
      'Confirmação',
      `Deseja realmente mover a moto ${motoEncontrada.modelo || ''} (${busca}) para ${novaLocalizacao}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Confirmar',
          onPress: async () => {
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
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Header onMenuPress={() => navigation.openDrawer()} />
      <Text style={styles.filial}>Filial: {filial}</Text>

      <View style={styles.content}>
        <Text style={styles.titulo}>Mover Moto</Text>

        <Text style={styles.label}>Buscar por Chassi, Placa ou Motor:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: ABC1234 ou 9CHASSI..."
          placeholderTextColor="#888"
          value={busca}
          onChangeText={setBusca}
        />

        <Text style={styles.label}>Novo Local:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={novaLocalizacao}
            style={styles.picker}
            dropdownIconColor="#fff"
            onValueChange={(itemValue) => setNovaLocalizacao(itemValue)}
          >
            <Picker.Item label="Pátio" value="Pátio" />
            <Picker.Item label="Revisão" value="Revisão" />
            <Picker.Item label="Oficina" value="Oficina" />
            <Picker.Item label="Qualidade" value="Qualidade" />
          </Picker>
        </View>

        <View style={styles.botao}>
          <Button
            title="MOVER MOTO"
            onPress={mover}
            color="#0088ff"
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
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  filial: {
    color: '#0f0',
    fontSize: 18,
    alignSelf: 'flex-end',
    marginTop: 10,
    marginRight: 20,
  },
  titulo: {
    color: '#fff',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 4,
    marginBottom: 20,
    backgroundColor: '#111',
  },
  picker: {
    color: '#fff',
    height: 50,
  },
  botao: {
    width: '100%',
  },
});
