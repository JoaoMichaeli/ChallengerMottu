import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FilialContext } from '../context/FilialContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ListaMotos({ navigation }) {
  const { filial } = useContext(FilialContext);
  const [motos, setMotos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [motosFiltradas, setMotosFiltradas] = useState([]);

  useEffect(() => {
    const carregarMotos = async () => {
      const chave = `@motos_filial_${filial}`;
      const dados = await AsyncStorage.getItem(chave);
      const lista = dados ? JSON.parse(dados) : [];
      setMotos(lista);
      setMotosFiltradas(lista);
    };
    carregarMotos();
  }, [filial]);

  useEffect(() => {
    if (filtro) {
      const filtradas = motos.filter(
        moto =>
          (moto.chassi && moto.chassi.toLowerCase().includes(filtro.toLowerCase())) ||
          (moto.placa && moto.placa.toLowerCase().includes(filtro.toLowerCase())) ||
          (moto.motor && moto.motor.toString().includes(filtro))
      );
      setMotosFiltradas(filtradas);
    } else {
      setMotosFiltradas(motos);
    }
  }, [filtro, motos]);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.texto}>Chassi: {item.chassi}</Text>
      <Text style={styles.texto}>Placa: {item.placa}</Text>
      <Text style={styles.texto}>Motor: {item.motor}</Text>
      <Text style={styles.texto}>Modelo: {item.modelo}</Text>
      <Text style={styles.texto}>Situação: {item.situacao}</Text>
      <Text style={styles.texto}>Local: {item.local}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header
        onMenuPress={() => navigation.openDrawer()}
        showBackButton={true}
        onBackPress={() => navigation.navigate('MenuPrincipal')}
      />
      <Text style={styles.filial}>Filial: {filial}</Text>
      <Text style={styles.titulo}>Lista de Motos</Text>

      <View style={styles.filtroContainer}>
        <TextInput
          style={styles.filtroInput}
          placeholder="Filtrar por chassi, placa ou motor"
          placeholderTextColor="#888"
          value={filtro}
          onChangeText={setFiltro}
        />
      </View>

      <FlatList
        data={motosFiltradas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <Text style={styles.mensagemVazia}>
            {motos.length === 0 ? "Nenhuma moto cadastrada" : "Nenhuma moto encontrada com o filtro aplicado"}
          </Text>
        }
      />
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
    fontSize: 22,
    alignSelf: 'flex-end',
    marginRight: 20,
    marginBottom: 10,
  },
  titulo: {
    color: '#fff',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 10,
  },
  filtroContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  filtroInput: {
    backgroundColor: '#222',
    color: '#fff',
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    padding: 10,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  texto: {
    color: '#fff',
    fontSize: 14,
  },
  mensagemVazia: {
    color: '#888',
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
  },
});
