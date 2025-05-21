import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
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

    const unsubscribe = navigation.addListener('focus', () => {
      carregarMotos();
    });

    return unsubscribe;
  }, [filial, navigation]);

  useEffect(() => {
    if (filtro.trim() === '') {
      setMotosFiltradas(motos);
    } else {
      const termoBusca = filtro.toLowerCase().trim();
      const resultado = motos.filter(moto =>
        (moto.chassi && moto.chassi.toLowerCase().includes(termoBusca)) ||
        (moto.placa && moto.placa.toLowerCase().includes(termoBusca)) ||
        (moto.motor && moto.motor.toString().includes(termoBusca))
      );
      setMotosFiltradas(resultado);
    }
  }, [filtro, motos]);

  return (
    <View style={styles.container}>
      <Header onMenuPress={() => navigation.openDrawer()} />
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

      {motosFiltradas.length > 0 ? (
        <View style={styles.tableContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.headerCell}>Chassi</Text>
            <Text style={styles.headerCell}>Placa</Text>
            <Text style={styles.headerCell}>Motor</Text>
            <Text style={styles.headerCell}>Modelo</Text>
            <Text style={styles.headerCell}>Situação</Text>
            <Text style={styles.headerCell}>Local</Text>
          </View>

          <ScrollView>
            {motosFiltradas.map((moto, index) => (
              <View key={index} style={[styles.dataRow, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
                <Text style={styles.dataCell}>{moto.chassi || '-'}</Text>
                <Text style={styles.dataCell}>{moto.placa || '-'}</Text>
                <Text style={styles.dataCell}>{moto.motor || '-'}</Text>
                <Text style={styles.dataCell}>{moto.modelo || '-'}</Text>
                <Text style={styles.dataCell}>{moto.situacao || '-'}</Text>
                <Text style={styles.dataCell}>{moto.local || '-'}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            {motos.length === 0 ? 'Nenhuma moto cadastrada' : 'Nenhuma moto encontrada com o filtro aplicado'}
          </Text>
        </View>
      )}

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
    marginTop: 10,
    marginRight: 20,
  },
  titulo: {
    color: '#fff',
    fontSize: 22,
    textAlign: 'center',
    marginVertical: 15,
  },
  filtroContainer: {
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  filtroInput: {
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 4,
    color: '#fff',
    padding: 10,
  },
  tableContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#000',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#333',
  },
  headerCell: {
    flex: 1,
    color: '#0088ff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  dataRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  evenRow: {
    backgroundColor: '#111',
  },
  oddRow: {
    backgroundColor: '#222',
  },
  dataCell: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#fff',
    fontSize: 18,
  },
});
