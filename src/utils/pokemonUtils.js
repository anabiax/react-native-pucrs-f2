// Cores de fundo para os cards baseadas no ID do pokémon
// (sem precisar chamar a API de tipo, é atribuída ciclicamente)
export const CARD_BACKGROUNDS = [
  '#C5E8D5', // verde menta
  '#F5D5B8', // laranja pêssego
  '#B8D9F5', // azul céu
  '#F5E5B8', // amarelo mel
  '#E8C5D5', // rosa suave
  '#D5C5E8', // lilás
  '#C5E8E8', // turquesa
  '#E8E5C5', // verde oliva claro
];

export function getCardBackground(id) {
  return CARD_BACKGROUNDS[(id - 1) % CARD_BACKGROUNDS.length];
}

export function formatPokemonId(id) {
  return `#${String(id).padStart(3, '0')}`;
}

export function capitalizeName(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}
