const BASE_URL = 'https://pokeapi.co/api/v2';

export async function fetchMoveDetail(nameOrId) {
  const response = await fetch(`${BASE_URL}/move/${nameOrId}`);

  if (!response.ok) {
    throw new Error(`Move "${nameOrId}" não encontrado`);
  }

  const json = await response.json();

  const enEffect = json.effect_entries.find(e => e.language.name === 'en');
  const enFlavor = [...json.flavor_text_entries]
    .reverse()
    .find(e => e.language.name === 'en');

  return {
    id:          json.id,
    name:        json.name,
    type:        json.type.name,
    damageClass: json.damage_class.name,   // physical | special | status
    power:       json.power,               // null se status
    pp:          json.pp,
    accuracy:    json.accuracy,            // null se sempre acerta
    effectChance: json.effect_chance,      // null se não há efeito secundário
    shortEffect:  enEffect?.short_effect ?? null,
    flavorText:   enFlavor?.flavor_text.replace(/\n/g, ' ') ?? null,
  };
}