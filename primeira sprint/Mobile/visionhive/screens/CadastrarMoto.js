import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FilialContext } from '../context/FilialContext';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CadastrarMoto({ navigation }) {
  const { filial } = useContext(FilialContext);

  const [chassi, setChassi] = useState('');
  const [placa, setPlaca] = useState('');
  const [motor, setMotor] = useState('');
  const [modelo, setModelo] = useState('');
  const [situacao, setSituacao] = useState('');
  const [local, setLocal] = useState('');

  const handleCadastro = async () => {
    if (!chassi || !placa || !motor || !modelo || !situacao || !local) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    const novaMoto = { chassi, placa, motor, modelo, situacao, local };

    try {
      const chave = `@motos_filial_${filial}`;
      const dadosExistentes = await AsyncStorage.getItem(chave);
      const lista = dadosExistentes ? JSON.parse(dadosExistentes) : [];

      lista.push(novaMoto);
      await AsyncStorage.setItem(chave, JSON.stringify(lista));

      Alert.alert('Sucesso', 'Moto cadastrada com sucesso.');

      setChassi('');
      setPlaca('');
      setMotor('');
      setModelo('');
      setSituacao('');
      setLocal('');
    } catch (e) {
      console.error('Erro ao salvar:', e);
      Alert.alert('Erro', 'Não foi possível salvar a moto.');
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

      <ScrollView contentContainerStyle={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="Chassi"
          placeholderTextColor="#aaa"
          value={chassi}
          onChangeText={setChassi}
        />
        <TextInput
          style={styles.input}
          placeholder="Placa"
          placeholderTextColor="#aaa"
          value={placa}
          onChangeText={setPlaca}
        />
        <TextInput
          style={styles.input}
          placeholder="N. Motor"
          placeholderTextColor="#aaa"
          value={motor}
          onChangeText={setMotor}
        />
        <TextInput
          style={styles.input}
          placeholder="Modelo"
          placeholderTextColor="#aaa"
          value={modelo}
          onChangeText={setModelo}
        />
        <TextInput
          style={styles.input}
          placeholder="Situação"
          placeholderTextColor="#aaa"
          value={situacao}
          onChangeText={setSituacao}
        />
        <TextInput
          style={styles.input}
          placeholder="Local"
          placeholderTextColor="#aaa"
          value={local}
          onChangeText={setLocal}
        />
        <Button title="Cadastrar Moto" onPress={handleCadastro} color="#007bff" />
      </ScrollView>

      <Footer />
    </View>
  );
}
