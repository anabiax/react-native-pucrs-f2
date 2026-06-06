const BASE_URL = 'https://pokeapi.co/api/v2';

export async function fetchPokemonMoves(nameOrId) {
  const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);

  if (!response.ok) {
    throw new Error(`Pokémon "${nameOrId}" não encontrado`);
  }

  const json = await response.json();

  const pokemon = {
    id: json.id,
    name: json.name,
    image:
      json.sprites?.other?.['official-artwork']?.front_default ??
      json.sprites?.front_default ??
      null,
    totalMoves: json.moves.length,
    types: json.types.map((t) => t.type.name),
  };

  // Extrai o método de aprendizado e nível mais relevante por move
  const moves = json.moves.map((entry) => {
    const detail =
      entry.version_group_details.find(d => d.move_learn_method.name === 'level-up') ??
      entry.version_group_details.at(-1);

    const method = detail?.move_learn_method?.name ?? 'unknown';
    const level = detail?.level_learned_at ?? 0;

    // extrair id da URL
    const urlParts = entry.move.url.split('/').filter(Boolean);
    const id = Number(urlParts.at(-1));

    return {
      id,
      name: entry.move.name,
      learnMethod: method,   // "level-up" | "machine" | "egg" | "tutor"
      level,                 // 0 quando não é level-up
    };
  });

  // Ordena: level-up primeiro (por nível), depois os demais (alfabético)
  moves.sort((a, b) => {
    if (a.learnMethod === 'level-up' && b.learnMethod !== 'level-up') return -1;
    if (a.learnMethod !== 'level-up' && b.learnMethod === 'level-up') return 1;
    if (a.learnMethod === 'level-up') return a.level - b.level;
    return a.name.localeCompare(b.name);
  });

  return { pokemon, moves };
}