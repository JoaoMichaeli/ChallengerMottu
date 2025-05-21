# VisionHive

Nome: Henrique Francisco Garcia RM: 558062
Nome: Larrisa Mezencio P. Muniz RM: 557197
Nome: João Victor Michaeli de Bem RM: 555678

VisionHive é um aplicativo mobile desenvolvido com **React Native + Expo**.  
Ele tem como objetivo facilitar a **gestão de motos em pátios de filiais**, permitindo:

- Cadastro de motos
- Movimentação entre setores
- Exclusão de unidades
- Visualização da trajetória da moto dentro da filial

---

## 📁 Estrutura

O projeto está localizado dentro da pasta `visionhive`, que contém os diretórios:

- `components/` – Componentes reutilizáveis da interface
- `context/` – Context API para controle de estado (ex: filial atual)
- `screens/` – Telas do aplicativo (ex: Cadastro, Lista, Mover)
- `assets/` – Recursos visuais como ícones e imagens

---

## 🚀 Como Rodar o Projeto

1. **Pré-requisitos**:

   - Node.js (recomenda-se a versão LTS)
   - Expo CLI (`npm install -g expo-cli`)
   - Editor de código (recomendo [VS Code](https://code.visualstudio.com/))

2. **Clone ou Extraia o Projeto**

   ```bash
   unzip mobspr1.zip
   cd mobsp1/visionhive
   ```

3. **Instale as dependências**

   ```bash
   npm install
   ```

4. **Inicie o servidor de desenvolvimento**

   ```bash
   npx expo start
   ```

5. **Execute no celular ou emulador**:
   - Celular com **Expo Go** instalado: escaneie o QR code
   - Emulador Android/iOS configurado: use `a` ou `i` no terminal Expo

---

## 📦 Observação

A pasta `node_modules` pode ser recriada automaticamente com o comando `npm install`.  
Evite versionar ou compactar essa pasta para submissão.

---

## 📦 Por dentro do APP

1 - Selecione uma Filial. ( de 1 a 3)
2 - Cadastre uma moto.
3 - Vá lista de moto para ver as motos cadastradas.
4 - Mover moto para mudar o local.
5 - Voltar para rua, para a moto sair do pátio.

---

## 🚀 Próximos passos.

1 - Tratamento de erros e exceções.
2 - Filtro na lista de motos.
3 - Histórico de movimentação.
