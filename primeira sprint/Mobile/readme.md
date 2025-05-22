# VisionHive - Sistema de Gerenciamento de Pátio

## 📌 Descrição do Projeto

O VisionHive é um aplicativo mobile desenvolvido para automatizar e otimizar a gestão das motos nos pátios da empresa. O sistema permite o controle completo do fluxo de motos, desde o cadastro até a saída, com uma interface intuitiva e responsiva que funciona em qualquer dispositivo.

## 🎯 Objetivos

- Facilitar o cadastro e localização de motos no pátio
- Permitir a visualização rápida do status de cada moto
- Gerenciar múltiplas filiais com diferentes layouts de pátio
- Oferecer uma interface intuitiva, acessível por dispositivos móveis
- Agilizar os processos de movimentação e liberação de motos

## 🚨 Problema Resolvido

Com centenas de motos distribuídas em diversos pátios, a empresa enfrenta dificuldades operacionais para localizar rapidamente veículos específicos, gerando atrasos logísticos e desperdício de tempo da equipe.

## 💡 Nossa Solução

O _VisionHive_ propõe um sistema mobile completo que permite:

- Cadastro detalhado de motos com informações de chassi, placa e motor
- Visualização do mapa do pátio para localização rápida
- Controle de movimentação entre diferentes áreas
- Gerenciamento de múltiplas filiais
- Interface amigável e responsiva para uso em campo

## 🛠 Tecnologias Utilizadas

- React Native
- Expo
- AsyncStorage para persistência local
- React Navigation para gerenciamento de rotas
- Componentes personalizados para UI/UX
- Integração com sensores do dispositivo

## 🚀 Como Rodar o Aplicativo

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- Expo CLI
- Um dispositivo físico ou emulador para testes

### Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/visionhive.git
   cd visionhive
   ```

2. Instale as dependências:

   ```bash
   npm install
   # ou
   yarn install
   ```

3. Inicie o aplicativo com Expo:

   ```bash
   npx expo start
   ```

4. Opções para executar o aplicativo:
   - Escaneie o QR code com o aplicativo Expo Go no seu dispositivo Android ou iOS
   - Pressione `a` no terminal para abrir no emulador Android
   - Pressione `i` no terminal para abrir no simulador iOS (apenas macOS)
   - Pressione `w` para abrir em um navegador web (funcionalidade limitada)

### Solução de Problemas Comuns

- Se encontrar o erro "close is not a function", atualize o arquivo SideMenu.js conforme as instruções no relatório de correções
- Para problemas com o Metro bundler, execute `npx expo start --clear` para limpar o cache
- Certifique-se de que todas as dependências estão instaladas corretamente

## 📱 Funcionalidades Principais

- **Dashboard**: Tela inicial com acesso às principais funcionalidades
- **Seleção de Filial**: Escolha entre diferentes filiais para gerenciamento
- **Cadastro de Motos**: Adicione novas motos ao sistema com informações detalhadas
- **Lista de Motos**: Visualize e filtre todas as motos cadastradas
- **Mapa do Pátio**: Visualização gráfica da disposição das motos
- **Movimentação**: Transfira motos entre diferentes áreas do pátio
- **Liberação**: Processo de saída de motos do pátio

## 👥 Integrantes

| Nome                 | RM       |
| -------------------- | -------- |
| João Victor Michaeli | RM555678 |
| Larissa Muniz        | RM557197 |
| Henrique Garcia      | RM558062 |

---

> Projeto acadêmico desenvolvido na FIAP para o Challenge 2025
