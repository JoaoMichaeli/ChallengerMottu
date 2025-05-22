import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { FilialContext } from '../context/FilialContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function SelecionarFilial({ navigation }) {
  const [valor, setValor] = useState('');
  const { filial, atualizarFilial } = useContext(FilialContext);

  useEffect(() => {
    if (filial) {
      setValor(filial);
    }
  }, [filial]);

  const confirmar = () => {
    const valorLimpo = valor.trim();
    if (['1', '2', '3'].includes(valorLimpo)) {
      atualizarFilial(valorLimpo);
      // Corrigido para navegar para DrawerNavigator em vez de MenuPrincipal
      navigation.reset({
        index: 0,
        routes: [{ name: 'DrawerNavigator' }],
      });
    } else {
      Alert.alert('Erro', 'Digite uma filial válida (1, 2 ou 3)');
    }
  };

  return (
    <View style={styles.container}>
      <Header showMenu={false} />
      <View style={styles.content}>
        <Text style={styles.label}>Selecione sua filial</Text>
        <TextInput
          style={styles.input}
          placeholder="1, 2 ou 3"
          placeholderTextColor="#888"
          value={valor}
          onChangeText={setValor}
          keyboardType="numeric"
        />
        <View style={styles.botao}>
          <Button title="CONFIRMAR" onPress={confirmar} color="#007bff" />
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  label: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    color: '#fff',
    borderColor: '#fff',
    borderWidth: 1,
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 15,
    height: 40,
  },
  botao: {
    width: '100%',
  },
});
