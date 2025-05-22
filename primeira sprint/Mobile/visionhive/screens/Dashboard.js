import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Dashboard = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Header showMenu={false} />

      <View style={styles.content}>
        <Image
          source={require('../assets/visionhiveicon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Bem vindo ao VisionHive</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ComoUsar')}
        >
          <Text style={styles.buttonText}>Como Usar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SelecionarFilial')}
        >
          <Text style={styles.buttonText}>Selecionar Filial</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Dashboard;
