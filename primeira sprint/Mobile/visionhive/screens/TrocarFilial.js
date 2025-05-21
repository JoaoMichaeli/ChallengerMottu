import React, { useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { FilialContext } from '../context/FilialContext';
import Header from '../components/Header';

export default function TrocarFilial({ navigation }) {
  const { limparFilial } = useContext(FilialContext);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      await limparFilial();
      navigation.reset({
        index: 0,
        routes: [{ name: 'SelecionarFilial' }],
      });
    }, 1000); // tempo maior para garantir renderização do Header

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <Header onMenuPress={() => navigation.openDrawer()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 40, // garante espaço pra barra de status e header
  },
});
