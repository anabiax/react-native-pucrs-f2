## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

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
