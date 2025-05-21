import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FilialContext } from '../context/FilialContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function VoltarPraRua({ navigation }) {
  const { filial } = useContext(FilialContext);
  const [busca, setBusca] = useState('');
  const [motos, setMotos] = useState([]);

  useEffect(() => {
    const carregar = async () => {
      const chave = `@motos_filial_${filial}`;
      const dados = await AsyncStorage.getItem(chave);
      const lista = dados ? JSON.parse(dados) : [];
      setMotos(lista);
    };
    carregar();
  }, [filial]);

  const remover = async () => {
    if (!busca) {
      Alert.alert('Erro', 'Informe chassi, placa ou motor.');
      return;
    }

    const motoIndex = motos.findIndex(
      (m) =>
        m.chassi === busca ||
        m.placa === busca ||
        m.motor === busca
    );

    if (motoIndex === -1) {
      Alert.alert('Não encontrada', 'Nenhuma moto com esse identificador.');
      return;
    }

    const moto = motos[motoIndex];

    if (moto.local !== 'Pátio') {
      Alert.alert('Operação não permitida', `Esta moto está em "${moto.local}". Apenas motos no "Pátio" podem voltar para rua.`);
      return;
    }

    if (moto.situacao !== 'Pronta') {
      Alert.alert('Operação não permitida', `Esta moto está com situação "${moto.situacao}". Apenas motos com situação "Pronta" podem voltar para rua.`);
      return;
    }

    Alert.alert(
      'Confirmação',
      `A moto ${moto.modelo || ''} (${busca}) sairá do estoque. Confirma que esta moto está voltando para rua?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Confirmar',
          onPress: async () => {
            try {
              const novaLista = motos.filter((_, index) => index !== motoIndex);
              const chave = `@motos_filial_${filial}`;
              await AsyncStorage.setItem(chave, JSON.stringify(novaLista));
              setMotos(novaLista);
              setBusca('');
              Alert.alert('Sucesso', 'Moto removida com sucesso.');
            } catch (e) {
              console.error('Erro ao remover moto:', e);
              Alert.alert('Erro', 'Não foi possível remover a moto.');
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
        <Text style={styles.titulo}>Voltar pra Rua</Text>

        <Text style={styles.label}>Buscar por Chassi, Placa ou Motor:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: XYZ1234 ou 9CHASSI..."
          placeholderTextColor="#888"
          value={busca}
          onChangeText={setBusca}
        />

        <View style={styles.botao}>
          <Button
            title="VOLTAR PRA RUA"
            onPress={remover}
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
  botao: {
    width: '100%',
  },
});
