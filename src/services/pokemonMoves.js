import { fetchPokemonDetail } from './pokeApi';

/**
 * Emojis/icones por tipo de movimento
 */
export const MOVE_TYPE_EMOJI = {
  fire: '🔥',
  water: '💧',
  grass: '🌿',
  electric: '⚡',
  ice: '❄️',
  fighting: '🥊',
  poison: '☠️',
  ground: '🪨',
  flying: '🌬️',
  psychic: '🔮',
  bug: '🐛',
  rock: '🪨',
  ghost: '👻',
  dragon: '🐉',
  dark: '🌑',
  steel: '⚙️',
  fairy: '✨',
  normal: '⭐',
};

/**
 * Busca os movimentos de um pokémon pelo nome/id
 * Retorna lista enriquecida com detalhes de cada move
 * @param {string|number} nameOrId
 * @returns {Promise<{ pokemon: Object, moves: Array }>}
 */
export async function fetchPokemonMoves(nameOrId) {
  const pokemon = await fetchPokemonDetail(nameOrId);

  // Limita a 20 movimentos 
  const moveSlice = pokemon.moves.slice(0, 20);

  const moves = await Promise.all(
    moveSlice.map(async ({ move }) => {
      try {
        const res = await fetch(move.url);
        const data = await res.json();
        return {
          id: data.id,
          name: data.name,
          type: data.type?.name || 'normal',
          power: data.power,
          accuracy: data.accuracy,
          pp: data.pp,
          damageClass: data.damage_class?.name || 'status',
          // nome em pt-BR se disponível, senão em inglês
          displayName:
            data.names?.find((n) => n.language.name === 'pt-BR')?.name ||
            data.names?.find((n) => n.language.name === 'en')?.name ||
            data.name,
        };
      } catch {
        return {
          id: Math.random(),
          name: move.name,
          type: 'normal',
          power: null,
          accuracy: null,
          pp: null,
          damageClass: 'status',
          displayName: move.name,
        };
      }
    })
  );

  return {
    pokemon: {
      id: pokemon.id,
      name: pokemon.name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
      totalMoves: pokemon.moves.length,
    },
    moves,
  };
}