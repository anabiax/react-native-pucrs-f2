/**
 * Busca os detalhes completos de um movimento pelo nome
 * @param {string} moveName
 * @returns {Promise<Object>}
 */
export async function fetchMoveDetail(moveName) {
  const res = await fetch(`https://pokeapi.co/api/v2/move/${moveName}`);
  if (!res.ok) throw new Error(`Erro ao buscar movimento: ${moveName}`);
  const data = await res.json();

  // Nome em pt-BR ou en
  const displayName =
    data.names?.find((n) => n.language.name === 'pt-BR')?.name ||
    data.names?.find((n) => n.language.name === 'en')?.name ||
    data.name;

  // Descrição em pt-BR ou en
  const description =
    data.flavor_text_entries?.find((e) => e.language.name === 'pt-BR')?.flavor_text ||
    data.flavor_text_entries?.find((e) => e.language.name === 'en')?.flavor_text ||
    '';

  // Efeito secundário
  const effectEntry =
    data.effect_entries?.find((e) => e.language.name === 'pt-BR') ||
    data.effect_entries?.find((e) => e.language.name === 'en');

  const secondaryEffect =
    data.effect_changes?.[0]?.effect_entries?.find((e) => e.language.name === 'en')?.effect || null;

  // Pokémons que aprendem o movimento (primeiros 20)
  const learnedBy = (data.learned_by_pokemon || []).slice(0, 20).map((p) => {
    const parts = p.url.split('/').filter(Boolean);
    const id = parseInt(parts[parts.length - 1], 10);
    return { name: p.name, id };
  });

  // Geração
  const generation = data.generation?.name
    ?.replace('generation-', 'Geração ')
    ?.toUpperCase()
    ?.replace('GERAÇÃO I', 'Geração I')
    ?.replace('GERAÇÃO II', 'Geração II')
    ?.replace('GERAÇÃO III', 'Geração III')
    ?.replace('GERAÇÃO IV', 'Geração IV')
    ?.replace('GERAÇÃO V', 'Geração V')
    ?.replace('GERAÇÃO VI', 'Geração VI')
    ?.replace('GERAÇÃO VII', 'Geração VII')
    ?.replace('GERAÇÃO VIII', 'Geração VIII')
    ?.replace('GERAÇÃO IX', 'Geração IX') || '';

  return {
    id: data.id,
    name: data.name,
    displayName,
    type: data.type?.name || 'normal',
    power: data.power,
    accuracy: data.accuracy,
    pp: data.pp,
    damageClass: data.damage_class?.name || 'status',
    target: data.target?.name || '',
    effectChance: data.effect_chance,
    description: description.replace(/\f/g, ' '),
    secondaryEffect: effectEntry?.short_effect || null,
    generation,
    learnedBy,
    totalLearners: data.learned_by_pokemon?.length || 0,
  };
}

/**
 * Mapa de nomes de alvo para pt-BR
 */
export const TARGET_LABELS = {
  'selected-pokemon': 'Pokémon selecionado',
  'all-opponents': 'Todos os oponentes',
  'entire-field': 'Campo inteiro',
  'user': 'Usuário',
  'random-opponent': 'Oponente aleatório',
  'all-other-pokemon': 'Todos os outros',
  'specific-move': 'Movimento específico',
  'all-pokemon': 'Todos os Pokémons',
  'users-field': 'Campo do usuário',
  'opponents-field': 'Campo do oponente',
  'ally': 'Aliado',
  'fainting-pokemon': 'Pokémon derrotado',
};

/**
 * Mapa de categoria para label em pt-BR
 */
export const DAMAGE_CLASS_LABELS = {
  physical: 'Físico',
  special: 'Especial',
  status: 'Status',
};

export const DAMAGE_CLASS_COLORS = {
  physical: '#E3000F',
  special: '#E8A000',
  status: '#6B6B6B',
};