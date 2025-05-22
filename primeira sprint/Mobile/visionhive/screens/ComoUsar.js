import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ComoUsar({ navigation }) {
  return (
    <View style={styles.container}>
      <Header showMenu={false} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.titulo}>Como Usar o VisionHive</Text>
          <View style={styles.secao}>
            <Text style={styles.subtitulo}>Seleção de Filial</Text>
            <Text style={styles.texto}>
              Ao iniciar o gerenciamento, você deve selecionar a filial com a qual deseja trabalhar (1, 2 ou 3).
              Esta seleção determina quais motos serão exibidas e gerenciadas.
            </Text>
          </View>
          <View style={styles.secao}>
            <Text style={styles.subtitulo}>Gerenciar Pátio</Text>
            <Text style={styles.texto}>
              Na tela principal, você pode acessar as seguintes funcionalidades:
            </Text>
            <Text style={styles.topico}>• Cadastrar Moto: Adicione novas motos ao sistema</Text>
            <Text style={styles.topico}>• Mover Moto: Altere a localização de uma moto existente</Text>
            <Text style={styles.topico}>• Voltar pra Rua: Remova uma moto do estoque</Text>
          </View>
          <View style={styles.secao}>
            <Text style={styles.subtitulo}>Cadastro de Motos</Text>
            <Text style={styles.texto}>
              Ao cadastrar uma moto, você pode preencher:
            </Text>
            <Text style={styles.topico}>• Chassi: Identificador único da moto</Text>
            <Text style={styles.topico}>• Placa: Placa da moto</Text>
            <Text style={styles.topico}>• Número do Motor: Apenas números</Text>
            <Text style={styles.topico}>• Modelo: Modelo da moto</Text>
            <Text style={styles.topico}>• Situação: Estado atual da moto (Pronta, Em revisão, etc.)</Text>
            <Text style={styles.topico}>• Local: Onde a moto está localizada (Pátio, Revisão, etc.)</Text>
          </View>
          <View style={styles.secao}>
            <Text style={styles.subtitulo}>Mover Moto</Text>
            <Text style={styles.texto}>
              Para mover uma moto, informe o chassi, placa ou motor e selecione o novo local.
              O sistema confirmará a operação antes de efetuá-la.
            </Text>
          </View>
          <View style={styles.secao}>
            <Text style={styles.subtitulo}>Voltar pra Rua</Text>
            <Text style={styles.texto}>
              Para remover uma moto do estoque, informe o chassi, placa ou motor.
              Apenas motos que estejam no Pátio e com situação Pronta podem voltar para rua.
            </Text>
          </View>
          <View style={styles.secao}>
            <Text style={styles.subtitulo}>Lista de Motos</Text>
            <Text style={styles.texto}>
              Visualize todas as motos cadastradas na filial atual.
              Use o filtro para encontrar motos específicas por chassi, placa ou motor.
            </Text>
          </View>
          <View style={styles.secao}>
            <Text style={styles.subtitulo}>Mapa do Pátio</Text>
            <Text style={styles.texto}>
              Visualize o layout do pátio para melhor organização das motos.
            </Text>
          </View>
          <TouchableOpacity
            style={styles.botao}
            onPress={() => navigation.navigate('SelecionarFilial')}
          >
            <Text style={styles.botaoTexto}>Selecionar Filial</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  titulo: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  secao: {
    marginBottom: 25,
  },
  subtitulo: {
    color: '#0088ff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  texto: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 22,
  },
  topico: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 15,
    marginBottom: 5,
    lineHeight: 22,
  },
  botao: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
    alignSelf: 'center',
    width: '80%',
  },
  botaoTexto: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
