import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FilialContext } from '../context/FilialContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

export default function CadastrarMoto({ navigation }) {
  const { filial } = useContext(FilialContext);
  const [chassi, setChassi] = useState('');
  const [placa, setPlaca] = useState('');
  const [motor, setMotor] = useState('');
  const [modelo, setModelo] = useState('');
  const [situacao, setSituacao] = useState('Pronta');
  const [local, setLocal] = useState('Pátio');

  const verificarDuplicidade = async (novaMoto) => {
    try {
      const chave = `@motos_filial_${filial}`;
      const dadosExistentes = await AsyncStorage.getItem(chave);

      if (!dadosExistentes) return false;

      const lista = JSON.parse(dadosExistentes);

      const duplicada = lista.some(moto =>
        (novaMoto.chassi && moto.chassi === novaMoto.chassi) ||
        (novaMoto.placa && moto.placa === novaMoto.placa) ||
        (novaMoto.motor && moto.motor === novaMoto.motor)
      );

      return duplicada;
    } catch (e) {
      console.error('Erro ao verificar duplicidade:', e);
      return false;
    }
  };

  const handleCadastro = async () => {
    const motorInt = motor ? parseInt(motor, 10) : null;

    if (motor && isNaN(motorInt)) {
      Alert.alert('Erro', 'O número do motor deve ser um valor numérico.');
      return;
    }

    const novaMoto = {
      chassi: chassi || '',
      placa: placa || '',
      motor: motorInt,
      modelo: modelo || '',
      situacao: situacao || 'Pronta',
      local: local || 'Pátio'
    };

    try {
      const duplicada = await verificarDuplicidade(novaMoto);

      if (duplicada) {
        Alert.alert('Erro', 'Já existe uma moto cadastrada com o mesmo chassi, placa ou número de motor.');
        return;
      }

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
      setSituacao('Pronta');
      setLocal('Pátio');
    } catch (e) {
      console.error('Erro ao salvar:', e);
      Alert.alert('Erro', 'Não foi possível salvar a moto.');
    }
  };

  return (
    <View style={styles.container}>
      <Header onMenuPress={() => navigation.openDrawer()} />
      <Text style={styles.filial}>Filial: {filial}</Text>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{flex: 1}}
      >
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.titulo}>Cadastrar Moto</Text>

          <Text style={styles.label}>Chassi:</Text>
          <TextInput
            style={styles.input}
            placeholder="Chassi"
            placeholderTextColor="#aaa"
            value={chassi}
            onChangeText={setChassi}
          />

          <Text style={styles.label}>Placa:</Text>
          <TextInput
            style={styles.input}
            placeholder="Placa"
            placeholderTextColor="#aaa"
            value={placa}
            onChangeText={setPlaca}
          />

          <Text style={styles.label}>Número do Motor (apenas números):</Text>
          <TextInput
            style={styles.input}
            placeholder="Número do Motor"
            placeholderTextColor="#aaa"
            value={motor}
            onChangeText={setMotor}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Modelo:</Text>
          <TextInput
            style={styles.input}
            placeholder="Modelo"
            placeholderTextColor="#aaa"
            value={modelo}
            onChangeText={setModelo}
          />

          <Text style={styles.label}>Situação:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={situacao}
              style={styles.picker}
              dropdownIconColor="#fff"
              onValueChange={(itemValue) => setSituacao(itemValue)}
            >
              <Picker.Item label="Pronta" value="Pronta" />
              <Picker.Item label="Em revisão" value="Em revisão" />
              <Picker.Item label="Com pendência" value="Com pendência" />
              <Picker.Item label="Em manutenção" value="Em manutenção" />
            </Picker>
          </View>

          <Text style={styles.label}>Local:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={local}
              style={styles.picker}
              dropdownIconColor="#fff"
              onValueChange={(itemValue) => setLocal(itemValue)}
            >
              <Picker.Item label="Pátio" value="Pátio" />
              <Picker.Item label="Manutenção" value="Manutenção" />
              <Picker.Item label="Manutenção Rápida" value="Manutenção Rápida" />
            </Picker>
          </View>

          <View style={styles.botao}>
            <Button
              title="CADASTRAR MOTO"
              onPress={handleCadastro}
              color="#0088ff"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

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
    padding: 20,
    paddingBottom: 40,
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
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    color: '#fff',
    padding: 10,
    borderRadius: 4,
    marginBottom: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 4,
    marginBottom: 10,
    backgroundColor: '#111',
  },
  picker: {
    color: '#fff',
    height: 50,
  },
  botao: {
    marginTop: 20,
    width: '100%',
  },
});
