import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { FilialContext } from '../context/FilialContext';
import Header from '../components/Header';
import Footer from '../components/Footer';


export default function MapaPatio({ navigation }) {
  const { filial } = useContext(FilialContext);

  return (
    <View style={styles.container}>
      <Header
        onMenuPress={() => navigation.openDrawer()}
        showBackButton={true}
        onBackPress={() => navigation.navigate('MenuPrincipal')}
      />

      <View style={styles.content}>
        <Text style={styles.titulo}>Mapa do Pátio</Text>

        <Image
          source={require('../assets/imgpatio.png')}
          style={styles.imagem}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.filial}>Filial: {filial}</Text>
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
  titulo: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 15,
  },
  imagem: {
    width: '100%',
    height: undefined,
    aspectRatio: 1.0,
  },
  filial: {
    color: '#0f0',
    fontSize: 22,
    position: 'absolute',
    top: 75,
    right: 15,
  },
});
