import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FilialContext = createContext();

export const FilialProvider = ({ children }) => {
  const [filial, setFilial] = useState(null);

  useEffect(() => {
    const carregarFilial = async () => {
      try {
        const valorSalvo = await AsyncStorage.getItem('@filial');
        if (valorSalvo !== null) {
          setFilial(valorSalvo);
        }
      } catch (e) {
        console.error('Erro ao carregar a filial:', e);
      }
    };

    carregarFilial();
  }, []);

  const atualizarFilial = async (novaFilial) => {
    try {
      await AsyncStorage.setItem('@filial', novaFilial);
      setFilial(novaFilial);
    } catch (e) {
      console.error('Erro ao salvar a filial:', e);
    }
  };

  const limparFilial = async () => {
    try {
      await AsyncStorage.removeItem('@filial');
      setFilial(null);
    } catch (e) {
      console.error('Erro ao limpar a filial:', e);
    }
  };

  return (
    <FilialContext.Provider value={{ filial, atualizarFilial, limparFilial }}>
      {children}
    </FilialContext.Provider>
  );
};
