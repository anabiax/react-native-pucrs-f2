# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).


## Estrutura das Telas
#### 1. Tela de Listagem de Pokémons
Esta é a tela inicial do aplicativo, responsável por apresentar o catálogo de personagens ao usuário.

Descrição: Exibe os Pokemons em formato de cards, contendo nome, número de identificação e uma imagem ilustrativa. A interface inclui uma barra de busca superior para filtragem e um botão inferior para carregar mais registros.

Propósito: Permitir a exploração do catálogo e servir como ponto de seleção para navegar aos detalhes de um Pokémon específico.

Rota da API: [https://pokeapi.co/api/v2/pokemon?limit=20&offset=0](https://pokeapi.co/api/v2/pokemon?limit=20&offset=0)

#### 2. Tela de Movimentos do Pokémon
Esta tela é acessada ao tocar em um card de Pokémon na tela de listagem.

Descrição: Apresenta os dados do Pokémon selecionado (nome, número e imagem) acompanhados por uma lista completa de todos os movimentos que ele pode aprender.

Propósito: Fornecer uma visão detalhada das habilidades do Pokémon escolhido, funcionando como um intermediário para a seleção de um golpe específico.

Rota da API: [https://pokeapi.co/api/v2/pokemon/](https://pokeapi.co/api/v2/pokemon/){nome_ou_id}


#### 3. Tela de Detalhe do Movimento
Esta tela é acessada ao selecionar um movimento específico na lista de um Pokémon.

Descrição: Exibe as especificações técnicas completas de um golpe, incluindo:

Atributos de combate: Poder, precisão e PP.

Ficha técnica: Tipo, categoria, chance de efeito secundário, alvo e geração.

Descrição: Explicação textual sobre o efeito do movimento no combate.

Lista de aprendizado: Relação de outros Pokémons que também aprendem este movimento.

Propósito: Consolidar as informações técnicas de um movimento, permitindo que o usuário compreenda o impacto da habilidade no jogo.

Rota da API: [https://pokeapi.co/api/v2/move/](https://pokeapi.co/api/v2/move/){nome_ou_id}
