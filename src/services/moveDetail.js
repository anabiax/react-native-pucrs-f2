const BASE_URL = 'https://pokeapi.co/api/v2';

export async function fetchMoveDetail(nameOrId) {
  const response = await fetch(`${BASE_URL}/move/${nameOrId}`);

  if (!response.ok) {
    throw new Error(`Move "${nameOrId}" não encontrado`);
  }

  const json = await response.json();

  const enFlavor = [...(json.flavor_text_entries ?? [])]
    .reverse()
    .find((e) => e.language.name === 'en');

  const learnedBy = (json.learned_by_pokemon ?? [])
    .map((p) => {
      const parts = p.url.split('/').filter(Boolean);
      return { id: Number(parts.at(-1)), name: p.name };
    })
    .sort((a, b) => a.id - b.id);

  const GENERATION_LABEL = {
    'generation-i':    'Geração I',
    'generation-ii':   'Geração II',
    'generation-iii':  'Geração III',
    'generation-iv':   'Geração IV',
    'generation-v':    'Geração V',
    'generation-vi':   'Geração VI',
    'generation-vii':  'Geração VII',
    'generation-viii': 'Geração VIII',
    'generation-ix':   'Geração IX',
  };

  const AILMENT_LABEL = {
    burn:      'Queimadura',
    paralysis: 'Paralisia',
    poison:    'Veneno',
    freeze:    'Congelamento',
    sleep:     'Sono',
    confusion: 'Confusão',
  };

  const ailmentName = json.meta?.ailment?.name ?? 'none';

  return {
    id:           json.id,
    name:         json.name,
    type:         json.type.name,
    damageClass:  json.damage_class.name,
    power:        json.power,
    pp:           json.pp,
    accuracy:     json.accuracy,
    effectChance: json.effect_chance,
    ailment:      AILMENT_LABEL[ailmentName] ?? null,
    generation:   GENERATION_LABEL[json.generation?.name] ?? null,
    flavorText:   enFlavor?.flavor_text.replace(/\n|\f/g, ' ') ?? null,
    learnedBy,
  };
}