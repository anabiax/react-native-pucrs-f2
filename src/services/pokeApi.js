const BASE_URL = 'https://pokeapi.co/api/v2';

/**
 * Busca a lista de pokemons com paginacao
 * @param {number} limit - Quantidade de pokemons por pagina
 * @param {number} offset - Deslocamento para paginacao
 * @returns {Promise<{results: Array, count: number, next: string|null, previous: string|null}>}
 */
export async function fetchPokemonList(limit = 20, offset = 0) {
  const response = await fetch(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
  );
  if (!response.ok) throw new Error('Erro ao buscar lista de pokémons');
  return response.json();
}

/**
 * Busca os detalhes de um pokemon pelo nome ou id
 * @param {string|number} nameOrId
 * @returns {Promise<Object>} detalhes do pokemon
 */
export async function fetchPokemonDetail(nameOrId) {
  const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);
  if (!response.ok) throw new Error(`Erro ao buscar pokémon: ${nameOrId}`);
  return response.json();
}

/**
 * Retorna a URL da imagem oficial do pokemon
 * @param {number} id
 * @returns {string}
 */
export function getPokemonImageUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

/**
 * Extrai o ID numerico de uma URL da PokeAPI
 * @param {string} url
 * @returns {number}
 */
export function extractIdFromUrl(url) {
  const parts = url.split('/').filter(Boolean);
  return parseInt(parts[parts.length - 1], 10);
}

/**
 * Busca a lista de pokemons ja com detalhes enriquecidos (id + imagem)
 * @param {number} limit
 * @param {number} offset
 * @returns {Promise<Array>}
 */
export async function fetchPokemonListEnriched(limit = 20, offset = 0) {
  const data = await fetchPokemonList(limit, offset);

  const enriched = data.results.map((pokemon) => {
    const id = extractIdFromUrl(pokemon.url);
    return {
      id,
      name: pokemon.name,
      url: pokemon.url,
      image: getPokemonImageUrl(id),
    };
  });

  return {
    pokemons: enriched,
    count: data.count,
    hasNext: !!data.next,
    hasPrevious: !!data.previous,
  };
}